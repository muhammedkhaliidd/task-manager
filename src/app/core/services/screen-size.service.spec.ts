import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenSizeService],
    });
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have breakpoint signal', () => {
    expect(service.breakpoint()).toBeDefined();
  });

  it('should have isMobile computed', () => {
    expect(service.isMobile()).toBeDefined();
    expect(typeof service.isMobile()).toBe('boolean');
  });

  it('should have isDesktop computed', () => {
    expect(service.isDesktop()).toBeDefined();
    expect(typeof service.isDesktop()).toBe('boolean');
  });

  it('should have isDesktop as opposite of isMobile', () => {
    expect(service.isDesktop()).toBe(!service.isMobile());
  });
});
