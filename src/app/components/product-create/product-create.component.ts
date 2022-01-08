import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  
  constructor(private productService: ProductService) {}

  product = {
    ProductName: '',
    ProductPrice: 0.0,
    ProductPhoto:'',
    NumberInStock:0,
    CatId:0
  };
  
  categoryName:any;
  submitted = false;
  
  fileSelected(event:any){
    let fileToUpload = event.target.files[0];
    this.product.ProductPhoto=fileToUpload.name;
  }

  ngOnInit(): void {
    this.readCategories();
  }

  readCategories():void{
    this.productService.getAll().subscribe({
      next: (products ) => {
        this.categoryName=products;
      },
      error: (error) => {
        console.log(error);}
      })
    }

  createProduct(): void {
    const data = {
      ProductName: this.product.ProductName,
      ProductPrice: this.product.ProductPrice,
      ProductPhoto: this.product.ProductPhoto,
      NumberInStock: this.product.NumberInStock,
      CatId:this.product.CatId
    };
    
  this.productService.create(data).subscribe({
    next: (response) => {
      this.submitted = true;
    },
    error: (error) => {
      console.log(this.product);
      console.log(error);
    }
    })
  };

  newProduct():void{
    this.submitted=false;
    this.product={
      ProductName: '',
      ProductPrice: 0.0,
      ProductPhoto: '',
      NumberInStock:0,
      CatId:0
    };
  }
}