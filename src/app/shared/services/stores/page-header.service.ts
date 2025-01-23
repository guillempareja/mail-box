import { inject, Injectable, signal } from '@angular/core';
import { BreadcrumbRoute } from '@shared/models/breadcrumb.type';
import { LoginService } from './login.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  // Injections
  private loginService = inject(LoginService);

  // Data
  public show = signal(true);
  public title = signal<string | null>(null);
  public breadcrumbRoute = signal<BreadcrumbRoute[] | null>(null);

  // Methods
  public updatePageHeader(
    show = false,
    breadcrumbRoute: BreadcrumbRoute[] | null = null,
    title?: string | null,
  ): void {
    if (!show) {
      this.show.set(false);
      return;
    }

    if (title === undefined) {
      title = `Buzón de Consultas de ${_.capitalize(this.loginService.userData()?.username)}`;
    }

    this.show.set(show);
    this.title.set(title);
    this.breadcrumbRoute.set(breadcrumbRoute);
  }
}
