import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FiltersComponent } from './components/filters/filters.component';
import { ConsultationComponent } from '@shared/components/consultation/consultation.component';
import { PageHeaderService } from '@shared/services/stores/page-header.service';
import { MailApiService } from '@shared/services/apis/mail-api.service';
import { LoginService } from '@shared/services/stores/login.service';
import { SearchItem } from '@shared/models/search-fetch.types';
import { parse } from 'date-fns';
import {
  isDateAfter,
  isDateBefore,
  isDateWithinRange,
} from '@shared/utils/dates.utils';
import * as _ from 'lodash';
import { InboxService } from '@shared/services/stores/inbox.service';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

@Component({
  selector: 'app-inbox',
  imports: [
    CommonModule,
    FiltersComponent,
    ConsultationComponent,
    PaginatorComponent,
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class InboxComponent implements OnInit {
  // Injections
  private mailApiService = inject(MailApiService);
  private loginService = inject(LoginService);
  private pageHeaderService = inject(PageHeaderService);
  public inboxService = inject(InboxService);

  // Data
  private allconsultations = signal<SearchItem[]>([]);
  public itemsPerPage = 10;

  // Computed
  public consultations = computed<SearchItem[]>(() => {
    if (!this.inboxService.filters() || !this.allconsultations().length) {
      return this.allconsultations();
    }

    return this.allconsultations().filter((consultation) => {
      const startDate =
        this.inboxService.filters()?.startDate &&
        parse(
          this.inboxService.filters()!.startDate!,
          'dd/MM/yyyy',
          new Date(),
        );
      const endDate =
        this.inboxService.filters()?.endDate &&
        parse(this.inboxService.filters()!.endDate!, 'dd/MM/yyyy', new Date());
      const searchDate = new Date(consultation.date);

      if (
        startDate &&
        endDate &&
        !isDateWithinRange(searchDate, startDate, endDate)
      ) {
        return false;
      }

      if (startDate && !isDateAfter(searchDate, startDate)) {
        return false;
      }

      if (endDate && !isDateBefore(searchDate, endDate)) {
        return false;
      }

      if (
        this.inboxService.filters()?.subjectId &&
        consultation.subjectId !== this.inboxService.filters()?.subjectId
      ) {
        return false;
      }

      if (
        this.inboxService.filters()?.topicId &&
        consultation.topicId !== this.inboxService.filters()?.topicId
      ) {
        return false;
      }

      if (!this.inboxService.filters().showClosed && !consultation.isOpen) {
        return false;
      }

      if (this.inboxService.filters().showClosed && consultation.isOpen) {
        return false;
      }

      return true;
    });
  });

  public paginatedConsultations = computed(() => {
    const start = (this.inboxService.page() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.consultations().slice(start, end);
  });

  // Methods
  ngOnInit() {
    this.pageHeaderService.updatePageHeader(true);
    this.loadSearch();
  }

  private async loadSearch(): Promise<void> {
    const userId = this.loginService.userData()!.userId;
    const response = await this.mailApiService.search(userId);
    this.allconsultations.set(response?.results ?? []);
  }

  public removeConsultation(consultation: SearchItem): void {
    const availableConsultations = _.remove(
      this.allconsultations(),
      (item) => item.consultationId !== consultation.consultationId,
    );

    this.allconsultations.set(availableConsultations);
  }
}
