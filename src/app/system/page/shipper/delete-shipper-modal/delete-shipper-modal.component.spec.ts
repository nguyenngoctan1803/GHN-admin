import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShipperModalComponent } from './delete-shipper-modal.component';

describe('DeleteShipperModalComponent', () => {
  let component: DeleteShipperModalComponent;
  let fixture: ComponentFixture<DeleteShipperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShipperModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShipperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
