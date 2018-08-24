import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlackApiService } from '../../services/slack-api.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {
  code: string;
  clientId: string;
  clientSecret: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: SlackApiService) {}

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    console.log('code', this.code);
    // 398613085782.422557038676.0d072d3c048da3c13877fee697b01cd3f2c9c508529391807261aab04e467fe7
    this.code = '398613085782.422984263301.85d76b98aeebc2363ff3f053a4f21606ab654dbbd8f50632134197f6582b3b93';
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
    this.clientId = '398613085782.398432591687';
    this.clientSecret = '43ff0f4153811c4c2b64c4c551f20ce0';
    this.router.navigateByUrl(url);
  }
  createStandup() {
    const resource = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: this.code
    };
    console.log(JSON.stringify(resource));
    this.service.getAccessToken(resource).subscribe((response) => {
      console.log(response);
      console.log(response.json());
    });
  }
}
