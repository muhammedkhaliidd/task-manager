import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CustomTextarea } from './custom-textarea';

describe('CustomTextarea', () => {
  let component: CustomTextarea;
  let fixture: ComponentFixture<CustomTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomTextarea);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
