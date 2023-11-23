import { Component , OnInit, DoCheck} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { SocialAuthService } from '@abacritt/angularx-social-login'
import { HttpService } from '../service/http.service';
import { UserToRegister } from '../entity/user-to-register';
import { Router } from '@angular/router';

@Component({
  selector: 'user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.css'],
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule ],
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
export class UserSignComponent implements OnInit {

  constructor(private router: Router , private http: HttpService, private snackBar: MatSnackBar){}

  startAnimation = true;

  ngOnInit():void {
    setTimeout(()=> {
      this.startAnimation = false;
    } , 1500)

    let userLoggato = sessionStorage.getItem("user");

    if(userLoggato != null){
      this.router.navigateByUrl("/home");
    }
  }
  

  //CHECKBOX LOGIN O REGISTRAZIONE
  checkboxElement!: HTMLInputElement;
  onReadChecboxSlider(e: Event){
    this.checkboxElement = e.target as HTMLInputElement;
    this.borderNameError = false;
    this.borderLastNameError = false;
    this.borderAgeError = false;
    this.borderUsernameError = false;
    this.borderMailError = false;
    this.borderPsswError = false;
    this.borderLogMailError = false;
    this.borderLogPsswError = false;
  }


  //PRENDO VALORE INPUT PER REGISTRAZIONE
  nome = "";
  cognome = "";
  eta = "";
  username = "";
  mailDiRegistrazione = "";
  psswDiRegistrazione = "";
  //Nome
  onReadNome(e: Event){
    this.nome = (<HTMLInputElement>e.target).value;
    this.borderNameError = false;
  }

  //Cognome
  onReadCognome(e: Event){
    this.cognome = (<HTMLInputElement>e.target).value;
    this.borderLastNameError = false;
  }

  //Data di nascita
  onReadEta(e: Event){
    this.eta = (<HTMLInputElement>e.target).value;
    this.borderAgeError = false;
  }

  //Username
  onReadUsername(e: Event){
    this.username = (<HTMLInputElement>e.target).value;
    this.borderUsernameError = false;
  }

  //Email
  onReadRegisterMail(e: Event){
    this.mailDiRegistrazione = (<HTMLInputElement>e.target).value;
    this.borderMailError = false;
  }

  //Password
  onReadRegisterPassword(e: Event){
    this.psswDiRegistrazione = (<HTMLInputElement>e.target).value;
    this.borderPsswError = false;
  }

  
  //CLICK registrati
  errorRegister = false;
  errorMessageRegister = "";

  borderNameError = false;
  borderLastNameError = false;
  borderAgeError = false;
  borderUsernameError = false;
  borderMailError = false;
  mailUnvalid = false;
  borderPsswError = false;
  psswUnvalid = false;
  usernameUnvalid = false;

  msgPsswUnvalid = "";
  msgMailUnvalid = "";
  msgUsernameUnvalid = "";

  onClickRegister(){
    if((!this.nome || this.nome == "") || (!this.cognome || this.cognome == "") || (!this.eta || this.eta == "") || (!this.username || this.username == "") ||
     (!this.mailDiRegistrazione || this.mailDiRegistrazione == "") || (!this.psswDiRegistrazione || this.psswDiRegistrazione == "")){

      if(!this.nome || this.nome == ""){
        this.borderNameError = true;
      }

      if(!this.cognome || this.cognome == ""){
        this.borderLastNameError = true;
      }
     
      if(!this.eta || this.eta == ""){
        this.borderAgeError = true;
      }
      
      if(!this.username || this.username == ""){
        this.borderUsernameError = true;
      }
      
      if(!this.mailDiRegistrazione || this.mailDiRegistrazione == ""){
        this.borderMailError = true;
      }

      if(!this.psswDiRegistrazione || this.psswDiRegistrazione == ""){
        this.borderPsswError = true;
      }
    
      this.errorRegister = true;
      this.errorMessageRegister = "Attenzione: campi obbligatori";

      setTimeout(()=>{
        this.errorRegister = false;
      } , 3000)

    } else {

      const psswregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(!psswregex.test(this.psswDiRegistrazione) || !emailRegex.test(this.mailDiRegistrazione) || this.username.length > 8 ){

        if(!emailRegex.test(this.mailDiRegistrazione)){
          this.borderMailError = true;
          this.mailUnvalid = true;
          this.msgMailUnvalid = "Attenzione: inserire una mail valida";

          setTimeout(()=>{
            this.mailUnvalid = false;
          } , 3000)
        }

        if(!psswregex.test(this.psswDiRegistrazione)){
          this.borderPsswError = true;
          this.psswUnvalid = true;
          this.msgPsswUnvalid = "Attenzione la password deve contenere almeno una lettera maiuscola , un numero, un carattere speciale e deve avere una lunghezza di almeno 8 caratteri."
        
          setTimeout(()=>{
            this.psswUnvalid = false;
          } , 3000)
        }

        if(this.username.length > 8 && this.username.length < 3){
          this.borderUsernameError = true;
          this.usernameUnvalid = true;
          this.msgUsernameUnvalid = "Attenzione: l'username può contenere massimo 8 caratteri e minimo 3!";

          setTimeout(()=> {
            this.usernameUnvalid = false;
          }, 3000)
        }
      }else{

        let url = "http://localhost:8080/register"; //da cambiare con url finale != da localhost
        let user = new UserToRegister(this.nome, this.cognome, this.eta.toString(), this.username, this.mailDiRegistrazione, this.psswDiRegistrazione);
        let httpOptions = { withCredentials: true }

        this.http.registerUser(url, user, httpOptions).subscribe((result: any) => {
          if(result.hasOwnProperty("message")){
          
            this.snackBar.open("✔ " +  result["message"] , '' ,{
              duration: 3000
            });

            setTimeout(()=>{
              this.checkboxElement.checked = false;//torno al login
            } , 3300)

          }else {
            this.errorRegister = true;
            this.errorMessageRegister = result["error"];

            setTimeout(()=>{
              this.errorRegister = false;
            } , 3000)
          }
        })

      }
    }
  }


  //CLICK ACCEDI
  loginMail = "";
  loginPassword = "";

  errorLogin = false;
  borderLogMailError = false;
  borderLogPsswError = false;
  errorMsgLogin = "";

  //leggo email
  onReadMailLogin(e: Event){
    this.loginMail = (<HTMLInputElement>e.target).value;
    this.borderLogMailError = false;
  }

  //leggo password
  onReadPasswordLogin(e: Event){
    this.loginPassword = (<HTMLInputElement>e.target).value;
    this.borderLogPsswError = false;
  }

  //al click login

  onClickLogin(){

    if((!this.loginMail || this.loginMail == "") || (!this.loginPassword || this.loginPassword == "")){
      
      if(!this.loginMail || this.loginMail == "") {
        this.errorLogin = true;
        this.borderLogMailError = true;
      }

      if(!this.loginPassword || this.loginPassword == ""){
        this.errorLogin = true;
        this.borderLogPsswError = true;
      }

      this.errorMsgLogin = "Attenzione: campi obbligatori";

      setTimeout(()=>{
        this.errorLogin = false;
      } , 3000)

    }else{

      let url = "http://localhost:8080/log"; //da cambiare con url finale != da localhost
      let user = {
        email : this.loginMail,
        password : this.loginPassword
      }
      let httpOptions = { withCredentials: true }
      
      this.http.login(url, user, httpOptions).subscribe((result: any)=> {
        
        if(result.hasOwnProperty("message")){

          sessionStorage.setItem("user" , result["userAuth"]);
          this.router.navigateByUrl("/home");

        }else{

          this.errorLogin = true;
          this.errorMsgLogin = result["error"];

          setTimeout(()=>{
            this.errorLogin = false;
          } , 3000)    

        }

      })

    }

  }

}
