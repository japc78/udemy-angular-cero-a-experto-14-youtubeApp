import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResponse, Video } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youTubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyA5Clc3A6VfrIuRsJ069KzJLot4zSnVVE8';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {
  }

  getVideos(): Observable<Video[]> {
    const url = `${this.youTubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '5')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);

    // Se filtran los resultados para obtener solo la información de los videos.
    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map( resp => {
          // console.log(resp);
          this.nextPageToken = resp.nextPageToken;
          // console.log( resp.items);
          return resp.items;
        }),
        map(items => items.map( video => video.snippet))
      );
  }
}
