import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { innovator_has_read_reviews_url, my_innovations_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-innovation-dashboard',
  templateUrl: './innovation-dashboard.component.html',
  styleUrls: ['./innovation-dashboard.component.css']
})
export class InnovationDashboardComponent implements OnInit {
 
  all_notices:any;
  my_innovations = null;
  im_reviews = [];
  innovation_data = [];
  lead_innovation_review = false;
  is_im_review_view: boolean = false;

  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

      }
    
  create_innovation(){
    this.router.navigate(['/profile/add-innovation']);
  }

  review_completed(id,status,is_innovator=false){
    this.administrationService.set_innovation_id(id);
    this.administrationService.set_innovation_status(status);
    this.administrationService.set_is_innovator(is_innovator);
    this.router.navigate(['/profile/add-innovation']);
  }
  

  ngOnInit(): void {
    this.get_my_innovations();
  }

  get_my_innovations(){
    const payload = {

    }
    this.loadingService.showloading();
    this.administrationService.getrecords(my_innovations_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.my_innovations = res;
        this.loadingService.hideloading(); 
      }
    })
  }

  toogle_im_review(){
    this.lead_innovation_review = !this.lead_innovation_review;
    this.is_im_review_view = !this.is_im_review_view;
  }

  retrieve_im_reviews(index){
    this.is_im_review_view = true;
    // console.log(index);
    this.innovation_data = this.my_innovations[index];
    // console.log(this.innovation_data);
    this.lead_innovation_review = true;
  }

  innovator_has_read_reviews(innovation_id){
    const payload = {
      'innovation_id' : innovation_id
    }

    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed? You won\'t be able to see this review again!').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(innovator_has_read_reviews_url,payload).subscribe((res) => {
            if(res) {
              this.loadingService.hideloading(); 
              this.toogle_im_review();
              this.get_my_innovations();                
            }
          })
        }
      });
  }

  // get_innovation_manager_reviews(innovation_id){
  //   const payload = {
  //     'innovation_id' : innovation_id
  //   }
  //   this.administrationService.getrecords(get_innovation_manager_review_url,payload).subscribe((res) => {
  //     if(res) {
  //       console.log(res);
  //       let review = res['review'];
  //       review['innovation'] = res['innovation'];
  //       this.IMEvaluationForm.patchValue(review);
  //     }
  //   })
  // }

}
