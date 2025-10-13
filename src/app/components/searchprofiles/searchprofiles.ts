
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
  avatar?: string; // optional image url
  ribbon?: string; // optional ribbon text
  coverColor?: string; // optional cover color (hex)
  coverImage?: string; // optional cover image url
};

@Component({
  selector: 'app-searchprofiles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchprofiles.html',
  styleUrl: './searchprofiles.scss'
})
export class Searchprofiles implements OnInit{
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
    bio: 'Sophie is a holistic practitioner with over 10 years of experience in energy healing, mindfulness, and sound therapy. Her sessions are known for deep relaxation and emotional balance. She believes in creating a safe, compassionate space for all her clients.',
    avatar: 'images/p1.jpg',
    coverImage: 'images/c1.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p2',
    name: 'Pavan',
    country: 'India',
    services: ['Healer', 'Shaman', 'Alchemist'],
    email: 'vineeth.dev01@gmail.com',
    phone: '123457889',
    bio: 'Healing is the journey inward toward wholeness.',
    avatar: 'images/p5.jpg',
    coverImage: 'images/c2.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p3',
    name: 'John Appleseed',
    country: 'France',
    services: ['Shaman', 'Healer'],
    bio: 'John specializes in plant-based healing and ancient spiritual practices passed down for generations. His approach blends intuition, energy reading, and natural remedies for holistic well-being.',
    avatar: 'images/p6.jpg',
    coverImage: 'images/c3.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p4',
    name: 'Emily Carter',
    country: 'Canada',
    services: ['Therapy', 'Yoga'],
    email: 'emily.carter@example.com',
    phone: '987654321',
    bio: 'Passionate about helping others find balance. Emily integrates movement, meditation, and breathwork into her healing sessions.',
    avatar: 'images/p4.jpg',
    coverImage: 'images/c4.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p5',
    name: 'Liam Smith',
    country: 'Australia',
    services: ['Reiki', 'Sound Healer'],
    email: 'liam.smith@example.com',
    phone: '456123789',
    bio: 'Energy healing for a better life. Liam’s focus is on restoring the natural flow of energy through music, vibration, and crystal resonance therapy.',
    avatar: 'images/p3.jpg',
    coverImage: 'images/c3.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p6',
    name: 'Sophia Johnson',
    country: 'United Kingdom',
    services: ['Guide Meditation', 'Aroma'],
    email: 'sophia.johnson@example.com',
    phone: '321654987',
    bio: 'Guiding you to inner peace. Sophia’s meditation sessions combine mindfulness with aromatherapy to elevate awareness and relaxation.',
    avatar: 'images/p4.jpg',
    coverImage: 'images/c2.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p7',
    name: 'Ethan Brown',
    country: 'Germany',
    services: ['Shaman', 'Healer'],
    email: 'ethan.brown@example.com',
    phone: '654987321',
    bio: 'Ethan works deeply with ancestral healing and sacred rituals. His work helps people reconnect with their roots and release emotional blockages that prevent spiritual growth.',
    avatar: 'images/p5.jpg',
    coverImage: 'images/c1.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC'
  },
  {
    id: 'p8',
    name: 'Olivia Davis',
    country: 'Italy',
    services: ['Yoga', 'Therapy'],
    email: 'olivia.davis@example.com',
    phone: '789123456',
    bio: 'Helping you find your inner strength. Olivia’s classes are tailored for both beginners and experienced students seeking alignment between body and mind.',
    avatar: 'images/p6.jpg',
    coverImage: 'images/c4.jpg',
    ribbon: 'Practitioner',
    coverColor: '#9999CC'
  },
  {
    id: 'p9',
    name: 'Noah Wilson',
    country: 'Spain',
    services: ['Reiki', 'Aroma'],
    email: 'noah.wilson@example.com',
    phone: '123789456',
    bio: 'Noah blends Reiki with essential oils to restore emotional clarity. His approach helps people find stillness in the chaos of everyday life.',
    avatar: 'images/p7.jpg',
    coverImage: 'images/c2.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC'
  },
  {
    id: 'p10',
    name: 'Ava Martinez',
    country: 'Mexico',
    services: ['Sound Healer', 'Guide Meditation'],
    email: 'ava.martinez@example.com',
    phone: '987321654',
    bio: 'Bringing harmony to your life. Ava has been facilitating meditation circles and sound baths using crystal singing bowls for over a decade. Her sessions are deeply restorative, allowing participants to access their inner calm and creativity.',
    avatar: 'images/p2.jpg',
    coverImage: 'images/c3.jpg',
    ribbon: 'Volunteer',
    coverColor: '#9999CC'
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
    perPage: [6],
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
    this.form.reset({ q: '', services: [], country: '', perPage: 6 });
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
