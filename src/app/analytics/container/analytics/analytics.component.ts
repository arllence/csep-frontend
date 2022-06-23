import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,monthly_user_registration_url,general_counts_url, user_by_gender_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-analytics-list',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  general_counts = [];
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {    
        this.get_registered_users();  
        this.get_general_counts();
        this.get_user_by_gender();
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public monthsLabels =  ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  public userRole = ['Role']
  public registeredUsersData = [];
  public generalCountData = [];
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public doughnutChartLabels = ['Male', 'Female'];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  

  get_registered_users(){
    const payload = { }
    this.administrationService.getrecords(monthly_user_registration_url,payload).subscribe((res) => {
      if(res) {
        this.registeredUsersData = (res['series']);
      }
    })
  }
  get_general_counts(){
    const payload = { }
    this.administrationService.getrecords(general_counts_url,payload).subscribe((res) => {
      if(res) {
        this.generalCountData = res['series'];
        this.general_counts = res;
      }
    })
  }
  get_user_by_gender(){
    const payload = { }
    this.administrationService.getrecords(user_by_gender_url,payload).subscribe((res) => {
      if(res) {
        this.doughnutChartData = res['series'];
      }
    })
  }

 


  ngOnInit(): void {

  }

}
