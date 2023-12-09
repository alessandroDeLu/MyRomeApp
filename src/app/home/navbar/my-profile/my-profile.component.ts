import { Component , OnInit} from '@angular/core';
import { UserToRegister } from 'src/app/entity/user-to-register';
import { HttpService } from 'src/app/service/http.service';
import { ShareDataService } from 'src/app/service/share-data.service';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { UpdateUserData } from 'src/app/entity/update-user-data';
import { merge, mergeMap } from 'rxjs';


@Component({
  selector: 'my-profile-component',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
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
export class MyProfileComponent implements OnInit{

  constructor(private shareDataService: ShareDataService , private http: HttpService, private router: Router){}

  buttonName = "Invia modifica"

  private userLoggedMail = sessionStorage.getItem("user");
  private user!: UserToRegister;

  inizialiUtente = "";
  myMail = "";
  currentPassword = "CrptPssw";
  currentUsername = "";

  valueUsername = "";
  valuePssw = "";

  ngOnInit(): void {

    if(this.userLoggedMail == null){
      this.router.navigateByUrl("/login");
    }
    
    this.shareDataService.sendDataHideSearchImg(true);
    this.shareDataService.sendDataOpenProfileToFooter(false);

    this.http.cercaUtente("http://localhost:8080/searchUser?email=" + this.userLoggedMail , {withCredentials: true}).subscribe((result: any)=> {
      this.user = result["user"];

      //prima lettera del nome e la prima lettera dopo uno spazio nel cognome
      this.inizialiUtente = (this.user.nome[0] + (this.user.cognome.includes(" ") ? this.user.cognome.split(" ").map(word => word[0]).join('') : this.user.cognome[0]));

      this.currentUsername = this.user.username;
      this.myMail = this.user.email;
      this.valueUsername = this.currentUsername;
      this.valuePssw = this.currentPassword;
    })
  }

  //UPDATE
  disabledUsername = true;
  disabledPssw = true;  

  //upd username
  newUsername = "";
  savedUsername = false;

  onReadNewUsername(e: Event){
    this.newUsername = (<HTMLInputElement>e.target).value;
  }

  onClickAbleUpdateUsername(){
    this.disabledUsername = false;
    this.savedUsername = false;
  }

  onClickSaveNewUsername(){
    this.disabledUsername = true;
    if(this.newUsername){
      this.valueUsername = this.newUsername;
    }else{
      this.valueUsername = this.currentUsername;
    }
    
    return this.savedUsername = true;
  }

  onClickDisableUpdateUsername(){
    this.disabledUsername = true;
    this.valueUsername = this.currentUsername;
  }

  //upd password
  newPassword = "";
  savedPassword = false;

  onReadNewPassword(e: Event){
    this.newPassword = (<HTMLInputElement>e.target).value;
  }

  onClickAbleUpdatePassword(){
    this.disabledPssw = false;
    this.savedPassword = false;
    this.valuePssw = "";
  }

  onClickSaveNewPassword(){
    this.disabledPssw = true;

    if(this.newPassword){
      this.valuePssw = this.newPassword;
    }else{
      this.valuePssw = this.currentPassword;
    }

    return this.savedPassword = true;
  }

  onClickDisableUpdatePassword(){
    this.disabledPssw = true;
    this.valuePssw = this.currentPassword;
  }




  ///al click del bottone modifica
  unchangedFields = false;
  usernameChanged = false;
  psswChanged = false;

  caricaInvio = false;
  confirmMsg =""
  errorMsg = "Attenzione: dati non modificati";

  onClickUpdate(){
    const psswregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    if((!this.savedUsername || this.valueUsername == this.currentUsername) && (!this.savedPassword || this.valuePssw == this.currentPassword)){

      this.unchangedFields = true;

      setTimeout(()=>{
        this.unchangedFields = false;
      }, 2500)

    }else{
      let updateUrl = "http://localhost:8080/update";
      let searchUserUrl = "http://localhost:8080/searchUser?email=" + this.myMail;
      let httpOptions = { withCredentials: true };

      if((this.savedUsername && this.valueUsername != this.currentUsername) && (this.savedPassword && this.valuePssw != this.currentPassword)){

        if((this.valueUsername.length < 9 && this.valueUsername.length > 2) && psswregex.test(this.valuePssw)){
          let updateUserData = new UpdateUserData(this.myMail, "all" , this.valueUsername, this.valuePssw);
          this.caricaInvio = true;
  
          this.http.updateUser(updateUrl, updateUserData, httpOptions).pipe(mergeMap(()=>{
            return this.http.cercaUtente(searchUserUrl, httpOptions);
          })).subscribe((result: any)=>{
            this.caricaInvio = false;

            let userNew = result["user"];
  
            this.currentUsername = userNew.username;
            this.valueUsername = this.currentUsername;

            this.valuePssw = "NPasswrd";
            this.currentPassword = this.valuePssw;

            this.usernameChanged , this.psswChanged = true;
            this.confirmMsg = "Username e password modificati con successo";

            setTimeout(()=>{
              this.usernameChanged, this.psswChanged = false;
            } , 2500)

          })

        } else {

          if(this.valueUsername.length > 8 || this.valueUsername.length < 3){
            this.valueUsername = this.currentUsername;
            this.errorMsg = "L'username può contenere massimo 8 caratteri e minimo 3!";
            this.unchangedFields = true;

            setTimeout(()=>{
              this.unchangedFields = false;
            }, 3500)

          }  

          if(!psswregex.test(this.valuePssw)){
            this.valuePssw = this.currentPassword;
            this.errorMsg = "Attenzione la password deve contenere almeno una lettera maiuscola , un numero, un carattere speciale e deve avere una lunghezza di almeno 8 caratteri."
            this.unchangedFields = true;

            setTimeout(()=>{
              this.unchangedFields = false;
            }, 4500)
          }
        }

      } else {

        if(this.savedUsername && this.valueUsername != this.currentUsername){

          if((this.valueUsername.length < 9) && (this.valueUsername.length > 2)){
            let updateUserData = new UpdateUserData(this.myMail, "username" , this.valueUsername, null);
            this.caricaInvio = true;
  
            this.http.updateUser(updateUrl, updateUserData, httpOptions).pipe(mergeMap(()=>{
              return this.http.cercaUtente(searchUserUrl, httpOptions);
            })).subscribe((result: any)=>{
              this.caricaInvio = false;

              let userNew = result["user"];
  
             // this.inizialiUtente = (this.user.nome[0] + (this.user.cognome.includes(" ") ? this.user.cognome.split(" ").map(word => word[0]).join('') : ""));
  
              this.currentUsername = userNew.username;
              this.valueUsername = this.currentUsername;
  
              this.usernameChanged = true;
              this.confirmMsg = "Username modificato con successo";

              setTimeout(()=> {
                this.usernameChanged = false;
              } , 2500)
            })

          }else{
            this.valueUsername = this.currentUsername;
            this.errorMsg = "L'username può contenere massimo 8 caratteri e minimo 3!";
            this.unchangedFields = true;

            setTimeout(()=>{
              this.unchangedFields = false;
            }, 3500)
          }

        }else if(this.savedPassword && this.valuePssw != this.currentPassword){
          
          if(psswregex.test(this.valuePssw)){
            let updateUserData = new UpdateUserData(this.myMail, "password" , this.valuePssw, null);
            this.caricaInvio = true;

            this.http.updateUser(updateUrl, updateUserData, httpOptions).pipe(mergeMap(()=>{
              return this.http.cercaUtente(searchUserUrl, httpOptions);
            })).subscribe((result: any)=>{
              this.caricaInvio = false;

              this.valuePssw = "NPasswrd";
              this.currentPassword = this.valuePssw;

              this.psswChanged = true;
              this.confirmMsg = "Password modificata con successo";

              setTimeout(()=> {
                this.psswChanged = false;
              } , 2500)
            })

          }else{
            this.valuePssw = this.currentPassword;
            this.errorMsg += "Attenzione la password deve contenere almeno una lettera maiuscola , un numero, un carattere speciale e deve avere una lunghezza di almeno 8 caratteri."
            this.unchangedFields = true;

            setTimeout(()=>{
              this.unchangedFields = false;
            }, 4500)
          }

        }
      }  

    }


  }

}
