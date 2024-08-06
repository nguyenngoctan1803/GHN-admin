import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRefundModalComponent } from './detail-refund-modal.component';

describe('DetailRefundModalComponent', () => {
  let component: DetailRefundModalComponent;
  let fixture: ComponentFixture<DetailRefundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRefundModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRefundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
