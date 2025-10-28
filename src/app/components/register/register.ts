import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Api } from '../../services/api';
declare var bootstrap: any; 

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {

   loading = false; error = ''; success = ''; showPayModal = false;
  private stripe?: Stripe; private elements?: StripeElements;
  private clientSecret?: string; private paymentIntentId?: string;

  countries:any = [];

  form;

  constructor(private fb: FormBuilder, private http: HttpClient,private api:Api) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['US', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
      waiverAccepted: [false, Validators.requiredTrue],
      option: ['FREE', Validators.required], // FREE | FIXED | CUSTOM
      customAmount: [{ value: null, disabled: true }]
    });
  }


  ngOnInit() {
  // enable/disable customAmount based on option
  this.form.get('option')?.valueChanges.subscribe(value => {
    const control = this.form.get('customAmount');
    if (value === 'CUSTOM') {
      control?.enable();
    } else {
      control?.disable();
      control?.setValue(null); // optional: clear previous value
    }
  });

  this.getCountrys();
  
}


getCountrys(){
   this.api.getCountries().subscribe(data => this.countries = data);
   console.log(this.countries);
}



  amountInCents(): number {
    if (this.form.value.option === 'FIXED') return 888; // $8.88
    if (this.form.value.option === 'CUSTOM') {
      const v = Number(this.form.value.customAmount || 0);
      return Math.round(v * 100);
    }
    return 0;
    }

  async onSubmit() {
    this.error=''; this.success='';
    if (this.form.invalid) { this.error='Please complete required fields.'; return; }

    if (this.form.value.option === 'FREE') return this.finalSubmit(null);

    const cents = this.amountInCents();
    if (!cents || cents < 100) { this.error = 'Min donation is $1.00'; return; }

    try {
      this.loading = true;
      const intent = await this.http.post<{clientSecret:string,paymentIntentId:string}>(
        `${environment.apiUrl}api/v1/registers/intent`, { amount: cents, currency: 'usd' }).toPromise();

      this.clientSecret = intent!.clientSecret;
      this.paymentIntentId = intent!.paymentIntentId;

      this.showPayModal = true;                       // show popup first
      await this.ensureStripeLoaded();
      setTimeout(() => this.mountPaymentElement(), 0); // mount after visible
    } catch { this.error = 'Failed to start payment.'; }
    finally { this.loading = false; }
  }

  private async ensureStripeLoaded() { 
    const stripeInstance = await loadStripe(environment.stripePk);
    if (stripeInstance) {
      this.stripe = stripeInstance;
    } else {
      throw new Error('Failed to load Stripe.');
    }
  }
  private mountPaymentElement() {
    this.elements = this.stripe!.elements({ clientSecret: this.clientSecret! });
    this.elements.create('payment', { layout: 'tabs' }).mount('#payment-element');
  }

  closeModal() { this.showPayModal = false; this.clientSecret = undefined; this.paymentIntentId = undefined; }

  async confirmPayment() {
    this.loading = true; this.error='';
    const { error } = await this.stripe!.confirmPayment({ elements: this.elements!, redirect: 'if_required' });
    if (error) { this.error = error.message || 'Payment failed.'; this.loading=false; return; }
    this.showPayModal = false;
    await this.finalSubmit(this.paymentIntentId!);
    this.loading=false;
  }

  async finalSubmit(paymentIntentId: string | null) {
    const body = { ...this.form.getRawValue(), amount: this.amountInCents(), currency: 'usd', paymentIntentId };
    try {
      this.loading = true;
      const res:any = await this.http.post(`${environment.apiUrl}api/v1/registers/submit`, body).toPromise();
      this.success = (res.status === 'paid' || res.status === 'registered') ? 'Registration completed!' : 'Submitted.';
      if(this.success === 'Registration completed!') this.showThankYouModal();
      this.form.reset({ option:'FREE', termsAccepted:false, waiverAccepted:false });
    } catch (e:any) {
      this.error = e?.error?.error || 'Could not submit registration.';
    } finally { this.loading = false; }
  }


  openTermsModal(event: Event) {
    event.preventDefault(); // prevent checkbox toggle
    const modalElement = document.getElementById('termsModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openWaiverModal(event: Event) {
    event.preventDefault();
    const modalElement = document.getElementById('waiverModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }


  showThankYouModal() {
    const modalEl = document.getElementById('thankYouModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }



  carouselImages = [
  {
    src: 'assets/images/login/slide-1.jpg',
    alt: 'City waterfront living',
    title: 'Find Your Sweet Home',
    caption: 'Schedule visits in just a few clicks'
  },
  {
    src: 'assets/images/login/slide-2.jpg',
    alt: 'Modern interior',
    title: 'Curated Homes',
    caption: 'Verified listings with transparent info'
  },
  {
    src: 'assets/images/login/slide-3.jpg',
    alt: 'Neighborhood park',
    title: 'Great Neighborhoods',
    caption: 'Live near what you love'
  }
];


}
