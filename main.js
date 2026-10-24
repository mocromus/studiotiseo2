/**
 * Studio Tiseo S.r.l. - People & Organization Advisory
 * Interactive Client-Side Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initDiagnosticScanner();
  initMethodStepper();
  initSediTabs();
  initContactForm();
  initBackToTop();
  initModal();
  initCookieBanner();
});

/* ==========================================================================
   Helper: Escape HTML Entities
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   1. Header Sticky & Scroll Spy
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy using getBoundingClientRect
    let currentId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-menu .nav-link');

  if (!toggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('is-active');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    toggle.classList.toggle('is-active');
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Interactive Diagnostic Scanner (Osteopatia Organizzativa - Page 3)
   ========================================================================== */
const diagnosticData = {
  1: {
    symptom: "Decisioni accentrate e rallentamenti",
    rootCause: "Grave collo di bottiglia a livello di vertice. Mancanza di perimetri decisionali delegati e processi opachi, che costringono il titolare a validare ogni minimo passaggio operativo.",
    solution: "Mappatura dei flussi decisionali critici, implementazione del protocollo di riallineamento dei poteri di firma e affiancamento al middle management per acquisire autonomia d'azione."
  },
  2: {
    symptom: "Sovrapposizioni di ruoli e responsabilità",
    rootCause: "Zone grigie nell'organigramma reale (spesso diverso da quello formale). Mancanza di chiarezza sulle proprietà dei processi chiave, con attriti interni e dispersione di energie.",
    solution: "Riorganizzazione dell'assetto dei ruoli attraverso il modello RACI personalizzato. Definizione trasparente degli indicatori di performance (KPI) individuali e di team."
  },
  3: {
    symptom: "Sovraccarico delle figure chiave",
    rootCause: "Le persone più capaci fungono da 'parafulmine' sistemico, assorbendo incombenze operative ordinarie a scapito della visione strategica, con rischio concreto di burnout o dimissioni.",
    solution: "Sgravamento sistemico tramite l'analisi dei carichi di lavoro (People Operations), redistribuzione delle deleghe e inserimento mirato di profili di supporto."
  },
  4: {
    symptom: "Inserimenti che non risolvono i problemi",
    rootCause: "Assunzione fondata esclusivamente sul curriculum tecnico senza aver diagnosticato il tessuto relazionale e culturale dell'azienda. Il nuovo profilo viene rigettato dal sistema.",
    solution: "Protocollo Head Hunting Etico: diagnosi preventiva dell'ambiente sistemico in cui si innesta la risorsa, valutazione trasparente attitudinale e affiancamento all'onboarding per 6 mesi."
  }
};

function initDiagnosticScanner() {
  const symptomItems = document.querySelectorAll('.symptom-item');
  const resultBox = document.getElementById('diagnostic-result-box');

  if (!symptomItems.length || !resultBox) return;

  symptomItems.forEach(item => {
    item.addEventListener('click', () => {
      symptomItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const id = item.getAttribute('data-id');
      const data = diagnosticData[id];

      if (data) {
        resultBox.style.animation = 'none';
        void resultBox.offsetWidth; // trigger reflow
        resultBox.style.animation = 'fadeIn 0.3s ease';
        resultBox.innerHTML = `
          <h5>Diagnosi Studio Tiseo: ${data.symptom}</h5>
          <p style="margin-bottom: 8px;"><strong>Causa profonda:</strong> ${data.rootCause}</p>
          <p><strong>Riallineamento:</strong> ${data.solution}</p>
        `;
      }
    });
  });
}

/* ==========================================================================
   4. Interactive Method Stepper (Page 5)
   ========================================================================== */
const methodPhases = {
  1: {
    title: "Fase 01: Ascolto e Immersione",
    business: "Interviste confidenziali alla governance e ai responsabili di funzione. Comprensione del contesto competitivo, storia aziendale e criticità latenti.",
    personal: "Colloquio esplorativo e confidenziale per comprendere aspettative, vissuto professionale e leve motivazionali.",
    output: "Mappa delle evidenze preliminari e patto di collaborazione."
  },
  2: {
    title: "Fase 02: Analisi Sistemica",
    business: "Audit approfondito su ruoli, processi, flussi decisionali, carichi di lavoro e clima organizzativo.",
    personal: "Bilancio approfondito delle competenze trasversali e verticali, punti di forza e aree di posizionamento.",
    output: "Dossier di diagnosi sistemica con evidenza dei nodi critici."
  },
  3: {
    title: "Fase 03: Definizione delle Priorità",
    business: "Individuazione delle leve ad alto impatto. Costruzione del piano d'azione proporzionato, evitando stravolgimenti inutili.",
    personal: "Definizione degli obiettivi di carriera realistici e strategia di target sul mercato.",
    output: "Action Plan operativo con cronoprogramma e KPI condivisi."
  },
  4: {
    title: "Fase 04: Intervento e Riallineamento",
    business: "Affiancamento sul campo, coaching organizzativo, mediazione delle resistenze al cambiamento e ricerca delle figure chiave.",
    personal: "Preparazione strategica ai colloqui, ottimizzazione dossier professionale, simulazioni e introduzione nel network qualificato.",
    output: "Attuazione progressiva delle nuove routine e ruoli."
  },
  5: {
    title: "Fase 05: Verifica e Consolidamento",
    business: "Misurazione degli indicatori di performance, follow-up a 30, 60 e 180 giorni, monitoraggio della continuità operativa.",
    personal: "Verifica dell'inserimento nella nuova realtà, bilancio di soddisfazione e consolidamento della traiettoria.",
    output: "Report finale di sostenibilità sistemica."
  }
};

function initMethodStepper() {
  const steps = document.querySelectorAll('.method-step');
  const panel = document.getElementById('method-expanded-content');

  if (!steps.length || !panel) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const phaseId = step.getAttribute('data-step');
      const data = methodPhases[phaseId];

      if (data) {
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = 'fadeIn 0.35s ease';
        panel.innerHTML = `
          <div class="panel-col">
            <h5>${data.title} — Per le Imprese</h5>
            <p>${data.business}</p>
            <p style="margin-top: 10px; font-size: 0.85rem; color: var(--color-primary); font-weight: 700;">Output: ${data.output}</p>
          </div>
          <div class="panel-col">
            <h5>${data.title} — Per le Persone</h5>
            <p>${data.personal}</p>
            <p style="margin-top: 10px; font-size: 0.85rem; color: var(--color-primary); font-weight: 700;">Approccio: Percorso riservato e sartoriale.</p>
          </div>
        `;
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Sedi & Geolocation Switcher
   ========================================================================== */
const sediData = {
  torino: {
    badge: "QUARTIER GENERALE STORICO",
    city: "Torino (Sede Legale & Direzione)",
    address: "Via Goffredo Casalis, 59 — 10138 Torino (TO)",
    details: "Quartier Generale storico e Direzione Generale di Studio Tiseo S.r.l. dal 1997. Centro operativo per Piemonte e Liguria.",
    contacts: "benedetto.tiseo@studiotiseo.it | +39 347 2424491",
    mapLink: "https://maps.google.com/?q=Via+Goffredo+Casalis+59+Torino",
    waMsg: "Buongiorno%2C%20desidero%20mettermi%20in%20contatto%20con%20la%20sede%20di%20Torino%20di%20Studio%20Tiseo."
  },
  milano: {
    badge: "POLO LOMBARDIA & FINANZA",
    city: "Milano",
    address: "Via Niccolini, 30 — 20154 Milano (MI)",
    details: "Hub strategico per la Lombardia e i settori High-Tech, Finanza, Moda & Manifattura avanzata.",
    contacts: "commerciale@studiotiseo.it | +39 347 2424491",
    mapLink: "https://maps.google.com/?q=Via+Niccolini+30+Milano",
    waMsg: "Buongiorno%2C%20desidero%20mettermi%20in%20contatto%20con%20la%20sede%20di%20Milano%20di%20Studio%20Tiseo."
  },
  rivarolo: {
    badge: "POLO MANIFATTURA & CANAVESE",
    city: "Rivarolo Canavese (TO)",
    address: "Corso Torino, 134 — 10086 Rivarolo Canavese (TO)",
    details: "Presidio territoriale dedicato all'area industriale dell'Alto Canavese, meccanica di precisione e automotive.",
    contacts: "divisionestudi@studiotiseo.it | +39 380 380 5307",
    mapLink: "https://maps.google.com/?q=Corso+Torino+134+Rivarolo+Canavese",
    waMsg: "Buongiorno%2C%20desidero%20mettermi%20in%20contatto%20con%20la%20sede%20di%20Rivarolo%20Canavese%20di%20Studio%20Tiseo."
  },
  ivrea: {
    badge: "POLO INNOVAZIONE & TECH",
    city: "Ivrea (TO)",
    address: "Via Guarnotta, 3 — 10015 Ivrea (TO)",
    details: "Sede nell'iconico polo tecnologico e culturale di Ivrea, a supporto dell'innovazione industriale e biomedicale.",
    contacts: "commerciale@studiotiseo.it | +39 347 2424491",
    mapLink: "https://maps.google.com/?q=Via+Guarnotta+3+Ivrea",
    waMsg: "Buongiorno%2C%20desidero%20mettermi%20in%20contatto%20con%20la%20sede%20di%20Ivrea%20di%20Studio%20Tiseo."
  },
  bra: {
    badge: "PRESIDIO CUNEESE & FOOD",
    city: "Bra (CN)",
    address: "Piazza Carlo Alberto, 44 — 12042 Bra (CN)",
    details: "Riferimento primario per il cuneese, l'agroalimentare di eccellenza, tessile e il polo vitivinicolo di Langhe & Roero.",
    contacts: "healthcare@studiotiseo.it | +39 347 2424491",
    mapLink: "https://maps.google.com/?q=Piazza+Carlo+Alberto+44+Bra",
    waMsg: "Buongiorno%2C%20desidero%20mettermi%20in%20contatto%20con%20la%20sede%20di%20Bra%20di%20Studio%20Tiseo."
  }
};

function initSediTabs() {
  const tabs = document.querySelectorAll('.sede-tab-item');
  const badgeTitle = document.getElementById('sede-badge');
  const cityTitle = document.getElementById('sede-city-title');
  const addressText = document.getElementById('sede-address-text');
  const detailsText = document.getElementById('sede-details-text');
  const contactsText = document.getElementById('sede-contacts-text');
  const mapBtn = document.getElementById('sede-map-btn');
  const waBtn = document.getElementById('sede-whatsapp-btn');

  if (!tabs.length || !cityTitle) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const sedeKey = tab.getAttribute('data-sede');
      const data = sediData[sedeKey];

      if (data) {
        if (badgeTitle) badgeTitle.textContent = data.badge;
        cityTitle.textContent = data.city;
        addressText.textContent = data.address;
        detailsText.textContent = data.details;
        contactsText.textContent = data.contacts;
        mapBtn.setAttribute('href', data.mapLink);
        if (waBtn) waBtn.setAttribute('href', `https://api.whatsapp.com/send?phone=393803805307&text=${data.waMsg}`);
      }
    });
  });
}

/* ==========================================================================
   6. Contact Form Logic with Instant Options (Mailto & WhatsApp)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const scope = document.getElementById('cf-scope').value;
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      alert('Per favore compila tutti i campi obbligatori (Nome, Email, Messaggio).');
      return;
    }

    // Determine target recipient based on scope
    let recipient = 'commerciale@studiotiseo.it';
    if (scope.includes('Healthcare')) recipient = 'healthcare@studiotiseo.it';
    if (scope.includes('Studi')) recipient = 'divisionestudi@studiotiseo.it';
    if (scope.includes('Transizione') || scope.includes('Carriera')) recipient = 'benedetto.tiseo@studiotiseo.it';

    const subject = encodeURIComponent(`[Richiesta Sito Web] ${scope} - ${name}`);
    const body = encodeURIComponent(
      `Nuova richiesta di contatto dal sito web Studio Tiseo S.r.l.\n\n` +
      `Nome/Azienda: ${name}\n` +
      `Email: ${email}\n` +
      `Telefono: ${phone}\n` +
      `Ambito: ${scope}\n\n` +
      `Messaggio:\n${message}\n\n` +
      `-- Inviato tramite studiotiseo.it`
    );

    // Provide user with options
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    const waUrl = `https://api.whatsapp.com/send?phone=393803805307&text=${body}`;

    feedback.style.display = 'block';
    feedback.innerHTML = `
      <div style="background: #eef4fd; border: 1.5px solid var(--color-primary); border-radius: 12px; padding: 20px; margin-top: 20px; animation: fadeIn 0.3s ease;">
        <h4 style="color: var(--navy-900); font-size: 1.1rem; margin-bottom: 8px;">Grazie per la tua richiesta, ${escapeHtml(name)}.</h4>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px;">
          Scegli la modalità con cui preferisci inoltrare immediatamente la tua richiesta alla Direzione:
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${mailtoUrl}" class="btn btn-primary" style="padding: 10px 18px; font-size: 0.875rem;">
            ✉️ Invia via Email Client
          </a>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding: 10px 18px; font-size: 0.875rem;">
            💬 Invia via WhatsApp H24
          </a>
        </div>
      </div>
    `;

    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. Modal for Quick Strategic Assessment
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('consultation-modal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButton = document.querySelector('.modal-close');
  const modalForm = document.getElementById('modal-form');
  const modalFeedback = document.getElementById('modal-feedback');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('mf-name') ? document.getElementById('mf-name').value.trim() : '');
      const email = (document.getElementById('mf-email') ? document.getElementById('mf-email').value.trim() : '');
      const phone = (document.getElementById('mf-phone') ? document.getElementById('mf-phone').value.trim() : '');
      const scope = (document.getElementById('mf-scope') ? document.getElementById('mf-scope').value : 'Confronto Strategico');

      if (!name || !email) {
        alert('Per favore inserisci almeno Nome ed Email.');
        return;
      }

      let recipient = 'benedetto.tiseo@studiotiseo.it';
      if (scope.includes('Healthcare')) recipient = 'healthcare@studiotiseo.it';
      if (scope.includes('Studi')) recipient = 'divisionestudi@studiotiseo.it';

      const subject = encodeURIComponent(`[Richiesta Rapida Confronto] ${scope} - ${name}`);
      const body = encodeURIComponent(
        `Richiesta rapida di confronto strategico dalla finestra popup:\n\n` +
        `Nome/Azienda: ${name}\n` +
        `Email: ${email}\n` +
        `Telefono: ${phone}\n` +
        `Ambito: ${scope}\n\n` +
        `-- Inviato tramite studiotiseo.it`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
      const waUrl = `https://api.whatsapp.com/send?phone=393803805307&text=${body}`;

      if (modalFeedback) {
        modalFeedback.style.display = 'block';
        modalFeedback.innerHTML = `
          <div style="background: #eef4fd; border: 1.5px solid var(--color-primary); border-radius: 12px; padding: 16px; margin-top: 14px; animation: fadeIn 0.3s ease;">
            <p style="font-weight: 700; color: var(--navy-900); font-size: 0.95rem; margin-bottom: 6px;">Grazie ${escapeHtml(name)}, procedi con l'invio immediato:</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
              <a href="${mailtoUrl}" class="btn btn-primary" style="padding: 8px 14px; font-size: 0.85rem;">✉️ Invia Email</a>
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding: 8px 14px; font-size: 0.85rem;">💬 Invia WhatsApp H24</a>
            </div>
          </div>
        `;
      }
    });
  }
}

/* ==========================================================================
   9. Cookie & Privacy Notice Banner
   ========================================================================== */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept-btn');

  if (!banner || !acceptBtn) return;

  if (localStorage.getItem('tiseo_cookies_accepted') === 'true') {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('tiseo_cookies_accepted', 'true');
    banner.classList.add('hidden');
  });
}

/* ==========================================================================
   9. Cookie & Privacy Notice Banner
   ========================================================================== */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept-btn');

  if (!banner || !acceptBtn) return;

  if (localStorage.getItem('tiseo_cookies_accepted') === 'true') {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('tiseo_cookies_accepted', 'true');
    banner.classList.add('hidden');
  });
}