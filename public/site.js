(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', !isOpen);
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    const overlay = mobileMenu.querySelector('[data-menu-overlay]');
    if (overlay) {
      overlay.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });
  }

  const filterButtons = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('[data-gallery-item]');
  const emptyState = document.querySelector('[data-gallery-empty]');

  if (filterButtons.length && galleryItems.length) {
    const updateGallery = (category) => {
      let visibleCount = 0;
      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        const isVisible = category === 'All' || itemCategory === category;
        item.classList.toggle('hidden', !isVisible);
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.classList.toggle('hidden', visibleCount !== 0);
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        if (!category) {
          return;
        }

        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        updateGallery(category);
      });
    });
  }
})();
