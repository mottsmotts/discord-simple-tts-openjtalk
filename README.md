# discord用 Open JTalk簡易読み上げBOT

* Discord用簡易読み上げBOT
* [Open JTalk](http://open-jtalk.sp.nitech.ac.jp/)を使用。
  * https://www.npmjs.com/package/openjtalk

## 準備

1. https://discord.com/developers/applications で、アプリケーションを作る
1. Botの項目からTOKENをコピー
1. `config/default.json`に追記。ついでに他も追記。

```json
{
    "DISCORD_BOT_TOKEN": "",
    "TEXT_CHANNEL": "聞き専用チャット",
    "VOICE_CHANNEL": "vc1"
}
```

## 起動方法

```sh
yarn
yarn start
```

## Discordサーバに参加させる

* 準備で作成したアプリケーションの`APPLICATION ID`を用意
* 以下のURLに`{APPLICATION_ID}`の場所に`APPLICATION ID`を入れてブラウザでアクセス。
  * `https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot`
  * 例 `https://discord.com/oauth2/authorize?client_id=1234567890123456&scope=bot`
* 自分が管理者のサーバが選択できるので、BOTを入れたサーバを選択。

