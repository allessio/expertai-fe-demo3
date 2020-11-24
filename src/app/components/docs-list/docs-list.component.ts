import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContentSummary } from 'src/app/models/ContentSummary';
import { Doc } from 'src/app/models/Doc';
import { DocsService } from 'src/app/services/docs.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.css']
})
export class DocsListComponent implements OnInit {

  docs: Doc[];

  constructor(
    private docsService: DocsService
  ) { }

  ngOnInit(): void {

    this.docsService.getAll().subscribe(
      (data: ContentSummary) => {
        console.log(data);
        this.docs = data.content;
    });

  }

  public firstPage() {
    // this.docs = [];
    // this.docsService.sendGetRequestToUrl(this.docsService.first).pipe().subscribe((res: HttpResponse<any>) => {
    //   this.docs = res.body;
    // })
  }
  public previousPage() {

    // if (this.docsService.prev !== undefined && this.docsService.prev !== '') {
    //   this.docs = [];
    //   this.docsService.sendGetRequestToUrl(this.docsService.prev).pipe().subscribe((res: HttpResponse<any>) => {
    //     this.docs = res.body;
    //   })
    // }

  }
  public nextPage() {
    // if (this.docsService.next !== undefined && this.docsService.next !== '') {
    //   this.docs = [];
    //   this.docsService.sendGetRequestToUrl(this.docsService.next).pipe().subscribe((res: HttpResponse<any>) => {
    //     this.docs = res.body;
    //   })
    // }
  }
  public lastPage() {
    // this.docs = [];
    // this.docsService.sendGetRequestToUrl(this.docsService.last).pipe().subscribe((res: HttpResponse<any>) => {
    //   this.docs = res.body;
    // })
  }

}
