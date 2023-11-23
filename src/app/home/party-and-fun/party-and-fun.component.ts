import { ChangeDetectionStrategy, Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/service/share-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'party-and-fun-component',
  templateUrl: './party-and-fun.component.html',
  styleUrls: ['./party-and-fun.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class PartyAndFunComponent implements OnInit{

  constructor(private shareDataService: ShareDataService, private router: Router){}


  ngOnInit(): void {
    let userLoggato = sessionStorage.getItem("user");

    if(userLoggato == null){
      this.router.navigateByUrl("/login");
    }

    //Mantengo home icon sulla navbar
    this.shareDataService.sendDataHideSearchImg(true);
  }

  //Torna alla pagina precedente
  onClickBackPage(){
    this.shareDataService.sendDataBackToCosaFare(true)
    this.router.navigateByUrl("/home")
  }

    //Assegno a budget il valore scelto dall utente
    budgetValue = "0";
    onSliderChange(e: Event) {
      this.budgetValue = (<HTMLInputElement>e.target).value;
    }

}
