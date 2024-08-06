import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSuccessModalComponent } from './detail-success-modal.component';

describe('DetailSuccessModalComponent', () => {
  let component: DetailSuccessModalComponent;
  let fixture: ComponentFixture<DetailSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
