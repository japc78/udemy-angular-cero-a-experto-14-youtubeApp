import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youTubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyA5Clc3A6VfrIuRsJ069KzJLot4zSnVVE8';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  params = {

  }

  constructor( private http: HttpClient ) {
  }

  getVideos(): Observable<any> {
    const url = `${this.youTubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResult', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey);

    return this.http.get(url, { params });

  }
}
