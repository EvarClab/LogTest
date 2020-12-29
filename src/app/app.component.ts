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

  index:number = 0;

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
          m.check_time = time;

          let obj:any = {};

          switch(url) {
            case 'bms': obj = m; obj.sid = data[d].sid; obj.cid = data[d].cid; this.datasBMS.push(obj); break;
            case 'cart': obj = m; obj.sid = data[d].sid; obj.cid = data[d].cid; this.datasCART.push(obj); break;
            case 'pmodule': obj = m; obj.sid = data[d].sid; obj.cid = data[d].cid; this.datasPMODULE.push(obj); break;
          }
        }
        
      });
    }, 5000);

    // this.datasBMS = [];
    // this.datasCART = [];
    // this.datasPMODULE = [];

    // this.backend.getData().then( (data:any) => {

    //   index = data[data.length-1].index;
    //   console.log(`first index : ${index}`);

    //   for(let d in data) {
    //     // let message = JSON.parse(data[d].message);
    //     let m = data[d].message;
    //     let url = data[d].url;
    //     let time = dayjs.utc(data[d].createdAt).local().format("YYYY-MM-DD HH:mm:ss");
    //     m.check_time = time;
    //     switch(url) {
    //       case 'bms': this.datasBMS.unshift(m); break;
    //       case 'cart': this.datasCART.unshift(m); break;
    //       case 'pmodule': this.datasPMODULE.unshift(m); break;
    //     }
    //   }
    // });

    // setInterval( () => {
    //   this.backend.getData().then( (data:any) => {

    //     if(data[data.length-1].index > index)

    //     let m = data[data.length-1].message;
    //     let url = data[data.length-1].url;
    //     let time = dayjs.utc(data[data.length-1].createdAt).local().format("YYYY-MM-DD HH:mm:ss");
    //     m.check_time = time;

    //     switch(url) {
    //       case 'bms': this.datasBMS.unshift(m); break;
    //       case 'cart': this.datasCART.unshift(m); break;
    //       case 'pmodule': this.datasPMODULE.unshift(m); break;
    //     }
    //   });
    // }, 5000);
    
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
