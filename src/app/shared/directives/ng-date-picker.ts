import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sdss-datepicker',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerDirective),
      multi: true,
    },
  ],
})
export class DatePickerDirective implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  private _value: string | undefined;

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(this._value);
      this.onTouched();
      this.elementRef.nativeElement.value = val;
    }
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  listenForValueChange(value: string | undefined) {
    this.value = value;
  }

  @HostListener('click', ['$event.target.value'])
  listenForValueChangeBtn(value: string | undefined) {
    this.value = value;
  }

  @HostListener('value-changed', ['$event'])
  onValueChanged(event: CustomEvent) {
    const newValue = event.detail;
    this.onChange(newValue);
  }

  writeValue(value: string | undefined) {
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
