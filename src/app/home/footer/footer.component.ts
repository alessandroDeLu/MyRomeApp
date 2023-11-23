import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  sideBarOpened!: boolean;

  constructor(private shareDataService: ShareDataService, private router: Router) {}

  ngOnInit() {

    //Per colore opaco footer quando sidebar aperta
    this.shareDataService.openProfile$.subscribe(value => {
      this.sideBarOpened = value;
    });
  }

  //aiutaci a migliorare app
  @Output() mandaDatiEventFromFooter = new EventEmitter<any>()
  searchImg = false;
  onClickSendUsMessage(e: Event){
    this.searchImg = true;
    this.shareDataService.sendDataHideSearchImg(this.searchImg);
    let booleanData = {
      homeMainContent: false,
      cityClicked: false
    }

    this.mandaDatiEventFromFooter.emit(booleanData)
    this.router.navigateByUrl("/home")
    this.shareDataService.sendDataApplyHelpUsVisible(true);
    this.shareDataService.sendDataBackToCosaFare(false)
  }
  
}
