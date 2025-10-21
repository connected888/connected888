import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Row = {
  name: string;
  email: string;
  topic: string;
  city: string;
  detail: string;
  status: 'New'|'Read'|'In Process'|'Received'|'Rejected'|'Active';
  joined: string; // ISO date string
};

@Component({
  selector: 'app-registrations-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './registrations-list.html',
  styleUrl: './registrations-list.scss'
})
export class RegistrationsList implements OnInit {
  // Search/filter
  q = '';

  // Paging
  page = 1;
  pageSize = 8;
  pages: number[] = [];
  totalPages = 1;

  // Data
  rows: Row[] = [];
  filtered: Row[] = [];
  pageRows: Row[] = [];

  ngOnInit(): void {
    // mock rows — replace with API data
    this.rows = [
      { name:'AAA, Ltd', email:'aaa@example.com', topic:'UI/UX Design', city:'Hyderabad', detail:'Weekend events & onboarding', status:'New', joined:'2025-05-18' },
      { name:'Golden, Ltd', email:'golden@example.com', topic:'Web Dev', city:'Mumbai', detail:'Mentor for HTML/CSS bootcamps', status:'Read', joined:'2025-05-15' },
      { name:'Rush & Rise, Ltd', email:'rush@example.com', topic:'Fundraising', city:'Delhi', detail:'Donor outreach & calls', status:'In Process', joined:'2025-05-15' },
      { name:'Kidzone, Ltd', email:'kidzone@example.com', topic:'Community', city:'Pune', detail:'Kids events coordination', status:'Received', joined:'2025-05-15' },
      { name:'Dailywear, Ltd', email:'daily@example.com', topic:'UI/UX Design', city:'Chennai', detail:'Design system tokens', status:'Rejected', joined:'2025-05-15' },
      // …add more mock rows to see pagination
    ];
    // duplicate to 35 rows for demo
    this.rows = Array.from({length: 35}).map((_,i)=>({
      ...this.rows[i % this.rows.length],
      name: `${this.rows[i % this.rows.length].name} #${i+1}`
    }));

    this.applyFilters();
  }

  applyFilters() {
    const q = this.q.toLowerCase().trim();
    this.filtered = !q ? this.rows : this.rows.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
    this.page = 1;
    this.recalc();
  }

  setPageSize(n: number) {
    this.pageSize = n;
    this.page = 1;
    this.recalc();
  }

  go(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.recalc();
  }

  private recalc() {
    this.totalPages = Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    this.pageRows = this.filtered.slice(start, start + this.pageSize);

    // build 1 … N (cap to 7 numbers with ellipsis look if you want)
    const nums: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) nums.push(i);
    this.pages = nums.slice(0, 7); // simple cap; replace with smarter window if needed
  }

  onAdd() {
    // open modal or navigate to create-volunteer
    alert('Add New clicked');
  }
}

