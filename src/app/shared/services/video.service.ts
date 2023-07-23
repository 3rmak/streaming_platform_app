import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { SelectVideoDto } from '../../video-player/dto/select-video.dto';
import { SocketService } from './socket.service';

@Injectable()
export class VideoService {
  private videoUrl: string = environment.apiUrl + '/api/videos';
  private roomId = '123';
  constructor(
    private httpService: HttpClient,
    private socketService: SocketService,
  ) {}

  public getAvailableVideoList(): Observable<string[]> {
    return this.httpService.get<string[]>(this.videoUrl + '/server-videos');
  }

  public selectVideo(name: string): Promise<void> {
    const dto: SelectVideoDto = { roomId: this.roomId, videoName: name };
    return firstValueFrom(
      this.httpService.post<void>(this.videoUrl + '/select', dto),
    ).then(() => this.socketService.loadVideo());
  }
}
