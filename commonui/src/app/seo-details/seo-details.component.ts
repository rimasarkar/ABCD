import { SeoService } from './seo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seo-details',
  templateUrl: './seo-details.component.html',
  styleUrls: ['./seo-details.component.css']
})
export class SeoDetailsComponent implements OnInit {

  enterpriseId : String;
  formActive = false;
  error: string;
  seoData: any =  { data: {}, schema: {}};
  jsonFormOptions: any = {
    addSubmit: false,
    debug: false,
    loadExternalAssets: true,
    returnEmptyFields: false
  };


  constructor(private seoService: SeoService, private route: ActivatedRoute, private _router:Router) {
    this.route.params.subscribe(res => this.enterpriseId = res.id);
  }

  generateForm(data) {
    console.log(data);
    this.formActive = false;
    this.seoService.getSchema().subscribe(schema => {
      this.seoData.schema = schema;
      this.seoData.data = data;
      this.formActive = true;
      console.log(this.seoData);
    });
  }



  ngOnInit() {
    this.seoService.getSeoData(this.enterpriseId).subscribe(data => {
      this.generateForm(data);
    }, err => {
      this.error  = err.error;
    });
  }
  onBack(seoData) :void {    
    this._router.navigate(['/productinstance/' + seoData.data.ProductHeader.enterpriseItemId]);
  }
}
