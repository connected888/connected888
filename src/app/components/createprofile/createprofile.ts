// src/app/createprofile/createprofile.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-createprofile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createprofile.html',
  styleUrl: './createprofile.scss',
})
export class Createprofile {

  step = 1;
  totalSteps = 3;

  form:any;

  constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    // Step 1 – Personal Info
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    country: ['', Validators.required],
    language: ['', Validators.required],
    modality: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    headline: [''],
    statement: [''],

    // Step 2 – Contact Info
  contactEmail: ['', [Validators.required, Validators.email]],
  phone: [''],
  website: [''],

  youtube: [''],
  facebook: [''],
  linkedin: [''],
  instagram: [''],
  meetup: [''],
  tiktok: [''],

  footerStatement: [''],

    // Step 3 – Services
     services: this.fb.array([this.createService()]),

    // Images
    profilePhoto: [null],
    backgroundImage: [null]
  });

  }






  get progress(): number {
    return (this.step / this.totalSteps) * 100;
  }

  next() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }

  back() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submit() {
    console.log(this.form.value);
  }

  onFileSelect(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ [field]: file });
    }
  }



  get services(): FormArray {
  return this.form.get('services') as FormArray;
}

createService() {
  return this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: [''],
    endDate: [''],
    startTime: [''],
    endTime: [''],
    price: [''],
    scheduleUrl: [''],
    image: [null]
  });
}

addService() {
  this.services.push(this.createService());
}

removeService(i: number) {
  this.services.removeAt(i);
}

onServiceImageSelect(event: any, index: number) {
  const file = event.target.files[0];
  if (file) {
    this.services.at(index).patchValue({ image: file });
  }
  
 
}
}
