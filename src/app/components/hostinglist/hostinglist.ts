
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Socials = {
  website?: string; youtube?: string; instagram?: string; tiktok?: string;
  facebook?: string; meetup?: string; linkedin?: string;
};
type Offering = { title: string; date?: string; price?: number; image?: string; description?: string; };

@Component({
  selector: 'app-hostinglist',
  imports: [CommonModule],
  templateUrl: './hostinglist.html',
  styleUrl: './hostinglist.scss'
})
export class Hostinglist {
  // ✅ same content you shared earlier
  profile = {
    pageTitle: 'Full Listing',
    orgTitle: 'ABCTEST',
    about: `There are many variations of passages of Lorem Ipsum available, but the majority have 
    suffered alteration in some form, by injected humour, or randomised words which don't look even 
    slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there 
    isn't anything embarrassing hidden in the middle of text.`,
    contact: { website: 'https://www.example.com', email: 'vineeth.dev01@gmail.com', phone: '123456789' },
    person: {
      name: 'Pavan',
      avatar: '/images/mans.jpg',
      languages: ['French', 'Hindi', 'Indonesian', 'Japanese', 'Mandarin Chinese'],
      country: 'United States'
    },
    serviceList: ['Service List 1','Service List 2','Service List 3','Service List 4','Service List 5','Service List 6'],
    socials: <Socials>{
      website:'https://devconnected888.org',
      youtube:'https://devconnected888.org',
      instagram:'https://devconnected888.org',
      tiktok:'https://devconnected888.org',
      facebook:'https://devconnected888.org',
      meetup:'https://devconnected888.org',
      linkedin:'https://devconnected888.org',
    },
    offerings: <Offering[]>[
      { title:'Energy Clearing', date:'2025-09-10', price:10, image:'', description:`Cleanse and realign the energy field.` },
      { title:'Sound Healing Session', date:'2025-09-10', price:20, description:`Crystal bowls & soothing frequencies.` },
      { title:'Reading session', date:'2025-01-09', price:35, description:`Intuitive reading with practical next steps.` }
    ]
  };

  // ------- helpers (so we can render sliders/bars without new fields) -------
  get role(): string { return this.profile.serviceList?.[0] || 'Practitioner'; }

  // Use service names as “motivations”; deterministic 30–95% width
  get motivations() {
    const take = this.profile.serviceList.slice(0, 5);
    const val = (s: string) =>
      30 + (Array.from(s).reduce((a, c) => a + c.charCodeAt(0), 0) % 66); // 30..95
    return take.map(label => ({ label, value: val(label) }));
  }

  // Simple personality poles (0..100) derived from name + country
  get personality() {
    const seed = (txt: string) => Array.from(txt || '').reduce((a, c) => a + c.charCodeAt(0), 0) % 101;
    const a = seed(this.profile.person.name);
    const b = seed(this.profile.person.country);
    const c = seed((this.profile.serviceList[0] || ''));
    return [
      { left: 'Introvert', right: 'Extrovert', value: a },
      { left: 'Analytical', right: 'Creative', value: b },
      { left: 'Calm', right: 'Bold', value: c }
    ];
  }

  // Goals from offerings (top 3)
  get goals() {
    return this.profile.offerings.slice(0, 3).map(o => `To offer ${o.title.toLowerCase()} regularly`);
  }

  // Spicy but generic frustrations (you can replace later)
  frustrations = [
    'Too many steps to book',
    'Not enough available time slots',
    'People are curious but don’t know the process'
  ];

  // Favourite “brands” mapped from socials present
  get brands() {
    const s = this.profile.socials;
    const items: {icon:string; label:string; link?:string}[] = [];
    if (s.youtube)   items.push({ icon:'bi-youtube',   label:'YouTube',   link:s.youtube });
    if (s.instagram) items.push({ icon:'bi-instagram', label:'Instagram', link:s.instagram });
    if (s.tiktok)    items.push({ icon:'bi-tiktok',    label:'TikTok',    link:s.tiktok });
    if (s.facebook)  items.push({ icon:'bi-facebook',  label:'Facebook',  link:s.facebook });
    if (s.linkedin)  items.push({ icon:'bi-linkedin',  label:'LinkedIn',  link:s.linkedin });
    if (s.website)   items.push({ icon:'bi-globe2',    label:'Website',   link:s.website });
    if (s.meetup)    items.push({ icon:'bi-people',    label:'Meetup',    link:s.meetup });
    return items;
  }
}
