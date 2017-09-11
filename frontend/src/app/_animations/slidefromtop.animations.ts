import { transition, state, trigger, animate, style } from '@angular/animations';



export const slideFromTop =

trigger('slideFromTop', [
    state('*', style({position: 'fixed', width: '40%',left: '32%', height: '100%'})),
    state('void', style({position: 'fixed', width: '40%',left: '32%', height: '100%'})),
    transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('1.5s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
    ]),
    transition(':leave', [
        style({transform: 'translateY(0%)', opacity: 1}),
        animate('0.5s ease-in-out', style({transform: 'translateY(100%)', opacity: 0}))
    ])
])