import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsInvalidControlPipe } from '@shared/pipes/is-invalid-control.pipe';
import { markAllControlsAsTouched } from '@shared/utils/form.utils';
import { AuthService } from '@core/services/auth.service';
import { FormService } from '@shared/services/form.service';
import { sleep } from '@shared/utils/delay.utils';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, IsInvalidControlPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {
  // Injections
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private formService = inject(FormService);

  // Data
  public form!: FormGroup;

  // Methods
  ngOnInit() {
    this.authService.logout();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async login(): Promise<void> {
    markAllControlsAsTouched(this.form);

    if (!this.form.valid) {
      await sleep(); // Wait for the UI to render validation errors before scrollings
      this.formService.navigateToFormError();
      return;
    }

    this.authService.login(this.form.value);
  }
}
