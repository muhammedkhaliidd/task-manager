import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  let component: Skeleton;
  let fixture: ComponentFixture<Skeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(Skeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default number of lines', () => {
    const container = fixture.nativeElement.querySelector(
      '.skeleton-container',
    );
    expect(container?.children.length).toBe(3);
  });

  it('should render custom number of lines', () => {
    component.lines = 5;
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector(
      '.skeleton-container',
    );
    expect(container?.children.length).toBe(5);
  });

  it('getWidthPercent should return decreasing values', () => {
    expect(component.getWidthPercent(0)).toBe(100);
    expect(component.getWidthPercent(1)).toBe(88);
    expect(component.getWidthPercent(2)).toBe(76);
  });

  it('getWidthPercent should not go below 40', () => {
    expect(component.getWidthPercent(10)).toBe(40);
  });
});
