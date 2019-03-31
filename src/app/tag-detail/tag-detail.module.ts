import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagDetailRoutingModule } from './tag-detail-routing.module';
import { TagDetailComponent } from './tag-detail.component';

@NgModule({
  declarations: [TagDetailComponent],
  imports: [
    CommonModule,
    TagDetailRoutingModule
  ]
})
export class TagDetailModule { }
