import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BoardServiceService } from '../board-service.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})

export class CreateBoardComponent implements OnInit {
  @Input('id') id = '';
  @Input('title') title = '';
  @Input('description') description = '';
  @Input('departmentCode') departmentCode = '';
  @Output() delete = new EventEmitter;
  constructor(private router: Router, private authService: AuthServiceService) { }
  loggedIn = false;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.loggedIn = this.authService.loggedInUser
      }
    });
  }
  //--------------------------------------------------------------------------\\
  onClickListener() {
    this.delete.emit();
  }

}
//-------------------------------------------End of File----------------------------------------------\\