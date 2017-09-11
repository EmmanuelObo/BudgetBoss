import { transition, state, trigger, animate, style } from '@angular/animations';



export const fadeInAnimation = 
    trigger('fadeInAnimation', [

        state('void', style({position: 'fixed', width: '45%', left: '32%'}) ),
        state('*', style({position: 'fixed', width: '45%', left: '32%'}) ),
        transition(':enter', [
        style({opacity: 0}),
        animate('1s ease-in-out', style({opacity: 1}))
        ]),
        transition(':leave', [ 
        style({opacity: 1}),
        animate('.5s ease-in-out', style({opacity: 0}))
        ])
    ])