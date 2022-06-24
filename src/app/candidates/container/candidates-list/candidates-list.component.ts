import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,delete_note_url,filter_innovations_url, create_note_url, get_notes_url, fetch_candidate_positions_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-candidates-list-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {
  candidates = []; 
  serverurl = serverurl;
  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {

    
        this.get_candidates(); 
  }
  

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

  view_applicant(candidate_id){
    this.router.navigate(['candidate-profile', candidate_id]);
  } 


  ngOnInit(): void {

  }

}
