import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  BASE_URL = "https://7r0s80ve99.execute-api.ap-northeast-2.amazonaws.com/deploy/all";

  constructor(private httpClient:HttpClient) { }

  public async getData() {
    let headers = new HttpHeaders();
    headers = headers.append("Accept", 'application/json');
    headers = headers.append("Content-Type", 'application/json');
        
    const requestOptions = { headers: headers };

    return new Promise((resolve, reject) => {
      this.httpClient.get(this.BASE_URL, requestOptions).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          console.log(error);
          reject(error); 
        }
      )
    });
  }
}
