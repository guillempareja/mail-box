import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  // Models
  public show = model(false);

  // Inputs
  public title = input.required<string>();
  public text = input('');
  public acceptOnly = input(false);
  public autoClose = input(true);

  // Ouputs
  public onConfirm = output<boolean>();

  // Methods
  public close(): void {
    this.show.set(false);
    this.onConfirm.emit(false);
  }

  public confirm(): void {
    if (this.autoClose()) {
      this.show.set(false);
    }
    this.onConfirm.emit(true);
  }
}
