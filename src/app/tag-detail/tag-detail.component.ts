import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from './../providers/api.service';


@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnDestroy {
  photos = [];
  currentPage: number;
  totalPages: number;
  tagName: string;

  routeSubscription: Subscription;
  photosSubscription: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.routeSubscription =  this.route.params.subscribe((data) => {
      this.tagName = data.id;
      this.photosSubscription = this.fetchPhotos();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.photosSubscription.unsubscribe();
  }

  fetchOtherPage(direction: '-' | '+') {
    const pageToFetch = direction === '+' ? this.currentPage + 1 : this.currentPage - 1;
    this.fetchPhotos(pageToFetch);
  }

  fetchPhotos(pageNumber?: number) {
    return this.apiService.fetchPhotos(this.tagName, 10, pageNumber).subscribe((res) => {
      const { photo, page, pages } = res.photos;
      this.photos = photo;
      this.currentPage = page;
      this.totalPages = pages;
    });
  }

  get fetchFirstPage() {
    return this.fetchPhotos(1);
  }

  get fetchLastPage() {
    return this.fetchPhotos(this.totalPages);
  }

}
