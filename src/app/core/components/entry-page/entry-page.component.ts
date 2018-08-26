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
    '398613085782.423360215043.047e695d82159874fd2f82b2849a47fa4cb14f3e576b93c1bb9016b7a9dfe4c6';
    // this.accessToken =
    //   'xoxp-398613085782-398613086374-397274066931-e3f6e40156be030d36ed940f9e58c1bc';
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
    if (!this.service.tokenDetails.access_token)
      this.service.getAccessToken(resource).subscribe(response => {
        localStorage.setItem('tokenDetails', JSON.stringify(response));
        this.accessToken = response.access_token;
        this.teamId = response.team_id;
        this.teamName = response.team_name;
        this.userId = response.user_id;
        this.botAccessToken = response.bot.access_token;
        this.botUserId = response.botUserId;
        this.router.navigate(['/create-standup']);
      });
    else this.router.navigate(['/create-standup']);
  }
}
