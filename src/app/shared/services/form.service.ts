import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class FormService {
  private toastr = inject(ToastrService);

  navigateToFormError(): void {
    const invalidElement = document.querySelector('[data-invalid="true"]');

    if (invalidElement) {
      invalidElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      this.toastr.error('Por favor, corrige los errores del formulario');
    }
  }
}
