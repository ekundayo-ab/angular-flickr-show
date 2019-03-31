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
  routeSubscription: Subscription;
  photosSubscription: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.routeSubscription =  this.route.params.subscribe((data) => {
      this.photosSubscription = this.apiService.fetchPhotos(data.id, 10).subscribe((res) => {
        this.photos = res.photos.photo;
        console.log(this.photos);
      });
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.photosSubscription.unsubscribe();
  }

}
