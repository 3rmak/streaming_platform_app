import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, Subscription, of } from 'rxjs';
import { MessageDto } from 'src/shared/dto/message.dto';

import { SocketService } from 'src/shared/services/socket.service';
import { UsersService } from 'src/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    Promise.resolve()
      .then(() => this.initUser());
  }

  public async initUser() {
    const user = this.usersService.User;
    console.log('user', user);
  }
}
