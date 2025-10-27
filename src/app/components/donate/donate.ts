import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DonateService } from '../../donate-service';

@Component({
  selector: 'app-donate',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './donate.html',
  styleUrl: './donate.scss'
})
export class Donate implements OnInit{
constructor(private service:DonateService){}
  ngOnInit(){
    this.getdata();
  }

  donateForm=new FormGroup(
  {
    name : new FormControl(null,Validators.required),
    email : new FormControl(null,[Validators.required,Validators.email]),
    amount : new FormControl(null,Validators.required)
  }
  )
  data:any=null
  getdata(){
  this.service.getData().subscribe({
      next: (res:any) => {
        console.log("API Response:", res);
        this.data = res;
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }
submit()
{
  console.log("Thank you for Donating")
  console.log(this.donateForm.controls.name.value)
  console.log(this.donateForm.controls.email.value)
  console.log(this.donateForm.controls.amount.value)
}
}
