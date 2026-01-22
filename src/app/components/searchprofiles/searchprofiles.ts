
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { Api } from '../../services/api';
type Profile = {
  id: string;
  name: string;
  country: string;
  services: string[];
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  avatar?: string;       // optional image url
  ribbon?: string;       // optional ribbon text
  coverColor?: string;   // optional cover color (hex)
  coverImage?: string; 
  defaultcoverImage?: string;   // optional cover image url

  // 🆕 Social links (optional)
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
};


@Component({
  selector: 'app-searchprofiles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchprofiles.html',
  styleUrl: './searchprofiles.scss'
})
export class Searchprofiles implements OnInit{
[x: string]: any;
  private fb = inject(FormBuilder);

  // ---- MOCK DATA (replace with API later) ----
private MOCK: Profile[] = [
  {
    id: 'p1',
    name: 'Sophie Bennett',
    country: 'United States',
    services: ['Yoga', 'Sound Healer', 'Reiki', 'Guide Meditation', 'Therapy', 'Aroma'],
    email: 'sophie@example.com',
    phone: '123456789',
    website: 'https://example.com',
    bio: 'Sophie is a holistic practitioner with over 10 years of experience in energy healing, mindfulness, and sound therapy.',
    avatar: 'images/p1.jpg',
    coverImage: 'images/c1.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    linkedin: 'https://linkedin.com/in/sophie',
    instagram: 'https://instagram.com/sophie',
    twitter: 'https://twitter.com/sophie',
    facebook: 'https://facebook.com/sophie',
    youtube: 'https://youtube.com/@sophie'
  },
  {
    id: 'p2',
    name: 'Pavan',
    country: 'India',
    services: ['Healer', 'Shaman', 'Alchemist'],
    email: 'vineeth.dev01@gmail.com',
    phone: '123457889',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p5.jpg',
    coverImage: 'images/c2.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    linkedin: 'https://linkedin.com/in/pavan',
    instagram: 'https://instagram.com/pavan',
    facebook: 'https://facebook.com/pavan'
  },
  {
    id: 'p3',
    name: 'John Appleseed',
    country: 'France',
    services: ['Shaman', 'Healer'],
    bio: 'John specializes A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p6.jpg',
    coverImage: 'images/c3.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    twitter: 'https://twitter.com/johnapple',
    youtube: 'https://youtube.com/@johnapple'
  },
  {
    id: 'p4',
    name: 'Emily Carter',
    country: 'Canada',
    services: ['Therapy', 'Yoga'],
    email: 'emily.carter@example.com',
    phone: '987654321',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p4.jpg',
    coverImage: 'images/c4.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    linkedin: 'https://linkedin.com/in/emily',
    instagram: 'https://instagram.com/emilyyoga'
  },
  {
    id: 'p5',
    name: 'Liam Smith',
    country: 'Australia',
    services: ['Reiki', 'Sound Healer'],
    email: 'liam.smith@example.com',
    phone: '456123789',
    bio: 'Energy healing for a better life.',
    avatar: 'images/p3.jpg',
    coverImage: 'images/c3.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    youtube: 'https://youtube.com/@liamsound',
    instagram: 'https://instagram.com/liamvibes'
  },
  {
    id: 'p6',
    name: 'Sophia Johnson',
    country: 'United Kingdom',
    services: ['Guide Meditation', 'Aroma'],
    email: 'sophia.johnson@example.com',
    phone: '321654987',
    bio: 'Guiding you to inner peace.',
    avatar: 'images/p4.jpg',
    coverImage: 'images/c2.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    linkedin: 'https://linkedin.com/in/sophiaj',
    instagram: 'https://instagram.com/sophia.meditate'
  },
  {
    id: 'p7',
    name: 'Ethan Brown',
    country: 'Germany',
    services: ['Shaman', 'Healer'],
    email: 'ethan.brown@example.com',
    phone: '654987321',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p5.jpg',
    coverImage: 'images/c1.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC',
    facebook: 'https://facebook.com/ethanb',
    twitter: 'https://twitter.com/ethanhealer'
  },
  {
    id: 'p8',
    name: 'Olivia Davis',
    country: 'Italy',
    services: ['Yoga', 'Therapy'],
    email: 'olivia.davis@example.com',
    phone: '789123456',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p6.jpg',
    coverImage: 'images/c4.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC',
    instagram: 'https://instagram.com/oliviaflow'
  },
  {
    id: 'p9',
    name: 'Noah Wilson',
    country: 'Spain',
    services: ['Reiki', 'Aroma'],
    email: 'noah.wilson@example.com',
    phone: '123789456',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p7.jpg',
    coverImage: 'images/c2.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC',
    linkedin: 'https://linkedin.com/in/noahw',
    youtube: 'https://youtube.com/@noahreiki'
  },
  {
    id: 'p10',
    name: 'Ava Martinez',
    country: 'Mexico',
    services: ['Sound Healer', 'Guide Meditation'],
    email: 'ava.martinez@example.com',
    phone: '987321654',
    bio: 'A compassionate energy healer dedicated to helping others find harmony through yoga, meditation, Reiki, and therapeutic sound healing.',
    avatar: 'images/p2.jpg',
    coverImage: 'images/c3.jpg',
    defaultcoverImage:'images/defaultcover.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC',
    instagram: 'https://instagram.com/avaheals',
    youtube: 'https://youtube.com/@avameditate'
  }
];



  // derive option lists
  allCountries = Array.from(new Set(this.MOCK.map(p => p.country))).sort();
  allServices  = Array.from(new Set(this.MOCK.flatMap(p => p.services))).sort();

  // Simulated async fetch + eager skeleton
  loading$ = new BehaviorSubject(true);
  data$ = of(this.MOCK).pipe(
    // tiny delay via setTimeout in constructor
  );

  constructor( private apiService: Api) {
    // simulate network delay for skeleton
    setTimeout(() => this.loading$.next(false), 500);

 
  }
  ngOnInit(){
       this.apiService.getUsers().subscribe(users => {
      console.log('Fetched users from API:', users);
     
    });
  }

  // ---- Filters & pagination ----
  form = this.fb.group({
    q: [''],
    services: [[] as string[]],
    country: [''],
    perPage: [0],
  });

  page$ = new BehaviorSubject(1);

  private filtered$ = combineLatest([
    this.form.valueChanges.pipe(startWith(this.form.value), debounceTime(200)),
    of(this.MOCK)
  ]).pipe(
    map(([f, data]) => {
      let rows = data;

      // name text
      const q = (f.q || '').trim().toLowerCase();
      if (q) {
        rows = rows.filter(r =>
          r.name.toLowerCase().includes(q) ||
          (r.bio || '').toLowerCase().includes(q)
        );
      }

      // services (must contain all selected)
      const sel = (f.services || []) as string[];
      if (sel.length) {
        rows = rows.filter(r => sel.every(s => r.services.includes(s)));
      }

      // country
      if (f.country) rows = rows.filter(r => r.country === f.country);

      // stable sort: name
      rows = rows.slice().sort((a, b) => a.name.localeCompare(b.name));

      return rows;
    })
  );

  vm$ = combineLatest([this.filtered$, this.page$, this.form.valueChanges.pipe(startWith(this.form.value))]).pipe(
    map(([rows, page, f]) => {
      const per = Number(f.perPage || 6);
      const total = rows.length;
      const pages = Math.max(1, Math.ceil(total / per));
      const safePage = Math.min(Math.max(1, page), pages);
      const start = (safePage - 1) * per;
      const end = start + per;
      const slice = rows.slice(start, end);

      return {
        total,
        pages,
        page: safePage,
        perPage: per,
        startIndex: total ? start + 1 : 0,
        endIndex: Math.min(end, total),
        rows: slice
      };
    })
  );

  setPage(p: number) {
    this.page$.next(p);
    // scroll to top of results
    window?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearAll() {
    this.form.reset({ q: '', services: [], country: '', perPage: 0 });
    this.setPage(1);
  }

  toggleService(svc: string, ev: Event) {
    ev.preventDefault();
    const sel = new Set(this.form.value.services as string[]);
    sel.has(svc) ? sel.delete(svc) : sel.add(svc);
    this.form.patchValue({ services: Array.from(sel) });
    this.setPage(1);
  }

  trackById = (_: number, item: Profile) => item.id;



  fullListing() {
  window.open('/hostinglist', '_blank'); // opens in new tab
}
}
