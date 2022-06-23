import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../common-module/shared-service/sweetalerts.service';
import { ToastService } from '../../../common-module/shared-service/toast.service';
import { LoadingService } from '../../../common-module/shared-service/loading.service';
import { serverurl,innovation_review_url,get_innovation_information_url,innovator_has_read_reviews_url,get_complete_profile,create_profile_url,check_completed_profile, upload_document_url, industries_url, development_stages_url, intellectual_properties_url, support_services_url, hubs_url, innovation_id_url, create_innovation_url, innovation_details_url, innovation_information_url, innovation_additional_details_url, my_innovations_url,complete_innovation_url,get_innovation_details_url,update_innovation_details_url, get_innovation_additional_details_url,delete_support_service_url } from '../../../app.constants';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AdministrationService } from '../../../administration/services/administration.service';
import { subscribeToIterable } from 'rxjs/internal-compatibility';
// import { NgxTagsInputModule } from 'ngx-tags-input';
@Component({
  selector: 'app-innovation-profile',
  templateUrl: './innovation-profile.component.html',
  styleUrls: ['./innovation-profile.component.css']
})
export class InnovationProfileComponent implements OnInit {
  public ChangePasswordForm: FormGroup;
  termsForm: FormGroup;
  innovationDetailsForm: FormGroup;
  innovationInformationForm: FormGroup;
  innovationAdditionalDetailsForm: FormGroup;
  action_required_menu = false;
  fileData: File = null;
  picture_link = null;
  awards_or_recognitions = false;
  has_awards = false;
  hub_details = false;
  other_industry = false;
  ip_attachment = false;
  other_hub_name = false;
  accreditation_bodies_details = false;
  support_services = null;
  intellectual_properties = null;
  development_stages = null;
  industries = null;
  hubs = null;
  services: string[] = [];
  username = 'Innovator';
  serverurl =serverurl;

  // innovation_id = "8f0eed50-5004-400f-b2e1-129ba397bb27";
  innovation_id = null;
  details_id = null;
  information_id = null;
  support_services_id = null;
  inovation_links_id = null;

  step_one = false;
  step_one_update = false;
  step_two = false;
  step_two_update = false;
  step_three = false;
  step_three_update = false;
  step_four = false;
  step_four_update = false;
  step_five = false;
  step_five_update = false;
  step_six = false;
  step_six_update = false;
  title = null;
  my_innovations = null;
  innovation_data_check = false;
  innovation_data = [];
  splitPattern = [","];
  ip_documents: any;
  services_required: boolean;
  services_fetched: string[];
  completed_innovation = false;



  
  constructor(private formBuilder: FormBuilder,
     public sweetalertService: SweetalertService, public toastService: ToastService,
      public loadingService: LoadingService,
      public router: Router,
      public administrationService: AdministrationService,
      public authenticationService: AuthenticationService) {
    
    this.termsForm = this.formBuilder.group({
      submission_terms: new FormControl(true, Validators.compose([Validators.required])),
    });

    this.innovationDetailsForm = this.formBuilder.group({
      innovation: new FormControl('', ),
      innovation_name: new FormControl('', Validators.compose([Validators.required])),
      industry: new FormControl('', Validators.compose([Validators.required])),
      other_industry: new FormControl('',),
      area_of_focus: new FormControl('', Validators.compose([Validators.required])),
      development_stage: new FormControl('', Validators.compose([Validators.required])),
      is_pitched_before: new FormControl('', Validators.compose([Validators.required])),
      has_won_awards: new FormControl('',),
      awards: new FormControl('',),
      recognitions: new FormControl('',),
      require_accreditation: new FormControl('', Validators.compose([Validators.required])),
      accreditation_bodies: new FormControl('',),
      hub_affiliation: new FormControl('',),
      hub_name: new FormControl('', ),
      other_hub_name: new FormControl('', ),
      intellectual_property: new FormControl('', Validators.compose([Validators.required])),
      // ip_file: new FormControl('', Validators.compose([Validators.required])),
    });

    this.innovationInformationForm = this.formBuilder.group({
      innovation: new FormControl('', ),
      innovation_brief: new FormControl('', Validators.compose([Validators.required])),
      problem_statement: new FormControl('', Validators.compose([Validators.required])),
      background_research: new FormControl('', Validators.compose([Validators.required])),
      target_customers: new FormControl('', Validators.compose([Validators.required])),
      value_proposition: new FormControl('', Validators.compose([Validators.required])),
      solution: new FormControl('', Validators.compose([Validators.required])),
      how_it_works: new FormControl('', Validators.compose([Validators.required])),
      impact: new FormControl('', Validators.compose([Validators.required])),
      competitors: new FormControl('', Validators.compose([Validators.required])),
      competitive_advantage: new FormControl('', Validators.compose([Validators.required])),
    });

    this.innovationAdditionalDetailsForm = this.formBuilder.group({
      innovation: new FormControl('',),
      other_support: new FormControl('',),
      innovation_video: new FormControl('', Validators.compose([Validators.required])),
      website: new FormControl('', ),
      facebook: new FormControl('', ),
      twitter: new FormControl('', ),
      instagram: new FormControl('', ),
      linkedin: new FormControl('', ),
    })

    this.action_required_menu =  this.authenticationService.requiresPasswordChange();
    
    this.check_completed_profile();    
    // this.get_innovation_id();    
    // this.get_innovation_review();
    // console.log(this.messageEvent.emit());

  }
  
  check_completed_profile(){
    const payload = {

    }
    this.administrationService.getrecords(check_completed_profile,payload).subscribe((res) => {
      if(res) {
        // console.log(res)
        const status = res['status'];
        if (status !== true) {
          this.sweetalertService.showAlert('Create Profile!', 'Update Your Profile Before Proceeding', 'warning');
          this.router.navigate(['/profile']);
        } else {
          this.get_username();
          this.get_support_services();
          this.get_industries();
          this.get_intellectual_properties();
          this.get_development_stages();
          this.get_hubs();
          this.get_my_innovations();
          this.get_completed_innovation_id();
        }
      }
    })
  }

  get_username(){
    this.authenticationService.getuserprofileInfo().then((res) => {
      this.username = res['first_name'];
    });
  }


  switch_listener(form_control_name){
    this.innovationDetailsForm.get(form_control_name).valueChanges.subscribe(value =>
      this.listener_switcher(form_control_name,value)
    );
  }

  

  listener_switcher(form_control_name:any,value:any){
    // console.log(form_control_name);
    // console.log(value);
    if(form_control_name == "is_pitched_before"){
      if(value === 'Yes') {
        this.awards_or_recognitions = true;
      } else {
        this.awards_or_recognitions = false;
      }
    } else if(form_control_name == "has_won_awards"){
      if(value === 'Yes') {
        this.has_awards = true;
      } else {
        this.has_awards = false;
      }
    } else if(form_control_name == "require_accreditation"){
      if(value === 'Yes') {
        this.accreditation_bodies_details = true;
      } else {
        this.accreditation_bodies_details = false;
      }
    } else if(form_control_name == "hub_affiliation"){
      if(value === 'Yes') {
        this.hub_details = true;
      } else {
        this.hub_details = false;
      }
    } else if(form_control_name == "industry_id"){
      if(value === 'Other') {
        this.other_industry = true;
      } else {
        this.other_industry = false;
      }
    } else if(form_control_name == "intellectual_property_id"){
      if(value === 'None') {
        this.ip_attachment = false;
      } else {
        this.ip_attachment = true;
        this.title = value;
      }
    } else if(form_control_name == "hub_name"){
      if(value === 'Other') {
        this.other_hub_name = true;
      } else {
        this.other_hub_name = false;
      }
    }
  }

  steps_switcher(step){
    if (step == 'one'){
      this.step_one = !this.step_one
      this.step_two = false
      this.step_three = false
      this.step_four = false
      this.step_five = false
      this.step_six = false
    } else if (step == 'two'){
      this.step_one = false
      this.step_two = true
      this.step_three = false
      this.step_four = false
      this.step_five = false
      this.step_six = false
    } else if (step == 'three'){
      this.step_one = false
      this.step_two = false
      this.step_three = true
      this.step_four = false
      this.step_five = false
      this.step_six = false
      this.get_step_three();
    } else if (step == 'four'){
      this.step_one = false
      this.step_four = true
      this.step_two = false
      this.step_three = false
      this.step_five = false
      this.step_six = false
      this.get_step_four();
    } else if (step == 'five'){
      this.services_required = false;
      this.step_five = true
      this.step_one = false
      this.step_two = false
      this.step_three = false
      this.step_four = false
      this.step_six = false
      this.get_step_five();
    } else if (step == 'six'){
      this.get_innovation_review();
      this.step_six = true
      this.step_one = false
      this.step_two = false
      this.step_three = false
      this.step_four = false
      this.step_five = false
    }
  }







  handleFileupload(e) {
    this.fileData = e.target.files[0];
    const formData  =  new FormData();
    const documentType = this.title;
    formData.append('document', this.fileData);
    if (documentType){
      formData.append('documentType', documentType);
      formData.append('checker', "INNOVATION");
      formData.append('innovation', this.innovation_id);
    } else {
      formData.append('documentType', 'profile_picture');
    }

    this.administrationService.postrecord(upload_document_url, formData).subscribe((res) => {
      if (res) {
        if (documentType) {
          // this.picture_link = serverurl + res['url_link'];
        } else {
          this.picture_link = serverurl + res['url_link'];
        }
      } else {
        this.loadingService.hideloading();
      }
    });
  }

  

  

  get_step_three(){
    const payload = {
      'innovation_id' : this.innovation_id
    }

    this.administrationService.getrecords(get_innovation_details_url,payload).subscribe((res) => {
      if(res) {
        try {
          res['industry'] = res['industry']['name'];
          res['development_stage'] = res['development_stage']['name'];
          this.ip_documents = res['ip_document'];
          if (res['intellectual_property'] == null){
            res['intellectual_property'] = "None";
          }
          
          this.listener_switcher('has_won_awards', res['has_won_awards']);
          this.listener_switcher('require_accreditation', res['require_accreditation']);
          this.listener_switcher('hub_affiliation', res['hub_affiliation']);
          this.listener_switcher('is_pitched_before', res['is_pitched_before']);
          // console.log(res);
          this.step_three_update = true;
          this.details_id = res['id'];
          // console.log(this.details_id);
          try {          
            let awards = [];
            let accredations = [];
            let recognitions = [];
            for (const recognition of res['recognitions']){
              recognitions.push(recognition.name);
            }
            for (const award of res['awards']){
              awards.push(award.name)
            }
            for (const accredation of res['accreditation_bodies'] ){
              accredations.push(accredation.name)
            }
            res['accreditation_bodies'] = accredations;
            if (res['intellectual_property'].length == 0){
              res['intellectual_property'] = 'None'
            } else {
              res['intellectual_property'] = res['intellectual_property']['name'];
            }
            res['awards'] = awards
            res['recognitions'] = recognitions
          } catch (e) {}
          this.innovationDetailsForm.patchValue(res);
        } catch (e) {} 
                  
      }
    })
  }

  get_step_four(){
    const payload = {
      'innovation_id' : this.innovation_id
    }

    this.administrationService.getrecords(get_innovation_information_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        try {          
          this.step_four_update = true;
          this.innovationInformationForm.patchValue(res);
        } catch (e) {} 
                  
      }
    })
  }

  get_step_five(){
    const payload = {
      'innovation_id' : this.innovation_id
    }
    console.log(payload);

    this.administrationService.getrecords(get_innovation_additional_details_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        try {          
          this.step_five_update = true;
          if(res['support_service']){
            const ss = res['support_service'] as string[]
            this.services = [...ss];
            this.services_fetched = [...ss];
          }          
          this.innovationAdditionalDetailsForm.patchValue(res);
        } catch (e) {} 
                  
      }
    })
  }

  get_innovation_review(){
    
      const payload = {
        'innovation_id' : this.innovation_id
      }
      this.administrationService.getrecords(innovation_review_url,payload).subscribe((res) => {
        if(res) {
          this.innovation_data = res;
        }
      })
    
  }

  patch_forms(innovation){
    const patch = {"innovation": innovation}
    this.innovationDetailsForm.patchValue(patch);
    this.innovationInformationForm.patchValue(patch);
    this.innovationAdditionalDetailsForm.patchValue(patch);
  }

  get_completed_innovation_id(){
    const id = this.administrationService.get_innovation_id()
    const is_innovator = this.administrationService.get_is_innovator()
    const innovation_status = String(this.administrationService.get_innovation_status())
    // console.log(is_innovator)
    // console.log(innovation_status)
    if (innovation_status == "COMPLETED"){
      this.completed_innovation = true;
    }
    if(id){
      // console.log(id);
      this.innovation_id = id;
      this.patch_forms(this.innovation_id);
      if (is_innovator){
        this.steps_switcher('three');
        this.administrationService.set_is_innovator(false)
      } else {
        this.steps_switcher('six');
      }
      this.get_innovation_review();   
      this.administrationService.set_innovation_id(false)  ; 
    } else {
      this.get_innovation_id();
    }
  }

  // CHECKS IF THERE IS AN ONGOING INNOVATION
  get_innovation_id(){
    const payload = {}
    this.administrationService.getrecords(innovation_id_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        if(res['id']){
          this.innovation_id = res['id'];
          this.patch_forms(this.innovation_id);
          this.steps_switcher('three');
          this.get_innovation_review();
        } else {
          this.step_one = true;
        }
      }
    })
  }

  get_my_innovations(){
    const payload = {

    }
    this.administrationService.getrecords(my_innovations_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.my_innovations = res['id'];
      }
    })
  }

  get_support_services(){
    const payload = {

    }
    this.administrationService.getrecords(support_services_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.support_services = res;
      }
    })
  }

  get_industries(){
    const payload = {

    }
    this.administrationService.getrecords(industries_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.industries = res;
      }
    })
  }

  get_development_stages(){
    const payload = {

    }
    this.administrationService.getrecords(development_stages_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.development_stages = res;
      }
    })
  }

  get_intellectual_properties(){
    const payload = {

    }
    this.administrationService.getrecords(intellectual_properties_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.intellectual_properties = res;
      }
    })
  }

  get_hubs(){
    const payload = {

    }
    this.administrationService.getrecords(hubs_url,payload).subscribe((res) => {
      if(res) {
        // console.log(res);
        this.hubs = res;
      }
    })
  }

  complete_profile(){
    const payload = {
      "innovation_id": this.innovation_id
    }
    // console.log(payload);
    this.sweetalertService.showConfirmation('Confirmation',
      'Do you wish to proceed submiting? You won\'t be able to Edit after Submission!').then((res) => {
        if (res) {
          this.administrationService.postrecord(complete_innovation_url,payload).subscribe((res) => {
            if(res) {
              // console.log(res);
              this.sweetalertService.showAlert('Success', 'Updated', 'success');
              this.router.navigate(['/dashboard/innovations']);
              // this.hubs = res;
            }
          })
        }
      });
  }

  update_services(value){
    try {
      if(this.services.length > 0) {
        const index = this.services.indexOf(value);
        if (index > -1) {
          this.services.splice(index, 1);
        } else {
          this.services.push(value);
        }
      } else{
        this.services.push(value);
      }      
      // console.log(this.services);
    } catch (e) {}
    
  }

  save_terms(){
    if (this.termsForm.valid) {

      const id = this.administrationService.get_innovation_id()
      const payload = this.termsForm.value
      // console.log(payload)
      this.loadingService.showloading();
      if (!id){
        this.administrationService.postrecord(create_innovation_url, payload).subscribe((res) => {
          if (res) {
            if(res['status'] == 'ongoing'){
              this.steps_switcher('three');
            } else {
              this.innovation_id = res['innovation_id'];
              this.patch_forms(this.innovation_id);
              const innovation = {"innovation": res['innovation_id']};
              this.steps_switcher('three');
              this.sweetalertService.showAlert('Success', 'Proceed...', 'success');
            }
            this.loadingService.hideloading();
            this.completed_innovation = false;            
          } else {
            this.loadingService.hideloading();
          }
        });
      }
      
    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.termsForm);

    }
  }

  save_innovation_details(){
    if (this.innovationDetailsForm.valid) {

      let payload = this.innovationDetailsForm.value

      this.loadingService.showloading();
      if (this.details_id !== null){
        payload['details_id'] = this.details_id;
        this.administrationService.postrecord(update_innovation_details_url, payload).subscribe((res) => {
          if (res) {
            this.get_step_three();
            this.steps_switcher('four');
          } 
        });
      }else{
        this.administrationService.postrecord(innovation_details_url, payload).subscribe((res) => {
          if (res) {
            this.innovationDetailsForm.reset();
            this.steps_switcher('four');
            this.sweetalertService.showAlert('Success', 'Well Done, Procceed to Step Four', 'success');
          } 
        });
      }
      this.loadingService.hideloading();
    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.innovationDetailsForm);
      console.log(this.innovationDetailsForm.value);
    }
  }

  save_innovation_information(){
    if (this.innovationInformationForm.valid) {

      const payload = this.innovationInformationForm.value
      this.loadingService.showloading();
      this.administrationService.postrecord(innovation_information_url, payload).subscribe((res) => {
        if (res) {
          console.log(res);
          // this.innovation_id = res['id'];
          this.loadingService.hideloading();          
          if (this.step_four_update){
            this.get_step_four();
            // this.sweetalertService.showAlert('Success', 'Updated', 'success');
          } else {
            this.innovationInformationForm.reset();
            this.sweetalertService.showAlert('Success', 'Almost There, Procceed to Step Five', 'success');
          }
          this.steps_switcher('five');
        } else {
          this.loadingService.hideloading();
        }
      });


    } else {
      this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
      this.administrationService.markFormAsDirty(this.innovationInformationForm);

    }
  }

  save_additional_details(){
    if (this.services.length == 0) {
      this.services_required = true;
      this.sweetalertService.showAlert('Error', 'Select support services or capacity you need!', 'error');
    } else {
      if (this.innovationAdditionalDetailsForm.valid) {

        const payload = this.innovationAdditionalDetailsForm.value

        // this.get_innovation_id();

        // payload['innovation'] = this.innovation_id;
        payload['support_service'] = this.services;
        console.log(payload)
        this.loadingService.showloading();
        this.administrationService.postrecord(innovation_additional_details_url, payload).subscribe((res) => {
          if (res) {
            // console.log(res);
            // this.innovation_id = res['id'];
            // this.complete_profile();
            if (this.step_five_update){
              this.steps_switcher('six');
            } else {
              // this.innovationAdditionalDetailsForm.reset();          
              this.steps_switcher('six');
              this.services_required = false;
              this.sweetalertService.showAlert('Success', 'Completed! Congratulations!', 'success');
            }  
          }
        });
        this.loadingService.hideloading();
      } else {
        this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
        this.administrationService.markFormAsDirty(this.innovationAdditionalDetailsForm);
      }
    }
  }

  delete_support_service(service){

        const payload = {
          "innovation" : this.innovation_id,
          "service": service
        }

        this.loadingService.showloading();
        this.administrationService.postrecord(delete_support_service_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success', 'Successfully Removed!', 'success');
            this.steps_switcher('five');
          }
        });
        this.loadingService.hideloading();
  }



  // create_profile(){
  //   if (this.CreateProfileForm.valid) {

  //     const payload = this.CreateProfileForm.value
  //     console.log(payload)
  //     this.loadingService.showloading();
  //     this.administrationService.postrecord(create_profile_url, payload).subscribe((res) => {
  //       if (res) {
  //         this.loadingService.hideloading();
  //         this.CreateProfileForm.reset();
  //         this.sweetalertService.showAlert('Success', 'Profile Updated Successfully', 'success');
  //         this.router.navigate(['/user-profile']);

  //       } else {
  //         this.loadingService.hideloading();
  //       }
  //     });


  //   } else {
  //     this.toastService.showToastNotification('error', 'Correct the errors highlighted to proceed', '');
  //     this.administrationService.markFormAsDirty(this.CreateProfileForm);

  //   }
  // }

   

  ngOnInit(): void {

  }

}
