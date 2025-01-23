import { Directive, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sdss-dropdown',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownDirective),
      multi: true,
    },
  ],
})
export class DropdownDirective implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  private _value: any;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  @HostListener('click', ['$event.target.value'])
  listenForValueChangeBtn(value: any) {
    this.value = value;
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
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
