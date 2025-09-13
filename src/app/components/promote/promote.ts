import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
  NonNullableFormBuilder
} from '@angular/forms';

type PromoteForm = {
  orgName: FormControl<string>;
  contactName: FormControl<string>;
  contactEmail: FormControl<string>;
};

@Component({
  selector: 'app-promote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './promote.html',
  styleUrls: ['./promote.scss']
})
export class Promote implements OnInit {
  form!: FormGroup<PromoteForm>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      orgName: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
      contactName: this.fb.control('', { validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z .'-]{1,}$/)] }),
      contactEmail: this.fb.control('', { validators: [Validators.required, Validators.email] })
    });
  }

  get f(): PromoteForm { return this.form.controls; }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    console.log('Promote payload', this.form.getRawValue());
    alert('Submitted!');
  }
}
