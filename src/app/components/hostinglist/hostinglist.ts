
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Socials = {
  website?: string; youtube?: string; instagram?: string; tiktok?: string;
  facebook?: string; meetup?: string; linkedin?: string;
};
type Offering = { title: string; date?: string; price?: number; image?: string; description?: string; };

@Component({
  selector: 'app-hostinglist',
  imports: [CommonModule,FormsModule],
  templateUrl: './hostinglist.html',
  styleUrl: './hostinglist.scss'
})
export class Hostinglist {
 socials = [
    { url: 'https://www.youtube.com/shorts/XYZ' },
    { url: 'https://www.youtube.com/shorts/ABC' },
    { url: 'https://www.youtube.com/shorts/DEF' },
  ];

  languages = ['Arabic', 'Bengali', 'Urdu', 'French', 'Hindi', 'Japanese', 'Mandarin', 'Telugu', 'Portuguese', 'Russian'];

  practices = [
    { title: 'Practice Mindful Yoga', image: 'assets/yoga.jpg' },
    { title: 'Reiki for Inner Balance', image: 'assets/reiki.jpg' },
    { title: 'Guided Deep Relaxation', image: 'assets/relax.jpg' },
    { title: 'Energy Flow Alignment', image: 'assets/energy.jpg' },
    { title: 'Positive Intention Setting', image: 'assets/intention.jpg' },
    { title: 'Sound Bath Healing', image: 'assets/sound.jpg' },
    { title: 'Meditation & Mindfulness', image: 'assets/meditation.jpg' },
    { title: 'Practice Gratitude Daily', image: 'assets/gratitude.jpg' },
  ];

  services = [
    { title: 'Reiki Session', description: 'A calming and restorative energy healing session.', image: 'assets/reiki-service.jpg', date: new Date(), duration: '35 min' },
    { title: 'Mindful Meditation', description: 'Guided meditation for stress relief and inner calm.', image: 'assets/meditation-service.jpg', date: new Date(), duration: '35 min' },
    { title: 'Sound Healing', description: 'Experience soothing sound waves to restore harmony.', image: 'assets/sound-service.jpg', date: new Date(), duration: '35 min' },
  ];
}
