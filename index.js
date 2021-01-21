const { App } = require('@slack/bolt');
const lineNotify = require('line-notify-nodejs')(process.env.L_NOTIFY_KEY);
const moment = require('moment-timezone');

// slack関連
const bot_token = process.env.SLK_BOT_TOKEN;
const sign_secret = process.env.SLK_BOT_SIGN_SECRET;
const monitor_channel = process.env.SLK_BOT_MONITOR_CHANNEL;

// LINEメッセージの前と後に付加する文字列 改行は環境変数では\\nで設定
const line_msg_prefix = process.env.L_MSG_PREFIX.replace(/\\n/g, '\n');
const line_msg_suffix = process.env.L_MSG_SUFFIX.replace(/\\n/g, '\n');

// slackでメッセージ収集を行うための初期化
const app = new App({
    token: bot_token,
    signingSecret: sign_secret
});

exports.main = async (req, res) => {

    try {
        // 今日のJST日付0:00をUNIXtimeで取得
        let utime = moment().tz("Asia/Tokyo").hour(0).minutes(0).second(0).format("X");

        // slackメッセージ収集
        const result = await app.client.conversations.history({
            token: bot_token,
            channel: monitor_channel,
            limit: 20,
            oldest: utime
        });

        // slackユーザ名収集
        const usr_list = await app.client.users.list({
            token: bot_token
        });
        var usr_dict = {};
        if (usr_list.ok) {
            await usr_list.members.forEach((m) => {
                usr_dict[m.id] = m.profile.display_name;
            });
        }

        let l_msg = "";
        // 送信メッセージ構築
        if (result.ok && result.messages.length > 0) {
            var ret = await result.messages.map((e) => {
                if (usr_dict[e.user]) {
                    return `${usr_dict[e.user]}: ${e.text}`;
                }
            });
            l_msg = line_msg_prefix + ret.join('\n') + line_msg_suffix;
        }

        let ret_msg = "";
        if (l_msg) {
            // line notify 送信
            await lineNotify.notify({
                message: l_msg,
            });
            let st_dt = moment.unix(utime);
            ret_msg = '正常終了 LINEメッセージ送信しました 基準時:' + st_dt.toString();
        } else {
            ret_msg = '正常終了しましたが、LINEメッセージは送信されていません';
        }

        res.status(200).send(ret_msg);

    } catch (error) {
        console.error(error);
        res.status(200).send('処理失敗しました');
    }

}
