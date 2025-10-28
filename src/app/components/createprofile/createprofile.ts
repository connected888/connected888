// src/app/createprofile/createprofile.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-createprofile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createprofile.html',
  styleUrl: './createprofile.scss',
})
export class Createprofile implements OnDestroy {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    organizationName: [''],

    languages: [[] as string[]],
    country: [''],

    email: [''],
    showEmail: [false],
    phone: [''],
    showPhone: [false],

    avatar: [null as null | { name: string; size: number; type: string }],

    socials: this.fb.group({
      website: [''],
      youtube: [''],
      instagram: [''],
      tiktok: [''],
      facebook: [''],
      meetup: [''],
      linkedin: [''],
    }),

    sectionTitle: [''],
    sectionDescription: [''],

    serviceList: this.fb.array(Array.from({ length: 6 }, () => this.fb.control(''))),

    images: this.fb.array([this.fb.control(null), this.fb.control(null), this.fb.control(null)]),

    services: this.fb.array([
      this.fb.group({ title: [''], link: [''], date: [''], price: [''], description: [''] }),
      this.fb.group({ title: [''], link: [''], date: [''], price: [''], description: [''] }),
      this.fb.group({ title: [''], link: [''], date: [''], price: [''], description: [''] }),
    ]),

    closing: [''],
  });

  get serviceList(): FormArray { return this.form.get('serviceList') as FormArray; }
  get images(): FormArray { return this.form.get('images') as FormArray; }
  get services(): FormArray { return this.form.get('services') as FormArray; }

  avatarPreview: string | null = null;
  servicePreviews: string[] = ['', '', ''];

  private revoke(url?: string) { if (url) URL.revokeObjectURL(url); }

  onAvatarChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (this.avatarPreview) this.revoke(this.avatarPreview);

    if (file) {
      this.form.patchValue({ avatar: { name: file.name, size: file.size, type: file.type } });
      this.avatarPreview = URL.createObjectURL(file);
    } else {
      this.form.patchValue({ avatar: null });
      this.avatarPreview = null;
    }
  }

  clearAvatar() {
    if (this.avatarPreview) this.revoke(this.avatarPreview);
    this.avatarPreview = null;
    this.form.patchValue({ avatar: null });
  }

  onServiceImageChange(index: number, ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (this.servicePreviews[index]) this.revoke(this.servicePreviews[index]);

    this.images.at(index).setValue(file ? { name: file.name, size: file.size, type: file.type } : null);
    this.servicePreviews[index] = file ? URL.createObjectURL(file) : '';
  }

  onSubmit() {
    console.clear();
    console.log('%cCreateProfile payload', 'color:#1da3dd;font-weight:700');
    console.log(this.form.value);
    this.form.reset();
    this.clearAvatar();
  }

  ngOnDestroy(): void {
    this.revoke(this.avatarPreview || undefined);
    this.servicePreviews.forEach(u => this.revoke(u));
  }

  trackByIndex = (i: number) => i;
}
