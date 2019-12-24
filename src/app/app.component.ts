import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, ofActionDispatched} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {Logout} from './auth/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public initialized$: Observable<boolean>;

  constructor(private actions: Actions, private router: Router) {
  }

  ngOnInit(): void {
    this.initialized$ = of(true);
    // this.actions.pipe(ofActionDispatched(Logout))
    //   .subscribe(() => this.router.navigate(['/auth/login']));
  }
}
