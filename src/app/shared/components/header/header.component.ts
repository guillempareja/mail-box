import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { LoginService } from '@shared/services/stores/login.service';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'header',
  imports: [CommonModule, NgPipesModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  // Injections
  public loginService = inject(LoginService);
}
