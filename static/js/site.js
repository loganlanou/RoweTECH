// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('opacity-100');

      if (isOpen) {
        // Close menu
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');

        // Animate hamburger lines
        menuBtn.querySelector('.hamburger-line-1').classList.remove('rotate-45', 'translate-y-[9px]');
        menuBtn.querySelector('.hamburger-line-2').classList.remove('opacity-0', 'scale-0');
        menuBtn.querySelector('.hamburger-line-3').classList.remove('-rotate-45', '-translate-y-[9px]');
      } else {
        // Open menu
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Close menu');

        // Animate hamburger lines
        menuBtn.querySelector('.hamburger-line-1').classList.add('rotate-45', 'translate-y-[9px]');
        menuBtn.querySelector('.hamburger-line-2').classList.add('opacity-0', 'scale-0');
        menuBtn.querySelector('.hamburger-line-3').classList.add('-rotate-45', '-translate-y-[9px]');
      }
    });

    // Close menu when clicking mobile nav links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');

        menuBtn.querySelector('.hamburger-line-1').classList.remove('rotate-45', 'translate-y-[9px]');
        menuBtn.querySelector('.hamburger-line-2').classList.remove('opacity-0', 'scale-0');
        menuBtn.querySelector('.hamburger-line-3').classList.remove('-rotate-45', '-translate-y-[9px]');
      });
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('bg-secondary-950/95', 'backdrop-blur-lg', 'border-b', 'border-primary-500/20');
        header.classList.remove('bg-secondary-950/80', 'backdrop-blur-md');
      } else {
        header.classList.remove('bg-secondary-950/95', 'backdrop-blur-lg', 'border-b', 'border-primary-500/20');
        header.classList.add('bg-secondary-950/80', 'backdrop-blur-md');
      }
    });
  }

  // Gallery filter functionality
  const galleryFilters = document.getElementById('gallery-filters');
  const galleryGrid = document.getElementById('gallery-grid');

  if (galleryFilters && galleryGrid) {
    galleryFilters.addEventListener('click', function(e) {
      if (e.target.classList.contains('gallery-filter')) {
        // Update active filter button
        galleryFilters.querySelectorAll('.gallery-filter').forEach(btn => {
          btn.classList.remove('active', 'bg-primary-500', 'text-white');
          btn.classList.add('bg-secondary-800', 'text-secondary-300');
        });
        e.target.classList.add('active', 'bg-primary-500', 'text-white');
        e.target.classList.remove('bg-secondary-800', 'text-secondary-300');

        // Filter gallery items
        const category = e.target.dataset.category;
        galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  }
});

// HTMX event handlers
document.body.addEventListener('htmx:afterSwap', function(event) {
  // Re-initialize any dynamic functionality after HTMX swaps content
  console.log('HTMX content swapped');
});
