import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Socials = {
  website?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  meetup?: string;
  linkedin?: string;
};
type Offering = {
  title: string;
  date?: string;
  price?: number;
  image?: string;
  description?: string;
};

@Component({
  selector: 'app-hostinglist',
  imports: [CommonModule, FormsModule],
  templateUrl: './hostinglist.html',
  styleUrl: './hostinglist.scss',
})
export class Hostinglist {
  profileData = [
    {
      headline: 'Headline',
      descriptionTitle: 'Description title',
      description:
        "Description is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br> <br>" +
        "Description is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      profileName: 'Jance Doe',
      profileDescription:
        'Helping individuals restore balance, energy, and inner peace -' +
        'Profile Statement',
      phoneNumber: '1-800-1234567',
      email: 'jancedoe24@gmail.com',
      address: '12 Meadow Rd., San Francisco, CA',
      language: 'Hindi, English, French, Arabic, German, Chinese, Spanish',
      webUrl: 'www.https://connected888-dev.netlify.app/create-profile',
    },
  ];
  spiritualData = [
    {
      title: 'Spiritual Practices',
      practice1: 'Practice Mindful Yoga',
      practice2: 'Reiki for Inner Balance',
      practice3: 'Guided Deep Relaxation',
      practice4: 'Energy Flow Alignment',
      practice5: 'Prestive Intention Setting',
      practice6: 'Sound Bath Healing',
      practice7: 'Meditation & Mindfulness',
      practice8: 'Practice Mindful Yoga',
    },
  ];
  servicesData = [
    {
      heading: 'Services and Offerings',
      service1: {
        serviceLabel: 'Service Title',
        titleInput: 'Reiki Session',
        description: 'A calming and restorative energy healing session.',
        date: '19-12-2025',
        price: '35/hr',
      },
      service2: {
        serviceLabel: 'Service Title',
        titleInput: 'Reiki Session',
        description: 'A calming and restorative energy healing session.',
        date: '19-12-2025',
        price: '35/hr',
      },
      service3: {
        serviceLabel: 'Service Title',
        titleInput: 'Reiki Session',
        description: 'A calming and restorative energy healing session.',
        date: '19-12-2025',
        price: '35/hr',
      },
    },
  ];
}
