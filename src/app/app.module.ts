import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ChatComponent, VideoPlayerComponent, SearchbarComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        MatAutocompleteModule,
        MatInputModule,
    ],
  exports: [HomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
