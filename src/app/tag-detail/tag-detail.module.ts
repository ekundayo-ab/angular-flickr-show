import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagDetailRoutingModule } from './tag-detail-routing.module';
import { TagDetailComponent } from './tag-detail.component';
import { PhotoCardModule } from '../photo-card/photo-card.module';

@NgModule({
  declarations: [TagDetailComponent],
  imports: [
    CommonModule,
    TagDetailRoutingModule,
    PhotoCardModule
  ]
})
export class TagDetailModule { }
