import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiURL: string = environment.apiURL;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(
    private _http: HttpClient
  ) { }

  verifyAuth(): Observable<boolean> {
    
    if( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this._http.get<Auth>(`${ this._apiURL }/auth/user/63ff937020a78824845a286c`)
      .pipe(
        map( auth => {
          if(!auth) {
            return false;
          }

          this._auth = auth;

          return true;

        })
      );

  }

  login(): Observable<Auth> {
    return this._http.get<Auth>(`${ this._apiURL }/auth/user/63ff937020a78824845a286c`)
      .pipe(
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('token', auth.uuid))
      );
  }
}
