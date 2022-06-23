import { Component, OnInit } from '@angular/core';
import {
  my_innovations_url, general_counts_url, junior_counts_url, check_completed_profile
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  all_notices:any;
  my_innovations = null;
  general_counts: any;
  junior_counts: any;

  constructor(public administrationService: AdministrationService,
    public loadingService:LoadingService,
    public router: Router,
    public sweetalertService: SweetalertService,) { }

  ngOnInit() {
    // this.fetch_notices();
    // this.get_my_innovations();
    // this.get_general_counts();
    // this.get_junior_counts();
    this.check_completed_profile();
  }

  assigned(){
    this.router.navigate(['/startup/innovations']);
  }

  submissions_slug(action){
    this.router.navigate(['/reports/submissions', action]);
  }
  
  myInnocationsClick(){
    this.router.navigate(['dashboard/innovations']);
  }
  // routeToInnovations(){
  //   this.router.navigate(['startup/innovations']);
  // }

  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res)
        const status = res['status'];
        if (status !== true) {
          this.sweetalertService.showAlert('Create Profile!', 'Update Your Profile Before Proceeding', 'warning');
          this.router.navigate(['/profile']);
        } 
      }
    })
  }
  get_my_innovations(){
    const payload = {

    }
    this.administrationService.getrecords(my_innovations_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.my_innovations = res;
      }
    })
  }

  get_general_counts(){
    const payload = {

    }
    this.administrationService.getrecords(general_counts_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.general_counts = res;
      }
    })
  }

  get_junior_counts(){
    const payload = {

    }
    this.administrationService.getrecords(junior_counts_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.junior_counts = res;
      }
    })
  }


  create_innovation(){
    this.router.navigate(['/profile/add-innovation']);
  }
  review_completed(id,status){
    this.administrationService.set_innovation_id(id);
    this.administrationService.set_innovation_status(status);
    this.router.navigate(['/profile/add-innovation']);
  }
  check_my_innovations(){
    this.router.navigate(['/dashboard/innovations']);
  }
  fetch_notices(){
    // let payload = {};
    // this.loadingService.showloading();
    // this.administrationService.getrecords(list_notifications_url,payload).subscribe((res)=>{
    //   this.all_notices = res;
    //   this.loadingService.hideloading();
    // });
  }

}
