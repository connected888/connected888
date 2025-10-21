import { Component, HostListener, Input, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import Collapse from 'bootstrap/js/dist/collapse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit {
  @Input() brand = 'Connected888';
  isScrolled = false;
  langName:any = 'English';

  private collapseInstance?: Collapse;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  languages = [
  { code: 'ar', label: 'Arabic' },
  { code: 'bn', label: 'Bengali' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'hi', label: 'Hindi' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'zh', label: 'Mandarin Chinese' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ru', label: 'Russian' },
  { code: 'es', label: 'Spanish' },
  { code: 'ur', label: 'Urdu' },
  { code: 'vi', label: 'Vietnamese' }
];

  

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 6; }

  switchLanguage(langs: any) {
    this.langName = langs ? langs.label : 'English';
    let lang:any = langs ? langs.code : 'en'; 
    this.translate.use(lang);
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  }

  ngAfterViewInit(): void {
    const navEl = document.getElementById('navMain');
    if (navEl) {
      this.collapseInstance = new Collapse(navEl, { toggle: false });
    }
  }

  toggleNav() {
    const el = document.getElementById('navMain');
    if (!el) return;
    // use the imported Collapse API, not window.bootstrap
    const inst = this.collapseInstance ?? Collapse.getOrCreateInstance(el, { toggle: false });
    inst.toggle();
  }

  closeNav() {
    const el = document.getElementById('navMain');
    if (!el) return;
    const inst = this.collapseInstance ?? Collapse.getOrCreateInstance(el, { toggle: false });
    inst.hide();
  }
}
