import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  constructor(private productService:ProductService) { }
  
  products:any;
  imgUrl:any="assets/img/be7cbd20057cbabf1bfa89a611150869.jpg";
  
  ngOnInit(): void {
    this.readProducts();
  }

  readProducts():void{
  this.productService.readAll().subscribe({
    next: (products ) => {
      this.products=products;
    },
    error: (error) => {
      console.log(error);
    }
    })}
}