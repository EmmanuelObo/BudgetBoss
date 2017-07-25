import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router){}
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if(localStorage.getItem('loggedinUser'))
            {
                this.router.navigate(['/home']);
                return true;
            }

        this.router.navigate(['/login']);
        return false;
    }
}