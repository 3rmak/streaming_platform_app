import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { PlayPauseActionEnum } from './dto/play_pause.action.enum';
import { PlayPauseEmitDto } from './dto/play_pause.emit.dto';
import { SocketService } from 'src/shared/services/socket.service';
import { Subscription } from 'rxjs';

interface Document extends HTMLDocument {
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  mozFullScreenElement: () => void;
  webkitFullscreenElement: () => void;
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myVideo', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @Output() playEmitter = new EventEmitter()
  // @Output() volumeEmitter = new EventEmitter()
  @Output() timeEmitter = new EventEmitter()
  private subscription?: Subscription;
  private currentTime: number = 0;
  private videoState: PlayPauseActionEnum = PlayPauseActionEnum.PAUSE;

  constructor(private socketService: SocketService) {}

  ngAfterViewInit(): void {
    this.subscription = this.socketService.Video.subscribe((dto) => {
      console.log('from subscr', dto);
      
      this.currentTime = dto.time;
      this.videoElement.nativeElement.currentTime = this.currentTime;

      if (dto.action == PlayPauseActionEnum.PLAY) {
        this.videoState = PlayPauseActionEnum.PLAY;
        this.videoElement.nativeElement.play();
      } else if (dto.action == PlayPauseActionEnum.PAUSE) {
        this.videoState = PlayPauseActionEnum.PAUSE;
        this.videoElement.nativeElement.pause();
      }

      console.log('currentTime', this.currentTime);
      console.log('videoState', this.videoState);
      console.log('videoElement currentTime', this.videoElement.nativeElement.currentTime);
    });
  }

  onVideoTimeUpdate(event: Event) {
    const currentTime = (event.target as HTMLVideoElement).currentTime;
    const timeDiff = Math.abs(Math.floor(currentTime - this.currentTime));
    if (timeDiff > 1) {
      this.timeEmitter.emit(currentTime);
      this.socketService.rewindVideo(currentTime);
    }

    this.currentTime = currentTime;
  }

  onVideoPlay() {
    console.log('onVideoPlay');
    if (this.videoState == PlayPauseActionEnum.PLAY) return;
    this.videoState = PlayPauseActionEnum.PLAY;
    console.log('Video started playing');
    console.log('onVideoPlay state', this.videoState);

    const playPauseDto: PlayPauseEmitDto = { time: this.currentTime, action: PlayPauseActionEnum.PLAY };
    this.playEmitter.emit(playPauseDto);
    this.socketService.playPauseVideo(playPauseDto);
  }

  onVideoPause() {
    console.log('onVideoPause');
    if (this.videoState == PlayPauseActionEnum.PAUSE) return;
    this.videoState = PlayPauseActionEnum.PAUSE;
    
    console.log('Video paused');
    console.log('onVideoPause state', this.videoState);

    const playPauseDto: PlayPauseEmitDto = { time: this.currentTime, action: PlayPauseActionEnum.PAUSE };
    this.playEmitter.emit(playPauseDto);
    this.socketService.playPauseVideo(playPauseDto);
  }

  onVideoVolumeChange(event: Event) {
    const video = event.target as HTMLVideoElement;
    const isMuted = video.muted;
    // this.volumeEmitter.emit(<PlayPauseEmitDto>{ time: this.currentTime, action: PlayPauseActionEnum.PLAY })
    console.log(`Video volume changed. Muted: ${isMuted}`);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
