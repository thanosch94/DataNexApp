import { ProductsService } from './../services/products.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { DocumentProductDto } from '../dto/document-product.dto';
import { ProductDto } from '../dto/product.dto';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

export class ProductsViewModel {
  service: string;
  headers: any;
  constructor(private productsService: ProductsService) {}

  public GetAll() {
    return this.productsService.GetAll().pipe(
      catchError((error) => {
        //log Error
        return of([]);
      })
    );
  }

  public GetLookup() {
    return this.productsService.GetLookup().pipe(
      catchError((error) => {
        //log Error
        return of([]);
      })
    );
  }

  public GetById(id: Guid) {
    return this.productsService.GetById(id).pipe(
      catchError((error) => {
        //log Error
        let data = new ProductDto();
        return of(data);
      })
    );
  }
  public GetBySku(sku: string) {
    return this.productsService.GetBySku(sku).pipe(
      catchError((error) => {
        //log Error
        let data = new ProductDto();
        return of(data);
      })
    );
  }

  public InsertDto(product: ProductDto) {
    return this.productsService.InsertDto(product).pipe(
      catchError((error) => {
        //log Error
        return of(product);
      })
    )
  }

  public UpdateDto(product: ProductDto) {
    return this.productsService.UpdateDto(product).pipe(
      catchError((error) => {
        //log Error
        return of(product);
      }))
  }
  public DeleteById(id: Guid) {
    return this.productsService.DeleteById(id).pipe(
      catchError((error) => {
        //log Error
        let data = new ProductDto();
        return of(data);
      }))
  }
}
