import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos:any[] = [];
  selectedVideo:any;

  constructor(public _youtubeService: YoutubeService) {

    this._youtubeService.getVideos()
                        .subscribe( videos => {
                          console.log(videos);
                          this.videos = videos;
                        });
  }

  ngOnInit() {
  }

  whatVideo(video:any) {
    this.selectedVideo = video;
    $('#youtubeModal').modal();
    $('#youtubeModal').on('hide.bs.modal',args=> {
      this.selectedVideo=null;
    })
  }

  killVideoPlayback() {
    this.selectedVideo = null;
    $('#youtubeModal').modal('hide');
  }

  loadNextVideosPage() {
    this._youtubeService.getVideos()
        .subscribe( videos => this.videos.push( ...videos ));
  }

}
