import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmethodIndexComponent } from './paymentmethod-index.component';

describe('PaymentmethodIndexComponent', () => {
  let component: PaymentmethodIndexComponent;
  let fixture: ComponentFixture<PaymentmethodIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentmethodIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmethodIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
