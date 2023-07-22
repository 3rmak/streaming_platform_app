import { NgModule } from '@angular/core';

import { SocketService } from './services/socket.service';
import { UsersService } from './services/users.service';
import { VideoService } from './services/video.service';

@NgModule({
  providers: [UsersService, SocketService, VideoService],
})
export class SharedModule {}
