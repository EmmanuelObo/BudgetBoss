import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})

export class RegisterComponent{
    constructor(private authService: AuthenticationService){}
    model:any = {}

    register()
    {
        this.authService.register(this.model).subscribe(data=>{
            console.info('Data: ' + data);
        },
        error=>{console.info('Error: ' + error)});
        console.log(this.model);
    }
}