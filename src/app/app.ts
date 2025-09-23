import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet ,Event, Router} from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import {
    TranslateService,

} from "@ngx-translate/core";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, CommonModule, NgxSpinnerModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
   hideLayout = false;
  protected readonly title = signal('Connected888');

constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');

 this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // ✅ type guard
      )
      .subscribe((event: NavigationEnd) => {
        this.hideLayout = event.urlAfterRedirects.startsWith('/hostinglist');
      });


  }



  }




  

