import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit, OnDestroy {
  // Top cards (live numbers – replace with API data)
  kpis = {
    registrations: 4562,
    volunteers: 365,
    donations: 120,
    hostedProfiles: 89,
  };

  private charts: any[] = [];

  ngAfterViewInit(): void {
    const { Chart } = (window as any);

    // Line chart (Analytics: This Year vs Last Year)
    const line = new Chart(
      document.getElementById('analyticsChart') as HTMLCanvasElement,
      {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [
            { label: 'This Year', data: [74,62,55,48,60,92,40,46,80,55,62,71], tension: .4, borderWidth: 3 },
            { label: 'Last Year', data: [90,75,70,65,68,78,85,80,70,60,50,20], tension: .4, borderWidth: 3 }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } },
        }
      }
    );

    // Bar chart (Revenue / Donations)
    const bar = new Chart(
      document.getElementById('revenueChart') as HTMLCanvasElement,
      {
        type: 'bar',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{ label: 'Donations ($)', data: [2,3,2,6,3,4,5,6,5,6,5,7], borderWidth: 0 }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      }
    );

    // Doughnut (Browser Usage → replace with your segment)
    const doughnut = new Chart(
      document.getElementById('doughnutChart') as HTMLCanvasElement,
      {
        type: 'doughnut',
        data: {
          labels: ['Web','App (Android)','App (iOS)','Others'],
          datasets: [{ data: [45,30,15,10] }]
        },
        options: { responsive: true, cutout: '65%' }
      }
    );

    this.charts.push(line, bar, doughnut);
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy?.());
  }

}
