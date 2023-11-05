import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './auth/accountManagment/manager/manager.component'
import { CreateBoardComponent } from './Board/create-board/create-board.component';
import { DisplayBoardComponent } from './Board/display-board/display-board.component';
const routes: Routes = [{ path: '', component: DisplayBoardComponent },
{ path: 'add', component: CreateBoardComponent },
{ path: 'signin', component: ManagerComponent },
{ path: 'signup', component: ManagerComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//----------------------------------End of File-----------------------------------------\\