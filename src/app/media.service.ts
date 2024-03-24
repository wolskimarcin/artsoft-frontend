import {Injectable} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  // This should be confidential, ikr (I created throwaway account).
  private accessKey = 'm70DeAGTU5ZFUi5yWvQl9smP6d4z5GBe-YQEFvVbQfY';
  private baseUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {
  }

  public searchImage(query: string): Observable<string> {
    const apiUrl = `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&client_id=${this.accessKey}`;

    return this.http.get<any>(apiUrl).pipe(
      map(response => response.results[0]?.urls?.regular),
      catchError(error => {
        console.error('Error fetching image:', error);
        return of('assets/no-image-available.svg');
      })
    );
  }
}
