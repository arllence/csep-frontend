import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../../../services/validator.service';
import { LoadingService } from '../../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../../common-module/shared-service/toast.service';
import { get_innovations_url,filter_innovations_url, im_analytics_url, get_innovation_url, serverurl } from '../../../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../../../interfaces/validator';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-submission-report',
  templateUrl: './submission-report.component.html',
  styleUrls: ['./submission-report.component.css']
})
export class GeneralSubmissionComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};
  public dtTrigger = new Subject<any>();
  records: DocumentsList[] = [];
  searchString: string;
  public searchForm: FormGroup;
  im_analytics: any;
  gsa_toggler_status = true;
  gsa_toggler_name = 'Close';
  innovation_id: string;
  active = 1;
  innovation_data = [];
  serverurl = serverurl;
  view_all_ie_reviews: boolean = false;
  view_all_ee_reviews: boolean = false;
  view_all_sme_reviews: boolean = false;

  
  constructor(private router: Router, private loadingService: LoadingService,
    public toastService: ToastService, public validatorService: ValidatorService,  private formBuilder: FormBuilder,private route: ActivatedRoute, ) { 
      this.searchForm = this.formBuilder.group({
        status: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
        stage: new FormControl('ALL', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100) ])),
      });
    }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      retrieve: true,
    };
    this.innovation_id = this.route.snapshot.paramMap.get('id');
    this.get_innovation(this.innovation_id)
    // this.fetchRecords();
    // this.fetchImAnalytics();
    // this.filterinnovations()
  }
  get_innovation(innovation_id){
    const payload = {
      "innovation_id": innovation_id
     }
    this.validatorService.getrecords(get_innovation_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);        
        this.innovation_data = res;      
      }
    })
  }

  toggle_view_all_ie_reviews(){
    this.view_all_ie_reviews = !this.view_all_ie_reviews
  }
  toggle_view_all_ee_reviews(){
    this.view_all_ee_reviews = !this.view_all_ee_reviews
  }
  toggle_view_all_sme_reviews(){
    this.view_all_sme_reviews = !this.view_all_sme_reviews
  }

  gsa_toggler(){
    this.gsa_toggler_status = !this.gsa_toggler_status
    this.gsa_toggler_name = this.gsa_toggler_name == 'Close' ? "View" : "Close";
  }

  filterinnovations() {
    if (this.searchForm.valid) {
      const search_payload = {
        'status': this.searchForm.value['status'],
        'stage': this.searchForm.value['stage'],
      };
      this.loadingService.showloading();
      this.validatorService.getrecords(filter_innovations_url, search_payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.records = res;
          this.loadingService.hideloading();
          if(res.length == 0) {
            this.toastService.showToastNotification('info', 'No Innovation Found', '');
          }
        }

      });

    } else {
      this.toastService.showToastNotification('warning', 'Please correct errors to proceed', '');
      this.validatorService.markFormAsDirty(this.searchForm);
    }
  }


  fetchImAnalytics() {
    // this.loadingService.showloading();
    const payload = {

    };
     this.validatorService.getrecords(im_analytics_url, payload).subscribe((res) => {
      //  console.log(res);
       this.im_analytics = res;
       this.loadingService.hideloading();

      //  this.dtTrigger.next();

     }, (err) => {
      //  this.loadingService.hideloading();

     });
   }



  fetchRecords() {
    this.loadingService.showloading();
    const payload = {

    };
     this.validatorService.getrecords(get_innovations_url, payload).subscribe((res) => {
       console.log(res);
       this.records = res;
       this.loadingService.hideloading();

       this.dtTrigger.next();

     }, (err) => {
       this.loadingService.hideloading();

     });
   }

   rerenderTable(): void {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       // Destroy the table first
       dtInstance.destroy();
     });
   }
  //  capture_metadata(file_id){
  //    this.router.navigate(['surveyofkenya/document-preview',file_id]);

  //  }

}

