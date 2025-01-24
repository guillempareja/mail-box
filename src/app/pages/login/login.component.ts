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
import { LoginService } from '@shared/services/stores/login.service';

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
  private loginService = inject(LoginService);

  // Data
  public form!: FormGroup;

  // Methods
  ngOnInit() {
    this.loginService.logout();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    markAllControlsAsTouched(this.form);
    if (!this.form.valid) {
      return;
    }

    this.loginService.login(this.form.value);
  }
}
