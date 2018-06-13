import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatInterfaceComponent } from './chat-interface.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { LoginModComponent } from './login-mod/login-mod.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const appRoutes: Routes = [
  {
    path: 'login', component: LoginModComponent
  },
  {
    path: 'chat' , component: ChatInterfaceComponent
  },
  {
    path: '' , redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent, ChatInterfaceComponent, LoginModComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    Ng2ImgMaxModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
