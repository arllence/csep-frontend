import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { create_candidate_position_url, delete_candidate_position_url, fetch_candidate_position_url, fetch_positions_url, serverurl, } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {
 
  positionForm: FormGroup;
 
  active = 1
  positions = [];
  my_positions = [];

  
  constructor(private formBuilder: FormBuilder,
      public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {


        this.positionForm = this.formBuilder.group({
          position: new FormControl('', Validators.compose([Validators.required]))
        });

        this.get_positions(); 
        this.get_candidate_position();
        // this.get_assigned_innovations(); 
        // this.fetchallroles();

  }
  

 

  reset_form(){

  }

  // fetchallroles() {
  //   const payload = {
  //   };
  //   this.administrationService.getrecords(list_user_roles, payload).subscribe((res) => {
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
  //   this.administrationService.getrecords(list_users_with_role, payload).subscribe((res) => {
  //     this.assignees = res;
  //     // console.log(this.assignees);

  //   });
  // }

  

  get_positions(){
    const payload = { }
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_positions_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);        
        this.positions = res;      
        this.loadingService.hideloading(); 
      }
    })
  }

  get_candidate_position(){
    const payload = { }
    this.loadingService.showloading();
    this.administrationService.getrecords(fetch_candidate_position_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);        
        this.my_positions = res;      
        this.loadingService.hideloading(); 
      }
    })
  }

 

  create_position(){
    if (this.positionForm.valid) {
      const payload = this.positionForm.value
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed Applying for this Position?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(create_candidate_position_url, payload).subscribe((res) => {
            if (res) {
              this.get_candidate_position();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Application Successful', ''); 
            } 
            // this.loadingService.hideloading();
          });
        }
      });
    } else {
      console.log(this.positionForm.value);
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.positionForm);
    }
  }

  delete_position(){
    const payload = {}
      this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed Deleteing for this Position?').then((res) => {
        if (res) {
          this.loadingService.showloading();
          this.administrationService.postrecord(delete_candidate_position_url, payload).subscribe((res) => {
            if (res) {
              this.get_candidate_position();
              this.loadingService.hideloading();
              this.toastService.showToastNotification('success', 'Position Deleted successfully', ''); 
            } 
            // this.loadingService.hideloading();
          });
        }
      });
    } 


  

  

  ngOnInit(): void {

  }

}
