import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { createFocusTrap, FocusTrap } from 'focus-trap';

@Component({
  selector: 'modal',
  imports: [TranslatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  // Models
  public show = model(false);

  // Viewchilds
  private modal = viewChild<ElementRef>('modal');

  // Inputs
  public title = input.required<string>();
  public text = input('');
  public acceptOnly = input(false);
  public autoClose = input(true);

  // Ouputs
  public confirm = output<boolean>();

  // Data
  private focusTrapInstance!: FocusTrap;

  // Effects
  syncFocusTrapEffect = effect(() => {
    const container = this.modal()?.nativeElement;

    if (!container) {
      this.focusTrapInstance?.deactivate();
      return;
    }

    this.focusTrapInstance = createFocusTrap(container, {
      tabbableOptions: { getShadowRoot: true },
    });
    this.focusTrapInstance.activate();
  });

  // Methods
  public close(): void {
    this.show.set(false);
    this.confirm.emit(false);
  }

  public onConfirm(): void {
    if (this.autoClose()) {
      this.show.set(false);
    }
    this.confirm.emit(true);
  }
}
