
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { AdministrationService } from '../services/administration.service';
import { list_user_roles, create_user_url, award_token_url} from '../../app.constants';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { ToastService } from '../../common-module/shared-service/toast.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})

export class TokenComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;
  user_roles_list: [] = [];
  tokenForm: FormGroup;
  to_user = null;
  constructor( public administrationService: AdministrationService, public sweetalertService: SweetalertService,
    public toastService: ToastService, public loadingService: LoadingService,private formBuilder: FormBuilder,) {

      this.tokenForm = this.formBuilder.group({
        target: new FormControl('', Validators.compose([Validators.required])),
      });

  }
  ngOnInit() {


  }
  ngAfterViewInit() {
    // this.fetchallroles();
}

listener_switcher(checker){
  console.log(checker)
  if (checker == 'specific'){
    this.to_user = true;
    this.tokenForm.reset();
  }
}


  generate_token() {
    const payload = this.tokenForm.value;
    this.sweetalertService.showConfirmation('','Do You Wish to proceed?').then((res) => {

      if (res === false) {
        this.toastService.showToastNotification('warning','Action Cancelled','');

      } else {
        this.loadingService.showloading();
        this.administrationService.postrecord(award_token_url, payload).subscribe((res) => {
          if (res) {
            this.sweetalertService.showAlert('Success','Token Generated Successfully','success');
            this.tokenForm.reset();
            this.loadingService.hideloading();
          }
          this.loadingService.hideloading();
        });


      }

    });

  }


}

