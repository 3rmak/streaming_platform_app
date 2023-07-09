import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [HomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
