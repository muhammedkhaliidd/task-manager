import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivityOverlayService } from './activity-overlay.service';

describe('ActivityOverlayService', () => {
  let service: ActivityOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityOverlayService, provideRouter([])],
    });
    service = TestBed.inject(ActivityOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isOpen initial value false', () => {
    expect(service.isOpen()).toBe(false);
  });

  it('should toggle isOpen when toggle is called', () => {
    service.toggle();
    expect(service.isOpen()).toBe(true);
    service.toggle();
    expect(service.isOpen()).toBe(false);
  });

  it('should set isOpen to true when open is called', () => {
    service.open();
    expect(service.isOpen()).toBe(true);
  });

  it('should set isOpen to false when close is called', () => {
    service.open();
    service.close();
    expect(service.isOpen()).toBe(false);
  });
});
