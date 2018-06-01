import { Component, OnInit } from '@angular/core';
import { TitanService } from '../services/Titan/titan.service';
import { SeoHeader } from '../model/seoHeader';

@Component({
  selector: 'app-seo-details',
  templateUrl: './seo-details.component.html',
  styleUrls: ['./seo-details.component.css']
})
export class SeoDetailsComponent  implements OnInit{
  
  seoheader: SeoHeader;
  categorylist: any[];
  websiteurllist: any[];
  constructor(
    private titanService: TitanService
  ) { }

  ngOnInit() {
    
    this.titanService.getSeodata("1079").subscribe(seodata => {
      
      this.seoheader = seodata.product;      
      this.websiteurllist = seodata.WebsiteUrlList;
      this.categorylist = seodata.CategoryList;
    },
      err => {
        console.log('An error has occured while retreving data from Titan Seo');
      }
    )
  }

}
