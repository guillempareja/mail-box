import { ConsultationId } from './search-fetch.types';

export type AnswerBody = {
  consultationId: ConsultationId;
  answer: string;
};
