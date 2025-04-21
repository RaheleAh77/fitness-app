import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTrainingModalComponent } from './stop-training-modal.component';

describe('StopTrainingModalComponent', () => {
  let component: StopTrainingModalComponent;
  let fixture: ComponentFixture<StopTrainingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopTrainingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopTrainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
