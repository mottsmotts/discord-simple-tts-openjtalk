# discord用 Open JTalk簡易読み上げBOT

* Discord用簡易読み上げBOT
* [Open JTalk](http://open-jtalk.sp.nitech.ac.jp/)を使用。
  * (macOS,Linux) https://www.npmjs.com/package/openjtalk
  * (Windows) https://github.com/rosmarinus/jtalkdll
* nodejs v14.15.1
* yarn 1.22.10

## 準備

1. https://discord.com/developers/applications で、アプリケーションを作る
1. Botの項目からTOKENをコピー
1. `config/default.json`ファイルに追記。ついでに他も追記。

```json
{
    "DISCORD_BOT_TOKEN": "",
    "TEXT_CHANNEL": "聞き専用チャット",
    "VOICE_CHANNEL": "vc1"
}
```

## Windows用追加準備

* https://github.com/rosmarinus/jtalkdll/releases から`jtalkdll-win-msvc`をダウンロード。
  * ダウンロード→ https://github.com/rosmarinus/jtalkdll/releases/download/v0.0.63/jtalkdllx64-0.0.63.zip
* jtalkdllx64-0.0.63.zip の中身を`C:¥open_jtalk`に解凍。
* 以下のディレクトリ構成になってたら正解。

```
C:¥open_jtalk
  ├── bin
  ├── dict_utf_8
  ├── include
  ├── lib
  └── voice
```

* `package.json`ファイルを開き `"openjtalk": "^0.1.6",` の行を削除。

```
  "dependencies": {
    "@discordjs/opus": "^0.5.0",
    "config": "^3.3.6",
    "discord.js": "^12.5.3",
    "ffmpeg-static": "^4.3.0",
    "openjtalk": "^0.1.6",      ← この行を削除
    "uuid-v4": "^0.1.0"
  },
```

## 起動方法

```sh
# 最初だけ
yarn

# BOT起動
yarn start
```

## Discordサーバに参加させる

* 準備で作成したアプリケーションの`APPLICATION ID`を用意
* 以下のURLに`{APPLICATION_ID}`の場所に`APPLICATION ID`を入れてブラウザでアクセス。
  * `https://discord.com/oauth2/authorize?client_id={APPLICATION_ID}&scope=bot`
  * 例 `https://discord.com/oauth2/authorize?client_id=1234567890123456&scope=bot`
* 自分が管理者のサーバが選択できるので、BOTを入れたサーバを選択。

