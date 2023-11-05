import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'
import { AppComponent } from './app.component';
import { CreateBoardComponent } from './Board/create-board/create-board.component';
import { DisplayBoardComponent } from './Board/display-board/display-board.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ManagerComponent } from './auth/accountManagment/manager/manager.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './errorCatching/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorinterceptorInterceptor } from './errorCatching/errorinterceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CreateBoardComponent,
    DisplayBoardComponent,
    ManagerComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorInterceptor, multi: true }
  ],
  //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorInterceptor, multi: true }
  bootstrap: [AppComponent]
})
export class AppModule { }
//----------------------------------------End of File-------------------------------------------------\\