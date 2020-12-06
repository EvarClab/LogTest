import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

import * as dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LogTest';

  datasBMS: Array<Object> = [];
  datasCART: Array<Object> = [];
  datasPMODULE: Array<Object> = [];

  API_URL = "https://7r0s80ve99.execute-api.ap-northeast-2.amazonaws.com/deploy/all"; 

  constructor(private backend:BackendService) { 

    dayjs.extend(isLeapYear);
    dayjs.extend(utc);
    dayjs.locale('ko');   

    setInterval( ()=>{
      this.datasBMS = [];
      this.datasCART = [];
      this.datasPMODULE = [];

      this.backend.getData().then( (data:any) => {
        for(let d in data) {
          // let message = JSON.parse(data[d].message);
          let m = data[d].message;
          let url = data[d].url;
          let time = dayjs.utc(data[d].createdAt).local().format("YYYY-MM-DD HH:mm:ss");
          m.createdAt = time;
          switch(url) {
            case 'bms': this.datasBMS.unshift(m); break;
            case 'cart': this.datasCART.unshift(m); break;
            case 'pmodule': this.datasPMODULE.unshift(m); break;
          }
        }
        console.log(this.datasBMS);
      });
    }, 5000);
    
  }

  ngOnInit() {
    // setInterval(this.getData, 5000);
  }

  getData() { 
    console.log('getdata');
    const self = this;
    
    this.backend.getData().then( (data:any) => {
      for(let d in data) {
        self.datasBMS.push(d);
      }
    }).catch( (err) => { console.log(err); });
    
  }
}
