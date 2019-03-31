import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoCardComponent } from './photo-card.component';

@NgModule({
  declarations: [PhotoCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PhotoCardComponent]
})
export class PhotoCardModule { }
