import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input('message') errorMessage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }) { }
  ngOnInit(): void {

  }
}
//----------------------------------------End of File----------------------------------------\\