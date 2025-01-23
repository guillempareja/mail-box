import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sdss-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxDirective),
      multi: true,
    },
  ],
})
export class CheckboxDirective implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  private _value: any;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = !this._value;
    this.onChange(this._value);
    this.onTouched();
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  listenForValueChangeBtn(value: any) {
    this.value = value;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
