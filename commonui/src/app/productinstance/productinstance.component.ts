import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductinstanceService } from './productinstance.service';

@Component({
  selector: 'app-productinstance',
  templateUrl: './productinstance.component.html',
  styleUrls: ['./productinstance.component.css']
})

export class ProductinstanceComponent implements OnInit {

  enterpriseItemId: string;
  formActive = false;
  error: string;
  product: any =  { data: {}, schema: {} };
  jsonFormOptions: any = {
    addSubmit: false,
    debug: false,
    loadExternalAssets: true,
    returnEmptyFields: false
  };

  constructor(private productinstanceService: ProductinstanceService, private route: ActivatedRoute) {
    this.route.params.subscribe(res => this.enterpriseItemId = res.id);
  }

  generateForm(data) {
    this.formActive = false;
    this.productinstanceService.getSchema().subscribe(schema => {
      this.product.schema = schema;
      this.product.data = data;
      this.formActive = true;
    });
  }

  ngOnInit() {
    this.productinstanceService.getProduct(this.enterpriseItemId).subscribe(data => {
      this.generateForm(data);
    }, err => {
      this.error  = err.error;
    });
  }
}
