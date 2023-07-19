import { Injectable } from "@angular/core";

import { io, Socket } from "socket.io-client";

import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { MessageDto } from "../dto/message.dto";
import { PlayPauseEmitDto } from "src/app/video-player/dto/play_pause.emit.dto";
import { PlayPauseActionEnum } from "src/app/video-player/dto/play_pause.action.enum";

@Injectable()
export class SocketService {
    private socket: Socket = io(environment.apiUrl);
    protected messages$: BehaviorSubject<MessageDto> = new BehaviorSubject<MessageDto>({ sender: '', message: '' });
    protected videoState$ = new BehaviorSubject({ action: PlayPauseActionEnum.PAUSE, time: 0 });

    constructor() {
        this.establishConnection();
    }

    public get Messages(): Observable<MessageDto> {
        return this.messages$.asObservable();
    }

    public get Video(): Observable<PlayPauseEmitDto> {
        return this.videoState$.asObservable();
    }

    public sendMessage(message: string) {
        this.socket.emit('message', message);
    }

    private establishConnection() {
        const roomId = '123';
        this.socket.on('connect', () => {
            this.socket.emit('join_room', roomId);
        });

        this.socket.on('message', (message: MessageDto) => {
            console.log('new message');
            
            this.messages$.next(message);
        });

        this.socket.on('action', (message: MessageDto) => {
            console.log('new message');
            
            this.messages$.next(message);
        });

        // video
        this.socket.on('play_pause', (dto: PlayPauseEmitDto) => {
            this.videoState$.next(dto)
        })

        this.socket.on('range', (time: number) => {
            this.videoState$.next({ action: PlayPauseActionEnum.PAUSE, time })
        })
    }

    public playPauseVideo(dto: PlayPauseEmitDto) {
        this.socket.emit('play_pause', dto);
    }

    public rewindVideo(time: number) {
        this.socket.emit('range', time);
    }
}
