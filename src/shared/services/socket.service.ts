import { Injectable } from "@angular/core";

import { io, Socket } from "socket.io-client";

import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { MessageDto } from "../dto/message.dto";

@Injectable()
export class SocketService {
    private socket: Socket = io(environment.apiUrl);
    protected messages$: BehaviorSubject<MessageDto> = new BehaviorSubject({ sender: '', message: '' });

    constructor() {
        this.establishConnection();
    }

    public get Messages(): Observable<MessageDto> {
        return this.messages$.asObservable();
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
    }
}