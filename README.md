# SlackTodayCh2Line

### Slack側に必要な設定  
slack api ページ  https://api.slack.com/apps  でCreate new appから新規appを該当ワークスペースで作成する  

権限設定(OAuth & Permissions)にて以下の権限を付与
channels:history  
chat:write  
commands  
groups:history  
im:history  
mpim:history  
users:read  

### Line側に必要な設定  
Line notify 設定ページ https://notify-bot.line.me/ja/ にてアクセストークンを取得  
注)Lineアカウントが必要  

### Cloud functionに必要な設定  

Cloud functions に環境変数を設定する

以下の2項目はslack api ページを参照して設定 []はslack api ページでの該当する項目  
__SLK_BT2L_BOT_SIGN_SECRET__ [Basic Information -> App Credentials -> Signing Secret]  
__SLK_BT2L_BOT_TOKEN__ [OAuth & Permissions -> Bot User OAuth Access Token ("xoxb-...")]  

__SLK_BT2L_BOT_MONITOR_CHANNEL__ にはslackのチャンネルidを設定する  

__L_NOTIFY_KEY__ にはLINE notify のアクセストークンを設定する
