import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/AuthService";

@Injectable()
export class NonAuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if(this._authService.isTokenValid()) {
            this._router.navigate(['/authorized']);
        }
        return true;

    }

}