import { Component, OnInit } from '@angular/core';
import { VideoService } from '../shared/services/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  public options: string[] = ['first', 'second'];
  public subscription: Subscription | undefined;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.subscription = this.videoService
      .getAvailableVideoList()
      .subscribe((videos) => (this.options = videos));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
