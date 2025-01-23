import { Injectable, signal } from '@angular/core';
import { InboxFilterValues } from '@shared/models/inbox-filter.types';

export const INITIAL_FILTER_VALUES: InboxFilterValues = {
  topicId: null,
  subjectId: null,
  startDate: null,
  endDate: null,
  showClosed: false,
};

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  // Data
  public filters = signal<InboxFilterValues>(INITIAL_FILTER_VALUES);
  public page = signal(1);
}
