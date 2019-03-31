import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../providers/api.service';
import { stripAndFilterTags } from '../definitions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  photos: any[] = [];
  noTagEnteredMessage = false;
  activeSort = 'views';

  tagForm = new FormGroup({
    tags: new FormControl('')
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {}

  onSubmit() {
    const { tags } = this.tagForm.value;

    if (!tags) {
      this.noTagEnteredMessage = true;
      return;
    }

    const filteredTags = stripAndFilterTags(tags);

    this.apiService.fetchTags(filteredTags).subscribe((res) => {
      console.log(res.photos.photo);
      this.photos = res.photos.photo;

      this.sortBy(this.activeSort);
      this.noTagEnteredMessage = false;
      this.resetForm();
    });
  }

  resetForm() {
    this.tagForm.setValue({ tags: '' });
  }

  parseDateTaken(date) {
    return date.split(' ')[0].split('-').reverse().join('.');
  }

  parseDateUploaded(date) {
    return new Date(parseInt(date, 10) * 1000).toISOString()
      .split('T')[0].split('-').reverse().join('.');
  }

  sortBy(fieldName) {
    this.activeSort = fieldName;

    this.photos.sort((prevRecord, nextRecord) => {
      const prev = fieldName === 'views' ? parseInt(prevRecord[fieldName], 10) : prevRecord[fieldName].toUpperCase();
      const next = fieldName === 'views' ? parseInt(nextRecord[fieldName], 10) : nextRecord[fieldName].toUpperCase();

      if (prev < next) {
        return -1;
      }
      if (prev > next) {
        return 1;
      }

      return 0;
    });
  }

}
