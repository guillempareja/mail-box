import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { LoginService } from '@core/services/login.service';
import { GlobalLoaderComponent } from '@shared/components/global-loader/global-loader.component';
import { LoaderService } from '@core/services/loader.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { GenericModalsService } from '@core/services/generic-modals.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    GlobalLoaderComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Injections
  public loginService = inject(LoginService);
  public loaderService = inject(LoaderService);
  public genericModalsService = inject(GenericModalsService);

  // Methods
  ngOnInit(): void {
    this.loginService.loadSession();
  }
}
