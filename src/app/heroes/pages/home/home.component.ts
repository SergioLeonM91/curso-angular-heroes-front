import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `
  ]
})
export class HomeComponent {

  get auth(): Auth {
    return this._authService.auth;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  logout() {

    this._router.navigate(['./auth'])
  }
}
