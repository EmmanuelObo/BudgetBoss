import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationService } from './_services/calculations.service';
import { ListService } from './_services/list.service';
import { List } from './_models/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalculationService, ListService]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, 
    private calc: CalculationService,
    private listService: ListService) { }
  data: any;
  title: string = 'Budget.Boss';
  appTitle = 'app-title';
  arr = [];

  mylist:List;

  calculations(input: any) 
  {
    this.arr.push(this.calc.addFive(+input));
  }

  getData() 
  {
      this.http.get('http://ip.jsontest.com/').subscribe(data => {
      this.data = data['ip'];
    });
  }

  getList(input: string)
  {
    this.listService.get(input);
  }

  ngOnInit(): void 
  {}
}
