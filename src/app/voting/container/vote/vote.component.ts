import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl, delete_assignment_url, create_assignment_response_url, fetch_candidates_url } from '../../../app.constants';
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
  AddAssignmentsForm: FormGroup;
  submitAssignmentsForm: FormGroup;
  assignments = [];
  formState = 'add';
  form_data: any;
  innovations: any;
  fileData: File;
  file_url = '';
  formData  =  new FormData();

  candidates: any;
  serverurl = serverurl
  positions = []
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.AddAssignmentsForm = this.formBuilder.group({
          innovation: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
          title: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
          deadline: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
          file: new FormControl({value: '', disabled: true}, ),
          description: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required]))
        });

        this.submitAssignmentsForm = this.formBuilder.group({
          file: new FormControl('', ),
          response: new FormControl('', Validators.compose([Validators.required])),
          assignment_id: new FormControl('', Validators.compose([Validators.required]))
        });
     
        this.get_candidates();

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
    console.log(this.positions)
  }


  
  add_assignment_response(){
    if (this.submitAssignmentsForm.valid) {
      const payload = this.submitAssignmentsForm.value;
      console.log(payload)
      this.formData.append('payload', JSON.stringify(payload));
      this.loadingService.showloading();
      this.administrationService.postrecord(create_assignment_response_url, this.formData).subscribe((res) => {
        if (res) {
          console.log(res);
          // this.get_assignments();
          this.toastService.showToastNotification('success', 'Assignment Response Submitted Successfully', '');
          this.submitAssignmentsForm.reset();  
        } 
        this.loadingService.hideloading();
      });
      
    } else {
      console.log(this.submitAssignmentsForm.value)
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.submitAssignmentsForm);

    }
  }


  view_assignment(id){
    for(let assignment of this.assignments){
      if (assignment.id == id){
        this.formState = 'edit';
        const innovation = assignment.innovation.details.innovation_name;
        if(assignment.file && assignment.file.trim()){
          this.file_url = serverurl + assignment.file;
        }
        // assignment.file = "";
        this.AddAssignmentsForm.patchValue(assignment);
        this.AddAssignmentsForm.patchValue({"innovation": innovation});
        break;
      }      
    }
  }

  delete_assignment(id){
    const payload = {
      "assignment_id": id
    }
    this.loadingService.showloading();
    this.administrationService.postrecord(delete_assignment_url, payload).subscribe((res) => {
      if (res) {
        // this.get_assignments();
        this.toastService.showToastNotification('success', 'Assignment Deleted Successfully', '');
      } 
      this.loadingService.hideloading();
    });
  }


  ngOnInit(): void {

  }

}
