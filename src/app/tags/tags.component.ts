import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './../providers/api.service';
import { stripAndFilterTags } from '../definitions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  photos: any[] = [];
  photoTags: string[] = [];
  noTagEnteredMessage = false;
  tagAddedAlready = false;
  activeSort = 'views';

  tagForm = new FormGroup({
    tags: new FormControl('', [ Validators.required ])
  });

  constructor(private apiService: ApiService) { }

  onSubmit() {
    const { tags } = this.tagForm.value;

    if (!tags) {
      this.noTagEnteredMessage = true;
      return;
    }

    const filteredTags = stripAndFilterTags(tags);

    this.apiService.fetchPhotos(filteredTags, 1).subscribe((res) => {
      if (this.photoTags.includes(filteredTags)) {
        this.tagAddedAlready = true;
        return;
      }

      this.photoTags.push(filteredTags);
      this.photos = [
        ...this.photos,
        ...res.photos.photo.map((singlePhoto) => {
          singlePhoto['tags'] = filteredTags;
          return singlePhoto;
        })
      ];

      this.sortBy(this.activeSort);
      this.noTagEnteredMessage = false;
      this.tagAddedAlready = false;
      this.resetForm();
    });
  }

  resetForm() {
    this.tagForm.setValue({ tags: '' });
  }

  get tags() { return this.tagForm.get('tags'); }

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
