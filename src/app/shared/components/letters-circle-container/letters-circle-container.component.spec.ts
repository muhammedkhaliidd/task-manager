import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersCircleContainerComponent } from './letters-circle-container.component';

describe('LettersCircleContainerComponent', () => {
  let component: LettersCircleContainerComponent;
  let fixture: ComponentFixture<LettersCircleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LettersCircleContainerComponent],
    });
    fixture = TestBed.createComponent(LettersCircleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
