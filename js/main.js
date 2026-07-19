(function () {
  'use strict';

const { SITE_CONFIG, formatYen } = window.SUMOU_CONFIG;
const { getCurrentLocale, initializeI18n, setLocale, t } = window.SUMOU_I18N;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function configureCtas() {
  $$('[data-cta]').forEach((cta) => {
    cta.href = SITE_CONFIG.applicationUrl;
    cta.target = '_self';
  });
  $$('[data-application-note]').forEach((note) => {
    note.textContent = SITE_CONFIG.applicationNote;
  });
}

function createPlanCard(plan, type) {
  const planName = t(`plan.${plan.id}.name`) || plan.name;
  const planData = t(`plan.${plan.id}.data`) || plan.data;
  const planFeatures = t(`plan.${type}.features`) || plan.features;
  const article = document.createElement('article');
  article.className = `plan-card${plan.recommended ? ' is-recommended' : ''}`;
  article.innerHTML = `
    ${plan.recommended ? `<span class="plan-card__label">${t('plan.recommended')}</span>` : ''}
    <div class="plan-card__head">
      <p class="plan-card__name">${planName}</p>
      <p class="plan-card__data">${planData}</p>
    </div>
    <p class="plan-card__price"><span class="plan-card__yen">¥</span>${formatYen(plan.monthlyTaxIncluded)}<span class="plan-card__month">${t('plan.perMonth')}</span></p>
    <p class="plan-card__tax">${t('plan.taxIncluded')}</p>
    <p class="plan-card__features">${planFeatures}</p>
    <a class="button button--primary button--full" href="${SITE_CONFIG.applicationUrl}" target="_self" data-cta="${type}-plan-apply-${plan.id}">${t('cta.apply')}</a>
    <small class="external-note" data-application-note>${t('cta.externalNote')}</small>
  `;
  return article;
}

function renderPlans(type) {
  const grid = $('[data-plan-grid]');
  const plans = [...SITE_CONFIG.pricing[type]].sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)));
  grid.replaceChildren(...plans.map((plan) => createPlanCard(plan, type)));
  $('[data-max-note]').hidden = !SITE_CONFIG.pricing[type].some((plan) => plan.maxPlan);
}

function activateTab(nextTab, focus = false) {
  const tabs = $$('[role="tab"]');
  tabs.forEach((tab) => {
    const selected = tab.dataset.planType === nextTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  $('#plan-panel').setAttribute('aria-labelledby', `tab-${nextTab}`);
  renderPlans(nextTab);
  const summaryKey = `plan.summary.${nextTab}`;
  $('[data-plan-summary]').dataset.i18n = summaryKey;
  $('[data-plan-summary]').textContent = t(summaryKey);
}

function initializeTabs() {
  const tabs = $$('[role="tab"]');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.planType));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      activateTab(tabs[nextIndex].dataset.planType, true);
    });
  });
  activateTab('call');
}

function initializeFaq() {
  $$('.faq__button').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });
}

function initializeMenu() {
  const button = $('[data-menu-button]');
  const menu = $('[data-mobile-menu]');
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  };
  button.addEventListener('click', () => {
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(willOpen));
    menu.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
    if (willOpen) $('.mobile-nav__link', menu)?.focus();
  });
  $$('.mobile-nav__link', menu).forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      close();
      button.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) close();
  });
}

function initializeHeader() {
  const header = $('[data-header]');
  const sync = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function initializePaymentSlider() {
  const slider = $('[data-payment-slider]');
  const track = $('[data-payment-track]');
  if (!slider || !track || track.children.length < 2) return;

  let moving = false;
  const advance = () => {
    if (moving || document.hidden) return;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    moving = true;
    track.style.transition = 'transform 600ms cubic-bezier(.22,.61,.36,1)';
    track.style.transform = `translateX(-${firstCard.getBoundingClientRect().width + gap}px)`;
  };

  track.addEventListener('transitionend', () => {
    const firstCard = track.firstElementChild;
    if (firstCard) track.append(firstCard);
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    track.offsetHeight;
    moving = false;
  });

  window.setInterval(advance, 3000);
}

function initializeLocaleSelectors() {
  $$('[data-locale-select]').forEach((select) => {
    select.addEventListener('change', async (event) => {
      await setLocale(event.target.value);
      if (event.target.closest('[data-mobile-menu]')) {
        const button = $('[data-menu-button]');
        const menu = $('[data-mobile-menu]');
        button.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.classList.remove('menu-open');
        button.focus();
      }
    });
  });
}

function renderConfigValues() {
  $$('[data-setup-fee]').forEach((el) => { el.textContent = formatYen(SITE_CONFIG.pricing.setupFeeTaxIncluded); });
  const networkMap = {
    carrier: SITE_CONFIG.network.carrier,
    standards: SITE_CONFIG.network.standards,
    referenceMaxSpeed: SITE_CONFIG.network.referenceMaxSpeed,
    afterAllowance: SITE_CONFIG.network.afterAllowance,
    domesticCall: SITE_CONFIG.network.domesticCall,
    incomingCall: SITE_CONFIG.network.incomingCall,
    internationalCall: SITE_CONFIG.network.internationalCall,
    smsReceive: SITE_CONFIG.network.smsReceive,
    smsDomestic: SITE_CONFIG.network.smsDomestic,
    smsInternational: SITE_CONFIG.network.smsInternational,
    dataAddOn: SITE_CONFIG.network.dataAddOn
  };
  Object.entries(networkMap).forEach(([key, value]) => {
    $$(`[data-config="${key}"]`).forEach((el) => { el.textContent = value; });
  });
  $$('[data-pricing-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.pricing; });
  $$('[data-max-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.maxPlan; });
  $$('[data-speed-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.speed; });
  $$('[data-identity-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.identity; });
  $$('[data-device-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.device; });
  $$('[data-publication-note]').forEach((el) => { el.textContent = SITE_CONFIG.notes.publication; });
  $$('[data-source-date]').forEach((el) => { el.textContent = SITE_CONFIG.sourceCheckedAt; });
}

async function initialize() {
  configureCtas();
  renderConfigValues();
  initializeTabs();
  initializeFaq();
  initializeMenu();
  initializeHeader();
  initializePaymentSlider();
  initializeLocaleSelectors();
  document.addEventListener('localechange', () => {
    const selectedTab = $('[role="tab"][aria-selected="true"]');
    if (selectedTab) activateTab(selectedTab.dataset.planType);
  });
  await initializeI18n();
}

initialize().catch((error) => console.error('[SUMOU sim] Initialization failed:', error));
}());
