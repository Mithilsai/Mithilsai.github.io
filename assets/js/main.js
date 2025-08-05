

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
  // Preload MI loader images to ensure they're available
  const miImages = [
    'assets/img/ChatGPT Image Aug 3, 2025, 08_13_41 PM.png',
    'assets/img/ChatGPT Image Aug 3, 2025, 08_17_32 PM.png',
    'assets/img/ChatGPT Image Aug 3, 2025, 08_18_07 PM.png',
    'assets/img/ChatGPT Image Aug 3, 2025, 08_18_22 PM.png',
    'assets/img/ChatGPT Image Aug 3, 2025, 08_18_53 PM.png',
    'assets/img/ChatGPT Image Aug 3, 2025, 08_19_01 PM.png',
    'assets/img/Aug 3, 2025, 08_26_01 PM.png'
  ];

  // Preload images
  let loadedImages = 0;
  miImages.forEach(src => {
    const img = new Image();
    img.onload = () => {
      loadedImages++;
    };
    img.onerror = () => {
      console.warn('Failed to load image:', src);
      loadedImages++;
    };
    img.src = src;
  });

  window.addEventListener('load', function() {
    // Ensure the MI loader animation starts
    const miLoader = document.getElementById('miLoader');
    const animateElement = document.getElementById('animate');
    
    if (animateElement) {
      // Force the animation to start
      animateElement.classList.remove('run-animation');
      setTimeout(() => {
        animateElement.classList.add('run-animation');
      }, 100);
    }
    
    // MI Loader animation duration is now 4 seconds
    setTimeout(function() {
      if (miLoader) {
        miLoader.classList.add('hidden');
        document.body.classList.add('loaded');
      }
    }, 4000);
    
    // Fallback: if animation takes too long, force transition after 4.5 seconds
    setTimeout(function() {
      if (miLoader && !miLoader.classList.contains('hidden')) {
        miLoader.classList.add('hidden');
        document.body.classList.add('loaded');
      }
    }, 4500);
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



  /**
   * Animate progress bars on scroll
   */
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      const percentage = bar.getAttribute('aria-valuenow');
      bar.style.width = percentage + '%';
    });
  }

  /**
   * Animate counters on scroll
   */
  const animateCounters = () => {
    const counters = document.querySelectorAll('.purecounter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-purecounter-end'));
      const duration = parseInt(counter.getAttribute('data-purecounter-duration'));
      const increment = target / (duration * 60); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
    });
  }

  /**
   * Parallax scrolling effect
   */
  const parallaxEffect = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  /**
   * Smooth reveal animations on scroll
   */
  const revealOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate');
      }
    });
  }
/**/
const nameContainer = document.getElementById('nameContainer');
const languages = [
  'मिथिल साई जक्का', // Hindi
  'మిథిల్ సాయి జక్కా', // Telugu
  'மிதில் சாய் ஜக்கா', // Tamil
  'ಮಿಥಿಲ್ ಸಾಯಿ ಜಕ್ಕ', // Kannada
  'ਮਿਥਿਲ ਸਾਈ ਜੱਕਾ', // Punjabi
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
      // Get the corresponding character from each language
      const currentLanguage = languages[currentChar % languages.length];
      const charIndex = i % currentLanguage.length;
      charElements[i].textContent = currentLanguage[charIndex] || ' ';
    }

    currentChar = (currentChar + 1) % (languages.length * 10); // Cycle through languages

    if (isIterating) {
      setTimeout(updateChar, delay);
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

// Wait for the MI loader to complete before starting name rotation
window.addEventListener('load', function() {
  // MI Loader animation duration is now 4 seconds
  setTimeout(function() {
    renderName(nameContainer, englishName);
    
    iterationTimeout = setTimeout(() => {
      isIterating = false;
    }, 500); // Name rotation duration is now 0.5 seconds (4-4.5 seconds)

    rainEffect(nameContainer, 50);
  }, 4000); // Wait for MI loader to complete
});


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
    e.preventDefault()
    e.stopPropagation()
    const navbar = select('#navbar')
    const mobileToggle = this
    
    console.log('Mobile nav toggle clicked')
    console.log('Navbar element:', navbar)
    console.log('Current navbar classes:', navbar.classList.toString())
    
    if (navbar.classList.contains('navbar-mobile')) {
      // Close menu
      navbar.classList.remove('navbar-mobile')
      mobileToggle.classList.remove('bi-x')
      mobileToggle.classList.add('bi-list')
      console.log('Menu closed')
    } else {
      // Open menu
      navbar.classList.add('navbar-mobile')
      mobileToggle.classList.remove('bi-list')
      mobileToggle.classList.add('bi-x')
      console.log('Menu opened')
    }
    
    console.log('After toggle - navbar classes:', navbar.classList.toString())
    console.log('Mobile menu should be visible:', navbar.classList.contains('navbar-mobile'))
  })

  /**
   * Close mobile menu function
   */
  const closeMobileMenu = () => {
    const navbar = select('#navbar')
    const navbarToggle = select('.mobile-nav-toggle')
    if (navbar && navbarToggle) {
      navbar.classList.remove('navbar-mobile')
      navbarToggle.classList.add('bi-list')
      navbarToggle.classList.remove('bi-x')
    }
  }

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
        closeMobileMenu()
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
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Initialize animations
   */
  window.addEventListener('load', () => {
    // Animate progress bars after a short delay
    setTimeout(animateProgressBars, 1000);
    
    // Animate counters
    setTimeout(animateCounters, 1500);
    
    // Initialize reveal animations
    revealOnScroll();
  });

  /**
   * Add scroll event listeners for animations
   */
  window.addEventListener('scroll', () => {
    revealOnScroll();
    // Uncomment the line below if you want parallax effect
    // parallaxEffect();
  });

  /**
   * Add hover effects for interactive elements
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    const mobileToggle = select('.mobile-nav-toggle')
    const navbar = select('#navbar')
    
    if (mobileToggle) {
      // Ensure hamburger icon shows initially
      mobileToggle.classList.add('bi-list')
      mobileToggle.classList.remove('bi-x')
      console.log('Mobile nav initialized with hamburger icon')
    }
    
    if (navbar) {
      // Ensure navbar starts without mobile class
      navbar.classList.remove('navbar-mobile')
      console.log('Navbar initialized without mobile class')
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navbar = select('#navbar')
      const mobileToggle = select('.mobile-nav-toggle')
      
      // Don't close if clicking on the mobile toggle itself
      if (e.target.classList.contains('mobile-nav-toggle') || e.target.closest('.mobile-nav-toggle')) {
        return
      }
      
      if (navbar && navbar.classList.contains('navbar-mobile')) {
        if (!navbar.contains(e.target)) {
          closeMobileMenu()
        }
      }
    })
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
      });
    });

    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(0)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
      });
    });
  });

})()