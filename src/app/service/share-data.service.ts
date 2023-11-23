import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private openProfileSubject = new BehaviorSubject<boolean>(false);
  openProfile$ = this.openProfileSubject.asObservable();

  private hideSearchImgSubject = new BehaviorSubject<boolean>(false);
  hideSearchImage$ = this.hideSearchImgSubject.asObservable();

  private helpUsSubject = new BehaviorSubject<boolean>(false);
  helpUsVisible$ = this.helpUsSubject.asObservable();

  private cosaFareSubject = new BehaviorSubject<boolean>(false);
  cosaFare$ = this.cosaFareSubject.asObservable();

  sendDataOpenProfileToFooter(value: boolean) {
    this.openProfileSubject.next(value);
  }

  sendDataHideSearchImg(value: boolean){
    this.hideSearchImgSubject.next(value);
  }

  sendDataApplyHelpUsVisible(value: boolean){
    this.helpUsSubject.next(value);
  }

  sendDataBackToCosaFare(value1: boolean){
    this.cosaFareSubject.next(value1);
  }

}
