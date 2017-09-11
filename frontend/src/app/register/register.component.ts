import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { fadeInAnimation, slideFromTop } from '../_animations/index';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    animations: [slideFromTop],
    host: {'[@slideFromTop]': ''}
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