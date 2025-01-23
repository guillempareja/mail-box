export type UserId = string;
export type ConsultationId = Number;
export type TopicId = Number;
export type SubjectId = Number;

export type SearchBody = {
  userId: UserId;
};

export type SearchResponse = {
  results: SearchItem[];
};

export type SearchItem = {
  requester: string;
  consultationId: ConsultationId;
  title: string;
  topicId: number;
  topicAI_Id?: number;
  subjectId: number;
  sentimentId: number;
  entities?: string[];
  spam: boolean;
  date: string;
  originalText: string;
  formattedText: string;
  summary?: string;
  answer?: string;
  isOpen: boolean;
};
