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
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
    this.router.navigateByUrl(url);
  }
}
