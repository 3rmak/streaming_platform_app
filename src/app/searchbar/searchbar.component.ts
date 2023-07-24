import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '../shared/services/video.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  selected = new FormControl('valid', [Validators.required]);

  public options: string[] = [];
  public subscription: Subscription | undefined;

  constructor(
    private videoService: VideoService,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.videoService
      .getAvailableVideoList()
      .subscribe((videos) => (this.options = videos));
  }

  onChange(event: any) {
    Promise.resolve()
      .then(() => lastValueFrom(this.videoService.selectVideo(event.value)))
      .then(() => this.socketService.loadVideo());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
