import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl, delete_assignment_url,get_innovations_url, create_assignment_url, get_assignments_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  AddAssignmentsForm: FormGroup;
  assignments = [];
  formState = 'add';
  form_data: any;
  innovations: any;
  fileData: File;
  file_url = '';
  formData  =  new FormData();
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.AddAssignmentsForm = this.formBuilder.group({
          innovation: new FormControl('', Validators.compose([Validators.required])),
          title: new FormControl('', Validators.compose([Validators.required])),
          deadline: new FormControl('', Validators.compose([Validators.required])),
          file: new FormControl('', ),
          description: new FormControl('', Validators.compose([Validators.required])),
          id: new FormControl(''),
        });
    
        this.get_innovations();  
        this.get_assignments();

  }
  
  handleFileupload(e) {
    this.fileData = e.target.files[0];
    console.log(this.fileData)
    this.formData.append('document', this.fileData);
    // const formData  =  new FormData();
    // formData.append('document', this.fileData);
  }
  

  get_innovations(){
    const payload = { }
    this.administrationService.getrecords(get_innovations_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.innovations = res;
      }
    })
  }

  reset_form(){
    this.formState = 'add';
    this.file_url = '';
    this.AddAssignmentsForm.reset();
  }

  get_assignments(){
    const payload = { }
    this.administrationService.getrecords(get_assignments_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.assignments = res;
      }
    })
  }


  
  add_assignment(){
    if (this.AddAssignmentsForm.valid) {
      const payload = this.AddAssignmentsForm.value;
      this.formData.append('payload', JSON.stringify(payload));
      this.loadingService.showloading();
      this.administrationService.postrecord(create_assignment_url, this.formData).subscribe((res) => {
        if (res) {
          console.log(res);
          this.get_assignments();
          this.toastService.showToastNotification('success', 'Assignment Submitted Successfully', '');
          this.AddAssignmentsForm.reset();  
        } 
        this.loadingService.hideloading();
      });
      
    } else {
      // console.log(this.AddAssignmentsForm.value)
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.AddAssignmentsForm);

    }
  }


  view_assignment(id){
    for(let assignment of this.assignments){
      if (assignment.id == id){
        this.formState = 'edit';
        const innovation = assignment.innovation.id;
        if(assignment.file && assignment.file.trim()){
          console.log(assignment.file);
          this.file_url = serverurl + assignment.file;
        }
        assignment.file = "";
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
        this.get_assignments();
        this.toastService.showToastNotification('success', 'Assignment Deleted Successfully', '');
      } 
      this.loadingService.hideloading();
    });
  }


  ngOnInit(): void {

  }

}
