import {Component, OnInit} from '@angular/core';
import {Actions, Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthState} from './auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(AuthState.getInitialized)
  initialized$: Observable<boolean>;

  constructor(private actions: Actions) {
  }

  ngOnInit(): void {
  }
}
