(function () {
  'use strict';

const SITE_CONFIG = Object.freeze({
  brandName: 'SUMOU sim',
  applicationUrl: 'https://user.jpmob.jp/',
  referenceUrl: 'https://jpsmart.net/ja',
  applicationNote: '提携先の申込ページへ移動します。',
  sourceCheckedAt: '2026-07-17',
  localeDefault: 'ja',
  supportedLocales: ['ja', 'en', 'vi', 'zh'],
  verification: {
    legalRelationshipVerified: false,
    pricingVerifiedForPublication: false,
    identityFlowVerifiedForPublication: false,
    companyVerifiedForPublication: false
  },
  pricing: {
    setupFeeTaxIncluded: 3300,
    call: [
      { id: 'call-light', name: 'ライト', data: '1GB', monthlyTaxIncluded: 880, features: '電話番号・通話・SMS・データ' },
      { id: 'call-basic', name: 'ベーシック', data: '3GB', monthlyTaxIncluded: 1408, features: '電話番号・通話・SMS・データ' },
      { id: 'call-standard', name: 'スタンダード', data: '20GB', monthlyTaxIncluded: 2178, features: '電話番号・通話・SMS・データ', recommended: true },
      { id: 'call-max', name: 'SUMOU MAX', data: '直近3日で10GB', monthlyTaxIncluded: 5478, features: '電話番号・通話・SMS・データ', maxPlan: true }
    ],
    data: [
      { id: 'data-basic', name: 'ベーシック', data: '3GB', monthlyTaxIncluded: 1078, features: 'データ・SMS' },
      { id: 'data-standard', name: 'スタンダード', data: '20GB', monthlyTaxIncluded: 1848, features: 'データ・SMS', recommended: true },
      { id: 'data-max', name: 'SUMOU MAX', data: '直近3日で10GB', monthlyTaxIncluded: 5148, features: 'データ・SMS', maxPlan: true }
    ]
  },
  network: {
    carrier: 'NTTドコモ回線',
    standards: '4G/LTE、対応端末では5G',
    referenceMaxSpeed: 'LTEベストエフォート 下り最大375Mbps',
    afterAllowance: '最大128kbps',
    domesticCall: '22円 / 30秒',
    incomingCall: '無料',
    internationalCall: '利用不可',
    smsReceive: '無料',
    smsDomestic: '3.3円 / 通',
    smsInternational: '110円 / 通',
    dataAddOn: '1GB 880円'
  },
  company: {
    verifiedForSumouSim: false,
    candidateSeller: '株式会社CoeNova',
    candidateRepresentative: '代表取締役社長 澤田賢二',
    candidateOffice: '京都本社',
    candidatePhone: '075-315-5906',
    candidateHours: '10:00–18:00',
    candidateEmail: 'sim-support@m.coenova.co.jp'
  },
  notes: {
    pricing: '表示価格は税込です。契約事務手数料3,300円が初回のみ必要です。通話料、SMS送信料、追加データなどは別料金です。料金・キャンペーンは変更される場合があります。申込ページで最新条件をご確認ください。',
    maxPlan: 'SUMOU MAXはデータ繰越・追加チャージの対象外です。',
    speed: '通信速度は技術規格上の最大値です。実際の速度は場所、時間帯、端末、混雑状況などにより変わります。',
    identity: '本人確認の方法は申込区分や受取方法によって異なります。申込ページに表示される最新の案内を確認してください。',
    device: 'ご利用前に、端末の対応周波数・SIMロック・eSIM対応状況をご確認ください。',
    publication: '料金・条件は変更される場合があります。申込ページで最新情報をご確認ください。'
  }
});

function formatYen(value) {
  return new Intl.NumberFormat('ja-JP').format(value);
}

window.SUMOU_CONFIG = Object.freeze({ SITE_CONFIG, formatYen });
}());
