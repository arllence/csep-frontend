import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ValidatorService } from '../../../services/validator.service';
import { LoadingService } from '../../../../common-module/shared-service/loading.service';
import { ToastService } from '../../../../common-module/shared-service/toast.service';
import { get_innovations_url,filter_innovations_url, im_analytics_url, pending_final_review_url,completed_final_review_url } from '../../../../app.constants';
import { Subject } from 'rxjs';
import { DocumentsList } from '../../../interfaces/validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.css']
})
export class GeneralReportsComponent implements OnInit {
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
  hide_filter_form: boolean = false;
  pending_report: boolean = false;

  
  constructor(private router: Router, private loadingService: LoadingService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public validatorService: ValidatorService,  private formBuilder: FormBuilder, private route: ActivatedRoute,) { 
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
    // this.fetchRecords();
    let action = this.route.snapshot.paramMap.get('slug');
    if (action){
      this.hide_filter_form = true;
      if (action === 'pending-final-report'){
        this.pending_report = true;
        this.fetchPfr();
        this.gsa_toggler();
      }
    } else {
      this.hide_filter_form = false;
      this.fetchImAnalytics();
      this.filterinnovations()
    }    
    
  }

  view_records(innovation_id){
    this.router.navigate(['reports/view', innovation_id]);
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

  fetchPfr() {
    // this.loadingService.showloading();
    const payload = {

    };
     this.validatorService.getrecords(pending_final_review_url, payload).subscribe((res) => {
      //  console.log(res);
       this.records = res;
       this.loadingService.hideloading();

      //  this.dtTrigger.next();

     }, (err) => {
      //  this.loadingService.hideloading();

     });
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

  complete_pending_report(request_id) {

      const payload = {
        'request_id': request_id,
      };
      this.sweetalertService.showConfirmation('Confirmation', 'Reporting will be closed! Do you wish to proceed?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.validatorService.postrecord(completed_final_review_url, payload).subscribe((response) => {
            if (response) {
              this.loadingService.hideloading();
              // this.sweetalertService.showAlert('Success', 'Department Successfully Swapped', 'success');
              this.toastService.showToastNotification('success', 'Reporting Closed Successfully', '');
              this.fetchPfr();
            }
          });
          this.loadingService.hideloading();
        } else {

        }
      });

  }

}

