import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MailApiService } from '@shared/services/apis/mail-api.service';
import { TextareaDirective } from '@shared/directives/ng-textarea';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManageablePromise } from '@shared/utils/manageable-promise..utils';
import { GenericModalsService } from '@shared/services/stores/generic-modals.service';
import { MappingResponse } from '@shared/models/mapping-fetch.types';
import { IsInvalidControlPipe } from '@shared/pipes/is-invalid-control.pipe';
import { SearchItem } from '@shared/models/search-fetch.types';
import { ModalComponent } from '../modal/modal.component';
import { AccordionComponent } from '../accordion/accordion.component';

enum SummaryVoteValue {
  UNVOTED = 0,
  POSITIVE = 1,
  NEGATIVE = 2,
}

@Component({
  selector: 'consultation',
  imports: [
    CommonModule,
    AccordionComponent,
    ModalComponent,
    TextareaDirective,
    ReactiveFormsModule,
    IsInvalidControlPipe,
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultationComponent implements OnInit {
  // Injections
  private router = inject(Router);
  private mailApiService = inject(MailApiService);
  private genericModalsService = inject(GenericModalsService);

  // Inputs
  public data = model.required<SearchItem>();
  public accordionMode = input(true, { transform: booleanAttribute });
  public hasActions = input(true, { transform: booleanAttribute });
  public applyCustomActions = input(false, { transform: booleanAttribute });

  // Outputs
  public onFinalize = output<SearchItem>();

  // Data
  public confirmFeedbackResp = new ManageablePromise();
  public feedbackControl = new FormControl('', Validators.required);
  public summaryForm!: FormGroup;
  public summaryVote = signal<SummaryVoteValue>(SummaryVoteValue.UNVOTED);
  public isTextClamped = signal(true);
  public showValorateSummaryModal = signal(false);
  private dropdowns = signal<MappingResponse | null>(null);
  public sentimentsMap: any = {
    0: {
      className: 'neutral',
      icon: 'sentiment_neutral',
    },
    1: {
      className: 'positive',
      icon: 'sentiment_satisfied',
    },
    2: {
      className: 'negative',
      icon: 'sentiment_dissatisfied',
    },
  };

  // Computed
  public clampText = computed(
    () => !!this.data().summary && this.isTextClamped(),
  );

  public panelFormattedTextId = computed(
    () => `panel-formatted-text- + ${this.data().consultationId}`,
  );

  public panelOriginalTextId = computed(
    () => `panel-original-text- + ${this.data().consultationId}`,
  );

  public panelSummaryId = computed(
    () => `panel-summary- + ${this.data().consultationId}`,
  );

  public panelAnswerId = computed(
    () => `panel-answer- + ${this.data().consultationId}`,
  );

  public topic = computed(
    () =>
      this.dropdowns()?.topics.find((item) => item.id === this.data().topicId)
        ?.text,
  );

  public subject = computed(
    () =>
      this.dropdowns()?.subjects.find(
        (item) => item.id === this.data().subjectId,
      )?.text,
  );

  public sentiment = computed(
    () =>
      this.dropdowns()?.sentiments.find(
        (item) => item.id === this.data().sentimentId,
      )?.text,
  );

  public isVotePositive = computed(
    () => this.summaryVote() === SummaryVoteValue.POSITIVE,
  );

  public isVoteNegative = computed(
    () => this.summaryVote() === SummaryVoteValue.NEGATIVE,
  );

  // Methods
  ngOnInit(): void {
    this.loadDropdowns();
  }

  private async loadDropdowns(): Promise<void> {
    const response = await this.mailApiService.mapping();
    this.dropdowns.set(response);
  }

  private updateData(modifiedData: Partial<SearchItem>): void {
    this.data.update((data) => ({
      ...data,
      ...modifiedData,
    }));
  }

  public navigateToVerify(): void {
    this.router.navigate(['/verify'], {
      state: { consultation: this.data() },
    });
  }

  public navigateToProcess(): void {
    this.router.navigate(['/process'], {
      state: { consultation: this.data() },
    });
  }

  public navigateToReassign(): void {
    this.router.navigate(['/reassign'], {
      state: { consultation: this.data() },
    });
  }

  public toggleisTextClamped(): void {
    this.isTextClamped.update((currentValue) => !currentValue);
  }

  public votePositiveSummary(): void {
    if (this.isVotePositive()) {
      return;
    }

    const consultationId = this.data().consultationId;
    this.mailApiService.summaryFeedback(consultationId);

    // We are not waiting for the previous service because
    // we want to highlight the selected response immediately
    this.summaryVote.set(SummaryVoteValue.POSITIVE);
  }

  public async voteNegativeSummary(): Promise<void> {
    // Prepare the control before showing the modal
    this.feedbackControl.markAsUntouched();
    this.feedbackControl.setValue('');

    // Open modal and wait confirmation
    do {
      this.confirmFeedbackResp.initPromise();
      this.showValorateSummaryModal.set(true);
      if (!(await this.confirmFeedbackResp.promise)) {
        return; // The user has cancelled
      }

      // Validate
      this.feedbackControl.markAsTouched();
    } while (!this.feedbackControl.valid);

    // Provide negative feedback
    const consultationId = this.data().consultationId;
    const feedback = this.feedbackControl.value!.trim();
    this.mailApiService.summaryFeedback(consultationId, feedback);

    // We are not waiting for the previous service because
    // we want to highlight the selected response immediately
    this.summaryVote.set(SummaryVoteValue.NEGATIVE);
    this.showValorateSummaryModal.set(false);
  }

  public async finalizeWithoutAnswering(): Promise<void> {
    // Open modal and wait confirmation
    if (!(await this.genericModalsService.confirmFinalizeWithoutAnswering())) {
      return; // The user has cancelled
    }

    // Call endpoint
    const consultationId = this.data().consultationId;
    this.mailApiService.finalizeWithoutAnswering(consultationId);

    // Update and emit data
    this.updateData({
      isOpen: false,
    });
    this.onFinalize.emit(this.data());
  }

  public async onChangeTab(event: Event): Promise<void> {
    const target = event.target as HTMLElement;

    if (target.hasAttribute('selected')) {
      return;
    }

    this.isTextClamped.set(true);
  }
}
