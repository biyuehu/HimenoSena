# Leave Messages

<!-- markdownlint-disable -->
<div align="center">

<a href="./messages.md#English">English</a> | <a href="./messages.md#日本語">日本語</a> | <a href="./messages.md#简体中文">简体中文</a>

</div>
<!-- markdownlint-enable -->

---

## 简体中文

本项目采用两种方式提交留言：

- [发送邮件](./messages.md#发送邮件)
- [通过 GitHub PR](./messages.md#通过-GitHub-PR)

对于不了解 GitHub PR 的用户可选择通过发送邮件，反之则更建议通过 GitHub PR。

### 规则

- 留言内容请使用英文、日文或中文
- 留言内容应与**姬野星奏**相关，只欢迎星奏厨进行留言，你可以在这留下你对星奏想说的任何话，或者发表感想，或者直接倾诉你的爱意！但星黑请自行滚出去。
- 一般不限制留言数量和字数，但请不要在短时间内发布过多留言，字数也不要多得太过分了（20
  ~ 80 字最宜），一次一条最好
- 尽管服务器不在中国，但域名仍然受到中国当局的监管，因此请不要发布任何关于中国的敏感或不利内容
- **发送恶意内容者或将被永久拉黑**

### 发送邮件

使用你的邮箱按照以下格式发送邮件：

- 收件人：[i@himeno-sena.com](mailto://i@himeno-sena.com)：
- 主题：姬野星奏网站留言
- 内容：

```txt
昵称：显示的留言人名字
内容：这里填写你的留言内容...
```

一般地，留言会在 48 小时内被审批，请耐心等待不要重复发送。审核通过将会发送通知邮件到你的邮箱。

### 通过 GitHub PR

- 该方式假定你熟悉基本的 GitHub 使用操作与 JSON 格式
- 该方式被推荐，优点在于将会在成功留言后，在本项目的贡献名单中看到你自己的名字与头像
- 登录你的GitHub帐户或注册（如果尚未注册）
- 打开你 Fork 的仓库，在 GitHub 上找到 `/data/messages.json` 文件并编辑它
- 按照前面的格式，在文件末尾追加数据：

```json
[
  // ...
  {
    // ...
    // 这是之前的留言
  },
  {
    "msg": "这里写下你的留言内容",
    "user": "GitHub 用户名（不是 GitHub 显示名字）",
    "name": "显示名字（用于显示在网站上）"
  }
]
```

请确保新内容格式正确。

- 保存文件并创建一个新的 pull request 到本仓库
- 等待你的 pull request 被合并

---

## English

This project accepts messages in two ways:

- [Send an Email](./messages.md#send-an-email)
- [Via GitHub PR](./messages.md#via-github-pr)

For users unfamiliar with GitHub PRs, sending an email is a fine choice — though if you do know your way around GitHub, the PR method is preferred.

### Rules

- Messages must be written in English, Japanese, or Chinese
- Messages should be related to **Himeno Sena** — only Sena fans are welcome here. Feel free to leave anything you want to say to her, share your thoughts, or pour out your love! Sena haters, please see yourselves out.
- There's generally no strict limit on the number of messages or word count, but please don't flood messages in a short period of time, and keep things reasonably concise (20–80 characters is ideal). One message at a time is best.
- Although the server is not located in China, the domain remains subject to Chinese authority oversight — please do not post any sensitive or adverse content regarding China.
- **Those who submit malicious content may be permanently blacklisted.**

### Send an Email

Send an email from your mailbox in the following format:

- Recipient: [i@himeno-sena.com](mailto://i@himeno-sena.com)
- Subject: Himeno Sena Website Message
- Body:

```txt
Nickname: The name you want displayed
Message: Write your message here...
```

Messages are generally reviewed within 48 hours — please be patient and avoid sending duplicates. A notification email will be sent to your inbox once approved.

### Via GitHub PR

- This method assumes you are familiar with basic GitHub operations and JSON formatting.
- This method is recommended because after a successful comment, your name and profile picture will appear in the project's contribution list.
- Log in to your GitHub account, or register one if you haven't already.
- Open your forked repository, locate the `/data/messages.json` file on GitHub, and edit it.
- Following the format below, append your entry at the end of the file:

```json
[
  // ...
  {
    // ...
    // This is the previous message
  },
  {
    "msg": "Here write the message you want to leave",
    "user": "Your GitHub account username (not display name)",
    "name": "Your name or alias. (It will be displayed on the website)"
  }
]
```

Please make sure the new entry is correctly formatted.

- Save the file and open a new pull request to this repository.
- Wait for your pull request to be merged.

---

## 日本語

このプロジェクトでは、メッセージの投稿に二つの方法を採用しています：

- [メールを送る](./messages.md#メールを送る)
- [GitHub PR 経由](./messages.md#GitHub-PR-経由)

GitHub の PR 操作に慣れていない方はメール送信をご利用ください。逆に慣れている方には GitHub PR の方法をおすすめします。

### ルール

- メッセージは英語・日本語・中国語でご記入ください
- メッセージの内容は**姫野星奏**に関連するものに限ります。星奏ファンのみ歓迎します。彼女への思いを綴ったり、感想を述べたり、愛を叫んだりと、何でも大歓迎です！星奏アンチの方はご退場ください。
- メッセージの件数や文字数に原則制限はありませんが、短時間での大量投稿はご遠慮ください。文字数もほどほどに（20〜80文字程度が理想的です）。一度に一件ずつ投稿するのが望ましいです。
- サーバーは中国国外に設置されていますが、ドメインは依然として中国当局の監督下に置かれています。中国に関する敏感または不利な内容の投稿はご遠慮ください。
- **悪意あるコンテンツを送信した場合、永久にブロックされる可能性があります。**

### メールを送る

以下のフォーマットに従って、メールをお送りください：

- 宛先：[i@himeno-sena.com](mailto://i@himeno-sena.com)
- 件名：姫野星奏サイト メッセージ
- 本文：

```txt
ニックネーム：表示したい名前
メッセージ：ここにメッセージ内容を記入してください...
```

メッセージは通常48時間以内に審査されます。重複して送信せず、気長にお待ちください。審査通過後、登録メールアドレスに通知が届きます。

### GitHub PR 経由

- この方法は、GitHub の基本操作と JSON フォーマットに慣れていることを前提としています。
- この方法は、コメントを投稿した後、プロジェクトの貢献者リストに自分の名前とアバターが表示されるため、推奨されます。
- GitHub アカウントにログインするか、まだお持ちでない場合は新規登録してください。
- フォークしたリポジトリを開き、`/data/messages.json` ファイルを GitHub 上で見つけて編集してください。
- 以下のフォーマットに従い、ファイルの末尾にデータを追記してください：

```json
[
  // ...
  {
    // ...
    // これは前のメッセージです
  },
  {
    "msg": "残したいメッセージをここに記入してください",
    "user": "GitHub アカウントのユーザー名（表示名ではありません）",
    "name": "表示したい名前またはニックネーム（サイトに表示されます）"
  }
]
```

新しい内容のフォーマットが正しいことを確認してください。

- ファイルを保存し、本リポジトリへの新しいプルリクエストを作成してください。
- プルリクエストがマージされるまでお待ちください。
