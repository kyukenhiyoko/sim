# SUMOU sim LP 要件定義書

版：1.0  
作成日：2026-07-17  
対象：日本で生活・就労・留学する外国人向けSIMサービスLP

## 1. 制作目的

SUMOU sim の特徴、料金、支払方法、申込から利用開始までを平易に説明し、提携先の外部申込ページへ送客する。

LP内に申込フォームは置かない。主KPIは外部申込ページへのCTAクリックとする。

## 2. ブランド確定事項

| 項目 | 内容 |
|---|---|
| ブランド名 | SUMOU sim |
| 表記 | `SUMOU` は大文字、`sim` は小文字 |
| キャッチコピー | 日本での「つながる」を、もっと簡単に。 |
| 基調色 | グレージュ、アイボリー |
| アクセント | オレンジ |
| 申込URL | https://user.jpmob.jp/ |
| 仕様参照元 | https://jpsmart.net/ja |

## 3. 前提と公開ゲート

- SUMOU sim が JP SMART SIM の正規な代理・取次・提携ブランドであることを公開前に書面で確認する。
- 契約相手、販売主体、問い合わせ先、個人情報の取扱主体を明示する。
- CTA付近に「提携先の申込ページへ移動します」を表示する。
- 料金・キャンペーン・本人確認・配送条件は公開直前に公式サイトと申込画面で再確認する。
- 参照元のブランドロゴ、写真、文章、HTML、CSSを複製しない。
- 架空の利用者数、受賞歴、口コミ、満足度、No.1表現を掲載しない。

## 4. 想定ユーザー

- 来日前または来日直後で、日本の通信契約に不慣れな外国人
- 日本語での契約や初期設定に不安がある人
- クレジットカードを持っていない、または支払方法の選択肢を求める人
- 仕事・住居・銀行などの手続きに日本の電話番号が必要な人
- 通信用のDATA SIMを求める人

## 5. LP構成

1. 固定ヘッダー
2. ファーストビュー
3. 安心材料（料金・契約期間・配送・支払・言語・5G）
4. よくある悩み
5. SUMOU sim が選ばれる理由
6. CALL SIM / DATA SIM 料金タブ
7. CALL SIM / DATA SIM 比較
8. 回線・速度・通話・SMS情報
9. 支払方法
10. 本人確認書類
11. 利用開始までの流れ
12. 海外からの申込
13. 対応端末・eSIM注意事項
14. FAQ
15. 最終CTA
16. フッター
17. モバイル固定CTA

## 6. 必須機能

- CALL SIM / DATA SIM のタブ切替
- FAQアコーディオン
- 固定ヘッダーとモバイルメニュー
- モバイル画面下部の固定CTA
- 日本語・英語・ベトナム語・中国語の言語切替基盤
- 料金、URL、会社情報、注記を一元管理
- CTAごとの計測属性
- スムーズスクロール
- キーボード操作と適切なARIA属性
- `prefers-reduced-motion` 対応

## 7. 推奨実装構成

フレームワーク指定がない場合は、HTML、CSS、Vanilla JavaScriptで実装する。

```text
sumou-sim-lp/
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   ├── config.js
│   ├── i18n.js
│   └── main.js
├── locales/
│   ├── ja.json
│   ├── en.json
│   ├── vi.json
│   └── zh.json
└── assets/
```

## 8. 設定データ

以下はHTMLに重複記述せず、`js/config.js` などに集約する。

- ブランド名
- 申込URL
- 参考サイトURL
- 料金プラン
- 初期費用
- 回線・速度・通話・SMS
- 会社情報
- サポート情報
- 公開前確認フラグ

設定例：

```js
export const SITE_CONFIG = {
  brandName: 'SUMOU sim',
  applicationUrl: 'https://user.jpmob.jp/',
  referenceUrl: 'https://jpsmart.net/ja',
  applicationNote: '提携先の申込ページへ移動します。',
  sourceCheckedAt: '2026-07-17'
};
```

## 9. CTA仕様

- 同一タブで開く。
- すべて `SITE_CONFIG.applicationUrl` を参照する。
- `data-cta` を付与する。
- CTA例：`header-apply`、`hero-apply`、`call-plan-apply`、`data-plan-apply`、`fixed-apply`、`footer-apply`。
- Google Analyticsタグ自体は追加しない。

## 10. SEO

- title：`SUMOU sim｜日本での「つながる」を、もっと簡単に。`
- description：`外国人向けSIMサービスSUMOU sim。月額880円から、コンビニ払い、多言語サポート、全国送料無料に対応。日本に来る前から申し込みできます。`
- OGP一式と `assets/images/web/og-image.jpg` を設定する。
- JSON-LDは `Organization`、`Service`、`FAQPage` を候補とする。ただし販売主体を確認後に公開する。

## 11. アクセシビリティ

- WCAG 2.2 AAを目標にする。
- 本文文字色と背景色のコントラストを4.5:1以上にする。
- 操作領域は44px以上。
- フォーカスリングを消さない。
- タブとFAQは矢印キー・Enter・Spaceで操作できる構造にする。
- 画像に用途に合うaltを付け、装飾画像は空altにする。
- 色だけで状態を表さない。

## 12. 性能・品質

- ファーストビュー以外の画像を遅延読み込みする。
- 画像にwidth / heightまたはaspect-ratioを指定する。
- ヒーロー画像は`fetchpriority="high"`を検討する。
- 横スクロールを発生させない。
- コンソールエラー、404、壊れた画像を残さない。
- 390px、768px、1024px、1440pxで確認する。
- Lighthouseの目安：Performance 85以上、Accessibility 95以上、Best Practices 95以上、SEO 95以上。

## 13. 完成条件

- `DESIGN_SPEC.md` の色、余白、レイアウトに一致する。
- `CONTENT_SPEC.md` の文章と注記を反映する。
- 料金タブ、FAQ、言語切替、モバイルメニューが動作する。
- すべてのCTAが設定ファイルの申込URLへ遷移する。
- PCとモバイルで意図した写真トリミングになる。
- JP SMART SIMの素材を直接利用していない。
- 公開前確認項目をREADMEまたは完了報告に列挙する。
- 実ブラウザのスクリーンショットで見た目を検証する。

