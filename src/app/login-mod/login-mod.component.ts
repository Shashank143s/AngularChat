import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-login-mod',
  templateUrl: './login-mod.component.html',
  styleUrls: ['./login-mod.component.css'],
  providers : [Ng2ImgMaxService]
})
export class LoginModComponent implements OnInit {
  fileToUpload: File = null;
  imageSource: string;
  constructor(private ng2ImgMaxService: Ng2ImgMaxService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
   // console.log(this.fileToUpload);
    this.ng2ImgMaxService.compressImage(this.fileToUpload, 0.050).subscribe((result) => {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSource = event.target.result;
        localStorage.setItem('userImg', this.imageSource);
      }
      reader.readAsDataURL(files.item(0));
      // console.log(result);
      // let imgURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result)).toString().split(':');
      // imgURL.shift();
      // console.log(imgURL);
      // let filteredURL = imgURL.join(':').split('(')[0];
      // localStorage.setItem('userImg', filteredURL);
      // console.log(filteredURL);
      // this.imageSource = localStorage.getItem('userImg');
    });
}
  formSubmit(submittedValues) {
    localStorage.setItem('userName', submittedValues.value.username);
    this.router.navigateByUrl('/chat');
  }
}
