import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  public get User(): string {
    return String(localStorage.getItem('user'));
  }

  public set User(userId: string) {
    localStorage.setItem('user', userId);
  }
}
