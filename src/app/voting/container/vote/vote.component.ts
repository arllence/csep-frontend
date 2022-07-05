import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,fetch_candidates_url, create_voter_token_url, check_voter_token_url, create_vote_url, check_has_voted_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  tokenForm: FormGroup;
  candidates: any;
  serverurl = serverurl
  positions = []
  code_valid: boolean = false;
  already_voted = false;
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.tokenForm = this.formBuilder.group({
          token: new FormControl('', Validators.compose([Validators.required]))
        });
     
        this.get_candidates();
        this.has_voted();

  }

  

  extract_positions(res){
    for (let item of res) {
      // let pos = {};
      // pos[item.position] = ""
      this.positions.push({"position": item.position, "candidate": ""})
    }
  }

  get_candidates(){
    const payload = { }
    this.administrationService.getrecords(fetch_candidates_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.extract_positions(res)
        this.candidates = res;
      }
    })
  }

  handle_vote(position, candidate_id){
    for (let item of this.positions){
      if (item.position == position){
        item.candidate = candidate_id
      }
    }
  }

  submit_vote(){
    let err = false;
    for (let item of this.positions){
      if (item.candidate == ""){
        err = true;
        this.toastService.showToastNotification('error', item.position + ' Is Required!', '');
      }
    }
    if (!err) {
      this.sweetalertService.showConfirmation('','Do you wish to proceed?').then((res) => {
        this.loadingService.showloading();
        this.administrationService.postrecord(create_vote_url, this.positions).subscribe((res) => {
          if (res) {
            console.log(res);
            this.already_voted = true;
            this.toastService.showToastNotification('success', 'Successful', '');
            this.tokenForm.reset();  
          } 
          this.loadingService.hideloading();
        });
      });
    }
    
    
  }


  
  verify_code(){
    if (this.tokenForm.valid) {
      const payload = this.tokenForm.value;
      console.log(payload)
      this.loadingService.showloading();
      this.administrationService.postrecord(create_voter_token_url, payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.code_valid = true;
          this.toastService.showToastNotification('success', 'Successful', '');
          this.tokenForm.reset();  
        } 
        this.loadingService.hideloading();
      });
      
    } else {
      console.log(this.tokenForm.value)
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.tokenForm);

    }
  }

  has_voted(){
    const payload = {}

    this.loadingService.showloading();
    this.administrationService.getrecords(check_has_voted_url, payload).subscribe((res) => {
      if (res) {
        if (res['status']){
          this.already_voted = true;
        } else {
          this.is_voter();
        }
      } 
      this.loadingService.hideloading();
    });
  }

  is_voter(){
    const payload = {}

    this.loadingService.showloading();
    this.administrationService.getrecords(check_voter_token_url, payload).subscribe((res) => {
      if (res) {
        if (res['status']){
          this.code_valid = true;
        }
      } 
      this.loadingService.hideloading();
    });
  }


  ngOnInit(): void {

  }

}
