import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';

@Injectable()
export class VideoService {
  private videoUrl: string = environment.apiUrl + '/api/videos';
  constructor(private httpService: HttpClient) {}

  public getAvailableVideoList(): Observable<string[]> {
    return this.httpService.get<string[]>(this.videoUrl + '/server-videos');
  }
}
