// ================= Respostas da turma =================
const BAO = [
  "Amigos",
  "Eu acho muito bom ir ao parque 2 vezes no mínimo durante a semana",
  "Assistir alguns filminhos",
  "Ir ao parque todos os dias; A decoração da sala tá boa; Todas as atividades estão boas; Ter a tia Martinha de novo.",
  "Atividade sobre os feriados; Ir almoçar mais cedo; Poder crochetar; Poder brincar.",
  "Ir no parque; Ganhar coisas; Ter professoras legais; Atividades católicas; Sobremesa; Experiência com Ipad.",
  "Os amigos, o almoço, as decorações das festas.",
  "A quantidade de dias que vamos para o parque e a quantidade de dias que fazemos as atividades.",
  "Não sei",
  "Não tem aula depois do almoço",
  "A quantidade de parque está boa; Decoração da sala.",
  "Todo o resto",
  "A decoração da Copa do Mundo devia ficar até o final.",
  "Comida; Atividades.",
  "Lazer e serviço.",
  "Espaço bom, decoração boa e etc.",
  "Decoração da festa junina na escola, espaço de lazer bom, etc...",
  "Tarefas.",
];

const MIORA = [
  "Tendo apresentações de Dia das Mães, Dia dos Pais e Festa Junina.",
  "Poder expressar seus sentimentos; Atividades mais divertidas e que exija um pouco menos de sanidade mental.",
  "Ter sobremesa 2 dias na semana (segunda e quinta); Ter mais vezes Ipad; As tias podem ser mais legais (calmas invés de bravas); Os profs irem no banheiro junto com a gente para não acontecer nada (acidente).",
  "Mais dias de parque; Acesso a copo de água.",
  "3 dias de parque: terça, quarta e quinta; 2 dias de atividade: segunda e sexta; Fazer mais coisas que podemos usar no dia a dia; Ter mais jogos na sala.",
  "Ir para a ginástica; Fazer coisas com pano: boneca, laço e etc; Fazer mais coisas coletivas; Ter mais teatro no auditório; Decorar em todas as datas importantes.",
  "O tempo de parque; O tablet",
  "Indo um de cada vez escovar os dentes; Quando a tia Martinha chegar no refeitório, levar a gente para sala.",
  "Ter futsal no Semi, por favor!; Não ter tablet (só teve uma vez).",
  "Ter vôlei no Semi; Ter escalada no Semi na hora do parque.",
  "Atividade do Nac.",
  "O comportamento; Brincar mais vezes no espaço de convivência; A organização dos estojos de escovar os dentes",
  "Ter mais dias de quadra",
  "A costura e as atividades da costura que podem fazer o que quiser.",
  "Mais parque.",
  "Ir no parque mais vezes.",
  "Dia da mangueira, pescaria e dia da comida",
  "Pescaria na água, dia da comida de festa junina no Semi-integral e etc.",
  "Sala; Organização.",
];

// ================= Utilidades =================
const EMOJI_RULES = [
  [/parque|escalada/i, "🛝"], [/futsal|v[oô]lei|quadra|gin[aá]stica/i, "⚽"], [/copa do mundo/i, "🏆"],
  [/festa junina|pescaria/i, "🌽"], [/decora/i, "🎉"], [/sobremesa/i, "🍰"], [/almo[cç]|comida|refeit/i, "🍽️"],
  [/amigo/i, "🤝"], [/filminho|teatro|apresenta/i, "🎭"], [/ipad|tablet/i, "📱"], [/crochet|costura|pano/i, "🧶"],
  [/dentes/i, "🪥"], [/mangueira|água/i, "💦"], [/tia|prof/i, "👩‍🏫"], [/sentimento/i, "💖"], [/jogos|brincar/i, "🎲"],
  [/atividade|tarefa|nac/i, "📚"], [/organiza|comportamento|sala/i, "🧹"], [/espaço|lazer/i, "🌳"],
  [/não sei/i, "🤷"], [/todo o resto/i, "💯"],
];
const pickEmoji = t => (EMOJI_RULES.find(([re]) => re.test(t)) || [0, "⭐"])[1];
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const chunk = (arr, sizes) => { let i = 0; return sizes.map(n => arr.slice(i, (i += n))); };
const count = (list, re) => (list.join(" ").match(re) || []).length;
const ALL = [...BAO, ...MIORA];

// ================= Conteúdo dos slides =================
function cardHTML(txt, i) {
  const parts = txt.split(";").map(s => s.trim()).filter(Boolean);
  const body = parts.length > 1
    ? `<ul>${parts.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`
    : `<p>${esc(txt)}</p>`;
  const rot = ((i * 37) % 7) - 3;
  return `<article class="card anim" style="--i:${i + 1};--rot:${rot}deg"><div class="card-inner">
    <span class="emoji">${pickEmoji(txt)}</span>${body}</div></article>`;
}

function cardsSlide(items, kind, page, pages) {
  const green = kind === "bao";
  return {
    cls: green ? "theme-green green-deck" : "theme-orange orange-deck",
    html: `<div class="slide-head">
        <span class="pill ${green ? "green" : "orange"} anim">${green ? "😍 Tá bão demais" : "💡 Pode miorá"} · ${page}/${pages}</span>
        <h2 class="h2 anim" style="--i:0">${green ? "O que a turma ama" : "Ideias e pedidos da turma"}</h2>
      </div>
      <div class="cards n${items.length}">${items.map(cardHTML).join("")}</div>`,
  };
}

const THEMES = [
  ["🛝 Parque", /parque/gi], ["📚 Atividades", /atividade/gi], ["🎉 Decoração", /decora/gi],
  ["🍽️ Comida", /comida|almo[cç]o|sobremesa/gi], ["⚽ Esportes", /futsal|v[oô]lei|quadra|gin[aá]stica|escalada/gi],
  ["🌽 Festa Junina", /festa junina|pescaria/gi], ["🎲 Brincar", /brincar|jogos|lazer/gi],
  ["📱 Ipad / Tablet", /ipad|tablet/gi], ["🧶 Costura & Crochê", /costura|crochet|pano/gi],
  ["👩‍🏫 Tias & Profs", /tia |profs?|professora/gi],
];
const COLORS = ["#2bb673", "#ff8a3d", "#7c5cff", "#ff5c8a", "#3fa9f5", "#f2b705"];
const ranked = THEMES.map(([n, re]) => [n, count(ALL, re)]).filter(t => t[1]).sort((a, b) => b[1] - a[1]);
const maxRank = ranked[0][1];

const parqueBao = BAO.filter(t => /parque/i.test(t)).length;
const parqueMiora = MIORA.filter(t => /parque/i.test(t)).length;

const SLIDES = [
  { cls: "", html: `
      <p class="tag anim">4º e 5º ano · 2º Semestre 2026</p>
      <h1 class="title"><span class="anim" style="--i:1">Feedback</span><span class="rainbow anim" style="--i:2">Semi-Integral</span></h1>
      <p class="subtitle anim" style="--i:4">A turma falou, a gente ouviu! 👂💬</p>`, enter: () => burst(innerWidth / 2, innerHeight / 2.5, 200) },

  { cls: "", html: `
      <div class="slide-head"><h2 class="h2 anim">A pesquisa em números</h2></div>
      <div class="stats">
        <div class="stat c1 anim" style="--i:1"><span class="ico">😍</span><span class="num" data-to="${BAO.length}">0</span><span class="lbl">respostas “tá bão demais”</span></div>
        <div class="stat c2 anim" style="--i:2"><span class="ico">💡</span><span class="num" data-to="${MIORA.length}">0</span><span class="lbl">respostas “pode miorá”</span></div>
        <div class="stat c3 anim" style="--i:3"><span class="ico">🛝</span><span class="num" data-to="${count(ALL, /parque/gi)}">0</span><span class="lbl">vezes que falaram de parque</span></div>
        <div class="stat c4 anim" style="--i:4"><span class="ico">🎉</span><span class="num" data-to="${count(ALL, /decora/gi)}">0</span><span class="lbl">vezes que falaram de decoração</span></div>
      </div>` },

  { cls: "theme-green", html: `
      <span class="cover-emoji anim">😍</span>
      <h2 class="big-quote anim" style="--i:2">“Isso aqui tá bão demais”</h2>
      <p class="lead anim" style="--i:3">O que a turma mais gosta no Semi</p>`, enter: () => burst(innerWidth / 2, innerHeight / 3, 90) },
  ...chunk(BAO, [6, 6, 6]).map((g, i, a) => cardsSlide(g, "bao", i + 1, a.length)),

  { cls: "theme-orange", html: `
      <span class="cover-emoji anim">💡</span>
      <h2 class="big-quote anim" style="--i:2">“Pode miorá”</h2>
      <p class="lead anim" style="--i:3">Ideias e pedidos da turma</p>` },
  ...chunk(MIORA, [4, 4, 4, 4, 3]).map((g, i, a) => cardsSlide(g, "miora", i + 1, a.length)),

  { cls: "", html: `
      <div class="slide-head"><h2 class="h2 anim">☁️ Do que mais se falou</h2><p class="lead anim" style="--i:1">Temas mais citados nas duas perguntas</p></div>
      <div class="ranking">${ranked.map(([n, v], i) => `
        <div class="rank-row anim" style="--i:${i + 1}">
          <span class="rank-name">${n}</span>
          <span class="rank-track"><span class="rank-bar" data-w="${(v / maxRank) * 100}" style="background:${COLORS[i % COLORS.length]}"></span></span>
          <span class="rank-val">${v}</span>
        </div>`).join("")}
      </div>` },

  { cls: "", html: `
      <div class="slide-head"><h2 class="h2 anim">🛝 O parque é campeão!</h2></div>
      <div class="versus">
        <div class="vs-box green anim" style="--i:1"><span class="num" data-to="${parqueBao}">0</span><span class="lbl">respostas citam o parque no<br><b>“tá bão demais”</b></span></div>
        <span class="vs-mid anim" style="--i:2">🛝</span>
        <div class="vs-box orange anim" style="--i:3"><span class="num" data-to="${parqueMiora}">0</span><span class="lbl">pedem <b>mais parque</b> no<br><b>“pode miorá”</b></span></div>
      </div>
      <p class="insight anim" style="--i:5">A turma ama o parque… e quer ainda mais! 💚🧡</p>` },

  { cls: "", html: `
      <p class="hug anim">Grande abraço! 🤗</p>
      <p class="subtitle anim" style="--i:2">Obrigado por participar, turma do Semi! 💜</p>
      <div class="anim" style="--i:3;margin-top:4vh">
        <button class="btn" id="party">🎉 Comemorar!</button><button class="btn ghost" id="restart">↺ Recomeçar</button>
      </div>`, enter: () => { burst(innerWidth * .2, innerHeight * .4, 120); setTimeout(() => burst(innerWidth * .8, innerHeight * .4, 120), 300); } },
];

// ================= Montagem =================
const deck = document.getElementById("deck");
deck.innerHTML = SLIDES.map((s, i) => `<section class="slide ${s.cls}" data-i="${i}" aria-label="Slide ${i + 1}">${s.html}</section>`).join("");
const slides = [...deck.children];
const bar = document.getElementById("bar");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let cur = -1;

function countUp(el) {
  const to = +el.dataset.to, t0 = performance.now(), dur = 1300;
  el.textContent = 0;
  const step = t => {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  setTimeout(() => requestAnimationFrame(step), 400);
}

function go(n) {
  n = Math.max(0, Math.min(slides.length - 1, n));
  if (n === cur) return;
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === n);
    s.classList.toggle("before", i < n);
  });
  const s = slides[n];
  s.scrollTop = 0;
  s.querySelectorAll("[data-to]").forEach(countUp);
  s.querySelectorAll(".rank-bar").forEach(b => { b.style.width = 0; setTimeout(() => (b.style.width = b.dataset.w + "%"), 500); });
  slides.forEach((o, i) => i !== n && o.querySelectorAll(".rank-bar").forEach(b => (b.style.width = 0)));
  SLIDES[n].enter && setTimeout(SLIDES[n].enter, 350);
  cur = n;
  bar.style.width = `${((n + 1) / slides.length) * 100}%`;
  counter.textContent = `${n + 1} / ${slides.length}`;
  prevBtn.disabled = n === 0;
  nextBtn.disabled = n === slides.length - 1;
  history.replaceState(null, "", `#${n + 1}`);
  if (n > 0) document.getElementById("hint").classList.add("gone");
}
const next = () => go(cur + 1);
const prev = () => go(cur - 1);

// ================= Controles =================
prevBtn.addEventListener("click", e => { e.stopPropagation(); prev(); });
nextBtn.addEventListener("click", e => { e.stopPropagation(); next(); });
document.getElementById("fs").addEventListener("click", e => { e.stopPropagation(); toggleFs(); });
function toggleFs() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.();
}

addEventListener("keydown", e => {
  if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
  else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
  else if (e.key === "Home") go(0);
  else if (e.key === "End") go(slides.length - 1);
  else if (e.key.toLowerCase() === "f") toggleFs();
});

// clique: card = curtir; resto da tela = avançar (borda esquerda = voltar)
deck.addEventListener("click", e => {
  if (e.target.closest("button")) return;
  const card = e.target.closest(".card");
  if (card) {
    card.classList.add("liked");
    let h = card.querySelector(".hearts");
    if (!h) { h = document.createElement("span"); h.className = "hearts"; h.dataset.n = 0; card.appendChild(h); }
    h.dataset.n = +h.dataset.n + 1;
    h.textContent = `❤️ ${h.dataset.n}`;
    burst(e.clientX, e.clientY, 35);
    return;
  }
  if (e.clientX < innerWidth * 0.25) prev(); else next();
});

let tx = 0, ty = 0;
addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
});

document.addEventListener("click", e => {
  if (e.target.id === "party") {
    burst(e.clientX, e.clientY, 220);
    setTimeout(() => burst(innerWidth * .2, innerHeight * .4, 120), 250);
    setTimeout(() => burst(innerWidth * .8, innerHeight * .4, 120), 450);
  }
  if (e.target.id === "restart") go(0);
});

// ================= Confete =================
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [], running = false;
const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; };
addEventListener("resize", resize);
resize();

function burst(x, y, n) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pal = ["#2bb673", "#ff8a3d", "#7c5cff", "#ff5c8a", "#3fa9f5", "#ffd23f"];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
    pieces.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
      r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3, c: pal[i % pal.length], life: 0 });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  const d = devicePixelRatio;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of pieces) {
    p.vy += .25; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x * d, p.y * d); ctx.rotate(p.r); ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2 * d, -p.h / 2 * d, p.w * d, p.h * d); ctx.restore();
  }
  pieces = pieces.filter(p => p.y < innerHeight + 40 && p.life < 400);
  if (pieces.length) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

// ================= Início =================
const start = parseInt(location.hash.slice(1), 10);
go(Number.isFinite(start) ? start - 1 : 0);
