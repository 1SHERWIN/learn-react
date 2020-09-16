import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './progress/progress.component';
import { QrscanComponent } from './qrscan/qrscan.component';
import { ExitComponent } from './exit/exit.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PopperDirective } from './popper.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgressComponent,
    QrscanComponent,
    ExitComponent,
    PopperDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
