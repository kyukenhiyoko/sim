# SUMOU sim LP 制作パッケージ

このフォルダは、SUMOU sim のランディングページを Codex で制作するための仕様書・文章・画像・ロゴ・アイコン一式です。

## 最初に読む順番

1. `SOURCE_NOTES.md` — 参照情報と公開前確認事項
2. `REQUIREMENTS.md` — 目的・機能・完成条件
3. `DESIGN_SPEC.md` — 見た目とレスポンシブ仕様
4. `CONTENT_SPEC.md` — 掲載文・料金・FAQ
5. `ASSET_LIST.md` — 素材の使い分け
6. `CODEX_PROMPT.md` — Codex にそのまま渡す実装指示

## フォルダ構成

```text
SUMOU-sim-LP-package/
├── README.md
├── REQUIREMENTS.md
├── DESIGN_SPEC.md
├── CONTENT_SPEC.md
├── SOURCE_NOTES.md
├── ASSET_LIST.md
├── CODEX_PROMPT.md
├── IMPLEMENTATION_CHECKLIST.md
├── assets/
│   ├── images/
│   │   ├── source/   # 生成した高解像度PNG
│   │   └── web/      # Web実装向けWebP/JPG
│   ├── logo/         # SVGロゴ、マーク、favicon
│   └── icons/        # オリジナル線画SVG
├── locales/          # 日本語・英語・ベトナム語・中国語の言語データ
├── scripts/          # 言語JSONから直接表示用バンドルを生成
└── reference/
    └── styleboard.png
```

## Codex での使い方

1. このフォルダを制作対象リポジトリの `brief/` などへコピーします。
2. `CODEX_PROMPT.md` の全文を Codex に渡します。
3. 「このパッケージを唯一の制作仕様として扱い、実装後にスクリーンショットで照合してください」と依頼します。
4. 実装後は `IMPLEMENTATION_CHECKLIST.md` を使って確認します。

## 素材について

- 写真はこの案件のためにAI生成したオリジナル素材です。
- ロゴとアイコンはこのパッケージ用に作成したSVGです。
- JP SMART SIM の画像・ロゴ・HTML・CSSは含まれていません。
- 生成画像には人物が含まれるため、実在人物の推薦・利用者レビューとして扱わず、イメージ写真として使用してください。

## 重要な公開前確認

`SUMOU sim` と JP SMART SIM / 株式会社CoeNova の契約・代理店関係、販売主体、料金・キャンペーン、本人確認手順を責任者が最終確認してください。参照サイトの内容は変更される可能性があります。詳細は `SOURCE_NOTES.md` に記載しています。

このLPは公開前確認用です。`js/config.js` の確認フラグはすべて `false` であり、SUMOU sim と JP SMART SIM / 株式会社CoeNova の提携関係が確認されるまで本番公開済みとして扱わないでください。

### SOURCE_NOTES.mdから転載した公開前チェック

- [ ] SUMOU simがJP SMART SIMの正規な代理・取次・提携ブランドである
- [ ] 「SUMOU sim」名義で各料金・機能を表示する許諾がある
- [ ] 契約相手と販売主体が誰か
- [ ] 申込URLがSUMOU sim経由の正しいURLか（紹介コードや専用パラメータを含むか）
- [ ] 外部申込画面にSUMOU simからの遷移であることが分かるか
- [ ] 通常料金、キャンペーン容量、キャンペーン終了日
- [ ] 契約事務手数料と初回請求の内訳
- [ ] 解約事務手数料無料が恒久条件かキャンペーンか
- [ ] 国内CALL SIM本人確認で利用できる方式と対象ユーザー
- [ ] eSIMの提供範囲、案内方法、対応端末
- [ ] 配送締切時刻、当日発送条件、空港受取条件
- [ ] サポート言語、営業時間、連絡先
- [ ] 会社情報、利用規約、プライバシーポリシーへの正しいリンク

## 実装ファイルと設定

- `index.html`：LP本体とSEOメタデータ、構造化データ候補
- `css/reset.css` / `css/style.css`：スタイルとレスポンシブ表示
- `js/config.js`：申込URL、料金、通信条件、会社候補情報、注記、情報確認日、公開前確認フラグ
- `js/i18n.js`：言語切替、日本語フォールバック、欠落キー警告
- `js/main.js`：料金タブ、FAQ、メニュー、固定CTAなどの画面機能
- `locales/*.json`：言語データ

申込URLを変更する場合は `js/config.js` の `applicationUrl` だけを変更してください。料金、会社候補情報、注記も同じファイルで一元管理しています。

## 多言語について

日本語・英語・ベトナム語・簡体字中国語の全表示キーを実装しています。欠落キーが生じた場合は日本語へフォールバックし、ブラウザのコンソールへ警告を出します。翻訳は原文の条件を追加・断定しないよう揃えていますが、**本番公開前には各言語のネイティブ校閲と法務・商品条件の最終確認が必要です。**

## ローカル確認

`index.html`をダブルクリックするだけで表示・操作できます。HTTPサーバーは不要です。

開発時にHTTP経由でも確認したい場合は、次の方法を利用できます。

```sh
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173/` を開きます。

`locales/locales.js`は、`file://`での直接表示に対応するため、`locales/*.json`をブラウザで直接読み込める形式にまとめた生成ファイルです。JSONを更新した場合は、次のコマンドで全言語のキー一致を検証しながら再生成してください。

```sh
node scripts/complete-locales.mjs
```

## 画像の差し替え

通常表示には `assets/images/web/` の同名ファイルを使います。差し替える場合は同じファイル名・アスペクト比で書き出すとコード変更は不要です。ヒーローはPC用 `hero.webp`（3:2）とモバイル用 `hero-mobile.webp`（4:5）の両方を差し替えてください。OGPは `og-image.jpg`（1200×630）です。人物を実在利用者・推薦者・サポート担当者として扱わないでください。

## 画像生成について

写真素材はCodexの組み込み画像生成機能で作成し、Web用に最適化しています。最終プロンプトは `ASSET_LIST.md` に要約しています。
# sim
# sim
