import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy {
  // countdown parts
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  private timer?: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  scrollToCountdown() {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private startCountdown() {
    const target = this.nextAug8();          // next Aug 8 (local time, 00:00)
    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target.getTime() - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      this.days = this.pad(d);
      this.hours = this.pad(h);
      this.minutes = this.pad(m);
      this.seconds = this.pad(s);
    };

    tick();
    this.timer = setInterval(tick, 1000);
  }

  private nextAug8(): Date {
    const now = new Date();
    const y = now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 8) ? now.getFullYear() + 1 : now.getFullYear();
    // Aug is month index 7
    const dt = new Date(y, 7, 8, 0, 0, 0, 0);
    return dt;
  }

  private pad(n: number) {
    return n.toString().padStart(2, '0');
  }
}
