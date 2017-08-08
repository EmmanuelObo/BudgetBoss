import { transition, state, trigger, animate, style } from '@angular/animations';



export const fadeInAnimation = 
    trigger('fadeInAnimation', [

        state('void', style({opacity: 0}) ),
        state('*', style({opacity: 0}) ),

        transition(':enter', [

        style({opacity: 0}),

        animate('3s', style({opacity: 1}))
        ]),
    ])