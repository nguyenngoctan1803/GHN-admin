import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShipperModalComponent } from './update-shipper-modal.component';

describe('UpdateShipperModalComponent', () => {
  let component: UpdateShipperModalComponent;
  let fixture: ComponentFixture<UpdateShipperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShipperModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShipperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
