import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string="https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyDQ00AmKIXo9OJpun4Dd3NzKF9zZVV5KtA";
  private playlistId:string = "UUuaPTYj15JSkETGnEseaFFg";

  private nextPageToken:string = "";

  constructor(public http:Http) { }


  getVideos() {
    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlistId);
    params.set('key', this.apikey);

    if (this.nextPageToken) {
        params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { search: params })
               .map(response => {
                 // console.log(response.json());
                 this.nextPageToken = response.json().nextPageToken;

                 let videos:any[]=[];
                 for (let video of response.json().items) {
                     let snippet = video.snippet;

                     videos.push(snippet);
                 }

                 return videos;
               });
  }

}
