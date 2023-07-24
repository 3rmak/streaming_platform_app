import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { SelectVideoDto } from '../../video-player/dto/select-video.dto';

@Injectable()
export class VideoService {
  private videoUrl: string = environment.apiUrl + '/api/videos';
  private roomId = '123';
  constructor(private httpService: HttpClient) {}

  public getAvailableVideoList(): Observable<string[]> {
    return this.httpService.get<string[]>(this.videoUrl + '/server-videos');
  }

  public selectVideo(name: string): Observable<void> {
    const dto: SelectVideoDto = { roomId: this.roomId, videoName: name };
    return this.httpService.post<void>(this.videoUrl + '/select', dto);
  }
}
