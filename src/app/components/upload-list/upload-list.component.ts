import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService,private router : Router) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      console.log(fileUploads)
      this.fileUploads = fileUploads;
    });
  }

  upload()
  {
    this.router.navigate(['/add-file'])
  }
}
