

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
   * Mobile bottom navigation functionality
   */
  on('click', '.mobile-nav-item', function(e) {
    e.preventDefault()
    
    console.log('📱 Mobile nav clicked:', this.getAttribute('href'));
    
    // Remove active class from all mobile nav items
    const mobileNavItems = select('.mobile-nav-item', true)
    mobileNavItems.forEach(item => {
      item.classList.remove('active')
    })
    
    // Add active class to clicked item
    this.classList.add('active')
    
    // Get the target section
    const targetSection = this.getAttribute('href')
    const section = select(targetSection)
    
    if (section) {
      // Update desktop navigation active state
      const navLinks = select('#navbar .nav-link', true)
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === targetSection) {
          link.classList.add('active')
        }
      })
      
      // Handle header section specially
      if (targetSection === '#header') {
        const header = select('#header')
        const sections = select('section', true)
        
        header.classList.remove('header-top')
        sections.forEach(item => {
          item.classList.remove('section-show')
        })
        
        // Update clock visibility for mobile
        setTimeout(() => {
          console.log('📱 Calling updateClockVisibility from mobile nav (header)');
          updateClockVisibility();
        }, 100);
        
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }
      
      // Handle other sections
      const header = select('#header')
      const sections = select('section', true)
      
      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach(item => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')
        }, 350)
      } else {
        sections.forEach(item => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }
      
      // Update clock visibility for mobile
      setTimeout(() => {
        console.log('📱 Calling updateClockVisibility from mobile nav (other sections)');
        updateClockVisibility();
      }, 100);
      
      // Smooth scroll to section
      const headerHeight = header.offsetHeight
      const sectionTop = section.offsetTop - headerHeight - 20
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }, true)

  /**
   * Update mobile navigation active state on scroll
   */
  const updateMobileNavActive = () => {
    const sections = ['header', 'about', 'resume', 'services', 'contact']
    const mobileNavItems = select('.mobile-nav-item', true)
    
    sections.forEach((sectionId, index) => {
      const section = select(`#${sectionId}`)
      if (section) {
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if section is in view (more than 50% visible)
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          // Remove active from all items
          mobileNavItems.forEach(item => item.classList.remove('active'))
          
          // Add active to corresponding mobile nav item
          if (mobileNavItems[index]) {
            mobileNavItems[index].classList.add('active')
          }
        }
      }
    })
  }

  /**
   * Clock visibility control based on current section
   */
  const updateClockVisibility = () => {
    const clockContainer = document.getElementById('clock-container');
    if (!clockContainer) {
      console.log('❌ Clock container not found');
      return;
    }
    
    const currentSection = getCurrentSection();
    const isMobile = window.innerWidth <= 768;
    
    console.log('🔍 Clock Debug:', {
      currentSection,
      isMobile,
      windowWidth: window.innerWidth,
      currentDisplay: clockContainer.style.display,
      currentOpacity: clockContainer.style.opacity
    });
    
    // Remove all classes first
    clockContainer.classList.remove('blurred', 'hidden');
    
    // Check if we're on the home page (header section)
    if (currentSection === 'header') {
      // Home page - show clock normally
      if (isMobile) {
        clockContainer.style.setProperty('display', 'flex', 'important');
        console.log('📱 Mobile: Showing clock (display: flex !important)');
      } else {
        clockContainer.style.opacity = '1';
        clockContainer.style.filter = 'none';
        console.log('🖥️ Desktop: Showing clock (opacity: 1)');
      }
    } else {
      // Other sections
      if (isMobile) {
        // On mobile: completely hide the clock
        clockContainer.style.setProperty('display', 'none', 'important');
        console.log('📱 Mobile: Hiding clock (display: none !important)');
      } else {
        // On desktop: blur the clock
        clockContainer.classList.add('blurred');
        console.log('🖥️ Desktop: Blurring clock');
      }
    }
  }

  /**
   * Get current section based on scroll position
   */
  const getCurrentSection = () => {
    // Get all sections
    const sections = ['header', 'about', 'resume', 'services', 'contact'];
    
    // Check which section is currently in view
    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If section is in view (more than 50% of section is visible)
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          console.log('📍 Section detected:', section, {
            rectTop: rect.top,
            rectBottom: rect.bottom,
            windowHeight: windowHeight,
            scrollY: window.scrollY
          });
          return section;
        }
      }
    }
    
    // If we're at the very top of the page, it's the header
    if (window.scrollY < 100) {
      console.log('📍 At top of page, returning header');
      return 'header';
    }
    
    // Default to header if no section is clearly in view
    console.log('📍 No section detected, defaulting to header');
    return 'header';
  }

  /**
   * Close mobile menu function - now handles bottom nav
   */
  const closeMobileMenu = () => {
    // This function is kept for compatibility but no longer needed
    // as bottom navigation doesn't need to be "closed"
  }

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
   * Desktop navigation click handler
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

      // Update mobile navigation active state
      const mobileNavItems = select('.mobile-nav-item', true)
      const sectionIds = ['header', 'about', 'resume', 'services', 'contact']
      const targetIndex = sectionIds.findIndex(id => `#${id}` === this.hash)
      
      if (targetIndex !== -1 && mobileNavItems[targetIndex]) {
        mobileNavItems.forEach(item => item.classList.remove('active'))
        mobileNavItems[targetIndex].classList.add('active')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        
        // Update clock visibility
        setTimeout(() => {
          updateClockVisibility();
        }, 100);
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')
          
          // Update clock visibility
          setTimeout(() => {
            updateClockVisibility();
          }, 100);
        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
        
        // Update clock visibility
        setTimeout(() => {
          updateClockVisibility();
        }, 100);
      }

      scrollto(this.hash)
    }
  }, true)


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
    updateMobileNavActive(); // Update mobile nav active state
    updateClockVisibility(); // Update clock visibility
    // Uncomment the line below if you want parallax effect
    // parallaxEffect();
  });

  /**
   * Add hover effects for interactive elements
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation active state
    updateMobileNavActive();
    
    // Initialize clock visibility
    updateClockVisibility();
    
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