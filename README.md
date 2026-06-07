# Breasole 足診断LP

スマートフォン向けの足診断LPです。13問の回答から危険度ランク、メインタイプ、サブタイプを判定し、セルフケアとAmazon商品ページへの導線を表示します。

## 主な機能

- 13問のYES / NO診断
- 危険度ランク A〜E
- メインタイプ・サブタイプ判定
- タイプ別説明とセルフケア
- 片足つま先立ちセルフチェック
- タイプ別Amazon CTA
- Google Analytics 4イベント計測

## 必要環境

- Node.js 22以上
- npm

## ローカル起動

```bash
npm install
npm run dev
```

パソコンでは `http://localhost:3000` を開きます。

同じWi-Fi内のスマートフォンから確認する場合は、パソコンのIPv4アドレスを確認し、`http://<IPv4アドレス>:3000` を開きます。

## 環境変数

`.env.example` を参考に、ローカルでは `.env.local` を作成します。

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| 変数名 | 必須 | 説明 |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 任意 | GA4の測定ID。未設定でも診断LPは動作しますが、アクセス・イベント計測は行われません。 |

GA4では以下のイベントを送信します。

| イベント名 | 発火タイミング |
|---|---|
| `start_diagnosis` | 診断開始ボタンのクリック時 |
| `complete_diagnosis` | 全13問の回答完了時 |
| `click_amazon` | Amazonボタンのクリック時 |

## 編集箇所

質問、配点、結果文章、セルフチェック、Amazon URLは以下で管理しています。

```text
src/data/diagnosis.ts
```

画面構成は `src/app/page.tsx`、デザインは `src/app/globals.css` で管理しています。

## 公開前チェック

```bash
npm run lint
npm run build
```

以下も実機で確認してください。

1. iPhoneで診断開始から結果表示まで進める
2. 危険度、メインタイプ、サブタイプが表示される
3. セルフチェック選択後にフィードバックが表示される
4. Amazonボタンが `https://amazon.co.jp/bracesole` へ遷移する
5. GA4リアルタイム・DebugViewで3イベントを確認する

## Vercelへデプロイ

### GitHub経由

1. このフォルダをGitHubリポジトリへ登録します。
2. [Vercel](https://vercel.com/new) にログインします。
3. `Add New Project` からGitHubリポジトリを選択します。
4. Framework Presetが `Next.js` になっていることを確認します。
5. `Environment Variables` に以下を追加します。

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

6. Production、Preview、Developmentの必要な環境へチェックを入れます。
7. `Deploy` を押します。

以降はGitHubへ変更を反映すると、Vercelが自動で再デプロイします。

### Vercel CLI経由

Vercelへログイン後、プロジェクトルートで実行します。

```bash
npx vercel
```

本番公開する場合:

```bash
npx vercel --prod
```

環境変数はVercel Dashboardの `Settings > Environment Variables` から登録してください。

## Vercel設定

- Framework: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: 自動設定
- Node.js: 22以上

`vercel.json` にNext.jsプロジェクトであることを明示しています。通常はVercel側の追加設定なしでデプロイできます。

## 公開後

1. 発行されたVercel URLでiPhone実機確認
2. GA4リアルタイム画面でアクセス確認
3. `start_diagnosis`、`complete_diagnosis`、`click_amazon` の受信確認
4. Amazonリンクの遷移確認
5. 必要に応じて独自ドメインをVercelへ設定
