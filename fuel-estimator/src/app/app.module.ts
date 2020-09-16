import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientinfoComponent } from './clientinfo/clientinfo.component';
import { QuotehistoryComponent } from './quotehistory/quotehistory.component';
import { RequestquoteComponent } from './requestquote/requestquote.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ClientinfoComponent,
    QuotehistoryComponent,
    RequestquoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
