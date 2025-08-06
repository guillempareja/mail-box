import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
} from '@angular/core';
import { LoginService } from '@core/services/login.service';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'header',
  imports: [CommonModule, NgPipesModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements AfterViewInit {
  // Injections
  private host = inject(ElementRef<HTMLElement>);
  public loginService = inject(LoginService);

  // Methods
  ngAfterViewInit(): void {
    this.updateHeight();
    window.addEventListener('resize', () => this.updateHeight());
  }

  private updateHeight(): void {
    const height = this.host.nativeElement.offsetHeight;
    document.documentElement.style.setProperty(
      '--header-height',
      `${height}px`,
    );
  }
}
