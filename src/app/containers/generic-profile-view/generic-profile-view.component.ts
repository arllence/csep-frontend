import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../common-module/shared-service/toast.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { serverurl, get_complete_profile,  } from '../../app.constants';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AdministrationService } from '../../administration/services/administration.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
// import { element } from 'protractor';
@Component({
  selector: 'app-generic-profile',
  templateUrl: './generic-profile-view.component.html',
  styleUrls: ['./generic-profile-view.component.css']
})
export class GenericProfileViewComponent implements OnInit {

  profile_info = null;

  serverurl = serverurl
  picture_link: string;
  candidate_id: string;

  
  constructor(private formBuilder: FormBuilder,
    public router: Router,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService, private route: ActivatedRoute) {
        this.candidate_id = this.route.snapshot.paramMap.get('id');
        console.log(this.candidate_id);
        if(this.candidate_id){
          this.get_complete_profile();
        }
  }

  get_complete_profile(){
    const payload = {
      "candidate_id": this.candidate_id
    }
    this.administrationService.getrecords(get_complete_profile,payload).subscribe((res) => {
      if(res) {
        console.log(res)
        const pic_link =  res['profile_picture']['profile_picture'];
        // console.log(pic_link);
        if (pic_link && pic_link !== '' && pic_link !== undefined ){
          this.picture_link = serverurl + res['profile_picture']['profile_picture'];        
        }
        this.profile_info = res;    
        const user_info = {
          "bio": res['profile_info']['bio'],
          "gender": res['profile_info']['gender'],
          "phone": res['profile_info']['phone'],
          "id_number": res['profile_info']['id_number'],
          "age_group": res['profile_info']['age_group'],
          "disability": res['profile_info']['disability'],
          "country": res['profile_info']['country'],
          "state": res['profile_info']['state'],
          "city": res['profile_info']['city'],
          "address": res['profile_info']['address'],
          "postal": res['profile_info']['postal_code'],
          "level_of_education": res['profile_info']['education_level'],
          "employment": res['profile_info']['employment_status'],
          "skills": res['skills']
        }    
      }
    })
  }
 




  ngOnInit(): void {
  }

}
