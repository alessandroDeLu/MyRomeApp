import { CommonModule } from '@angular/common';
import { Component , EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { ShareDataService } from 'src/app/service/share-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ MatSidenavModule , CommonModule],
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
      state('void', style({
        maxHeight: '0',
        transform: 'translateX(100%)',
        overflow: 'hidden'
      })),
      transition(':enter', [
        style({
          maxHeight: '0',
          overflow: 'hidden'
        }),
        animate('150ms ease-out', style({
          maxHeight: '100vh',
          transform: 'translateX(0)',
          overflow: 'hidden'
        }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({
          transform: 'translateX(100%)',
          maxHeight: '0',
          overflow: 'hidden'
        }))
      ])
    ])
  ]  
})
export class NavbarComponent implements OnInit {

  constructor(private shareDataService: ShareDataService, private http: HttpService, private router: Router){}

  userMail = sessionStorage.getItem("user");
  userLoggedDetails!: any;
  userLoggedNameLastName!: any;
  userUsername!: any;
  myUsername!: any;
  inizialiUtente!: any;

  backHome!: boolean;

  ngOnInit(): void {

    //hide search img
    this.shareDataService.hideSearchImage$.subscribe( value => {
      this.backHome = value;
    })

    let url = "http://localhost:8080/searchUser?email=" + this.userMail;
    let httpOption = { withCredentials: true }
    this.http.cercaUtente(url, httpOption).subscribe((result: any) => {

      if(result){
        this.userLoggedDetails = result["user"];
        this.userLoggedNameLastName = this.userLoggedDetails.nome + " " + this.userLoggedDetails.cognome;
        this.userUsername = "@" +  this.userLoggedDetails.username;
        this.myUsername = this.userLoggedDetails.username;
        this.inizialiUtente = (this.userLoggedDetails.nome[0] + (this.userLoggedDetails.cognome.includes(" ") ? this.userLoggedDetails.cognome.split(" ").map((word: any[]) => word[0]).join('') : this.userLoggedDetails.cognome[0]));      
      }
    })

  }

  //back arrow to cerca
  @Output() mandaDatiEventFromNavbar = new EventEmitter<any>() //per tornare al main content
  homeMainContent = false;
  onClickHome(){
    this.backHome = false;
    let booleanData = {
      homeMainContent: true,
      cityClicked: false
    }
    this.mandaDatiEventFromNavbar.emit(booleanData)
    this.shareDataService.sendDataApplyHelpUsVisible(false)
    this.shareDataService.sendDataBackToCosaFare(false);
    this.router.navigateByUrl("/home")
  }

  //apri input ricerca
  lentecliccata = false;
  onClickOpenInput(){
    this.lentecliccata = !this.lentecliccata

    setTimeout(()=>{
      this.lentecliccata = false;
    }, 10000)
  }

  //sidebar
  sideBarOpen = false;
  iconProfileOpen = true;
  onClickIconProfile(e: Event){
    this.sideBarOpen = true;
    this.shareDataService.sendDataOpenProfileToFooter(this.sideBarOpen);
    this.iconProfileOpen = false;
  }

  onCloseSideBar(){
    this.sideBarOpen = false;
    this.iconProfileOpen = true;
    this.shareDataService.sendDataOpenProfileToFooter(this.sideBarOpen);
  }

  //MYPROFILE
  onClickMyProfile(){
    this.router.navigateByUrl("home/myProfile")
  }

  //LOGOUT
  onClickLogout(){
    let url = "http://localhost:8080/exit";
    let httpOption = { withCredentials: true };
    this.http.logout(url, {}, httpOption).subscribe((result: any)=>{

      if(result["userAuth"] == null){
        sessionStorage.clear();
        location.reload()
      }

    })
  }

}
