import { ConsultationId } from './search-fetch.types';

export type Feedback = string;

export type SummaryFeedbackBody = {
  consultationId: ConsultationId;
  feedback?: Feedback;
};
