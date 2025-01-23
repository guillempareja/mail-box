import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
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
import { DropdownDirective } from '@shared/directives/ng-dropdown';
import { GenericModalsUtilsService } from '@shared/services/utils/generic-modals.utils.service';
import { IsInvalidControlPipe } from '@shared/pipes/is-invalid-control.pipe';
import { markAllControlsAsTouched } from '@shared/utils/form.utils';
import { MappingResponse } from '@shared/models/mapping-fetch.types';
import { MailApiService } from '@shared/services/apis/mail-api.service';
import { DropdownItem } from '@shared/models/dropdowns.types';

@Component({
  selector: 'app-reassign',
  imports: [
    CommonModule,
    ConsultationComponent,
    DropdownDirective,
    ReactiveFormsModule,
    IsInvalidControlPipe,
  ],
  templateUrl: './reassign.component.html',
  styleUrl: './reassign.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ReassignComponent implements OnInit {
  // Injections
  private pageHeaderService = inject(PageHeaderService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private genericModalsUtilsService = inject(GenericModalsUtilsService);
  private mailApiService = inject(MailApiService);

  // Data
  public dropdowns = signal<MappingResponse | null>(null);
  public consultation = signal<SearchItem | null>(null);
  public form!: FormGroup;
  public selectableSubjects = signal<DropdownItem[]>([]);

  // Methods
  async ngOnInit() {
    if (!history.state.consultation) {
      this.router.navigate(['/inbox']);
      return;
    }

    this.pageHeaderService.updatePageHeader(true, MESSAGE_BREAD_CRUMB_ROUTE);
    this.consultation.set(history.state.consultation as SearchItem);
    this.buildForm();

    await this.loadDropdowns();

    if (this.consultation()!.topicAI_Id !== undefined) {
      this.setSelectableSubjects(this.consultation()!.topicAI_Id!);
    }
  }

  private async loadDropdowns(): Promise<void> {
    const response = await this.mailApiService.mapping();
    this.dropdowns.set(response);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      topicId: [this.consultation()!.topicAI_Id ?? null, Validators.required],
      subjectId: [null, Validators.required],
    });
  }

  public setSelectableSubjects(id: number): void {
    if (this.form.get('topicId')?.value !== id) {
      this.form.get('subjectId')!.setValue(null);
    }

    const subjectsList = this.dropdowns()!.subjects;
    const selectableSubjects = subjectsList.filter(
      (subject) => subject.topicId === id,
    );
    this.selectableSubjects.set(selectableSubjects);
  }

  public async reassign(): Promise<void> {
    // Validate
    markAllControlsAsTouched(this.form);
    if (!this.form.valid) {
      return;
    }

    // Open modal and wait confirmation
    if (!(await this.confirmReassign())) {
      return; // The user has cancelled
    }

    // Call endpoint
    const data = {
      consultationId: this.consultation()!.consultationId,
      ...this.form.value,
    };
    await this.mailApiService.redirect(data);

    // Navigate to inbox
    this.router.navigate(['/inbox']);
  }

  private async confirmReassign(): Promise<boolean> {
    const title = 'Reassignar la consulta';
    const text = '¿Está seguro que desea reasignar la consulta?';
    return await this.genericModalsUtilsService.showModal(title, text);
  }
}
