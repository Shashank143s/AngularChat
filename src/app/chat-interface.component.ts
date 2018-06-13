import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from './app.service';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css'],
  providers: [AppService]
})

export class ChatInterfaceComponent implements OnInit {
  message: Array<any> = [];
  typingMessage: any = {};
  imagesrc: any;
  @ViewChild('msgInput') textarea: ElementRef;
  @ViewChild('iterableDiv') iterator: ElementRef;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getMessage().subscribe((data) => {
      //Code to adjust scroll height automatically when a new message comes
      //this.iterator.nativeElement.lastChild();
        this.message.push(data);
        //Code fix for auto scroll on new incoming message
        setTimeout(() => {
          const elem = document.getElementById('content');
          elem.scrollTop = elem.scrollHeight;
          console.log(elem.scrollTop);
        });

      // console.log(this.message);
    });

    this.appService.recieveUserTypingMessage().subscribe((data) => {
      console.log(data);
      this.typingMessage = data;
    });
  }

  emitMessage(data) {
    if (this.textarea.nativeElement.value !== '') {
      this.appService.sendMessage({name: localStorage.getItem('username'), message: data, imagesrc: localStorage.getItem('userImg') });
      this.textarea.nativeElement.value = '';
    }
  }



  userTyping() {
    this.appService.sendUserTypingMessage({ data : localStorage.getItem('username') + ' is typing....'});
  }
}
