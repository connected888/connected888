import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-flyer',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './flyer.html',
  styleUrls: ['./flyer.scss']
})
export class Flyer {
  // Header data used by the template
  headline = 'Headline';
  photoUrl = 'https://i.imgur.com/0y8Ftya.png';
  name = 'JANCE DOE';
  role = 'Practitioner';

  // Contact and description data used by the template
  phone = '1-800-1234567';
  email = 'janedoe24@gmail.com';
  address = '12 Meadow Rd, San Francisco, CA';
  descriptionTitle = 'Description';
  description = `Lorem ipsum dolor sit amet consectetur. This is a short profile
  statement that explains the practitioner’s background and focus.`;

  // Languages and external links rendered in chips
  languages = ['Hindi', 'English', 'French'];
  links = [
    { label: 'Website', url: 'https://connected888.com' },
    { label: 'Profile Form', url: 'https://connected888.com/create-profile' }
  ];

  // Social links (object) and flattened list for footer iteration
  socials = {
    tiktok: 'https://www.tiktok.com/@connected888',
    youtube: 'https://youtube.com/@connected888',
    instagram: 'https://instagram.com/connected888',
    facebook: 'https://facebook.com/connected888',
    linkedin: 'https://linkedin.com/company/connected888'
  };
  socialLinks = [
    { short: 'TT', url: 'https://www.tiktok.com/@connected888' },
    { short: 'YT', url: 'https://youtube.com/@connected888' },
    { short: 'IG', url: 'https://instagram.com/connected888' },
    { short: 'FB', url: 'https://facebook.com/connected888' },
    { short: 'IN', url: 'https://linkedin.com/company/connected888' }
  ];

  // Assets for QR and footer text
  qrCodeUrl = 'https://via.placeholder.com/100x100.png?text=QR';
  websiteText = 'www.connected888.com';

  // Spiritual practices grid (expects eight entries)
  practices = [
    { title: 'Meditation & Mindfulness', image: 'https://i.imgur.com/pzP9GfU.jpg' },
    { title: 'Reiki for Inner Balance', image: 'https://i.imgur.com/Z9b0Z8V.jpg' },
    { title: 'Prestive Intention', image: 'https://i.imgur.com/9o7IQ5c.jpg' },
    { title: 'Mindful Yoga', image: 'https://i.imgur.com/yUeO2cq.jpg' },
    { title: 'Practice Gratitude Daily', image: 'https://i.imgur.com/0wzq7xk.jpg' },
    { title: 'Guided Deep Relaxation', image: 'https://i.imgur.com/lkS8BR5.jpg' },
    { title: 'Energy Flow Alignment', image: 'https://i.imgur.com/8w2p7cS.jpg' },
    { title: 'Sound Bath Healing', image: 'https://i.imgur.com/2otJ6Zq.jpg' }
  ];

  // Services grid (cards aligned under practices)
  services = [
    {
      title: 'Reiki Session',
      description: 'A calming and restorative energy healing session.',
      date: '19-12-2025',
      price: '$35/hr',
      image: 'https://i.imgur.com/7xkAo5L.jpg'
    },
    {
      title: 'Group Meditation',
      description: 'Guided group practice to relax and center.',
      date: '19-12-2025',
      price: '$35/hr',
      image: 'https://i.imgur.com/1mQ0i6z.jpg'
    },
    {
      title: 'Sound Bath',
      description: 'Deep relaxation through sound frequencies.',
      date: '19-12-2025',
      price: '$35/hr',
      image: 'https://i.imgur.com/q3yYgHp.jpg'
    }
  ];

  // Captures the flyer DOM and exports to a single-page PDF
  downloadPDF() {
    const root = document.querySelector('.flyer-root') as HTMLElement | null;
    if (!root) return;

    const btn = root.querySelector('button') as HTMLButtonElement | null;
    if (btn) btn.style.display = 'none';

    html2canvas(root, { scale: 2 }).then(canvas => {
      if (btn) btn.style.display = 'block';
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, 'PNG', 0, 0, w, h);
      pdf.save(`${this.name}_Connected888_Flyer.pdf`);
    });
  }
}
