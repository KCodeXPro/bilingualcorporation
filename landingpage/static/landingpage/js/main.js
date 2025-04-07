/**
* Template Name: Arsha
* Updated: Aug 30 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
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
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
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
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
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
        itemSelector: '.portfolio-item'
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
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
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
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });


  
  (function() {
    "use strict";

    const form = document.querySelector('.email-form');
    if (form) {
        const handleSubmit = function(e) {
            e.preventDefault(); // Evitar el envío normal del formulario

            // Deshabilitar el botón para prevenir envíos múltiples
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            const formData = new FormData(this);
            const loadingDiv = document.querySelector('.loading');
            const errorMessageDiv = document.querySelector('.error-message');
            const sentMessageDiv = document.querySelector('.sent-message');

            loadingDiv.style.display = 'block'; // Mostrar mensaje de carga
            errorMessageDiv.style.display = 'none'; // Ocultar div de error
            sentMessageDiv.style.display = 'none'; // Ocultar div de éxito

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value
                }
            })
            .then(response => response.json())
            .then(data => {
                loadingDiv.style.display = 'none'; // Ocultar mensaje de carga

                if (data.status === 'success') {
                    sentMessageDiv.innerHTML = data.message; // Establecer mensaje de éxito
                    sentMessageDiv.style.display = 'block'; // Mostrar div de éxito
                } else {
                    errorMessageDiv.innerHTML = data.message; // Establecer mensaje de error
                    errorMessageDiv.style.display = 'block'; // Mostrar div de error
                }
            })
            .catch(() => {
                loadingDiv.style.display = 'none'; // Ocultar mensaje de carga
                errorMessageDiv.innerHTML = 'Error al enviar el mensaje.'; // Mensaje de error genérico
                errorMessageDiv.style.display = 'block'; // Mostrar div de error
            })
            .finally(() => {
                // Habilitar el botón nuevamente
                submitButton.disabled = false;
            });
        };

        // Registra el evento solo una vez
        form.addEventListener('submit', handleSubmit);
    }
})();




document.addEventListener('DOMContentLoaded', function() {
  const learnMoreButton = document.querySelector('.btn-learn-more');

  if (learnMoreButton) {
      learnMoreButton.addEventListener('click', function(event) {
          // Prevenir el comportamiento predeterminado del enlace
          event.preventDefault();

          // Hacer scroll a la sección deseada
          const targetSection = document.getElementById('why-us');
          if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
          }

          // Eliminar el hash de la URL
          history.pushState("", document.title, window.location.pathname + window.location.search);
      });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const learnMoreButton = document.querySelector('.cta-btn');

  if (learnMoreButton) {
      learnMoreButton.addEventListener('click', function(event) {
          // Prevenir el comportamiento predeterminado del enlace
          event.preventDefault();

          // Hacer scroll a la sección deseada
          const targetSection = document.getElementById('document');
          if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
          }

          // Eliminar el hash de la URL
          history.pushState("", document.title, window.location.pathname + window.location.search);
      });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault(); // Evita que el enlace cambie la URL
          
          // Cerrar el dropdown
          const dropdownMenu = this.closest('.dropdown-menu');
          if (dropdownMenu) {
              dropdownMenu.style.display = 'none'; // Cambia esto según tu implementación
          }

          // Desplazarse a la sección "services"
          const targetId = this.getAttribute('href'); // Obtener el href
          const targetElement = document.querySelector(targetId); // Seleccionar el elemento destino
          
          if (targetElement) {
              // Desplazamiento suave
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }

          console.log('Elemento clicado:', this.textContent);
      });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.servicesfooter').forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault(); // Evita que el enlace cambie la URL
          
          

          // Desplazarse a la sección "services"
          const targetId = this.getAttribute('href'); // Obtener el href
          const targetElement = document.querySelector(targetId); // Seleccionar el elemento destino
          
          if (targetElement) {
              // Desplazamiento suave
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }

          console.log('Elemento clicado:', this.textContent);
      });
  });
});


})()