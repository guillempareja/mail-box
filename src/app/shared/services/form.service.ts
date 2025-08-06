import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class FormService {
  // Injections
  private toastr = inject(ToastrService);

  // Methods
  navigateToFormError(): void {
    const invalidElement = document.querySelector('.ng-invalid');

    if (invalidElement) {
      invalidElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      this.toastr.error('Por favor, corrige los errores del formulario');
    }
  }
}
