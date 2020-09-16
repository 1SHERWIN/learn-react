import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { QrscanService } from './qrscan.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.css'],
  providers: [ QrscanService ]
})
export class QrscanComponent implements OnInit {

  checkpoint: string;
  response: any;

  // Variable to connect to DataService, stores list of checkpoints
  messages: string[];

  onCodeResult(resultString: string) {
    this.checkpoint = resultString;
    
    const params = new HttpParams()
      .set('checkpoint', this.checkpoint)
      .set('nickname', 'friendlybass');
    this._qrscanService.updateProgress(params);

    // Add qr scan string to data service
    this.add(this.checkpoint);

  }

  constructor(private _qrscanService: QrscanService, private dataService : DataService) {}

  // Connect local variable to data service
  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => this.messages = message);   
  }

  // Update message with string
  add(input : string){
    this.dataService.addMessage(input);
  }

}
