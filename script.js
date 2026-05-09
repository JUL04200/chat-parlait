// ===== CURSOR =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ===== SCRATCH LOADER =====
const paper = document.getElementById('paper');
const catPaw = document.getElementById('catPaw');
const paperRip = document.getElementById('paperRip');
const loaderReveal = document.getElementById('loaderReveal');
const typeTarget = document.getElementById('typeTarget');
const loader = document.getElementById('loader');

const message = "Bienvenue à vous, Mme Assouline !";

// Séquence de griffures : [délai, top%, right%, rotation, largeur]
const scratchSequence = [
  // Passage 1 — haut gauche
  { delay: 400,  top: '15%', right: '68%', rot: -25, sel: '.scratch-1' },
  { delay: 700,  top: '22%', right: '65%', rot: -15, sel: '.scratch-2' },
  { delay: 950,  top: '30%', right: '70%', rot: -28, sel: '.scratch-3' },
  // Pause — la patte se lève et replonge
  { delay: 1400, top: '42%', right: '60%', rot: -10, sel: '.scratch-4' },
  { delay: 1650, top: '49%', right: '63%', rot: -18, sel: '.scratch-5' },
  { delay: 1900, top: '56%', right: '58%', rot:  -6, sel: '.scratch-6' },
  // Passage 3 — côté droit, plus fort
  { delay: 2400, top: '38%', right: '40%', rot: -22, sel: '.scratch-7' },
  { delay: 2650, top: '48%', right: '37%', rot: -14, sel: '.scratch-8' },
  { delay: 2900, top: '58%', right: '42%', rot: -28, sel: '.scratch-9' },
  { delay: 3150, top: '66%', right: '36%', rot:  -8, sel: '.scratch-10'},
];

function runScratch() {
  // 1. La patte apparaît en haut
  setTimeout(() => {
    catPaw.style.transition = 'all 0.4s ease';
    catPaw.style.opacity = '1';
    catPaw.style.top = '10%';
    catPaw.style.right = '68%';
    catPaw.style.fontSize = 'clamp(2.5rem, 6vw, 4rem)';
  }, 200);

  // 2. Chaque griffure
  scratchSequence.forEach(({ delay, top, right, rot, sel }) => {
    setTimeout(() => {
      // Déplace la patte
      catPaw.style.top = top;
      catPaw.style.right = right;
      catPaw.style.transform = `rotate(${rot}deg) scale(1.15)`;

      // Fait vibrer le papier à chaque coup
      paper.style.animation = 'none';
      void paper.offsetWidth; // reflow
      paper.style.animation = 'scratchShake 0.15s ease';

      // Affiche la griffure
      const el = document.querySelector(sel);
      if (el) {
        el.style.opacity = '1';
        el.style.width = (90 + Math.random() * 130) + 'px';
      }
    }, delay);
  });

  // 3. Grande agitation finale — la patte s'emballe
  setTimeout(() => {
    catPaw.style.fontSize = 'clamp(3rem, 7vw, 5rem)';
    catPaw.style.transition = 'all 0.15s ease';
    paper.style.animation = 'bigShake 0.6s ease';
    paperRip.classList.add('visible');
  }, 3700);

  // 4. La patte sort par le haut
  setTimeout(() => {
    catPaw.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
    catPaw.style.top = '-20%';
    catPaw.style.opacity = '0';
  }, 4400);

  // 5. Le papier s'envole / disparaît
  setTimeout(() => {
    paper.style.transition = 'all 0.7s cubic-bezier(0.4,0,0.2,1)';
    paper.style.transform = 'scale(0.75) rotate(-8deg) translateY(40px)';
    paper.style.opacity = '0';
  }, 4800);

  // 6. Révélation du chat
  setTimeout(() => {
    paper.style.display = 'none';
    loaderReveal.classList.add('visible');
    typeMessage();
  }, 5500);
}

function typeMessage() {
  let i = 0;
  const interval = setInterval(() => {
    typeTarget.textContent = message.substring(0, i + 1);
    i++;
    if (i >= message.length) {
      clearInterval(interval);
      // Auto-open after message is fully typed
      setTimeout(openSite, 1200);
    }
  }, 55);
}

function openSite() {
  loader.style.transition = 'opacity 0.6s ease';
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 600);
}

// Keyframes dynamiques
const style = document.createElement('style');
style.textContent = `
  @keyframes scratchShake {
    0%,100% { transform: translateX(0) rotate(0); }
    30% { transform: translateX(-5px) rotate(-1.5deg); }
    70% { transform: translateX(5px) rotate(1.5deg); }
  }
  @keyframes bigShake {
    0%,100% { transform: translateX(0) rotate(0) scale(1); }
    15% { transform: translateX(-12px) rotate(-3deg) scale(1.02); }
    30% { transform: translateX(12px) rotate(3deg) scale(1.02); }
    45% { transform: translateX(-10px) rotate(-2deg); }
    60% { transform: translateX(10px) rotate(2deg); }
    75% { transform: translateX(-6px) rotate(-1deg); }
    90% { transform: translateX(6px) rotate(1deg); }
  }
`;
document.head.appendChild(style);

runScratch();

// ===== NAVBAR =====
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== CARD FLIP =====
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ===== FLOATING PAWS =====
const pawContainer = document.getElementById('floatingPaws');
function createPaw() {
  const paw = document.createElement('div');
  paw.textContent = Math.random() > 0.5 ? '🐾' : '🐱';
  paw.style.cssText = `
    position: absolute;
    font-size: ${Math.random() * 1.5 + 0.6}rem;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    opacity: ${Math.random() * 0.12 + 0.03};
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
    animation: pawDrift ${Math.random() * 8 + 6}s ease-in-out infinite alternate;
    animation-delay: ${Math.random() * 4}s;
  `;
  pawContainer.appendChild(paw);
}

const pawStyle = document.createElement('style');
pawStyle.textContent = `
  @keyframes pawDrift {
    from { transform: rotate(0deg) translateY(0px); }
    to { transform: rotate(20deg) translateY(-15px); }
  }
`;
document.head.appendChild(pawStyle);

for (let i = 0; i < 20; i++) createPaw();

// ===== SMOOTH NAV =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === `#${e.target.id}`) l.style.color = 'var(--purple-light)';
      });
    }
  });
}, { threshold: 0.4 }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.style.color = '';
          if (l.getAttribute('href') === `#${e.target.id}`) l.style.color = 'var(--purple-light)';
        });
      }
    });
  }, { threshold: 0.4 }).observe(s)
);

console.log('%c🐱 Le Chat qui parlait malgré lui', 'font-size:18px; color:#a78bfa; font-family:Georgia,serif;');
console.log('%cGroupe Duras · Mme Assouline', 'font-size:11px; color:#666;');
