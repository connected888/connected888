import { CommonModule } from '@angular/common';
import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import {
    TranslateService,

} from "@ngx-translate/core";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, CommonModule, NgxSpinnerModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Connected888');

constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }




  
}
