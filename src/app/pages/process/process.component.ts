import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { PageHeaderService } from '@shared/services/stores/page-header.service';
import { ConsultationComponent } from '@shared/components/consultation/consultation.component';
import { MESSAGE_BREAD_CRUMB_ROUTE } from '@shared/constants/breadcrumb-routes';
import { SearchItem } from '@shared/models/search-fetch.types';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsInvalidControlPipe } from '@shared/pipes/is-invalid-control.pipe';
import { markAllControlsAsTouched } from '@shared/utils/form.utils';
import { GenericModalsService } from '@shared/services/stores/generic-modals.service';
import { sleep } from '@shared/utils/delay.utils';
import { TextareaDirective } from '@shared/directives/ng-textarea';
import { MailApiService } from '@shared/services/apis/mail-api.service';
import { updateList } from '@shared/utils/objects.utils';

@Component({
  selector: 'app-process',
  imports: [
    CommonModule,
    ConsultationComponent,
    TextareaDirective,
    ReactiveFormsModule,
    IsInvalidControlPipe,
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ProcessComponent implements OnInit {
  // Injections
  private pageHeaderService = inject(PageHeaderService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private genericModalsService = inject(GenericModalsService);
  private mailApiService = inject(MailApiService);

  //Viewchilds
  public textareaRef = viewChild<ElementRef>('textarea');

  // Data
  public similarConsultations = signal<SearchItem[]>([]);
  public consultation = signal<SearchItem | null>(null);
  public form!: FormGroup;

  // Effects
  onLoadTextInputRef = effect(async () => {
    if (!this.textareaRef()) {
      return;
    }

    await sleep();

    const shadowRoot = this.textareaRef()!.nativeElement.shadowRoot;
    const textareaElement = shadowRoot.querySelector('textarea');
    textareaElement.style.paddingTop = '3.5rem';
  });

  // Methods
  ngOnInit(): void {
    if (!history.state.consultation) {
      this.router.navigate(['/inbox']);
      return;
    }

    this.pageHeaderService.updatePageHeader(true, MESSAGE_BREAD_CRUMB_ROUTE);
    this.consultation.set(history.state.consultation as SearchItem);
    this.buildForm();
    this.loadSimilarConsultations();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      answer: ['', Validators.required],
    });
  }

  private async loadSimilarConsultations(): Promise<void> {
    const consultationId = this.consultation()!.consultationId;
    const response =
      await this.mailApiService.similarConsultations(consultationId);
    this.similarConsultations.set(response?.results ?? []);
  }

  public async process(): Promise<void> {
    // Validate
    markAllControlsAsTouched(this.form);
    if (!this.form.valid) {
      return;
    }

    // Open modal and wait confirmation
    if (!(await this.confirmProcess())) {
      return; // The user has cancelled
    }

    // Call endpoint
    const data = {
      consultationId: this.consultation()!.consultationId,
      ...this.form.value,
    };
    await this.mailApiService.answer(data);

    // Navigate to inbox
    this.router.navigate(['/inbox']);
  }

  private async confirmProcess(): Promise<boolean> {
    const title = 'Tramitar la consulta';
    const text = '¿Está seguro que desea tramitar la consulta?';
    return await this.genericModalsService.showModal(title, text);
  }

  public updateConsultation(updatedConsultation: SearchItem): void {
    this.similarConsultations.update((consultations) =>
      updateList(consultations, updatedConsultation),
    );
  }
}
