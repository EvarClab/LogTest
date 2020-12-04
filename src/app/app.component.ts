import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LogTest';

  datasBMS: Array<Object> = [];

  API_URL = "https://7r0s80ve99.execute-api.ap-northeast-2.amazonaws.com/deploy/all"; 

  constructor(private backend:BackendService) { 
    console.log("constr");
    // this.backend.getData().then( (data:any) => {
    //   console.log(data);
    // });

    setInterval( ()=>{
      this.datasBMS = [];
      this.backend.getData().then( (data:any) => {
        for(let d in data) {
          // let message = JSON.parse(data[d].message);
          let m = data[d].message;
          this.datasBMS.push(m);
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
