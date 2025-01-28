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
import { Router } from '@angular/router';
import { SearchItem } from '@shared/models/search-fetch.types';
import { GenericModalsService } from '@shared/services/stores/generic-modals.service';
import { MailApiService } from '@shared/services/apis/mail-api.service';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, ConsultationComponent],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class VerifyComponent implements OnInit {
  // Injections
  private pageHeaderService = inject(PageHeaderService);
  private router = inject(Router);
  private genericModalsService = inject(GenericModalsService);
  private mailApiService = inject(MailApiService);

  // Data
  public consultation = signal<SearchItem | null>(null);

  // Methods
  ngOnInit() {
    if (!history.state.consultation) {
      this.router.navigate(['/inbox']);
      return;
    }

    this.pageHeaderService.updatePageHeader(true, MESSAGE_BREAD_CRUMB_ROUTE);
    this.consultation.set(history.state.consultation as SearchItem);
  }

  public async finalizeWithoutAnswering(): Promise<void> {
    // Open modal and wait confirmation
    if (!(await this.genericModalsService.confirmFinalizeWithoutAnswering())) {
      return; // The user has cancelled
    }

    // Call endpoint
    const consultationId = this.consultation()!.consultationId;
    await this.mailApiService.finalizeWithoutAnswering(consultationId);

    // Navigate to inbox
    this.router.navigate(['/inbox']);
  }

  public async markAsNotSPAM(): Promise<void> {
    // Open modal and wait confirmation
    if (!(await this.confirmNotSPAM())) {
      return; // The user has cancelled
    }

    // Call endpoint
    const consultationId = this.consultation()!.consultationId;
    await this.mailApiService.markAsNotSpam(consultationId);

    // Navigate to process
    const consultation = {
      ...this.consultation(),
      spam: false,
    };
    this.router.navigate(['/process'], {
      state: { consultation: consultation },
      replaceUrl: true,
    });
  }

  private async confirmNotSPAM(): Promise<boolean> {
    const title = 'No es SPAM';
    const text = '¿Está seguro de que la consulta no es SPAM?';
    return await this.genericModalsService.showModal(title, text);
  }
}
