import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private ProductService:ProductService,
    private route:ActivatedRoute,
    private router:Router) { }

  currentproduct:any;
  categoryName:any;
  selectedfile:any;
  submitted = false;
  id:any;

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.readCategories();
  }

  readCategories():void{
    this.ProductService.getAll().subscribe({
      next: (products ) => {
        this.categoryName=products;
        console.log(products);
      },
      error: (error) => {
        console.log(error);
      }
      })
    }

  getProduct(id:any):void{
    this.ProductService.read(id).subscribe({
        next: (products ) => {
          console.log(products);
          this.currentproduct=products;
        },
        error: (error) => {
          console.log(error);
        }
    })
  }

  fileSelected(event:any){
    this.selectedfile = event.target.files[0];
    this.currentproduct.ProductPhoto=this.selectedfile.name;
  }
  updateProduct(): void {
  this.ProductService.update(this.id,this.currentproduct).subscribe({
    next: (response) => {
      console.log(response);
      this.submitted = true;
    },
    error: (error) => {
      console.log(error);
    }
    })
  };

  showUserDeleteBox():void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
      )
      this.ProductService.delete(this.id).subscribe({
        next: (products ) => {
          console.log(products);
          this.router.navigate(['/products'])
        },
        error: (error) => {
          console.log(error);
        }
        })
    }
  })
  }
}