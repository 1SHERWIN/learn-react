import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ExitService } from './exit.service';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css'],
  providers: [ ExitService ]
})

export class ExitComponent implements OnInit {

  email: string;

  constructor(private _exitService: ExitService) {}
  
  goToUrl(): void {
    window.location.href = 'https://perotmuseum.org';
  }

  onEmailCheck(): void{
    console.log('yo it is running in component')
    const data = new HttpParams()
      .set('email', this.email)
      .set('nickname', "amusedtoad");
    this._exitService.updateEmail(data);
  }

  ngOnInit(): void {
  }

}
