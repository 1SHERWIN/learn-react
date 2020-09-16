import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 // Observable string source
 private nameSource = new Subject<string>();
 private usernameSource = new Subject<string>();

 // Observable string stream
 nameString$ = this.nameSource.asObservable();
 usernameString$ = this.usernameSource.asObservable();

 // Service message commands
 passName(data: string) {
   this.nameSource.next(data)
 }
 passUsername(data: string) {
  this.usernameSource.next(data)
}


  constructor() { }

  private messages : BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  sharedMessage = this.messages.asObservable();

  nextMessage(_messages: string[]) {
    this.messages.next(_messages)
  }

  addMessage(newmsg: string){
    const currentValue = this.messages.value;
    const updatedValue = [...currentValue, newmsg];
    this.messages.next(updatedValue);
  }
 
}
