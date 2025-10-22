import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer.html',
  styleUrls: ['./volunteer.scss']
})
export class Volunteer {
  // Checkbox states
  presenter = false;
  soundHealing = false;
  eventOps = false;

  // Textarea values
  presenterDetails = '';
  soundHealingDetails = '';
  eventOpsDetails = '';
}
