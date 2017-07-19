import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationService } from './services/calculations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalculationService]
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient, private calc: CalculationService){}
  data:any;
  title:string = 'Budget Boss';
  arr = [];

  calculations(input:any)
  {
    this.arr.push(this.calc.addFive(+input));
  }
  
  getData()
    {
      this.http.get('http://ip.jsontest.com/').subscribe(data =>{
        this.data = data['ip'];
      });
    }

  ngOnInit():void{
  }
}
