import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      return this._authService.verifyAuth()
        .pipe(
          tap( isAuth => {
            if( !isAuth ) {
              this._router.navigate(['./auth/login']);
            }
          })
        );

      if( this._authService.auth.uuid ) {
        return true;
      }

      console.log('Blocked by authGuard - canActivate');
      return false;

  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this._authService.verifyAuth()
        .pipe(
          tap( isAuth => {
            if( !isAuth ) {
              this._router.navigate(['./auth/login']);
            }
          })
        );

      if( this._authService.auth.uuid ) {
        return true;
      }

      console.log('Blocked by authGuard - canLoad');
      return false;
  }
}
