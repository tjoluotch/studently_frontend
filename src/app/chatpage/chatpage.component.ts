import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {Chat} from '../chat';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {

  chatModel: Chat;

  constructor(private __studentService: StudentService) { }

  ngOnInit() {
    this.getChatById();
  }

  getChatById(): void {
    this.__studentService.getChatById()
      .subscribe(data => {
        if (data.status === 200) {
          console.log('Gotten chat by id successfully');
          this.chatModel = data.body;
          this.messagesPresent();
        } else {
          console.log('Issue getting chat by id');
        }
      });
  }

  // check if there are any messages in chatModel
  messagesPresent(): boolean {
    if (this.chatModel.messages = undefined) {
      return false;
    } else {
      return true;
    }
  }

}