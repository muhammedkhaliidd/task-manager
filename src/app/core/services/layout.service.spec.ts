import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService],
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have drawerOpened initial value false', () => {
    expect(service.drawerOpened()).toBe(false);
  });

  it('should open drawer when openDrawer is called', () => {
    service.openDrawer();
    expect(service.drawerOpened()).toBe(true);
  });

  it('should close drawer when closeDrawer is called', () => {
    service.openDrawer();
    service.closeDrawer();
    expect(service.drawerOpened()).toBe(false);
  });

  it('should toggle drawer when toggleDrawer is called', () => {
    service.toggleDrawer();
    expect(service.drawerOpened()).toBe(true);
    service.toggleDrawer();
    expect(service.drawerOpened()).toBe(false);
  });

  it('should set drawer state when setDrawerOpened is called', () => {
    service.setDrawerOpened(true);
    expect(service.drawerOpened()).toBe(true);
    service.setDrawerOpened(false);
    expect(service.drawerOpened()).toBe(false);
  });
});
