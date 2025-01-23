import { SearchResponse } from './search-fetch.types';

export type SimilarConsultationsBody = {
  consultationId: string;
};

export type SimilarConsultationsResponse = SearchResponse;
