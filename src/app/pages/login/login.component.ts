import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputDirective } from '@shared/directives/ng-text-input';
import { IsInvalidControlPipe } from '@shared/pipes/is-invalid-control.pipe';
import { markAllControlsAsTouched } from '@shared/utils/form.utils';
import { LoginService } from '@shared/services/stores/login.service';
import { PageHeaderService } from '@shared/services/stores/page-header.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputDirective,
    IsInvalidControlPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class LoginComponent implements OnInit {
  // Injections
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private pageHeaderService = inject(PageHeaderService);

  // Data
  public form!: FormGroup;

  // Methods
  ngOnInit() {
    this.pageHeaderService.updatePageHeader(false);
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
