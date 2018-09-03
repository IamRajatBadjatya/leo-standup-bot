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
    // this.code =
    // '421262484307.427234075825.f4f545776b6ea0c88cd6b843ef5932ff42a59994e5afe6494f9d16a8547ce7ce';
    // this.accessToken =
    //   'xoxp-398613085782-398613086374-397274066931-e3f6e40156be030d36ed940f9e58c1bc';
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
    this.clientId = '421262484307.427093322997';
    this.clientSecret = '61915dd9a9ce4b39833a206900fe5e71';
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
    // localStorage.removeItem('tokenDetails');
    const resource = `client_id=${this.clientId}&client_secret=${
      this.clientSecret
    }&code=${this.code}`;
    if (!this.service.tokenDetails)
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
/*
conversationUpdateconversationUpdate
https://slack.com/oauth/authorize?scope=bot&client_id=421262484307.427093322997&redirect_uri=https%3a%2f%2fslack.botframework.com%2fHome%2fauth&state=standup-bot

https://slack.botframework.com/Dev/Validate
<a href="https://slack.com/oauth/authorize?scope=bot&client_id=421262484307.427093322997&redirect_uri=https%3a%2f%2fslack.botframework.com%2fHome%2fauth&state=standup-bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
 */