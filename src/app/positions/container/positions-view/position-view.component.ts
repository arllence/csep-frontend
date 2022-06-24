import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { approve_candidate_position_url, create_candidate_position_url, delete_candidate_position_url, fetch_candidate_positions_url, fetch_candidate_position_url, fetch_positions_url, serverurl, } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['./position-view.component.css']
})
export class PositionViewComponent implements OnInit {
 
  positionForm: FormGroup;
 
  active = 1
  candidates = [];

  
  constructor(private formBuilder: FormBuilder,
      public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {


        this.positionForm = this.formBuilder.group({
          position: new FormControl('', Validators.compose([Validators.required]))
        });

        this.get_candidates();

  }
  

 

  reset_form(){

  }

  // fetchallroles() {
  //   const payload = {
  //   };
  //   this.administrationService.getrecords(view_user_roles, payload).subscribe((res) => {
  //     for (const record of res) {
  //       this.roles.push(record);
  //     }
  //   });
  // }

  // get_users_with_role(role) {
  //   this.assignForm.patchValue({"role": role});
  //   const payload = {
  //     "role_name" : role
  //   };
  //   this.assignees = [];
  //   this.administrationService.getrecords(view_users_with_role, payload).subscribe((res) => {
  //     this.assignees = res;
  //     // console.log(this.assignees);

  //   });
  // }


  get_candidates(){
    const payload = { }
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_candidate_positions_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);        
        this.candidates = res;      
        this.loadingService.hideloading(); 
      }
    })
  }

 

  // create_position(){
  //   if (this.positionForm.valid) {
  //     const payload = this.positionForm.value
  //     this.sweetalertService.showConfirmation('Confirmation',
  //     'Do you wish to proceed Applying for this Position?').then((res) => {
  //       if (res) {
  //         this.loadingService.showloading();
  //         this.administrationService.postrecord(create_candidate_position_url, payload).subscribe((res) => {
  //           if (res) {
  //             this.get_candidate_position();
  //             this.loadingService.hideloading();
  //             this.toastService.showToastNotification('success', 'Application Successful', ''); 
  //           } 
  //           // this.loadingService.hideloading();
  //         });
  //       }
  //     });
  //   } else {
  //     console.log(this.positionForm.value);
  //     this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
  //     this.administrationService.markFormAsDirty(this.positionForm);
  //   }
  // }

  approval(candidate_id,action){
    const payload = {
      "candidate_id":candidate_id,
      "action":action
    }
    this.sweetalertService.showConfirmation('Confirmation',
    'Do you wish to proceed with this Action?').then((res) => {
      if (res) {
        this.loadingService.showloading();
        this.administrationService.postrecord(approve_candidate_position_url, payload).subscribe((res) => {
          if (res) {
            this.get_candidates();
            this.loadingService.hideloading();
            this.toastService.showToastNotification('success', 'Action Successful', ''); 
          } 
        });
      }
    });
  } 

  view_applicant(candidate_id){
    this.router.navigate(['candidate-profile', candidate_id]);
  }  

  

  ngOnInit(): void {

  }

}
