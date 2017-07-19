import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){}
  data:any;
  title:string = 'Budget Boss';
  
  getData()
    {
      this.http.get('http://ip.jsontest.com/').subscribe(data =>{
        this.data = data['ip'];
      });
    }

  ngOnInit():void{
  }
}
