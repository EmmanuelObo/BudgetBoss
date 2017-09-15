import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationService } from './_services/calculations.service';
import { ListService } from './_services/list.service';
import { List, User } from './_models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalculationService, ListService]
})
export class AppComponent implements OnInit {

  user:User;

  constructor(private http: HttpClient, 
    private calc: CalculationService,
    private listService: ListService) {
      this.user = JSON.parse(localStorage.getItem('loggedinUser'));
     }


  isLoggedIn:boolean;
  isToggled:boolean = true;

  toggleNewList:boolean = false;
  toggleNewItem:boolean = false;



  checkIfLoggedIn()
  {
    this.isLoggedIn = (localStorage.getItem('loggedinUser') === null ? false : true);
  }  

  ngOnInit(): void 
  {}
}
