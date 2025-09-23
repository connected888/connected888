
import { Component, inject } from '@angular/core';
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
};

@Component({
  selector: 'app-searchprofiles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchprofiles.html',
  styleUrl: './searchprofiles.scss'
})
export class Searchprofiles {
  private fb = inject(FormBuilder);

  // ---- MOCK DATA (replace with API later) ----
  private MOCK: Profile[] = [
    {
      id: 'p1',
      name: 'TestMe',
      country: 'United States',
      services: ['Alchemist'],
      email: 'dev@connected888.org',
      phone: '123456789',
      website: 'https://dev.connected888.org/volunteerprofile.html',
      bio: 'In user interfaces, a "logo user profile" generally refers to the visual element…',
      avatar: '/images/sound.avif'
    },
    {
      id: 'p2',
      name: 'Pavan',
      country: 'India',
      services: ['Healer', 'Shaman', 'Alchemist'],
      email: 'vineeth.dev01@gmail.com',
      phone: '123457889',
      website: '',
      bio: 'There are many variations of passages of Lorem Ipsum available…',
      avatar: '/images/man.jpg'
    },
    {
      id: 'p3',
      name: 'LqsMuUl',
      country: 'UAE',
      services: ['Tarot'],
      email: 'mathdowsjeanb@gmail.com',
      phone: '0755107982',
      website: '',
      bio: 'Light description about practitioner and modality.',
      avatar: '/images/sound.avif'
    },
    {
      id: 'p4',
      name: 'Test',
      country: 'France',
      services: ['Shaman', 'Healer'],
      email: 'contact@example.com',
      phone: '',
      website: '',
      bio: 'Short bio for showcase.',
      avatar: '/images/man.jpg'
    }
    ,
    {
      id: 'p5',
      name: 'Jon Doe',
      country: 'India',
      services: ['Healer', 'Shaman', 'Alchemist'],
      email: 'vineeth.dev01@gmail.com',
      phone: '123457889',
      website: '',
      bio: 'There are many variations of passages of Lorem Ipsum available…',
     avatar: '/images/sound.avif'
    },
    {
      id: 'p6',
      name: 'Smith',
      country: 'UAE',
      services: ['Tarot'],
      email: 'mathdowsjeanb@gmail.com',
      phone: '0755107982',
      website: '',
      bio: 'Light description about practitioner and modality.',
      avatar: '/images/mans.jpg'
    },
    {
      id: 'p7',
      name: 'John Appleseed',
      country: 'France',
      services: ['Shaman', 'Healer'],
      email: 'contact@example.com',
      phone: '',
      website: '',
      bio: 'Short bio for showcase.',
      avatar: '/images/man.jpg'
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

    this.apiService.getUsers().subscribe(users => {
      console.log('Fetched users from API:', users);
      // You can replace MOCK data with fetched users if the structure matches
      // this.MOCK = users; // Uncomment if API data structure matches Profile type
    });
  }

  // ---- Filters & pagination ----
  form = this.fb.group({
    q: [''],
    services: [[] as string[]],
    country: [''],
    perPage: [12],
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
      const per = Number(f.perPage || 12);
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
    this.form.reset({ q: '', services: [], country: '', perPage: 12 });
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
