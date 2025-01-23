import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sdss-textarea',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaDirective),
      multi: true,
    },
  ],
})
export class TextareaDirective implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  private _value: number | undefined;

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
  listenForValueChange(value: number | undefined) {
    this.value = value;
  }

  writeValue(value: number | undefined) {
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
