import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { HttpEventType } from '@angular/common/http';
import { Buffer } from 'buffer';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
//import{CSVToJSON } from 'csvtojson'

@Component({
  selector: 'app-csvuploaddownload',
  templateUrl: './csvuploaddownload.component.html',
  styleUrls: ['./csvuploaddownload.component.css']
})
export class CsvuploaddownloadComponent implements OnInit {
items:any;
carts:any[]=[];
productlist:any
counter:any=0;
itemcounter:any=0;
 isDuplicates:any=true;
count:any=0;
  @ViewChild('image', {  
    static: true  
}) image: ElementRef  ;

  selectedFiles: any
  selectedImages:any
  isValid: boolean = false;
  isProgress: boolean = false;
  message: string = "";
  //let name;
  name: any;
  selectFile: any;
  uploadProgress: any;
  alerts: any[] = [{
    type: '',
    msg: ``,
    timeout: 5000
  }];
  output: any;
  imagename:any;
  images:any;
  price:any;
  date:any;
  priceBeforeDiscount:any
  priceAfterDiscount:any

  constructor(private myservice: MyserviceService,) { }

  ngOnInit(): void {
//this.getproduct();
  }

  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles != undefined)
      this.isValid = true;
      
    //this.selectFile=event.target.files[0].name
    console.log(this.selectedFiles)
  }

  download(data, filename = 'data') {
    //console.log(data);
    //_id->this id comes from mongodb database
    let csvData = this.ConvertToCSV(data, [
      '_id', 'Region', 'Country', 'Item Type', 'Sales Channel', 'Order Priority'
    ]);
    // console.log(data)
    // console.log(csvData) 
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }


  ConvertToCSV(objArray, headerList) {

    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    //console.log(array)
    let str = '';
    let row = 'id,';
    for (let index in headerList) {
      row += headerList[index] + ',';
      console.log(row);
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    console.log(str)
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        console.log(head)
        line += ',' + array[i][head];
        console.log(line)
      }
      str += line + '\r\n';
      console.log(str)
    }
    return str;
  }


  csvDownload() {
    const url = "http://localhost:3000/downloadcsvfile";
    this.myservice.downloadFile(url).subscribe(response => {
      this.output = response;
      console.log(this.output);
      this.download(this.output, 'sample');
    })

    //console.log(this.output)-->undefine

    //  alert("file downloaded successfully");
  }

  csvUpload() {
    const url = "http://localhost:3000/uploadfile";
    const formData = new FormData();
    formData.append('csvFile', this.selectedFiles);
    console.log(this.selectedFiles.type)
    //console.log(this.selectedFiles); 
    this.myservice.uploadFile(url, formData).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {

        this.uploadProgress = Math.round(event.loaded * 100 / event.total);
        if (this.uploadProgress == 100) {
          this.isProgress = true;
          this.message = "file has been successfully uploaded";
          setTimeout(() => {
            this.message = "";
            this.isProgress = false;
          }, 1000);
        } else {
          this.message = "";
          this.isProgress = false;
          console.log(`${this.uploadProgress} %`)
        }
        // `PI is nearly ${Math.max(a, b)}`
      } else if (event.type === HttpEventType.Response) {
        return event.body;
      }
    }, error => {
      this.uploadProgress = 0;
      if (error.error) {
        alert("some error has been occured")
      }
    });

  }


  //uploading image
  selectedImage(event) {
    console.log(event.target.files[0])
    this.selectedImages = event.target.files[0];
    if (this.selectedImages != undefined)
      this.isValid = true;
      
    //this.selectFile=event.target.files[0].name
    console.log(this.selectedImages)
  }
//uploading image
imageUpload() {
  if(this.selectedImages.type!=='application/vnd.ms-excel'){
    const url = "http://localhost:3000/uploadImageFile";
  const formData = new FormData();
  formData.append('csvFile', this.selectedImages);
  console.log(this.selectedImages.type)
  //console.log(this.selectedFiles); 
  //console.log(formData)
  this.myservice.uploadImage(url, formData).subscribe(event => {
    console.log(event);
    if (event.type === HttpEventType.UploadProgress) {

      this.uploadProgress = Math.round(event.loaded * 100 / event.total);
      if (this.uploadProgress == 100) {
        this.isProgress = true;
        this.message = "file has been successfully uploaded";
        setTimeout(() => {
          this.message = "";
          this.isProgress = false;
        }, 1000);
      } else {
        this.message = "";
        this.isProgress = false;
        console.log(`${this.uploadProgress} %`)
      }
      // `PI is nearly ${Math.max(a, b)}`
    } else if (event.type === HttpEventType.Response) {
      return event.body;
    }
  }, error => {
    this.uploadProgress = 0;
    if (error.error) {
      alert("some error has been occured")
    }
  });
  }
  
else{
  alert("please select file except csv file")
}
}

downloadImage(){
  const url = "http://localhost:3000/downloadImagefile";
  this.myservice.downloadImage(url).subscribe(result1 => {
    this.output = result1;
    // below will give buffer
    console.log(this.output.img.data.data);
    console.log(this.image.nativeElement);
    this.image.nativeElement.src="data:image/png;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(this.output.img.data.data)));
  })
  }
  
  selectedFileforimaage(event){
    this.images = event.target.files[0];
    console.log(this.images)
  }


  addproduct(images,imagename,priceBeforeDiscount,priceAfterDiscount,date){
    const url = "http://localhost:3000/forgotpassword/filldata";
    console.log(priceAfterDiscount)
    
  console.log(priceBeforeDiscount)
  const body = new FormData()
      body.append('images', images)
      body.append('imagename',imagename);
      body.append('priceBeforeDiscount',priceBeforeDiscount);
      body.append('priceAfterDiscount', priceAfterDiscount)
      body.append('date',date);
  
  
  //console.log(this.images)
  
  // console.log(body.get("name"))
  this.myservice.sendProduct(url,body).subscribe(data=>{
   
    console.log(data)
  })
  }
  
    removeFromCart(item){

      if(this.carts.filter(data=>{ return data._id==item._id}).length!=0){
        this.carts.pop();
        console.log(this.carts.length)
      }
    }
    increment(index){
      index=this.counter;
      this.counter=index+1
      console.log(this.counter)
    };
    decreament(index){
      
       
      index=this.counter;
      this.counter=index-1
     console.log(index)
       
    }
}

