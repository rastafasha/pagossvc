import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmethodEditComponent } from './paymentmethod-edit.component';

describe('PaymentmethodEditComponent', () => {
  let component: PaymentmethodEditComponent;
  let fixture: ComponentFixture<PaymentmethodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentmethodEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmethodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
