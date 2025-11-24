import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { Observable } from 'rxjs';

import { selectCartTotalQuantity } from '../../store/selector/cart.selector'
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  store = inject(Store<AppState>);
  totalQuantity$: Observable<number>;

  cartManager = signal('Cart Manager');
  cartIcon = faCartShopping;
  cartCount: number = 0;


  constructor(){
    this.totalQuantity$ = this.store.select(selectCartTotalQuantity);
  }

 

}
