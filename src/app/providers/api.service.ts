import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import tagPhotos from '../../mocks/tag-photos.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  fetchTags(tags): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('per_page', '1')
      .set('tags', tags)
      .set('extras', 'date_upload, date_taken, owner_name, views, url_q');

    const httpOptions = { headers: this.headers, params };

    return this.http.get(`${this.apiUrl}`, httpOptions);
  }

  // For testing so as not to make much API calls to the flickr service
  // fetchMockTags(tags) {
  //   return of(tagPhotos);
  // }
}
