import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmethodCrearComponent } from './paymentmethod-crear.component';

describe('PaymentmethodCrearComponent', () => {
  let component: PaymentmethodCrearComponent;
  let fixture: ComponentFixture<PaymentmethodCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentmethodCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmethodCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
