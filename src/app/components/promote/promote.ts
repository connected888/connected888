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
   
  }

 
}
