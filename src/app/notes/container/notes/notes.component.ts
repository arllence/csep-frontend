import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,delete_note_url,filter_innovations_url, create_note_url, get_notes_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class EvaluationNotesComponent implements OnInit {
  AddNotesForm: FormGroup;
  innovations: any;
  notes = [];
  noteState = 'add';
  form_data: any;
 
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

        this.AddNotesForm = this.formBuilder.group({
          innovation: new FormControl('', Validators.compose([Validators.required])),
          title: new FormControl('', Validators.compose([Validators.required])),
          note: new FormControl('', Validators.compose([Validators.required])),
          id: new FormControl(''),
        });
    
        this.get_innovations();  
        this.get_notes();

  }
  

  get_innovations(){
    const payload = { 
      "stage":"ALL",
      "status":"ALL"
    }
    this.administrationService.getrecords(filter_innovations_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.innovations = res;
      }
    })
  }

  reset_form(){
    this.noteState = 'add';
    this.AddNotesForm.reset();
  }

  get_notes(){
    const payload = { }
    this.administrationService.getrecords(get_notes_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.notes = res;
        this.form_data = res;
      }
    })
  }


  add_notes(){
    if (this.AddNotesForm.valid) {
      const payload = this.AddNotesForm.value;
      this.loadingService.showloading();
      this.administrationService.postrecord(create_note_url, payload).subscribe((res) => {
        if (res) {
          console.log(res);
          this.toastService.showToastNotification('success', 'Note Submitted Successfully', '');
          this.AddNotesForm.reset();
          this.noteState = 'add';
          this.get_notes();        
        } 
        this.loadingService.hideloading();
      });
      
    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.AddNotesForm);

    }
  }

  view_note(id){
    for(let note of this.notes){
      if (note.id == id){
        this.noteState = 'edit';
       const innovation = note.innovation.id;
        this.AddNotesForm.patchValue(note);
        this.AddNotesForm.patchValue({"innovation": innovation});
        break;
      }
    }
  }

  delete_note(id){
    const payload = {
      "note_id": id
    }
    this.loadingService.showloading();
    this.administrationService.postrecord(delete_note_url, payload).subscribe((res) => {
      if (res) {
        this.get_notes();
        this.toastService.showToastNotification('success', 'Note Deleted Successfully', '');
      } 
      this.loadingService.hideloading();
    });
  }


  ngOnInit(): void {

  }

}
