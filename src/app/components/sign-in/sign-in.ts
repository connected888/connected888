import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,                               // <-- IMPORTANT
  imports: [CommonModule, ReactiveFormsModule],    // <-- Add CommonModule
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss'                       // ok in Angular 17+; use styleUrls: ['...'] if older
})
export class SignIn implements OnDestroy {
  step = 1;
  loading = false;
  error: string | null = null;
  notice: string | null = null;

  resendIn = 0;
  expiresIn = 0;
  private ticker$?: Subscription;
  emailForm!: FormGroup;
  otpForm!: FormGroup;

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });
  }


  get email() { return this.emailForm.get('email')!; }
  get otp()   { return this.otpForm.get('otp')!; }

  requestOtp() {
    if (this.emailForm.invalid) return;
    this.loading = true; this.error = null; this.notice = null;

    setTimeout(() => {
      this.loading = false;
      this.step = 2;                                 // show OTP step
      this.notice = 'OTP sent to your email.';
      this.startTimers(30, 180);
    }, 700);
  }

  resendOtp() {
    if (this.resendIn > 0 || this.loading) return;
    this.loading = true; this.error = null; this.notice = null;
    setTimeout(() => { this.loading = false; this.notice = 'New OTP sent.'; this.resendIn = 30; }, 600);
  }

  verifyOtp() {
    if (this.otpForm.invalid) return;
    this.loading = true; this.error = null; this.notice = null;
    setTimeout(() => {
      this.loading = false;
      if (this.otp.value === '123456') { 
        this.notice = 'OTP verified. Signing you in...';
        this.router.navigate(['/create-profile'])
        ; this.clearTimers(); }
      else { this.error = 'Invalid code. Please try again.'; }
    }, 700);
  }

  editEmail() { this.clearTimers(); this.step = 1; this.notice = null; this.otpForm.reset(); }
  goToApp() { /* navigate to dashboard */ }

  private startTimers(resendSeconds: number, expirySeconds: number) {
    this.resendIn = resendSeconds; this.expiresIn = expirySeconds;
    this.clearTimers();
    this.ticker$ = interval(1000).subscribe(() => {
      if (this.resendIn > 0) this.resendIn--;
      if (this.expiresIn > 0) this.expiresIn--;
      if (this.expiresIn === 0) this.error = 'Code expired. Please resend a new OTP.';
    });
  }

  private clearTimers() { this.ticker$?.unsubscribe(); this.ticker$ = undefined; }
  ngOnDestroy() { this.clearTimers(); }
}
