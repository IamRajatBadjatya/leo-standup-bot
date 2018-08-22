import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {
  code: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    console.log('code', this.code);
    this.activatedRoute.url.subscribe((urlSegment) => {
      console.log('urlSegment', urlSegment);
      // .substring(0, this.activatedRoute.url.indexOf('?'));
    });
  }
}
