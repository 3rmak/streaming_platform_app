import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageDto } from 'src/shared/dto/message.dto';
import { SocketService } from 'src/shared/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public chatHidden: boolean = false;
  public messageText: string = '';
  public messages: MessageDto[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.initMessageSubscription();
  }

  public initMessageSubscription() {
    const messageSubscription = this.socketService.Messages.subscribe((msg) => {
      this.messages.push(msg);
    });

    this.subscription.add(messageSubscription);
  }

  sendMessage() {
    console.log('Message sent:', this.messageText);
    this.socketService.sendMessage(this.messageText);
    this.messageText = '';
  }

  toggleChat() {
    this.chatHidden = !this.chatHidden;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
