import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { homePath, loginPath } from '../_constants/index';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router){}
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if(localStorage.getItem('loggedinUser'))
            {
                this.router.navigate([homePath]);
                return true;
            }

        this.router.navigate([loginPath]);
        return false;
    }
}