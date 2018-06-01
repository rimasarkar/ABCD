import { TransactionHistoryService } from './TransactionHistoryService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {
  page = 1;
  enterpriseItemId: string;
  formActive = false;
  error: string;
  product: any =  { data: {}, schema: {} };
  records:any=[];
  data:any=[];
  rowdata:any=[];
  pagerdata:any=[];
  recordcount:any;
  productcontenthistoryrowdata:any=[];
  transactionHeader:any= new Array();
  jsonFormOptions: any = {
    addSubmit: false,
    debug: false,
    loadExternalAssets: true,
    returnEmptyFields: false
  };
  constructor(private transactionHistoryService: TransactionHistoryService,private route: ActivatedRoute) { 
    // this.route.params.subscribe(res => this.enterpriseItemId = res.id);
  }

  generateForm(data) {
    this.formActive = false;
    this.transactionHistoryService.getSchema().subscribe(schema => {
      this.product.schema = schema;
     this.data = data.transactionHeader;    
      let rec=new Array();
     let count=0;
      for (let entry of this.data) {       
        rec.push(entry);
       console.log("count :"+count);
       count=count+1;       
      }     
      this.rowdata=rec;
      // console.log(JSON.stringify(rec));
      this.product.data=rec[0];      
      this.productcontenthistoryrowdata=this.rowdata[0].productContentHistory;
      this.formActive = true;
      console.log("size of records :"+this.rowdata.length);
      this.pagerdata=this.rowdata[0];
    });
    
  }

  ngOnInit() {
   
    this.transactionHistoryService.getProduct(this.enterpriseItemId).subscribe(data => {
     //console.log("data from get :"+JSON.stringify(data));
      this.generateForm(data);
    }, err => {
      this.error  = err.error;
    });
   

  }
  showproductcontentistory(id){
    // alert(id);
    let num=id-1;
    this.productcontenthistoryrowdata=this.rowdata[num].productContentHistory;
  }
  onPager(event: number): void {
    //debugger;
    console.log("Pager event Is: ", event)
    this.pagerdata=this.rowdata[event-1];
    this.productcontenthistoryrowdata=this.rowdata[event-1].productContentHistory;
    //this.gotoTopic(event - 1);
  }
}
