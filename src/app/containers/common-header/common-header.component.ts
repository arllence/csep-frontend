import {Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SweetalertService} from '../../common-module/shared-service/sweetalerts.service';
import { Router } from '@angular/router';
import { get_notifications_url,mark_notifications_as_read_url} from '../../app.constants';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  public sidebarMinimized = false;
  loggedinemail: any;
  loggedinname: any;
  notification_number: number;
  notifications: any;
  role: any;

  constructor(private router: Router, public authService: AuthenticationService, public sweetalertService: SweetalertService) {

    this.fetchuserDetails();

  }
  ngAfterViewInit(){
    this.remove();
    this.fetchNotifications()
  }
  remove(){
    let button2 = document.getElementsByClassName('navbar-toggler');
    button2[2].remove();
  }

  fetchuserDetails() {
    this.authService.getuserprofileInfo().then((res) => {
      console.log(res);
      this.loggedinemail = res['currentemail'];
      this.loggedinname = res['name'];
      this.role = res['role'];
    });
  }

  fetchNotifications() {
    const payload = {}
    this.authService.getrecords(get_notifications_url,payload).subscribe((res) => {
      // console.log(res);
      this.notification_number = res.length;
      this.notifications = res;
      
    });
  }

  markNotifications() {
    const payload = {}
    this.authService.getrecords(mark_notifications_as_read_url,payload).subscribe((res) => {
      // console.log(res);  
      this.notification_number = 0;    
      // window.location.reload()
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  changepassword() {
    // this.router.navigate(['profile']);
    this.router.navigate(['/user-profile']);
  }

  logout() {
    this.sweetalertService.showConfirmation('Logout', 'Do you wish to proceed logging out?').then((res) => {
      if (res) {
        this.authService.logout();
      }

    });
  }
}
