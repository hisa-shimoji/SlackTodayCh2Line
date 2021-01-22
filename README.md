# SlackTodayCh2Line

Google cloud functions code to send today's slack channel content to LINE.

Please [see](https://qiita.com/hisa_shim/items/f0fef4f66f0a58afe94a) here for more information (Japanese).

### Environment variables

| variable | note |
|:-----------|:------------|
| SLK_BOT_TOKEN|Bot User OAuth Access Token ("xoxb-...")|
| SLK_BOT_SIGN_SECRET|Slack app's sigining secret|
|SLK_BOT_MONITOR_CHANNEL|Slack channel id|
|L_NOTIFY_KEY|LINE notify access token id|
|L_MSG_PREFIX|Prefix strings for LINE notify message. \n for line feed. Leave blank if not needed.|
|L_MSG_SUFFIX|Suffix strings for LINE notify message. \n for line feed. Leave blank if not needed.|
