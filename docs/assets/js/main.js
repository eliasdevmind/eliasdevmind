/* =========================================================
   Elias — portfólio · JS sem dependências
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EMAIL = 'eliasdevmind@outlook.com';
  const GH = 'eliasdevmind';

  /* ---------------------------------------------------------
     PROJETOS (curadoria dos repositórios públicos)
     --------------------------------------------------------- */
  const PROJECTS = [
    { repo: 'e-comerce', title: 'E-commerce', cat: 'Web', lang: 'JavaScript', year: 2026, mock: 'shop', wide: true,
      desc: 'Loja virtual com vitrine de produtos e carrinho, feita em JavaScript.' },
    { repo: 'planilha-csv', title: 'Planilha CSV', cat: 'Dados', lang: 'Python', year: 2026, mock: 'data',
      desc: 'Tratamento e organização de planilhas e arquivos CSV com Python.' },
    { repo: 'leitor-de-rem-e-ret', title: 'Leitor de remessa e retorno', cat: 'Automação', lang: 'Python', year: 2025, mock: 'term',
      desc: 'Leitura automática de arquivos bancários de remessa (.rem) e retorno (.ret).',
      term: ['$ python leitor.py retorno.ret', '› lendo cabeçalho do arquivo', '› processando registros', '✓ relatório gerado'] },
    { repo: 'Loja-compras-de-CRUD-em-PHP', title: 'Loja CRUD em PHP', cat: 'Web', lang: 'PHP', year: 2025, mock: 'web',
      desc: 'Sistema de loja com cadastro, edição e exclusão de produtos (CRUD) em PHP.' },
    { repo: 'Curso-MVC-Composer', title: 'MVC com Composer', cat: 'Backend', lang: 'PHP', year: 2025, mock: 'api',
      desc: 'Arquitetura MVC em PHP organizada com Composer e autoload.',
      api: ['GET /produtos', '200 OK', '{ "controller": "ProdutoController",', '  "view": "produtos/index" }'] },
    { repo: 'eliasdevweb', title: 'Eliasdevweb', cat: 'Web', lang: 'JavaScript', year: 2024, mock: 'links', wide: true,
      desc: 'Página com os links das minhas redes sociais e mídias.' },
    { repo: 'api_mare_lendas', title: 'API Maré Lendas', cat: 'Backend', lang: 'Python', year: 2024, mock: 'api',
      desc: 'API em Python para o projeto Maré Lendas.',
      api: ['GET /api/lendas', '200 OK', '{ "id": 1,', '  "nome": "..." }'] },
    { repo: 'script_para_pegar_informacao_de_site', title: 'Web scraper', cat: 'Automação', lang: 'Jupyter Notebook', year: 2024, mock: 'term',
      desc: 'Script para coletar informações de sites automaticamente.',
      term: ['$ jupyter run scraper.ipynb', '› requisitando página', '› extraindo dados', '✓ dados salvos'] },
    { repo: 'Imersao_IA', title: 'Imersão IA', cat: 'Dados', lang: 'Jupyter Notebook', year: 2024, mock: 'data',
      desc: 'Conteúdo e exercícios da Imersão IA Alura + Google.' },
    { repo: 'JOGO-PONG-E-JAVASCRIPT', title: 'Pong em JavaScript', cat: 'Web', lang: 'JavaScript', year: 2024, mock: 'pong', wide: true,
      desc: 'O clássico Pong rodando no navegador com JavaScript puro.' },
    { repo: 'Flutter_APP', title: 'App Flutter', cat: 'Mobile', lang: 'Dart', year: 2024, mock: 'phone',
      desc: 'Aplicativo mobile multiplataforma construído com Flutter.' },
    { repo: 'bancoJava', title: 'Sistema bancário', cat: 'Backend', lang: 'Java', year: 2024, mock: 'term',
      desc: 'Desafio de um sistema bancário em Java orientado a objetos.',
      term: ['$ java Banco', '› conta criada', '› depósito: R$ 500,00', '✓ saldo atualizado'] },
  ];

  const LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', PHP: '#4F5D95',
    Dart: '#00B4AB', Java: '#b07219', 'Jupyter Notebook': '#DA5B0B',
  };
  const HUES = ['#5ee1e8', '#a78bfa', '#ff8a3d', '#f472b6', '#34d399', '#60a5fa'];

  const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
  const rng = (seed) => () => ((seed = Math.imul(seed ^ (seed >>> 15), seed | 1) + 0x6d2b79f5) >>> 0) / 4294967296;

  /* ---------------------------------------------------------
     TEMA
     --------------------------------------------------------- */
  const themeListeners = [];
  const applyTheme = (t) => {
    root.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
    themeListeners.forEach((fn) => fn(t));
  };

  const toggleTheme = (origin) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduced) return applyTheme(next);

    const r = origin ? origin.getBoundingClientRect() : { left: innerWidth / 2, top: 0, width: 0, height: 0 };
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add('theme-switching');
    const t = document.startViewTransition(() => applyTheme(next));
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
    t.finished.finally(() => root.classList.remove('theme-switching'));
  };

  $$('[data-action="theme"]').forEach((b) => b.addEventListener('click', () => toggleTheme(b)));

  /* ---------------------------------------------------------
     TEXTOS: letras do nome, palavras dos títulos, scramble
     --------------------------------------------------------- */
  const GLYPHS = '01<>/{}[]#$%&*+=?';
  $$('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.setProperty('--i', i);
      s.dataset.i = i;
      s.dataset.ch = ch;
      s.textContent = ch;
      s.setAttribute('aria-hidden', 'true');
      el.appendChild(s);
    });
  });

  // letra "decodifica" ao passar o mouse (nas duas camadas do nome)
  const decoding = new Set();
  const decode = (i) => {
    if (decoding.has(i) || reduced) return;
    decoding.add(i);
    const chars = $$(`.hero__name .char[data-i="${i}"]`);
    chars.forEach((c) => c.classList.add('is-decoding'));
    let n = 0;
    const id = setInterval(() => {
      const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      chars.forEach((c) => (c.textContent = g));
      if (++n > 7) {
        clearInterval(id);
        chars.forEach((c) => { c.textContent = c.dataset.ch; c.classList.remove('is-decoding'); });
        decoding.delete(i);
      }
    }, 55);
  };
  $$('.hero__name-layer--solid .char').forEach((c) => c.addEventListener('mouseenter', () => decode(c.dataset.i)));

  $$('[data-reveal-words]').forEach((el) => {
    let i = 0;
    const wrap = (node) => {
      const w = document.createElement('span');
      w.className = 'w';
      const inner = document.createElement('span');
      inner.style.setProperty('--i', i++);
      inner.appendChild(node);
      w.appendChild(inner);
      return w;
    };
    const frag = document.createDocumentFragment();
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' '));
          else frag.appendChild(wrap(document.createTextNode(part)));
        });
      } else {
        frag.appendChild(wrap(n.cloneNode(true)));
      }
    });
    el.setAttribute('aria-label', el.textContent.trim());
    el.textContent = '';
    el.appendChild(frag);
  });

  const scramble = (el) => {
    const final = el.dataset.scramble;
    if (reduced) { el.textContent = final; return; }
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/#*&%';
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = clamp((now - start) / dur, 0, 1);
      const n = Math.floor(p * final.length);
      let out = final.slice(0, n);
      for (let k = n; k < final.length; k++) {
        out += final[k] === ' ' ? ' ' : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------------------------------------------------------
     LOADER → pronto
     --------------------------------------------------------- */
  const loader = $('.loader');
  const count = $('.loader__count');
  const ready = () => {
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    setTimeout(() => scramble($('.hero__role')), 500);
  };
  if (reduced) {
    ready();
  } else {
    const t0 = performance.now();
    const dur = 1100;
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = String(Math.round(e * 100)).padStart(2, '0');
      loader.style.setProperty('--p', e);
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(ready, 150);
    };
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------
     REVEAL ao rolar
     --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  const observeReveal = (c = document) => $$('.reveal, [data-reveal-words]', c).forEach((el) => io.observe(el));
  observeReveal();

  /* ---------------------------------------------------------
     NAV: ativo, esconder ao descer, menu mobile, progresso
     --------------------------------------------------------- */
  const nav = $('.nav');
  const navLinks = $$('.dock a');
  const dock = $('.dock');
  const dockPill = $('.dock__pill');
  const movePill = (a) => {
    if (!a || !dockPill) return;
    dockPill.style.width = a.offsetWidth + 'px';
    dockPill.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  const activeLink = () => navLinks.find((a) => a.classList.contains('is-active'));
  navLinks.forEach((a) => a.addEventListener('mouseenter', () => movePill(a)));
  dock?.addEventListener('mouseleave', () => movePill(activeLink()));
  addEventListener('resize', () => movePill(activeLink()));
  document.fonts?.ready.then(() => movePill(activeLink()));
  movePill(activeLink());
  const sections = $$('main section[id]');

  const secIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === '#' + e.target.id));
      if (!dock.matches(':hover')) movePill(activeLink());
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => secIO.observe(s));

  let lastY = scrollY;
  const progress = $('.progress');
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > innerHeight * .8 && !menuOpen);
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--scroll', max > 0 ? y / max : 0);
    updateFlow();
  };

  const menuBtn = $('.menu-btn');
  const menu = $('#mobile-menu');
  let menuOpen = false;
  const setMenu = (open) => {
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) menu.hidden = false;
    requestAnimationFrame(() => menu.classList.toggle('is-open', open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 700);
  };
  menuBtn.addEventListener('click', () => setMenu(!menuOpen));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------------------------------------------------------
     FLUXO DE TRABALHO (progresso no scroll)
     --------------------------------------------------------- */
  const flow = $('.flow');
  const steps = $$('.step');
  const flowList = $('.flow__steps');
  const flowNum = $('.flow__num');
  const flowLabel = $('.flow__label');
  let activeStep = -1;

  function updateFlow() {
    if (!flowList) return;
    const r = flowList.getBoundingClientRect();
    const mid = innerHeight * .55;
    flow.style.setProperty('--flow', clamp((mid - r.top) / r.height, 0, 1).toFixed(4));

    let idx = 0;
    steps.forEach((s, i) => { if (s.getBoundingClientRect().top < mid) idx = i; });
    if (idx === activeStep) return;
    activeStep = idx;
    steps.forEach((s, i) => {
      s.classList.toggle('is-active', i === idx);
      s.classList.toggle('is-done', i < idx);
    });
    flowNum.textContent = String(idx + 1).padStart(2, '0');
    flowLabel.textContent = steps[idx].dataset.step;
    [flowNum, flowLabel].forEach((el) => {
      el.classList.remove('is-swap');
      void el.offsetWidth;
      el.classList.add('is-swap');
    });
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', updateFlow);
  onScroll();

  /* ---------------------------------------------------------
     CURSOR, MAGNÉTICO, SPOTLIGHT
     --------------------------------------------------------- */
  if (finePointer) {
    const cursor = $('.cursor');
    const cross = $('.cursor__cross');
    const dot = $('.cursor__dot');
    const label = $('.cursor__label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, custom = '';

    addEventListener('pointermove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      cursor.classList.remove('is-hidden');
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      custom = t ? t.dataset.cursor : '';
      cursor.classList.toggle('is-label', !!custom);
      cursor.classList.toggle('is-hover', !!e.target.closest('a, button, label, summary, input, textarea, [data-spot]'));
    });

    const loop = () => {
      rx = lerp(rx, mx, .2);
      ry = lerp(ry, my, .2);
      cross.style.transform = `translate(${rx}px, ${ry}px)`;
      label.style.transform = `translate(${rx}px, ${ry}px)`;
      label.textContent = custom || `x ${String(Math.round(mx)).padStart(4, '0')} · y ${String(Math.round(my)).padStart(4, '0')}`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('pointermove', (e) => {
      const m = e.target.closest('.magnetic');
      if (!m) return;
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.style.transform = `translate(${dx * .22}px, ${dy * .32}px)`;
    });
    document.addEventListener('pointerout', (e) => {
      const m = e.target.closest('.magnetic');
      if (m && !m.contains(e.relatedTarget)) m.style.transform = '';
    });
  }

  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('[data-spot], .project');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', x + 'px');
    el.style.setProperty('--my', y + 'px');
    if (el.classList.contains('project') && finePointer && !reduced) {
      el.style.setProperty('--ry', ((x / r.width - .5) * 6).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((.5 - y / r.height) * 6).toFixed(2) + 'deg');
    }
  }, { passive: true });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest('.project');
    if (el && !el.contains(e.relatedTarget)) {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    }
  });

  /* ---------------------------------------------------------
     CONTADORES + dados do GitHub
     --------------------------------------------------------- */
  const countUp = (el, to) => {
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now();
    const dur = 1600;
    const f = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };

  const ghUser = fetch(`https://api.github.com/users/${GH}`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);

  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      statsIO.unobserve(e.target);
      $$('[data-count]', e.target).forEach((el) => countUp(el, +el.dataset.count));
      $$('[data-stat]', e.target).forEach((el) => {
        ghUser.then((u) => countUp(el, (u && u[el.dataset.stat]) || +el.dataset.fallback || 0));
      });
    });
  }, { threshold: .4 });
  $$('.stats').forEach((s) => statsIO.observe(s));

  /* ---------------------------------------------------------
     PROJETOS: capas geradas + filtros
     --------------------------------------------------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const bars = (rand, n, h = 70) => {
    let out = '';
    const w = 100 / n;
    for (let i = 0; i < n; i++) {
      const v = 18 + rand() * (h - 18);
      out += `<rect x="${i * w + w * .18}" y="${h - v}" width="${w * .64}" height="${v}" rx="1.5"/>`;
    }
    return out;
  };
  const linePath = (rand, n, h = 70) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 100;
      const y = h * .2 + rand() * h * .55;
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d;
  };

  const MOCKS = {
    web: (p) => `
      <div class="mock mock--window">
        <div class="mock__bar"><i></i><i></i><i></i><span>${esc(p.repo.toLowerCase())}</span></div>
        <div class="mock__page">
          <div class="mock__nav"><b></b><span></span><span></span><span></span></div>
          <div class="mock__table">
            ${['Produto', 'Categoria', 'Preço'].map((h) => `<em>${h}</em>`).join('')}
            ${Array.from({ length: 9 }, (_, i) => `<span style="--w:${40 + ((i * 37) % 50)}%"></span>`).join('')}
          </div>
          <div class="mock__actions"><u>+ novo</u><u class="ghost">editar</u></div>
        </div>
      </div>`,
    shop: (p, rand) => `
      <div class="mock mock--window">
        <div class="mock__bar"><i></i><i></i><i></i><span>loja.${esc(GH)}.dev</span></div>
        <div class="mock__page">
          <div class="mock__nav"><b></b><span></span><span></span><span></span><u>🛒 3</u></div>
          <div class="mock__products">
            ${Array.from({ length: 4 }, (_, i) => `
              <div class="mock__product"><div style="--h:${(rand() * 360) | 0}"></div><span></span><strong>R$ ${(49 + i * 30 + ((rand() * 40) | 0))},90</strong></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="mock__float"><span class="ok">✓</span> Adicionado ao carrinho</div>`,
    links: () => `
      <div class="mock mock--links">
        <div class="mock__avatar">E<b>.</b></div>
        <strong>@${esc(GH)}</strong>
        ${['GitHub', 'LinkedIn', 'Portfólio', 'E-mail'].map((l) => `<span>${l}<i>↗</i></span>`).join('')}
      </div>
      <div class="mock__float mock__float--left"><span class="ok">↗</span> 4 links</div>`,
    data: (p, rand) => `
      <div class="mock mock--dash">
        <div class="mock__kpis">
          <div><small>linhas</small><strong>${(1 + rand() * 9).toFixed(1)}k</strong></div>
          <div><small>colunas</small><strong>${(8 + rand() * 20) | 0}</strong></div>
          <div><small>nulos</small><strong>${(rand() * 3).toFixed(1)}%</strong></div>
        </div>
        <svg class="mock__chart" viewBox="0 0 100 70" preserveAspectRatio="none">
          <g class="mock__bars">${bars(rand, 10)}</g>
          <path class="mock__line" d="${linePath(rand, 10)}"/>
        </svg>
      </div>`,
    term: (p) => `
      <div class="mock mock--term">
        <div class="mock__bar"><i></i><i></i><i></i><span>terminal</span></div>
        <pre>${(p.term || []).map((l, i) => `<span style="--d:${i}" class="${l.startsWith('✓') ? 'ok' : l.startsWith('$') ? 'cmd' : ''}">${esc(l)}</span>`).join('')}<span class="caret">▌</span></pre>
      </div>`,
    api: (p) => {
      const [route, status, ...body] = p.api || [];
      return `
      <div class="mock mock--api">
        <div class="mock__req"><b>${esc(route.split(' ')[0])}</b><span>${esc(route.split(' ')[1] || '')}</span><em>${esc(status)}</em></div>
        <pre>${body.map((l) => esc(l)).join('\n')}</pre>
      </div>`;
    },
    phone: (p, rand) => `
      <div class="mock mock--phone">
        <div class="mock__notch"></div>
        <div class="mock__app">
          <div class="mock__app-head"><b></b><span></span></div>
          ${Array.from({ length: 4 }, () => `<div class="mock__row"><i style="--h:${(rand() * 360) | 0}"></i><span></span></div>`).join('')}
          <u></u>
        </div>
      </div>`,
    pong: () => `
      <div class="mock mock--pong">
        <span class="score">3 : 2</span>
        <i class="pad pad--l"></i><i class="pad pad--r"></i><i class="ball"></i>
        <span class="net"></span>
      </div>`,
  };

  const projectsEl = $('.projects');
  const filtersEl = $('.filters');

  const renderProjects = () => {
    projectsEl.innerHTML = PROJECTS.map((p, i) => {
      const rand = rng(hash(p.repo));
      const hue = HUES[hash(p.repo + 'h') % HUES.length];
      return `
      <article class="project${p.wide ? ' project--wide' : ''}" data-cat="${esc(p.cat)}" data-cursor="abrir ↗" style="--i:${i};--hue:${hue}">
        <div class="project__cover" aria-hidden="true">
          <div class="project__tags"><span>${esc(p.cat)}</span><span>${String(i + 1).padStart(2, '0')}</span></div>
          ${MOCKS[p.mock](p, rand)}
        </div>
        <div class="project__body">
          <div class="project__head">
            <h3>${esc(p.title)}</h3>
            <span class="project__arrow" aria-hidden="true">↗</span>
          </div>
          <p>${esc(p.desc)}</p>
          <div class="project__meta">
            <span class="project__lang"><i style="--c:${LANG_COLORS[p.lang] || 'var(--accent)'}"></i>${esc(p.lang)}</span>
            <span>${p.year}</span>
          </div>
        </div>
        <a class="project__link" href="https://github.com/${GH}/${encodeURIComponent(p.repo)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} no GitHub"></a>
      </article>`;
    }).join('');
  };

  const renderFilters = () => {
    const cats = ['Todos', ...new Set(PROJECTS.map((p) => p.cat))];
    filtersEl.innerHTML = '<span class="filters__pill" aria-hidden="true"></span>' + cats.map((c, i) => {
      const n = c === 'Todos' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length;
      return `<button type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}<sup>${String(n).padStart(2, '0')}</sup></button>`;
    }).join('');
  };
  const moveFilterPill = () => {
    const b = $('button[aria-pressed="true"]', filtersEl);
    const pill = $('.filters__pill', filtersEl);
    if (!b || !pill) return;
    pill.style.width = b.offsetWidth + 'px';
    pill.style.height = b.offsetHeight + 'px';
    pill.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
  };
  addEventListener('resize', moveFilterPill);

  filtersEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-filter]');
    if (!b) return;
    const f = b.dataset.filter;
    $$('button', filtersEl).forEach((x) => x.setAttribute('aria-pressed', x === b));
    moveFilterPill();
    let k = 0;
    $$('.project', projectsEl).forEach((card) => {
      const show = f === 'Todos' || card.dataset.cat === f;
      card.classList.toggle('is-hidden', !show);
      if (show) {
        card.style.setProperty('--i', k++);
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
      }
    });
  });

  renderFilters();
  renderProjects();
  moveFilterPill();
  document.fonts?.ready.then(moveFilterPill);

  /* ---------------------------------------------------------
     TELEMETRIA do hero
     --------------------------------------------------------- */
  const clockEl = $('[data-clock]');
  const clockFmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const tickClock = () => { if (clockEl) clockEl.textContent = clockFmt.format(new Date()); };
  tickClock();
  setInterval(tickClock, 1000);

  $$('[data-rotate]').forEach((el) => {
    const words = JSON.parse(el.dataset.rotate);
    let k = 0;
    setInterval(() => {
      k = (k + 1) % words.length;
      el.textContent = words[k];
      el.classList.remove('is-swap');
      void el.offsetWidth;
      el.classList.add('is-swap');
    }, 2200);
  });
  const lensEl = $('[data-lens]');

  /* ---------------------------------------------------------
     COPIAR / TOAST / FORM
     --------------------------------------------------------- */
  const toastEl = $('.toast');
  let toastT;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    toast('E-mail copiado ✓');
  };
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => {
    copy(b.dataset.copy);
    const hint = $('.copy__hint', b);
    if (hint) { hint.textContent = 'copiado!'; setTimeout(() => (hint.textContent = 'copiar'), 1800); }
  }));

  const form = $('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let ok = true;
    $$('.field', form).forEach((f) => {
      const input = $('input, textarea', f);
      const valid = input.checkValidity() && (!input.required || input.value.trim());
      f.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    const status = $('.form__status', form);
    if (!ok) { status.textContent = '› preencha os campos destacados.'; return; }
    const subject = `[${data.get('assunto')}] contato de ${data.get('nome')}`;
    const body = `${data.get('mensagem')}\n\n— ${data.get('nome')} (${data.get('email')})`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = '✓ abrindo seu app de e-mail…';
  });
  form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('is-invalid'));

  /* ---------------------------------------------------------
     PALETA DE COMANDOS (Ctrl/⌘ + K)
     --------------------------------------------------------- */
  const pal = $('.palette');
  const palInput = $('.palette__input');
  const palList = $('.palette__list');
  const go = (id) => () => $(id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  const open = (url) => () => window.open(url, '_blank', 'noopener');
  const COMMANDS = [
    { label: 'Início', hint: 'seção', run: go('#inicio') },
    { label: 'Expertise', hint: 'seção', run: go('#expertise') },
    { label: 'Projetos', hint: 'seção', run: go('#projetos') },
    { label: 'Fluxo de trabalho', hint: 'seção', run: go('#fluxo') },
    { label: 'Contato', hint: 'seção', run: go('#contato') },
    { label: 'Alternar tema claro/escuro', hint: 'ação', run: () => toggleTheme($('.theme-btn')) },
    { label: 'Copiar e-mail', hint: 'ação', run: () => copy(EMAIL) },
    { label: 'Abrir GitHub', hint: 'link', run: open(`https://github.com/${GH}`) },
    { label: 'Abrir LinkedIn', hint: 'link', run: open(`https://www.linkedin.com/in/${GH}`) },
    { label: 'Enviar e-mail', hint: 'link', run: () => (location.href = `mailto:${EMAIL}`) },
    ...PROJECTS.map((p) => ({ label: p.title, hint: 'projeto · ' + p.cat.toLowerCase(), run: open(`https://github.com/${GH}/${p.repo}`) })),
  ];
  let palItems = [];
  let palSel = 0;
  let palReturn = null;

  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const renderPalette = () => {
    const q = norm(palInput.value.trim());
    palItems = COMMANDS.filter((c) => !q || norm(c.label + ' ' + c.hint).includes(q));
    palSel = clamp(palSel, 0, Math.max(0, palItems.length - 1));
    palList.innerHTML = palItems.length
      ? palItems.map((c, i) => `<li role="option" id="pal-${i}" aria-selected="${i === palSel}" data-i="${i}"><span>${esc(c.label)}</span><small>${esc(c.hint)}</small></li>`).join('')
      : '<li class="palette__empty">Nada encontrado.</li>';
    palInput.setAttribute('aria-activedescendant', palItems.length ? 'pal-' + palSel : '');
    $(`[data-i="${palSel}"]`, palList)?.scrollIntoView({ block: 'nearest' });
  };
  const openPalette = () => {
    palReturn = document.activeElement;
    pal.hidden = false;
    palInput.value = '';
    palSel = 0;
    renderPalette();
    palInput.focus();
  };
  const closePalette = () => {
    pal.hidden = true;
    palReturn?.focus?.();
  };
  const runPalette = (i) => {
    const c = palItems[i];
    if (!c) return;
    closePalette();
    c.run();
  };

  $$('[data-action="palette"]').forEach((b) => b.addEventListener('click', openPalette));
  palInput.addEventListener('input', () => { palSel = 0; renderPalette(); });
  palList.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) runPalette(+li.dataset.i); });
  pal.addEventListener('click', (e) => { if (e.target === pal) closePalette(); });
  palInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); palSel = (palSel + 1) % Math.max(1, palItems.length); renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = (palSel - 1 + palItems.length) % Math.max(1, palItems.length); renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runPalette(palSel); }
  });
  addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPalette() : closePalette(); }
    else if (e.key === '/' && !typing && pal.hidden) { e.preventDefault(); openPalette(); }
    else if (e.key === 'Escape') { if (!pal.hidden) closePalette(); else if (menuOpen) setMenu(false); }
  });

  /* ---------------------------------------------------------
     FOTO (sobre): fallback + divisor dados | foto seguindo o mouse
     --------------------------------------------------------- */
  $$('[data-photo]').forEach((ph) => {
    const img = $('.photo__img', ph);
    const empty = () => ph.classList.add('is-empty');
    if (img.complete && !img.naturalWidth) empty();
    img.addEventListener('error', empty);
    let t = 50, cur = 50, raf = 0;
    const animate = () => {
      cur = lerp(cur, t, .12);
      ph.style.setProperty('--ps', cur.toFixed(2) + '%');
      raf = Math.abs(cur - t) > .1 ? requestAnimationFrame(animate) : 0;
    };
    const set = (v) => { t = v; if (!raf) raf = requestAnimationFrame(animate); };
    ph.addEventListener('pointermove', (e) => {
      const r = ph.getBoundingClientRect();
      set(clamp((e.clientX - r.left) / r.width * 100, 0, 100));
    });
    ph.addEventListener('pointerleave', () => set(50));
  });

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* =========================================================
     CENA DO HERO — sistema orbital (canvas 2D, motor próprio)
     Fora da lente: render sólido iluminado pelo núcleo.
     Dentro da lente: a "versão dados" — wireframe, órbitas, coordenadas.
     ========================================================= */
  const hero = $('.hero');
  const canvas = $('.hero__canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const nameWire = $('.hero__name-layer--wire');
  const nameEl = $('.hero__name');

  const hex = (h) => {
    h = h.trim().replace('#', '');
    if (h.length === 3) h = [...h].map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

  let C = {};
  const readColors = () => {
    const cs = getComputedStyle(root);
    const v = (n) => hex(cs.getPropertyValue(n));
    const dark = root.dataset.theme !== 'light';
    C = {
      dark,
      bg: v('--bg'),
      bg2: v('--bg-2'),
      text: v('--text'),
      muted: v('--muted'),
      accent: v('--accent'),
      violet: v('--violet'),
      warm: v('--warm'),
      warm2: v('--warm-2'),
      obj: dark ? [44, 58, 80] : [226, 219, 207],
      amb: dark ? .38 : .74,
      lightK: dark ? 1.5 : .7,
      star: dark ? [255, 255, 255] : [40, 50, 66],
    };
    C.wire = [C.accent, C.violet, C.warm, hex('#f472b6'), hex('#34d399')];
  };
  readColors();
  themeListeners.push(() => requestAnimationFrame(readColors));

  // ---------- malhas (normais orientadas para fora automaticamente) ----------
  const T = (1 + Math.sqrt(5)) / 2;
  const MESH = {
    ico: {
      v: [[-1, T, 0], [1, T, 0], [-1, -T, 0], [1, -T, 0], [0, -1, T], [0, 1, T], [0, -1, -T], [0, 1, -T], [T, 0, -1], [T, 0, 1], [-T, 0, -1], [-T, 0, 1]],
      f: [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]],
    },
    oct: {
      v: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
      f: [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]],
    },
    cube: {
      v: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
      f: [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [3, 7, 6, 2], [0, 4, 7, 3], [1, 2, 6, 5]],
    },
    tet: {
      v: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
      f: [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]],
    },
  };
  Object.values(MESH).forEach((m) => {
    const l = Math.hypot(...m.v[0]);
    m.v = m.v.map((p) => p.map((c) => c / l)); // raio 1
  });

  // planetas: cada órbita é uma frente de trabalho
  const PLANETS = [
    { label: 'web', mesh: 'ico', size: .95, r: 4.2, speed: .32, phase: .4, tilt: .32, yaw: -.18, wire: 0 },
    { label: 'dados', mesh: 'oct', size: 1.0, r: 6.0, speed: .22, phase: 2.4, tilt: .36, yaw: -.1, wire: 1 },
    { label: 'automação', mesh: 'cube', size: .62, r: 7.6, speed: .17, phase: 4.3, tilt: .3, yaw: -.24, wire: 2 },
    { label: 'backend', mesh: 'tet', size: .8, r: 9.2, speed: .12, phase: 1.1, tilt: .34, yaw: -.14, wire: 3 },
    { label: 'mobile', mesh: 'ico', size: .45, r: 2.7, speed: .55, phase: 5.2, tilt: .4, yaw: -.3, wire: 4 },
  ];
  PLANETS.forEach((p, i) => { p.spin = [.3 + i * .07, .5 - i * .05, .2]; });

  const BELT = Array.from({ length: 140 }, () => ({ a: Math.random() * 6.283, r: 10.6 + Math.random() * 1.2, y: (Math.random() - .5) * .3 }));
  const STARS = Array.from({ length: 240 }, () => ({
    x: Math.random(), y: Math.random(), d: .2 + Math.random() * .8,
    r: Math.random() < .07 ? 1.4 : .5 + Math.random() * .7, ph: Math.random() * 6.28,
  }));

  // ---------- estado ----------
  let W = 0, H = 0, DPR = 1, F = 1, mobile = false;
  let lens = { x: 0, y: 0, r: 0 }, lensT = { x: 0, y: 0 }, pointerIn = false;
  let px = 0, py = 0;
  let heroVisible = true, scrollP = 0;
  let time = 0, last = performance.now();
  let nameBox = { x: 0, y: 0 };

  const CORE_Z = 22;
  let core = [0, 0, CORE_Z];

  const resize = () => {
    const r = hero.getBoundingClientRect();
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    mobile = W < 960;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    F = mobile ? Math.min(W * 1.5, H * .9) : Math.min(W * .95, H * 1.35);
    // posiciona o núcleo na tela: à direita no desktop, no alto no mobile
    const sx = mobile ? .5 : .7;
    const sy = mobile ? .3 : .48;
    core = [((sx * W - W / 2) / F) * CORE_Z, ((H / 2 - sy * H) / F) * CORE_Z, CORE_Z];
    lens.r = mobile ? 92 : 140;
    const hr = hero.getBoundingClientRect();
    const nr = nameEl.getBoundingClientRect();
    nameBox = { x: nr.left - hr.left, y: nr.top - hr.top };
  };
  resize();
  addEventListener('resize', resize);
  document.fonts?.ready.then(resize);

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    lensT = { x: e.clientX - r.left, y: e.clientY - r.top };
    pointerIn = true;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointerIn = false; });

  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0 }).observe(hero);

  // ---------- matemática ----------
  const rot = (p, rx, ry, rz) => {
    let [x, y, z] = p;
    let c = Math.cos(rx), s = Math.sin(rx);
    [y, z] = [y * c - z * s, y * s + z * c];
    c = Math.cos(ry); s = Math.sin(ry);
    [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(rz); s = Math.sin(rz);
    [x, y] = [x * c - y * s, x * s + y * c];
    return [x, y, z];
  };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm3 = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const proj = (p) => [W / 2 + (p[0] / p[2]) * F, H / 2 - (p[1] / p[2]) * F];
  const FILL_DIR = norm3([-.5, .8, -.5]);

  // ponto numa órbita (plano inclinado em volta do núcleo) + câmera
  let camRX = 0, camRY = 0;
  const orbitPoint = (pl, ang, r = pl.r, y = 0) => {
    const local = rot([Math.cos(ang) * r, y, Math.sin(ang) * r], pl.tilt, 0, pl.yaw);
    return add(rot(local, camRX, camRY, 0), core);
  };

  const path = (pts) => {
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
  };

  const frame = (now) => {
    requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000);
    last = now;
    if (!heroVisible || !W) return;
    if (!reduced) time += dt;

    // parallax de câmera + lente
    const cx = core[0] / core[2] * F + W / 2;
    const cy = H / 2 - core[1] / core[2] * F;
    if (!pointerIn) {
      lensT = { x: cx + Math.sin(time * .42) * W * (mobile ? .28 : .2), y: cy + Math.sin(time * .67) * H * .18 };
    }
    lens.x = lerp(lens.x || lensT.x, lensT.x, reduced ? 1 : .12);
    lens.y = lerp(lens.y || lensT.y, lensT.y, reduced ? 1 : .12);
    px = lerp(px, lens.x / W - .5, .04);
    py = lerp(py, lens.y / H - .5, .04);
    camRY = px * .3;
    camRX = .05 + py * .18;

    scrollP = clamp(scrollY / (H || 1), 0, 1);
    hero.style.setProperty('--hero-shift', (scrollP * 90).toFixed(1) + 'px');
    canvas.style.opacity = (1 - scrollP * .85).toFixed(3);

    // lente no nome
    const shift = scrollP * 90;
    nameWire.style.setProperty('--lx', (lens.x - nameBox.x).toFixed(1) + 'px');
    nameWire.style.setProperty('--ly', (lens.y - nameBox.y - shift).toFixed(1) + 'px');
    nameWire.style.setProperty('--lr', lens.r + 'px');
    if (lensEl) lensEl.textContent = `x ${(lens.x / W).toFixed(2)} · y ${(lens.y / H).toFixed(2)}`;

    // ---------- monta a cena ----------
    const items = []; // faces e núcleo, ordenados por profundidade
    const planets2D = [];
    PLANETS.forEach((pl) => {
      const ang = pl.phase + time * pl.speed;
      const c = orbitPoint(pl, ang);
      const rx = time * pl.spin[0], ry = time * pl.spin[1], rz = time * pl.spin[2];
      const wv = MESH[pl.mesh].v.map((v) => add(rot(v.map((k) => k * pl.size), rx, ry, rz), c));
      const pv = wv.map(proj);
      planets2D.push({ pl, c, wv, pv });
      MESH[pl.mesh].f.forEach((f) => {
        const a = wv[f[0]], b = wv[f[1]], d = wv[f[2]];
        let n = norm3(cross(sub(b, a), sub(d, a)));
        const cen = f.reduce((acc, i) => add(acc, wv[i]), [0, 0, 0]).map((x) => x / f.length);
        if (dot(n, sub(cen, c)) < 0) n = n.map((x) => -x);
        if (dot(n, cen) >= 0) return;
        items.push({ type: 'face', pts: f.map((i) => pv[i]), n, cen, z: cen[2], pl });
      });
    });
    items.push({ type: 'core', z: core[2] });
    items.sort((a, b) => b.z - a.z);

    const core2D = proj(core);
    const coreR = (1.5 / core[2]) * F;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // estrelas
    STARS.forEach((s) => {
      const x = (((s.x - px * s.d * .05) % 1) + 1) % 1 * W;
      const y = (((s.y - py * s.d * .05 - scrollP * s.d * .25) % 1) + 1) % 1 * H;
      const a = (.25 + .75 * (.5 + .5 * Math.sin(time * (1 + s.d) + s.ph))) * s.d * (C.dark ? .9 : .4);
      ctx.fillStyle = rgba(C.star, a);
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, 6.283);
      ctx.fill();
    });

    const orbitPath = (pl, steps = 90) => {
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const p = proj(orbitPoint(pl, (i / steps) * 6.283));
        i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]);
      }
    };

    // ---------- RENDER (fora da lente) ----------
    ctx.lineWidth = 1;
    PLANETS.forEach((pl) => {
      orbitPath(pl);
      ctx.strokeStyle = rgba(C.text, C.dark ? .08 : .1);
      ctx.stroke();
    });
    BELT.forEach((b) => {
      const p = proj(orbitPoint(PLANETS[1], b.a + time * .03, b.r, b.y));
      ctx.fillStyle = rgba(C.text, C.dark ? .28 : .3);
      ctx.fillRect(p[0], p[1], 1.4, 1.4);
    });

    const drawCore = () => {
      const halo = ctx.createRadialGradient(core2D[0], core2D[1], coreR * .5, core2D[0], core2D[1], coreR * 6);
      halo.addColorStop(0, rgba(C.warm, C.dark ? .42 : .32));
      halo.addColorStop(1, rgba(C.warm, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(core2D[0], core2D[1], coreR * 6, 0, 6.283);
      ctx.fill();
      const g = ctx.createRadialGradient(core2D[0] - coreR * .35, core2D[1] - coreR * .4, 0, core2D[0], core2D[1], coreR);
      g.addColorStop(0, '#fff8ec');
      g.addColorStop(.4, rgba(C.warm2));
      g.addColorStop(1, rgba(C.warm));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(core2D[0], core2D[1], coreR, 0, 6.283);
      ctx.fill();
    };

    items.forEach((it) => {
      if (it.type === 'core') return drawCore();
      const toL = sub(core, it.cen);
      const d2 = dot(toL, toL);
      const diff = Math.max(0, dot(it.n, norm3(toL)));
      const att = C.lightK * 40 / (10 + d2);
      const fill = Math.max(0, dot(it.n, FILL_DIR)) * .3;
      const spec = Math.pow(diff, 12) * .4 * att;
      const col = [0, 1, 2].map((k) => clamp(C.obj[k] * (C.amb + fill) + C.warm[k] * diff * att + C.warm2[k] * spec, 0, 255));
      ctx.fillStyle = rgba(col);
      ctx.strokeStyle = rgba(col);
      path(it.pts);
      ctx.fill();
      ctx.stroke();
    });

    // ---------- LENTE (versão dados) ----------
    const L = lens;
    ctx.save();
    ctx.beginPath();
    ctx.arc(L.x, L.y, L.r, 0, 6.283);
    ctx.clip();

    ctx.fillStyle = rgba(C.bg2, .94);
    ctx.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2);

    // grade
    const gs = 22;
    ctx.strokeStyle = rgba(C.accent, C.dark ? .1 : .14);
    ctx.beginPath();
    for (let x = Math.floor((L.x - L.r) / gs) * gs; x < L.x + L.r; x += gs) { ctx.moveTo(x, L.y - L.r); ctx.lineTo(x, L.y + L.r); }
    for (let y = Math.floor((L.y - L.r) / gs) * gs; y < L.y + L.r; y += gs) { ctx.moveTo(L.x - L.r, y); ctx.lineTo(L.x + L.r, y); }
    ctx.stroke();

    // órbitas tracejadas
    ctx.setLineDash([4, 5]);
    PLANETS.forEach((pl) => {
      orbitPath(pl);
      ctx.strokeStyle = rgba(C.wire[pl.wire], .7);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // núcleo como alvo
    ctx.strokeStyle = rgba(C.warm, .95);
    [1, 1.8, 2.8].forEach((k, i) => {
      ctx.setLineDash(i ? [2, 4] : []);
      ctx.beginPath();
      ctx.arc(core2D[0], core2D[1], coreR * k, 0, 6.283);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(core2D[0] - coreR * 3.4, core2D[1]); ctx.lineTo(core2D[0] + coreR * 3.4, core2D[1]);
    ctx.moveTo(core2D[0], core2D[1] - coreR * 3.4); ctx.lineTo(core2D[0], core2D[1] + coreR * 3.4);
    ctx.stroke();

    // wireframes + vértices + rótulos
    ctx.font = '600 10.5px "JetBrains Mono", monospace';
    items.forEach((it) => {
      if (it.type !== 'face') return;
      const c = C.wire[it.pl.wire];
      ctx.fillStyle = rgba(c, C.dark ? .06 : .08);
      ctx.strokeStyle = rgba(c, .95);
      ctx.lineWidth = 1.2;
      path(it.pts);
      ctx.fill();
      ctx.stroke();
    });
    planets2D.forEach(({ pl, c, pv }) => {
      const col = C.wire[pl.wire];
      ctx.fillStyle = rgba(col);
      pv.forEach((p) => { ctx.beginPath(); ctx.arc(p[0], p[1], 2, 0, 6.283); ctx.fill(); });
      const p = proj(c);
      ctx.fillStyle = rgba(C.text, .9);
      ctx.fillText(pl.label, p[0] + 18, p[1] - 10);
      ctx.fillStyle = rgba(C.muted, 1);
      ctx.fillText(`r=${pl.r.toFixed(1)} v=${pl.speed.toFixed(2)}`, p[0] + 18, p[1] + 4);
    });
    ctx.fillStyle = rgba(C.text, .9);
    ctx.fillText('núcleo · elias', core2D[0] + coreR * 1.2, core2D[1] - coreR * 1.2);
    ctx.restore();

    // aro da lente
    ctx.strokeStyle = rgba(C.accent, .95);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(L.x, L.y, L.r, 0, 6.283);
    ctx.stroke();
    ctx.lineWidth = 1;
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * 6.283 + time * .2;
      const k = i % 4 ? 5 : 10;
      ctx.beginPath();
      ctx.moveTo(L.x + Math.cos(a) * (L.r + 4), L.y + Math.sin(a) * (L.r + 4));
      ctx.lineTo(L.x + Math.cos(a) * (L.r + 4 + k), L.y + Math.sin(a) * (L.r + 4 + k));
      ctx.strokeStyle = rgba(C.accent, i % 4 ? .35 : .8);
      ctx.stroke();
    }
    ctx.font = '700 10px "JetBrains Mono", monospace';
    ctx.fillStyle = rgba(C.accent);
    ctx.textAlign = 'center';
    ctx.fillText('RAIO-X · DADOS', L.x, L.y - L.r - 22);
    ctx.textAlign = 'start';
  };
  requestAnimationFrame(frame);
})();
