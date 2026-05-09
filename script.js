// ===== CURSOR =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ===== SCRATCH LOADER =====
const paper = document.getElementById('paper');
const catPaw = document.getElementById('catPaw');
const loaderReveal = document.getElementById('loaderReveal');
const typeTarget = document.getElementById('typeTarget');
const enterBtn = document.getElementById('enterBtn');
const loader = document.getElementById('loader');

const message = "Bienvenue à vous, Mme Assouline !";

function runScratch() {
  // 1. Paw appears
  setTimeout(() => {
    catPaw.style.transition = 'all 0.5s ease';
    catPaw.style.opacity = '1';
    catPaw.style.top = '40px';
    catPaw.style.right = '60px';
  }, 300);

  // 2. Scratch animations
  const scratches = document.querySelectorAll('.scratch');
  scratches.forEach((s, i) => {
    setTimeout(() => {
      // Paw moves to scratch position
      catPaw.style.top = (25 + i * 15) + '%';
      catPaw.style.transform = `rotate(${-20 + i * 8}deg) scale(1.1)`;
      // Scratch appears
      s.style.transition = `width 0.3s ease`;
      s.style.opacity = '1';
      s.style.width = (80 + Math.random() * 120) + 'px';
    }, 600 + i * 400);
  });

  // 3. Paw exits, paper tears, reveal shows
  setTimeout(() => {
    catPaw.style.transition = 'all 0.4s ease';
    catPaw.style.top = '-100px';
    catPaw.style.opacity = '0';

    // Paper shakes
    paper.style.animation = 'shake 0.5s ease';
  }, 2400);

  setTimeout(() => {
    // Transition from paper to reveal
    paper.style.transition = 'all 0.6s ease';
    paper.style.transform = 'scale(0.8) rotate(-5deg)';
    paper.style.opacity = '0';
  }, 2900);

  setTimeout(() => {
    paper.style.display = 'none';
    loaderReveal.classList.add('visible');
    typeMessage();
  }, 3500);
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

// Add shake keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0) rotate(0); }
    20% { transform: translateX(-8px) rotate(-2deg); }
    40% { transform: translateX(8px) rotate(2deg); }
    60% { transform: translateX(-6px) rotate(-1deg); }
    80% { transform: translateX(6px) rotate(1deg); }
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
