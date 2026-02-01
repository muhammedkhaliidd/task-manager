import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { CustomDatePicker } from './custom-date-picker';

describe('CustomDatePicker', () => {
  let component: CustomDatePicker;
  let fixture: ComponentFixture<CustomDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDatePicker);
    component = fixture.componentInstance;
    component.control = new FormControl<Date | null>(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
