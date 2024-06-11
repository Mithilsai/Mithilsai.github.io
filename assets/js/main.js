

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('spinner').classList.add('hidden');
      document.body.classList.add('loaded');
    }, 3000);
  });

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
/**/
const nameContainer = document.getElementById('nameContainer');
const languages = [
  'मिथिल साईं जक्का', // Sanskrit
  'మిథిల్ సాయి జక్కా', // Telugu
  'மிதில் சாய் ஜக்கா', // Tamil
  'ಮಿಥೈಲ್ ಸಾಯಿ ಜಕ್ಕ', // Kannada
  'ਮਿਥਿਲ ਸਾਈਂ ਜੱਕਾ', // Punjabi
  'മിഥില് സായി ജക്കാ', // Malayalam
  'મિથિલ સાઈ જક્કા', // Gujarati
 
];
const englishName = 'Mithil Sai Jakka';
let isIterating = true;
let iterationTimeout;

function rainEffect(container, delay = 100) {
  let currentChar = 0;

  function updateChar() {
    const charElements = container.querySelectorAll('.char');

    for (let i = 0; i < charElements.length; i++) {
      const randomLang = languages[Math.floor(Math.random() * languages.length)];
      const randomChar = randomLang[Math.floor(Math.random() * randomLang.length)];
      charElements[i].textContent = randomChar;
    }

    currentChar = (currentChar + 1) % englishName.length;

    if (isIterating) {
      requestAnimationFrame(updateChar);
    } else {
      revealName(container, englishName);
    }
  }

  updateChar();
}

function revealName(container, name) {
  const charElements = container.querySelectorAll('.char');
  const indices = Array.from({ length: name.length }, (_, i) => i);
  indices.sort(() => Math.random() - 0.5); // Shuffle the indices

  for (let i = 0; i < charElements.length; i++) {
    setTimeout(() => {
      charElements[indices[i]].textContent = name[indices[i]];
    }, i * 150); // Adjust the delay between each character reveal (in milliseconds)
  }
}

function renderName(container, name) {
  container.innerHTML = '';

  for (let i = 0; i < name.length; i++) {
    const charElement = document.createElement('span');
    charElement.classList.add('char');
    charElement.textContent = name[i];
    container.appendChild(charElement);
  }
}

renderName(nameContainer, englishName);
 
iterationTimeout = setTimeout(() => {
  isIterating = false;
}, 4000); // Adjust the duration of the rain effect (in milliseconds)

rainEffect(nameContainer, 50);


  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()