// ---------------- Respostas da turma ----------------
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

// ---------------- Emojis por palavra-chave ----------------
const EMOJI_RULES = [
  [/parque|escalada/i, "🛝"],
  [/futsal|v[oô]lei|quadra|gin[aá]stica/i, "⚽"],
  [/copa do mundo/i, "🏆"],
  [/festa junina|pescaria/i, "🌽"],
  [/decora/i, "🎉"],
  [/sobremesa/i, "🍰"],
  [/almo[cç]|comida|refeit/i, "🍽️"],
  [/amigo/i, "🤝"],
  [/filminho|teatro|apresenta/i, "🎭"],
  [/ipad|tablet/i, "📱"],
  [/crochet|costura|pano/i, "🧶"],
  [/dentes/i, "🪥"],
  [/mangueira|água/i, "💦"],
  [/tia|prof/i, "👩‍🏫"],
  [/sentimento/i, "💖"],
  [/jogos|brincar/i, "🎲"],
  [/atividade|tarefa|nac/i, "📚"],
  [/organiza|comportamento|sala/i, "🧹"],
  [/espaço|lazer/i, "🌳"],
  [/não sei/i, "🤷"],
  [/todo o resto/i, "💯"],
];
const FALLBACK = ["⭐", "✨", "🌟", "😄"];
const pickEmoji = (txt, i) => (EMOJI_RULES.find(([re]) => re.test(txt)) || [null, FALLBACK[i % FALLBACK.length]])[1];

// ---------------- Montagem dos cards ----------------
function buildCards(list, containerId) {
  const box = document.getElementById(containerId);
  list.forEach((txt, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--rot", `${((i * 37) % 7) - 3}deg`);
    card.style.transitionDelay = `${(i % 4) * 90}ms`;

    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = pickEmoji(txt, i);
    card.appendChild(emoji);

    const parts = txt.split(";").map(s => s.trim()).filter(Boolean);
    if (parts.length > 1) {
      const ul = document.createElement("ul");
      parts.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    } else {
      const p = document.createElement("p");
      p.textContent = txt;
      card.appendChild(p);
    }
    box.appendChild(card);
  });
}
buildCards(BAO, "cards-bao");
buildCards(MIORA, "cards-miora");

// ---------------- Números ----------------
const ALL = [...BAO, ...MIORA].join(" ");
const countMatches = re => (ALL.match(re) || []).length;
const COUNTS = {
  bao: BAO.length,
  miora: MIORA.length,
  parque: countMatches(/parque/gi),
  decoracao: countMatches(/decora/gi),
};

function animateCount(el) {
  const target = COUNTS[el.dataset.count];
  const dur = 1400;
  const t0 = performance.now();
  const step = t => {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---------------- Nuvem de temas ----------------
const THEMES = [
  ["Parque", /parque/gi], ["Decoração", /decora/gi], ["Atividades", /atividade/gi],
  ["Amigos", /amigo/gi], ["Comida", /comida|almo[cç]o|sobremesa/gi], ["Esportes", /futsal|v[oô]lei|quadra|gin[aá]stica|escalada/gi],
  ["Festa Junina", /festa junina|pescaria/gi], ["Ipad / Tablet", /ipad|tablet/gi], ["Costura & Crochê", /costura|crochet|pano/gi],
  ["Tias & Profs", /tia |profs?|professora/gi], ["Brincar", /brincar|jogos|lazer/gi], ["Organização", /organiza/gi],
  ["Teatro & Filmes", /teatro|filminho|apresenta/gi], ["Escovar os dentes", /dentes/gi],
];
const COLORS = ["#2bb673", "#ff8a3d", "#7c5cff", "#ff5c8a", "#3fa9f5", "#f2b705"];
const cloud = document.getElementById("cloud");
THEMES.map(([name, re]) => [name, countMatches(re)])
  .filter(([, n]) => n > 0)
  .sort((a, b) => b[1] - a[1])
  .forEach(([name, n], i) => {
    const s = document.createElement("span");
    s.textContent = `${name} · ${n}`;
    s.style.fontSize = `${1 + n * 0.22}rem`;
    s.style.background = COLORS[i % COLORS.length];
    s.style.animationDelay = `${-i * 0.7}s`;
    cloud.appendChild(s);
  });

// ---------------- Revelar ao rolar ----------------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("show");
    e.target.querySelectorAll?.("[data-count]").forEach(animateCount);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal, .card").forEach(el => io.observe(el));

// ---------------- Confete ----------------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let running = false;
const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; };
addEventListener("resize", resize);
resize();

function burst(x = innerWidth / 2, y = innerHeight / 3, n = 160) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const palette = ["#2bb673", "#ff8a3d", "#7c5cff", "#ff5c8a", "#3fa9f5", "#ffd23f"];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = 4 + Math.random() * 9;
    pieces.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6,
      w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
      r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
      c: palette[i % palette.length], life: 0,
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}

function tick() {
  const d = devicePixelRatio;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    p.vy += 0.25; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
    ctx.save();
    ctx.translate(p.x * d, p.y * d);
    ctx.rotate(p.r);
    ctx.fillStyle = p.c;
    ctx.fillRect((-p.w / 2) * d, (-p.h / 2) * d, p.w * d, p.h * d);
    ctx.restore();
  });
  pieces = pieces.filter(p => p.y < innerHeight + 40 && p.life < 400);
  if (pieces.length) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

addEventListener("load", () => setTimeout(() => burst(innerWidth / 2, innerHeight / 2.5, 200), 600));
document.getElementById("party").addEventListener("click", e => {
  burst(e.clientX, e.clientY, 220);
  setTimeout(() => burst(innerWidth * 0.2, innerHeight * 0.4, 120), 250);
  setTimeout(() => burst(innerWidth * 0.8, innerHeight * 0.4, 120), 450);
});
document.querySelectorAll(".card").forEach(card =>
  card.addEventListener("click", e => burst(e.clientX, e.clientY, 30))
);
