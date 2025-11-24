import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header,FontAwesomeModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('cart-manager');


  constructor(library: FaIconLibrary){
    library.addIcons(faCartShopping, faSearch)

  }

}
