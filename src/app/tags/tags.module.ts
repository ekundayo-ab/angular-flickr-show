import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { PhotoCardModule } from '../photo-card/photo-card.module';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    PhotoCardModule,
    ReactiveFormsModule,
  ]
})
export class TagsModule { }
