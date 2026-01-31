import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CustomSelect } from './custom-select';

describe('CustomSelect', () => {
  let component: CustomSelect;
  let fixture: ComponentFixture<CustomSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSelect);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
