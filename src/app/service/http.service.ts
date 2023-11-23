import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpModule: HttpClient) {}

  registerUser(url: string, body: {}, httpOptions: any){
    return this.httpModule.post(url,body,httpOptions);
  }

  login(url: string, body: {}, httpOptions: any){
    return this.httpModule.post(url,body,httpOptions);
  }

  cercaUtente(url: string, httpOptions: any){
    return this.httpModule.get(url , httpOptions);
  }

  updateUser(url: string, body: {} , httpOptions: any){
    return this.httpModule.put(url,body,httpOptions);
  }

  inviaMailPerAiutarci(url: string, body: {}, httpOptions: any){
    return this.httpModule.post(url,body,httpOptions);
  }
  
  logout(url: string, body:{}, httpOptions: any){
    return this.httpModule.post(url,body,httpOptions);
  }
}
