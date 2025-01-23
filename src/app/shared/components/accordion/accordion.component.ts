import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionComponent {
  // Models
  public open = model(false);

  // Inputs
  public titleContentSpacer = input(true, { transform: booleanAttribute });
  public title = input('');
  public content = input('');

  // Methods
  public toggleOpen(): void {
    this.open.update((value) => !value);
  }
}
