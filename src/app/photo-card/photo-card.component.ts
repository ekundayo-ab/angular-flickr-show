import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() photo;
  @Input() showDetail = true;
  constructor() { }

  parseDateTaken(date) {
    return date.split(' ')[0].split('-').reverse().join('.');
  }

  parseDateUploaded(date) {
    return new Date(parseInt(date, 10) * 1000).toISOString()
      .split('T')[0].split('-').reverse().join('.');
  }

}
