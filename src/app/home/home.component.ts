import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { HttpService } from '../service/http.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  eatAndDrink = false;

  sideBarOpened!: boolean;
  usernameUserLogged = "";
  userMail = sessionStorage.getItem("user");
  nameUserLogged = "";
  testoTextareaValue: any;

  constructor(private router: Router, private shareDataService: ShareDataService, private http: HttpService){}

  ngOnInit(): void {

    //icona cerca true all inizio
    this.shareDataService.sendDataHideSearchImg(false);

    let userLoggato = sessionStorage.getItem("user");

    if(userLoggato == null){
      this.router.navigateByUrl("/login");
    }

    this.http.cercaUtente("http://localhost:8080/searchUser?email=" + this.userMail,
     { withCredentials: true }).subscribe((result: any) => {
      if(result && result.hasOwnProperty("message")){
        this.usernameUserLogged = "@" + result["user"].username;
        this.nameUserLogged = result["user"].nome;
      }
    })

    this.shareDataService.openProfile$.subscribe(value => {
      this.sideBarOpened = value;
    });

    //CONTROLLO SE DA ALTRI COMPONENTI VIENE CLICCATO AIUTACI A MIGLIORARE APP
    this.shareDataService.helpUsVisible$.subscribe(value => {
      this.helpUs = value;

      if(this.helpUs){
        this.homeContent = false;
        this.cityClicked = false;
        this.shareDataService.sendDataHideSearchImg(true);
        this.shareDataService.cosaFare$.subscribe(value => {
          this.cosaFare = value;
        })
      }
    })
    
    //TORNO DAL EAT AND DRINK COMPONENT
    this.shareDataService.cosaFare$.subscribe(value => {
      this.cosaFare = value
      if(this.cosaFare){
        this.cityClicked = true;
        this.shareDataService.sendDataHideSearchImg(true);
      }
    })

  }

  //AIUTACI A MIGLIORARE L'APP
  helpUs!: boolean
  onRiceviDatiFromFooter(booleanValues: any){
    this.homeContent = booleanValues.homeMainContent;
    this.cityClicked = booleanValues.cityClicked;
  }

  //PRENDO TESTO DA TEXTAREA
  testoTextarea!: string;
  onReadTextArea(e: Event){
    this.testoTextarea = (<HTMLInputElement>e.target).value;
  }


  //al click invia
  textAreaError = false;
  errorMsgTextArea = "";
  confirmMessage = "";
  messageSended = false;
  caricaInvio = false;
  onSendHelpUsMessage(){
    
    if(!this.testoTextarea || this.testoTextarea == ""){
      this.textAreaError = true;
      this.errorMsgTextArea = "Attenzione: campo obbligatorio";

      setTimeout(()=>{
        this.textAreaError = false;
      } , 2500)
    }else{

      let url = "http://localhost:8080/getMessageHelp";
      let helpUsMessage = {
        username: this.usernameUserLogged,
        message: this.testoTextarea,
      }
      let httpOptions = { withCredentials: true };
      
      this.caricaInvio = true;

      this.http.inviaMailPerAiutarci(url, helpUsMessage, httpOptions).subscribe((result: any)=> {

        if(result && result.hasOwnProperty("Confirm")){
          this.caricaInvio = false;
          this.messageSended = true;
          this.confirmMessage = result["Confirm"]

          setTimeout(()=> {
            this.messageSended = false;
          } , 2500)

        }else{
          this.textAreaError = true;
          this.errorMsgTextArea = "Attenzione: errore durante l'invio del messaggio";

          setTimeout(()=>{
            this.textAreaError = false;
          } , 2500)
        }

      })

    }

  }
  
  //TORNO INDIETRO DALLA NAVBAR
  onRiceviDatiFromNavbar(booleanValues: any){
    this.homeContent = booleanValues.homeMainContent;
    this.cityClicked = booleanValues.cityClicked;
    this.shareDataService.cosaFare$.subscribe((value => {
      this.cosaFare = value;
    }))
  }


  //HOME ROMA
  homeContent = true;
  cityClicked = false;
  cosaFare = false;
  onClickRoma(){
    this.homeContent = false;
    this.cityClicked = true;
    this.shareDataService.sendDataHideSearchImg(true)
    this.cosaFare = true;
  }


  //AL CLICK DI MANGIARE E BERE
  onClickMangiareBere(){
    this.router.navigateByUrl("/home/MangiareBere")
  }

  //AL CLICK di PARTY E ATTIVITA
  onClickPartyAttivita(){
    this.router.navigateByUrl("/home/PartyAttivita")
  }


  //TORNO INDIETRO DALLA PAGINA DELLA SCELTA ATTIVITA
  onClickBackToFirstPage(){
    this.homeContent = true;
    this.cityClicked = false;
    this.cosaFare = false;
    this.shareDataService.sendDataHideSearchImg(false);
  }


}
