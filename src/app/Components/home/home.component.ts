import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { IProductService } from 'src/app/Services/iproduct.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  categorylist: ICategory[] = [];
  prdlisticat: IProduct[] = [];
  prd: IProduct | undefined = undefined;
  @Input() receveid: number = 0;
  decrease(catt: any) {
    return catt.quantity--;
  }
  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService
  ) {}
  ngOnChanges(): void {
   
    this.prdapisevice.getprdbycatid(this.receveid).subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
    ////////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  ngOnInit(): void {
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    /////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  /////////////////////////////
  searchprd(prdname: string) {
    let foundprd = this.prdapisevice.searchprdbyname(prdname);
    if (foundprd) {
      this.prd = foundprd;
    } else {
      alert('not found');
    }
  }
}
