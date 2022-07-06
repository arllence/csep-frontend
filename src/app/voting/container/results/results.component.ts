import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,check_has_voted_url, fetch_candidates_results_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
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
      this.positions.push({"position": item.position, "candidate": ""})
    }
  }

  get_candidates(){
    const payload = { }
    this.administrationService.getrecords(fetch_candidates_results_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.extract_positions(res)
        this.candidates = res;
      }
    })
  }


  has_voted(){
    const payload = {}

    this.loadingService.showloading();
    this.administrationService.getrecords(check_has_voted_url, payload).subscribe((res) => {
      if (res) {
        if (res['status']){
          this.already_voted = true;
        } else {
          this.toastService.showToastNotification('warning', 'To access results, please Vote', '');
          this.router.navigate(['voting/vote']);
        }
      } 
      this.loadingService.hideloading();
    });
  }



  ngOnInit(): void {

  }

}
