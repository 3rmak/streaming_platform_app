import { NgModule } from "@angular/core";

import { SocketService } from "./services/socket.service";
import { UsersService } from "./services/users.service";

@NgModule({
    providers: [UsersService, SocketService],
})
export class SharedModule {}