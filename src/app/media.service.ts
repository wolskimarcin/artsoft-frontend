import {Injectable} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

export enum ImageSize {
  Small,
  Regular,
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  // This should be confidential, ikr (I created throwaway account).
  private accessKey = 'm70DeAGTU5ZFUi5yWvQl9smP6d4z5GBe-YQEFvVbQfY';
  private baseUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {
  }

  public searchImage(query: string, size: ImageSize): Observable<string> {
    const apiUrl = `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&client_id=${this.accessKey}`;

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        switch (size) {
          case ImageSize.Small:
            return response.results[0]?.urls?.small || response.results[0]?.urls?.thumb;
          case ImageSize.Regular:
          default:
            return response.results[0]?.urls?.regular;
        }
      }),
      catchError(error => {
        console.error('Error fetching image:', error);
        return of('assets/no-image-available.svg');
      })
    );
  }

  public searchImages(query: string, size: ImageSize, count: number): Observable<string[]> {
    const apiUrl = `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&client_id=${this.accessKey}&per_page=${count}`;

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        return response.results.map((item: any) => {
          switch (size) {
            case ImageSize.Small:
              return item.urls.small || item.urls.thumb;
            case ImageSize.Regular:
            default:
              return item.urls.regular;
          }
        });
      }),
      catchError(error => {
        console.error('Error fetching images:', error);
        return of(['assets/no-image-available.svg']);
      })
    );
  }

}
