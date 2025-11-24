import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { catchError, map, Observable, throwError } from "rxjs";

type ApiProductDtO = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}


@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private http = inject(HttpClient);
    private apiUrl = 'https://fakestoreapi.com/products';

    getProducts(): Observable<Product[]> {

        return this.http.get<ApiProductDtO[]>(this.apiUrl).pipe(
            map(apiProducts => {
                const products: Product[] = apiProducts.map(apiProduct => ({
                    id: apiProduct.id,
                    name: apiProduct.title,
                    description: apiProduct.description,
                    price: apiProduct.price,
                    prodImage: apiProduct.image,
                    stock: Math.floor(apiProduct.rating.count / 10) || 5,
                }));

                return products;
            }),
            catchError(error => {
                console.error("Product Service Failed", error);
                return throwError(() => error);
            })
        );
    }





}