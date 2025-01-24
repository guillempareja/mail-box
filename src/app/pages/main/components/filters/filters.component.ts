import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { AccordionComponent } from '../../../../shared/components/accordion/accordion.component';
import { DropdownDirective } from '../../../../shared/directives/ng-dropdown';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerDirective } from '../../../../shared/directives/ng-date-picker';
import { DropdownItem } from '../../../../shared/models/dropdowns.types';
import { MailApiService } from '../../../../shared/services/apis/mail-api.service';
import { LoginService } from '../../../../shared/services/stores/login.service';
import { signal } from '@angular/core';
import { MappingResponse } from '../../../../shared/models/mapping-fetch.types';
import { MainFilterValues } from '../../../../shared/models/main-filter.types';
import {
  MainService,
  INITIAL_FILTER_VALUES,
} from '../../../../shared/services/stores/main.service';
import { CheckboxDirective } from '../../../../shared/directives/ng-checkbox';

@Component({
  selector: 'filters',
  imports: [
    CommonModule,
    AccordionComponent,
    DropdownDirective,
    DatePickerDirective,
    ReactiveFormsModule,
    CheckboxDirective,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FiltersComponent implements OnInit {
  // Injections
  private fb = inject(FormBuilder);
  private mailApiService = inject(MailApiService);
  private loginService = inject(LoginService);
  public mainService = inject(MainService);

  // Data
  public form!: FormGroup;
  public selectableSubjects = signal<DropdownItem[]>([]);
  private dropdowns = signal<MappingResponse | null>(null);

  // Computed
  public selectableTopics = computed<DropdownItem[]>(() => {
    const topicsList = this.dropdowns()?.topics;
    const userTopicIds = this.loginService.userData()?.topicIds;

    if (!topicsList || !userTopicIds) {
      return [];
    }

    return userTopicIds.map((id) => topicsList.find((item) => item.id === id)!);
  });

  ngOnInit(): void {
    this.buildForm();
    this.loadDropdowns();
  }

  private async loadDropdowns(): Promise<void> {
    const response = await this.mailApiService.mapping();
    this.dropdowns.set(response);
  }

  private buildForm(): void {
    this.form = this.fb.group<MainFilterValues>(this.mainService.filters());
  }

  public applyFilters(): void {
    this.mainService.filters.set(this.form.value);
    this.mainService.page.set(1);
  }

  public resetFilters(): void {
    this.form.setValue(INITIAL_FILTER_VALUES);
    this.setSelectableSubjects();
  }

  public setSelectableSubjects(id?: number): void {
    if (this.form.get('topicId')?.value !== id) {
      this.form.get('subjectId')!.setValue(null);
    }

    if (!id) {
      this.selectableSubjects.set([]);
      return;
    }

    const subjectsList = this.dropdowns()!.subjects;
    const selectableSubjects = subjectsList.filter(
      (subject) => subject.topicId === id,
    );
    this.selectableSubjects.set(selectableSubjects);
  }
}
