import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '../shared/services/video.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  selected = new FormControl('valid', [Validators.required]);

  public options: string[] = [];
  public subscription: Subscription | undefined;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.subscription = this.videoService
      .getAvailableVideoList()
      .subscribe((videos) => (this.options = videos));
  }

  onChange(event: any) {
    this.videoService.selectVideo(event.value).then();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
