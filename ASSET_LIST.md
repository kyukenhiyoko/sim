# 素材一覧・使用指示

## 1. 写真素材

| ファイル | 推奨用途 | 推奨alt | 注記 |
|---|---|---|---|
| `assets/images/web/hero.webp` | PCヒーロー | 日本人と外国人がスマートフォンを見ながら談笑している | 最優先表示 |
| `assets/images/web/hero-mobile.webp` | モバイルヒーロー | 同上 | 4:5専用クロップ |
| `assets/images/web/overseas.webp` | 海外からの申込 | 空港でスマートフォンを確認する旅行者 | 右側に余白 |
| `assets/images/web/payment.webp` | 支払方法 | コンビニのレジでスマートフォンを使って支払う様子 | 決済ブランドなし |
| `assets/images/web/support.webp` | 多言語サポート | ヘッドセットで案内するサポートスタッフ | 実在担当者として扱わない |
| `assets/images/web/setup.webp` | 配送・初期設定 | 届いたSIMカードを確認する利用者 | 生成画像内の説明書は読ませない |
| `assets/images/web/og-image.jpg` | OGP/Twitterカード | 指定不要 | 1200×630 |

`assets/images/source/`には高解像度PNGを保存している。通常実装では`web/`を使う。

## 2. ロゴ

| ファイル | 用途 |
|---|---|
| `assets/logo/logo-horizontal-pentagon.svg` | ヘッダー、明るい背景（推奨） |
| `assets/logo/logo-reversed-pentagon.svg` | フッター、濃色背景（推奨） |
| `assets/logo/logo-mark-pentagon.svg` | 小型カード、SNS補助（推奨） |
| `assets/logo/favicon-pentagon.svg` | favicon（推奨） |
| `assets/logo/logo-pentagon-preview.png` | 新ロゴの明色・濃色背景プレビュー |

新ロゴは、五角形状に散らばる5つの丸を線で結んだネットワークモチーフ。相撲とは無関係の方向性で制作している。従来案も比較用に残しているが、実装では`-pentagon`付きファイルを優先する。商標調査は含まれないため、本採用前に類似商標・類似ロゴを確認する。

## 3. アイコン

- `phone.svg`：CALL SIM / 日本の電話番号
- `globe.svg`：海外申込 / 多言語
- `payment.svg`：支払方法
- `support.svg`：サポート
- `delivery.svg`：配送
- `esim.svg`：eSIM
- `shield.svg`：本人確認 / 安心
- `speed.svg`：通信速度 / 5G

各SVGは`currentColor`を使うため、CSSで文字色と連動できる。48pxを基準に、24px未満へ縮小しない。

## 4. 参考画像

`reference/styleboard.png`は色・写真・雰囲気の基準。レイアウトのピクセルパーフェクトな完成見本ではない。

## 5. 画像生成プロンプト要約

すべてCodexの組み込み画像生成機能で作成した。

### Hero

`photorealistic-natural / premium editorial lifestyle photo / Japanese adult and non-Japanese adult laughing together while looking at a smartphone / modern Tokyo café terrace / subjects on right, generous left negative space / warm greige, cream, charcoal, restrained orange / no text, logos, sumo imagery or stock-photo pose`

### Overseas

`photorealistic-natural / international resident arriving at a modern Japanese airport, smartphone and carry-on / subject left, open right / warm daylight / no readable signs or airline brands`

### Payment

`photorealistic-natural / generic Japanese convenience-store checkout / smartphone barcode payment / warm-neutral, unbranded / no readable UI or payment logos`

### Support

`photorealistic-natural / multilingual customer support specialist with headset and laptop / warm minimal workspace / calm and competent / no logos or flags`

### Setup

`photorealistic-natural / international resident opening generic SIM delivery envelope in a modern Japanese apartment / soft afternoon light / greige and orange / no readable instructions or brands`

## 6. 使用上の注意

- 生成画像はイメージ写真として使用する。
- 画像内の人物に氏名、国籍、体験談を割り当てない。
- 第三者ブランドのロゴを追加しない。
- 決済ブランドの正式ロゴを使う場合は別途ガイドラインと許諾を確認する。
- 画像編集時も肌色、手指、スマートフォンの形状、背景の文字化けを目視確認する。
