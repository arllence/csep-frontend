import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  serverurl, general_counts_url, junior_counts_url, check_completed_profile, get_profile_picture_url, create_post_url, fetch_posts_url, create_comment_url, create_comment_child_url, create_like_url, get_notifications_url, mark_notifications_as_read_url, get_message_count_url, fetch_messages_url, send_message_url, fetch_conversation_url
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
  notification_number: number;
  notifications: any;
  view_msgs = false;
  msgs_number: any;
  messages: any;
  msgForm: FormGroup;
  msg_id: any;

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
      this.msgForm = this.formBuilder.group({
        to_user: new FormControl('', Validators.compose([Validators.required])),
        message: new FormControl('', Validators.compose([Validators.required])),
        c_id: new FormControl(''),
      });
      this.get_profile_picture();
      this.get_posts();
    }

  ngOnInit() {
    this.check_completed_profile(); 
    this.fetchNotifications();   
    this.countMessages();
    this.get_messages();
  }

  handleFileupload(e) {
    this.fileData = e.target.files[0];
  }

  clicked_msgs(){
    this.view_msgs = true;
  }
  reply(to_user,msg_id,c_id){
    this.msgForm.patchValue({"to_user":to_user,"c_id":c_id});
    this.msg_id = msg_id;
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

  get_messages(){
    const payload = {}
    this.administrationService.getrecords(fetch_messages_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.messages = res;
        this.countMessages();
      }
    })
  }
  view_conversation(c_id){
    const payload = {
      "c_id":c_id,
    }
    this.administrationService.getrecords(fetch_conversation_url,payload).subscribe((res) => {
      if(res) {
        console.log(res);
        this.messages = res;
      }
    })
  }
  send_msg(){
    const payload = this.msgForm.value;
    this.loadingService.showloading();
    this.administrationService.postrecord(send_message_url, payload).subscribe((res) => {
      if (res) {
        this.msgForm.reset();
        this.msg_id = null;
        this.get_messages();
        this.countMessages();
        this.toastService.showToastNotification('success', 'Success', '');
      } 
    });
    this.loadingService.hideloading();

  }

  fetchNotifications() {
    const payload = {}
    this.administrationService.getrecords(get_notifications_url,payload).subscribe((res) => {
      // console.log(res);
      this.notification_number = res.length;
      this.notifications = res;
      
    });
  }

  markNotifications() {
    const payload = {}
    this.administrationService.getrecords(mark_notifications_as_read_url,payload).subscribe((res) => {
      this.notification_number = 0;    
    });
  }

  countMessages() {
    const payload = {}
    this.administrationService.getrecords(get_message_count_url,payload).subscribe((res) => {
      // console.log(res);
      this.msgs_number = res;
      
    });
  }


 


}
