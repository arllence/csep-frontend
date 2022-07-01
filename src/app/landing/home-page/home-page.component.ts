import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  serverurl, general_counts_url, junior_counts_url, check_completed_profile, get_profile_picture_url, create_post_url, fetch_posts_url, create_comment_url, create_comment_child_url, create_like_url
} from '../../app.constants';
import { AdministrationService } from '../../administration/services/administration.service';
import { LoadingService } from '../../common-module/shared-service/loading.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../common-module/shared-service/sweetalerts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../common-module/shared-service/toast.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  all_notices:any;
  my_innovations = null;
  general_counts: any;
  junior_counts: any;
  profile_picture: any;
  serverurl = serverurl
  PostForm: FormGroup;
  CommentForm: FormGroup;
  fileData: File = null;
  posts: any;
  reply_box_id = null;
  @ViewChild('commentbox') commentbox: ElementRef;

  constructor(
    public administrationService: AdministrationService,
    public loadingService:LoadingService,
    public router: Router,
    public sweetalertService: SweetalertService, 
    private formBuilder: FormBuilder,
    public toastService: ToastService) { 

      this.PostForm = this.formBuilder.group({
        post: new FormControl('', Validators.compose([Validators.required])),
      });
      this.CommentForm = this.formBuilder.group({
        comment: new FormControl('', Validators.compose([Validators.required])),
        post: new FormControl('', Validators.compose([Validators.required])),
      });
      this.get_profile_picture();
      this.get_posts();
    }

  ngOnInit() {
    // this.fetch_notices();
    // this.get_my_innovations();
    // this.get_general_counts();
    // this.get_junior_counts();
    this.check_completed_profile();    
  }

  handleFileupload(e) {
    this.fileData = e.target.files[0];
  }
  
  save_post(){
    if (this.PostForm.valid) {

      const payload = this.PostForm.value;
      this.loadingService.showloading();
      if (this.fileData) {
        const formData  =  new FormData();
        formData.append('document', this.fileData);
        formData.append('post', payload['post']);
        this.administrationService.postrecord(create_post_url, formData).subscribe((res) => {
          if (res) {
            this.get_posts();
            this.toastService.showToastNotification('success', 'Post Shared!', '');
          } 
        });
      } else {
        this.administrationService.postrecord(create_post_url, payload).subscribe((res) => {
          if (res) {
            this.toastService.showToastNotification('success', 'Post Shared!', '');
          } 
        });
      }
      this.PostForm.reset();
      this.loadingService.hideloading();
    } else {
      this.toastService.showToastNotification('error', 'Post required!', '');
      this.administrationService.markFormAsDirty(this.PostForm);
      console.log(this.PostForm.value);
    }
  }

  save_comment(post_id: string){
    this.CommentForm.patchValue({"post": post_id});
    this.loadingService.showloading();
    if (this.CommentForm.valid) {
      const payload = this.CommentForm.value;      
      console.log(payload);
      this.administrationService.postrecord(create_comment_url, payload).subscribe((res) => {
        if (res) {
          this.get_posts();
          this.toastService.showToastNotification('success', 'Success', '');
        } 
      });
      this.CommentForm.reset();
      this.loadingService.hideloading();
    } else {
      this.toastService.showToastNotification('error', 'Comment Required', '');
      this.administrationService.markFormAsDirty(this.CommentForm);
      console.log(this.CommentForm.value);
    }
  }

  replyBox(comment_id){
    this.CommentForm.patchValue({"post": comment_id})
    this.reply_box_id = comment_id;
    // this.commentbox.nativeElement.innerHTML = "Reply";
    // console.log(this.commentbox.nativeElement.innerHTML);
  }

  save_comment_child(){
    if (this.CommentForm.valid) {
      const comment = this.CommentForm.get('post').value   
      const child = this.CommentForm.get('comment').value   
      const payload = {
        "comment": comment,
        "child": child
      }
      this.loadingService.showloading();
      this.administrationService.postrecord(create_comment_child_url, payload).subscribe((res) => {
        if (res) {
          this.get_posts();
          this.toastService.showToastNotification('success', 'Success', '');
        } 
      });
      this.CommentForm.reset();
      this.reply_box_id = null;
      this.loadingService.hideloading();
    } else {
      console.log('Error')
      this.toastService.showToastNotification('error', 'Comment Required', '');
      this.administrationService.markFormAsDirty(this.CommentForm);
      console.log(this.CommentForm.value);
    }
  }

  like_post(post_id){
    const payload = {
      "post_id": post_id
    }
    this.loadingService.showloading();
    this.administrationService.postrecord(create_like_url, payload).subscribe((res) => {
      if (res) {
        this.get_posts();
        this.toastService.showToastNotification('success', 'Success', '');
      } 
    });
    this.loadingService.hideloading();

  }

  view_candidate(candidate_id){
    this.router.navigate(['candidate-profile', candidate_id]);
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
        } 
      }
    })
  }
  get_profile_picture(){
    const payload = {

    }
    this.administrationService.getrecords(get_profile_picture_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.profile_picture = res;
      }
    })
  }
  get_posts(){
    const payload = {}
    this.administrationService.getrecords(fetch_posts_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.posts = res;
      }
    })
  }

 
  fetch_notices(){
    // let payload = {};
    // this.loadingService.showloading();
    // this.administrationService.getrecords(list_notifications_url,payload).subscribe((res)=>{
    //   this.all_notices = res;
    //   this.loadingService.hideloading();
    // });
  }

}
