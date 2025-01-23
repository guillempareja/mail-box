import { ConsultationId, SubjectId, TopicId } from './search-fetch.types';

export type RedirectBody = {
  consultationId: ConsultationId;
  topicId: TopicId;
  subjectId: SubjectId;
};
