import { Component, OnInit } from '@angular/core';
import { TitanService } from '../services/Titan/titan.service';
import { OlmHeader } from '../model/olmHeader';

@Component({
  selector: 'app-olm-details',
  templateUrl: './olm-details.component.html',
  styleUrls: ['./olm-details.component.css']
})
export class OlmDetailsComponent implements OnInit {

  olmheader: OlmHeader;
  categorylist: any[];
  languageDetails: any[];
  paymentDetails: any[];
  constructor(
    private titanService: TitanService    
  ) { }

  ngOnInit() {

    this.titanService.getOlmData("OLMDEV2").subscribe(olmdata => {
      console.log(olmdata);
      this.olmheader = olmdata.YextLocationData;  
      console.log(this.olmheader.yextRequestId)    ;
      this.languageDetails =olmdata.YextLanguageDetails;
      this.categorylist = olmdata.YextCategoryList;
      this.paymentDetails = olmdata.YextPaymentDetails;
    },
      err => {
        console.log('An error has occured while retreving data from Olm');
      }
    )
  }

}
