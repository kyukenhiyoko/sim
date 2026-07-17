# SUMOU sim LP デザイン仕様書

## 1. 方向性

コンセプトは「日本での生活に安心してなじめる、温かくスタイリッシュな通信サービス」。通信会社にありがちな青中心の表現を避け、温かいグレージュに、行動を促すオレンジを絞って使う。

キーワード：Stylish / Warm / Clear / Human / Trustworthy

完成基準は `reference/styleboard.png`。直前の会話で生成されたLP完成画像そのものは本パッケージに含まれていないため、ここに記載する数値仕様を実装基準とする。

## 2. ロゴ

- 基本：`assets/logo/logo-horizontal-pentagon.svg`
- 濃色背景：`assets/logo/logo-reversed-pentagon.svg`
- アイコン単体：`assets/logo/logo-mark-pentagon.svg`
- favicon：`assets/logo/favicon-pentagon.svg`
- マークは五角形状に散らばる5つの丸を線で結んだネットワーク。人・情報・場所のつながりを表し、相撲モチーフは使わない。
- 横組みロゴの最小表示幅は144px。周囲にマーク高さの25%以上の余白を確保する。
- 回転、縦横比変更、影、グラデーション、色変更を行わない。

## 3. カラートークン

```css
:root {
  --color-bg: #F6F1EA;
  --color-surface: #FFFDF9;
  --color-surface-alt: #EFE6DC;
  --color-greige: #D8CABB;
  --color-greige-dark: #9E8B78;
  --color-orange: #F26A10;
  --color-orange-hover: #D95605;
  --color-orange-soft: #FFF0E4;
  --color-ink: #2F251E;
  --color-text: #4D423A;
  --color-muted: #6C6057;
  --color-border: #E7DDD2;
  --color-white: #FFFFFF;
  --color-success: #3E7455;
  --focus-ring: #8B4513;
}
```

オレンジはCTA、価格、選択状態、重要ラベルに限定する。大面積の背景には使わない。

## 4. タイポグラフィ

```css
font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
```

- 本文：16px / 1.8、モバイル15–16px
- 補足：13–14px / 1.7
- H1：PC 60px / 1.18、モバイル40px / 1.25、font-weight 750
- H2：PC 42px / 1.3、モバイル30px / 1.35、font-weight 700
- H3：PC 24px、モバイル21px
- 価格：PC 44px、モバイル38px、タブラー数字
- 1行の本文は日本語で約34–42文字以内を目安にする。
- H1は「日本での『つながる』を、／もっと簡単に。」の2行。2行目をオレンジにする。

## 5. レイアウト

- 最大コンテンツ幅：1200px
- ワイド背景内の最大幅：1280px
- PC左右余白：32px以上
- タブレット左右余白：28px
- モバイル左右余白：20px
- セクション上下：PC 112px、タブレット88px、モバイル72px
- 8pxグリッドを基本にする。
- 角丸：カード24px、写真28px、ボタン999px、タグ999px
- 枠線：1px solid `--color-border`
- 影：`0 18px 50px rgb(47 37 30 / 0.08)` を上限とする。

## 6. ブレークポイント

- モバイル：0–767px
- タブレット：768–1023px
- デスクトップ：1024px以上
- 1440px以上でもコンテンツ幅を無制限に広げない。

## 7. ヘッダー

- 高さ：PC 80px、モバイル64px
- 背景：`rgba(255,253,249,.96)`、backdrop-filterは補助的に使用可
- 1px下罫線。スクロール時のみ薄い影。
- PCはロゴ、ナビ4項目、言語切替、申込CTA。
- モバイルはロゴ、言語、ハンバーガー。メニュー開閉時に背景スクロールを止める。

## 8. ファーストビュー

- PC：本文42%、画像58%の2カラム。最小高さ720px。
- 背景：`--color-bg`。抽象円や細線はCSSでごく薄く装飾してよい。
- 画像：`assets/images/web/hero.webp`、3:2、右側、角丸32px。
- モバイル：コピー→画像→CTA。画像は`hero-mobile.webp`、4:5。
- 主CTAは高さ56px、左右28px。副CTAはアウトライン。
- バッジは最大6個を折り返し表示する。
- 画像上に文字を直接置かない。

## 9. 特徴エリア

- PCは5枚カード。1024px未満は2列、モバイルは横スクロールではなく1列または2列。
- アイコンは48px、カード内部余白24px。
- 写真付きカードにする場合、写真のアスペクト比は4:3で統一する。
- 使用候補：`payment.webp`、`support.webp`、`setup.webp`、`overseas.webp`。

## 10. 料金エリア

- 背景：`--color-surface-alt`。
- タブはセグメントコントロール。選択状態をオレンジ背景＋白文字で示す。
- PCは料金カード最大4列。推奨プランは枠をオレンジ2px、上部に「おすすめ」。
- 価格と容量を最も強く、機能一覧は簡潔にする。
- カード高さを揃える。CTAは下端に揃える。
- 注意書きはカード群直下にまとめる。

## 11. 情報・比較・フロー

- CALL/DATA比較はPCで表、モバイルは項目ごとの比較カード。
- 支払方法は公式ブランドロゴを無断使用せず、テキスト＋`payment.svg`を基本にする。
- 利用開始フローはPC横5段、モバイル縦。番号はオレンジ円、接続線はグレージュ。
- 海外申込は `overseas.webp` と本文の2カラム。
- 本人確認・注意事項はアイボリー背景＋濃い文字。警告を赤一色にしない。

## 12. FAQ・最終CTA・フッター

- FAQは1カラムのアコーディオンを推奨。PCでも読みやすさ優先で最大900px。
- 質問行の高さは64px以上。開閉アイコンは回転させる。
- 最終CTAは濃いインク背景、ロゴはreversed、オレンジCTA。
- フッターは `#2F251E`。会社情報は販売主体確認後に表示する。

## 13. モーション

- 150–240msの短いトランジションのみ。
- スクロール連動の大きなパララックスは使わない。
- `prefers-reduced-motion: reduce` でアニメーションを停止する。

## 14. 画像トリミング

- hero：PC `object-position: 72% 50%`、モバイルは専用画像。
- overseas：`object-position: 35% 50%`
- payment：`object-position: 55% 50%`
- support：`object-position: 68% 50%`
- setup：`object-position: 45% 50%`

人物写真には「イメージ写真」の注記を必須としないが、利用者の声や導入事例の本人として扱わない。
