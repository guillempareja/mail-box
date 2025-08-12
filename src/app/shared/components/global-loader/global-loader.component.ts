import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'global-loader',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Disable focus & interaction behind the overlay
    document.body.inert = true;
    // Prevent scroll while loading
    document.documentElement.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.inert = false;
    document.documentElement.style.overflow = '';
  }
}
