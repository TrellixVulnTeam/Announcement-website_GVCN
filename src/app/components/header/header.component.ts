import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  isannounceDetail: boolean = false;
  isAccount: boolean = false;
  routerSubscription!: Subscription;
  authSubscription!: Subscription;
  isAuth: boolean = false;
  userLetter: string = '';

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe( (event:any) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
  }
  
  handleRouteChange() {
   (this.router.url.includes('announce-list/')) ? this.isannounceDetail = true : this.isannounceDetail = false;
   (this.router.url.includes('account')) ? this.isAccount = true : this.isAccount = false;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  
}
