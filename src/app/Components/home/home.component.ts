import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icategory } from 'src/app/Models/icategory';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  
  
  categorylist: Icategory[] = [];
  prdlisticat: Iproduct[] = [];
  cartlist:Icart[]=[];
  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService,
    private cartservice:CartService,
    private rot:Router,
    private whishlistservic:WhishlisService
  ) {

    this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
    

  }
  ngOnChanges(): void {
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    ////////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  ngOnInit(): void {
    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    });
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    /////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  addtocart(prod :Iproduct){

    this.cartservice.addtocart(prod).subscribe({
     next:(prod)=>{
     this.rot.navigate(['/'])
      },

      error:(err)=>{
        alert("error")
      }
    })
  }

  addtowishlist(prod :Iproduct){

    this.whishlistservic.addwishlistdata(prod).subscribe({
     next:(prod)=>{
     this.rot.navigate(['/'])
      },

      error:(err)=>{
        alert("error")
      }
    })
  }

  opendtails(prdid: number) {
    this.rot.navigate(['product', prdid]);
    // console.log()
  }


}
