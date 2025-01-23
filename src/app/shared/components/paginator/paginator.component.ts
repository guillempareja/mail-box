import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'paginator',
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  // Models
  public currentPage = model(1);

  // Inputs
  public totalItems = input.required<number>();
  public itemsPerPage = input.required<number>();

  // Effects
  ensureValidPage = effect(
    () => {
      const totalPages = Math.ceil(this.totalItems() / this.itemsPerPage());

      // Adjust the page if it exceeds the total number of pages
      if (this.currentPage() > totalPages) {
        this.currentPage.set(totalPages);
      }
    },
    { allowSignalWrites: true },
  );

  // Methods
  public onPageChange(newPage: PaginatorState): void {
    this.currentPage.set(newPage.page! + 1);
  }
}
