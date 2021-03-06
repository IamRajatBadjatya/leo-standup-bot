// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCq1OxM5B8CLHXqlFHgfhCn7SnQnrtpbJo',
    authDomain: 'standup-bot-1.firebaseapp.com',
    databaseURL: 'https://standup-bot-1.firebaseio.com',
    projectId: 'standup-bot-1',
    storageBucket: 'standup-bot-1.appspot.com',
    messagingSenderId: '954398077323'
  }
};
