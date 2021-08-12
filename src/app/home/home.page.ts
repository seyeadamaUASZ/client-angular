import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
//import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  // Single File Upload
  private file: File;

  loadData={name:'',email:''};

  // Multiple File Upload
  private fileOne: File;
  private fileTwo: File;
  private fileThree: File;
  api=environment.api;

  // fichierForm:FormGroup;

  constructor(private http: HttpClient,public loadingController:LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController,) {
    
  }

  // Single File Upload
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitForm(element) {
    console.log('load data '+ JSON.stringify(element))
    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("name",element.name)
    formData.append("email",element.email)
    
    console.log(formData);
    this.presentAlert("fichier embarqué !!"+ JSON.stringify(formData))
    const serverUrl = this.api+ 'fichier/create';
    const nestServerUrl = "http://localhost:3000/photos/upload";

    this.http.post(serverUrl, formData).subscribe((response) => {
      console.log(response);
      this.presentAlert("fichier uploadé !!"+ formData)
    });
  }

  // Multiple File Upload
  onFileOneChange(fileChangeEvent) {
    this.fileOne = fileChangeEvent.target.files[0];
  }

  onFileTwoChange(fileChangeEvent) {
    this.fileTwo = fileChangeEvent.target.files[0];
  }

  onFileThreeChange(fileChangeEvent) {
    this.fileThree = fileChangeEvent.target.files[0];
  }

  async submitMultipleForm() {
    let formData = new FormData();
    formData.append("photos[]", this.fileOne, this.fileOne.name);
    formData.append("photos[]", this.fileTwo, this.fileTwo.name);
    formData.append("photos[]", this.fileThree, this.fileOne.name);

    const serverUrl = "http://localhost:8080/fichier/create";
    const nestServerUrl = "http://localhost:3000/photos/uploads";

    this.http.post(serverUrl, formData).subscribe((response) => {
      console.log(response);
    });
  }

  async presentAlert(mgs) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: mgs,
      buttons: ['OK']
    });

    await alert.present();
  
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
