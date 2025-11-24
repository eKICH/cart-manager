import { Component, inject } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as ProductActions from '../../store/action/product.actions';

@Component({
  selector: 'app-product',
  imports: [ProductList, FaIconComponent],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private store = inject(Store<AppState>);

  searchIcon = faSearch;

  onSearch(term: string): void {
    this.store.dispatch(ProductActions.setSearchTerm({searchTerm: term}));
  }

}
