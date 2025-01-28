import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { PageHeaderService } from '@shared/services/stores/page-header.service';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { LoginService } from '@shared/services/stores/login.service';
import { GlobalLoaderComponent } from '@shared/components/global-loader/global-loader.component';
import { LoaderService } from '@shared/services/stores/loader.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { GenericModalsService } from '@shared/services/stores/generic-modals.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    GlobalLoaderComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Injections
  public pageHeaderService = inject(PageHeaderService);
  public loginService = inject(LoginService);
  public loaderService = inject(LoaderService);
  public genericModalsService = inject(GenericModalsService);

  // Methods
  ngOnInit(): void {
    this.loginService.loadSession();
  }
}
