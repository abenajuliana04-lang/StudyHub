// ============ NAV SCROLL BLUR ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ============ MOBILE MENU ============
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll(
  '.category-card, .opp-card, .story-card, .testimonial-card, .hiw-step, .section__title, .section__subtitle, .faq-item, .map-wrap, .dashboard-mock'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============ COUNT-UP STATS ============
const counters = document.querySelectorAll('.stat__number');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(el => countObserver.observe(el));

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-item__q');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ============ INTERACTIVE MAP ============
const countryData = {
  nigeria: {
    name: 'Nigeria',
    scholarships: 320,
    internships: 145,
    partners: 58,
    communities: 12
  },
  kenya: {
    name: 'Kenya',
    scholarships: 210,
    internships: 98,
    partners: 34,
    communities: 8
  },
  ghana: {
    name: 'Ghana',
    scholarships: 175,
    internships: 76,
    partners: 27,
    communities: 6
  },
  egypt: {
    name: 'Egypt',
    scholarships: 190,
    internships: 88,
    partners: 31,
    communities: 7
  },
  southafrica: {
    name: 'South Africa',
    scholarships: 260,
    internships: 120,
    partners: 45,
    communities: 10
  }
};

const mapCountryName = document.getElementById('mapCountryName');
const mapCountryDataEl = document.getElementById('mapCountryData');

document.querySelectorAll('.map-country').forEach(path => {
  path.addEventListener('click', () => {
    document.querySelectorAll('.map-country').forEach(p => p.classList.remove('active'));
    path.classList.add('active');

    const key = path.getAttribute('data-country');
    const data = countryData[key];
    if (!data) return;

    mapCountryName.textContent = data.name;
    mapCountryDataEl.innerHTML = `
      <div class="map-stat-row"><span>Scholarships</span><strong>${data.scholarships}</strong></div>
      <div class="map-stat-row"><span>Internships</span><strong>${data.internships}</strong></div>
      <div class="map-stat-row"><span>Partners</span><strong>${data.partners}</strong></div>
      <div class="map-stat-row"><span>Student Communities</span><strong>${data.communities}</strong></div>
    `;
  });
});

// ============ NEWSLETTER FORM ============
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribed ✓';
    input.value = '';
    setTimeout(() => { button.textContent = originalText; }, 2500);
  });
}
