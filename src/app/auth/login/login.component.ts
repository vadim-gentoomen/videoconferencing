import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
