import { Injectable } from "@angular/core";

import { io, Socket } from "socket.io-client";

import { environment } from '../../environment/environment';

@Injectable()
export class SocketService {
    private socket: Socket = io(environment.apiUrl);
    constructor() {}

    public establishConnection() {
        
    }
}