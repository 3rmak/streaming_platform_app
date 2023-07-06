import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

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
