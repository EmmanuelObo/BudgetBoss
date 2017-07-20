import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationService } from './services/calculations.service';
import {ListService} from './services/list.service';
import {List} from './list/list';

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
  appTitle = 'app-title container';
  arr = [];

  mylist:List;

  createList(input:string)
  {
    this.mylist = this.listService.create(input);
  }

  updateList(title:string, limit:string, currList:List)
  {
    this.mylist = this.listService.update(title,+limit,this.mylist);
  }

  calculations(input: any) {
    this.arr.push(this.calc.addFive(+input));
  }

  getData() {
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
