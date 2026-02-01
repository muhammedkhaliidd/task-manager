import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivityOverlay } from './activity-overlay';
import { ActivityOverlayService } from '../../services/activity-overlay.service';

describe('ActivityOverlay', () => {
  let component: ActivityOverlay;
  let fixture: ComponentFixture<ActivityOverlay>;
  let service: ActivityOverlayService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityOverlay],
    }).compileComponents();

    service = TestBed.inject(ActivityOverlayService);
    fixture = TestBed.createComponent(ActivityOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close on service when backdrop is clicked', () => {
    service.open();
    fixture.detectChanges();
    spyOn(service, 'close');
    const backdrop = fixture.debugElement.query(
      By.css('[aria-label="Close activity panel"]'),
    );
    expect(backdrop).toBeTruthy();
    backdrop.triggerEventHandler('click', null);
    expect(service.close).toHaveBeenCalled();
  });
});
