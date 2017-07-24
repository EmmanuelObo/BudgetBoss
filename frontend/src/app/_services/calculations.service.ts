import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CalculationService{

    doubleUp(input:string, arr)
    {
     let subscription = new Observable(obs => {
         obs.next(arr.push(+input * 2));
         obs.complete();

         return() =>{ console.log("Unsubscribed!")}
     });
    }

    addFive(input:number)
    {
        return input + 5;
    }

}