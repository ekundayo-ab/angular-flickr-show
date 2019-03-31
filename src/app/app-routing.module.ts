import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tags', pathMatch: 'full' },
  { path: 'tags', loadChildren: './tags/tags.module#TagsModule' },
  { path: 'tags/:id', loadChildren: './tag-detail/tag-detail.module#TagDetailModule' },
  { path: '**', loadChildren: './not-found/not-found.module#NotFoundModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
