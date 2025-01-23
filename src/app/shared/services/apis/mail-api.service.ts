import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginBody, LoginResponse } from '@shared/models/login-fetch.types';
import {
  SearchBody,
  SearchResponse,
  UserId,
} from '@shared/models/search-fetch.types';
import { MappingResponse } from '@shared/models/mapping-fetch.types';
import { CustomHeaders } from '../../enums/custom-headers.enum';
import {
  Feedback,
  SummaryFeedbackBody,
} from '@shared/models/summary-feedback-fetch.types';
import { FinalizeWithoutAnsweringBody } from '@shared/models/finalize-without-answering-fetch.types';
import { ConsultationId } from '@shared/models/search-fetch.types';
import { withCache } from '@ngneat/cashew';
import { removeEmptyProperties } from '@shared/utils/objects.utils';
import { MarkAsNotSpamBody } from '@shared/models/mark-as-not-spam-fetch.types';
import { RedirectBody } from '@shared/models/redirect-fetch.types';
import {
  SimilarConsultationsBody,
  SimilarConsultationsResponse,
} from '@shared/models/similar-consultations-fetch.types';
import { AnswerBody } from '@shared/models/answer-fetch.types';

@Injectable({
  providedIn: 'root',
})
export class MailApiService {
  // Injections
  private http = inject(HttpClient);

  // Methods
  public login(body: LoginBody): Promise<LoginResponse> {
    return firstValueFrom(
      this.http.post<LoginResponse>('/login', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public search(userId: UserId): Promise<SearchResponse> {
    const params = { userId } as SearchBody;

    return firstValueFrom(
      this.http.get<SearchResponse>('/search', {
        params,
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public similarConsultations(
    consultationId: ConsultationId,
  ): Promise<SimilarConsultationsResponse> {
    const params = {
      consultationId: consultationId.toString(),
    } as SimilarConsultationsBody;

    return firstValueFrom(
      this.http.get<SimilarConsultationsResponse>('/similarConsultations', {
        params,
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public mapping(): Promise<MappingResponse> {
    return firstValueFrom(
      this.http.get<MappingResponse>('/mapping', {
        context: withCache(),
      }),
    );
  }

  public async summaryFeedback(
    consultationId: ConsultationId,
    feedback?: Feedback,
  ): Promise<void> {
    const body: SummaryFeedbackBody = {
      consultationId,
      feedback,
    };
    const formattedBody = removeEmptyProperties(body);

    await firstValueFrom(this.http.post('/summaryFeedback', formattedBody));
  }

  public async finalizeWithoutAnswering(
    consultationId: ConsultationId,
  ): Promise<void> {
    const body: FinalizeWithoutAnsweringBody = { consultationId };

    await firstValueFrom(
      this.http.post('/finalizeWithoutAnswering', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public async markAsNotSpam(consultationId: ConsultationId): Promise<void> {
    const body: MarkAsNotSpamBody = { consultationId };

    await firstValueFrom(
      this.http.post('/markAsNotSpam', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public async redirect(body: RedirectBody): Promise<void> {
    await firstValueFrom(
      this.http.post('/redirect', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }

  public async answer(body: AnswerBody): Promise<void> {
    await firstValueFrom(
      this.http.post('/answer', body, {
        headers: {
          [CustomHeaders.SHOW_LOADER]: 'true',
        },
      }),
    );
  }
}
