import { ApiService } from './../providers/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { stripAndFilterTags } from '../definitions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  photos: any[] = [];
  noTagEnteredMessage = false;

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
    console.log(filteredTags);

    this.apiService.fetchTags(filteredTags).subscribe((res) => {
      console.log(res.photos.photo);
      this.photos = res.photos.photo;
      this.noTagEnteredMessage = false;
      this.tagForm.setValue({ tags: '' });
    });

  }

  parseDateTaken(date) {
    return date.split(' ').reverse().join('.');
  }

  parseDateUploaded(date) {
    return new Date(parseInt(date, 10) * 1000).toISOString()
      .split('T')[0].split('-').reverse().join('.');
  }

}
