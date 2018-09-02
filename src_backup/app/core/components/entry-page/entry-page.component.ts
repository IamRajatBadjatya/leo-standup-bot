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
  userId: string;
  accessToken: string;
  teamName: string;
  teamId: string;
  botUserId: string;
  botAccessToken: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: SlackApiService
  ) {}

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    console.log(this.code);
    this.code =
    '421262484307.425566682054.956485d6e457a308c842ebd11c12106a65ec9fa3385c7e0ef7495cf777ba6553';
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));

    this.clientId = '398613085782.398432591687';
    this.clientSecret = '43ff0f4153811c4c2b64c4c551f20ce0';

    this.router.navigateByUrl(url);
  }
  createStandup() {
    /*{
      "ok": true,
      "access_token": "xoxp-398613085782-398613086374-397274066931-e3f6e40156be030d36ed940f9e58c1bc",
      "scope": "identify,bot,incoming-webhook,channels:history",
      "user_id": "UBQJ12JB0",
      "team_name": "sample-bot",
      "team_id": "TBQJ12HP0",
      "incoming_webhook": {
        "channel": "#leo-standup-bot",
        "channel_id": "CBQDWLYTZ",
        "configuration_url": "https://sample-standup-bot.slack.com/services/BCE5KDCD6",
        "url": "https://hooks.slack.com/services/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"
      },
      "bot": {
        "bot_user_id": "UBNQYM4M7",
        "bot_access_token": "xoxb-398613085782-396848718721-LtBm9xmfYASTqqSeRSHsFlxG"
      }
    }*/
    const resource = `client_id=${this.clientId}&client_secret=${
      this.clientSecret
    }&code=${this.code}`;
    console.log(resource);
    if (!this.service.tokenDetails)
      this.service.getAccessToken(resource).subscribe(response => {
        sessionStorage.setItem('tokenDetails', JSON.stringify(response));
        this.router.navigate(['/create-standup']);
      });
    else this.router.navigate(['/create-standup']);
  }
}
