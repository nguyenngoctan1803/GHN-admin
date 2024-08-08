import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChargeModalComponent } from './confirm-charge-modal.component';

describe('ConfirmChargeModalComponent', () => {
  let component: ConfirmChargeModalComponent;
  let fixture: ComponentFixture<ConfirmChargeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmChargeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmChargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
