import { ChangeDetectionStrategy, Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/service/share-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'eat-and-drink-component',
  templateUrl: './eat-and-drink.component.html',
  styleUrls: ['./eat-and-drink.component.css'],
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
    trigger('slideInOut', [
      state('in', style({ right: '0' })), // Sidebar visibile (entra dalla destra)
      state('out', style({ right: '-85%' })), // Sidebar nascosta (esce verso destra)
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ]  
})
export class EatAndDrinkComponent implements OnInit{

  constructor(private shareDataService: ShareDataService , private router: Router){}

  disabledMeat= false;
  disabledFish= false;
  disabledPizza = false;
  disabledAll= false;

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


  //Prendo valore checkbox specialita
  onCheckMeat(){
    this.disabledFish = !this.disabledFish;
    this.disabledPizza = !this.disabledPizza;
    this.disabledAll = !this.disabledAll;
  }

  onCheckFish(){
    this.disabledMeat = !this.disabledMeat;
    this.disabledPizza = !this.disabledPizza;
    this.disabledAll = !this.disabledAll;
  }

  onCheckPizza(){
    this.disabledMeat = !this.disabledMeat;
    this.disabledFish = !this.disabledFish;
    this.disabledAll = !this.disabledAll;
  }

  onCheckAll(){
    this.disabledFish = !this.disabledFish;
    this.disabledMeat = !this.disabledMeat;
    this.disabledPizza = !this.disabledPizza;
  }

}
