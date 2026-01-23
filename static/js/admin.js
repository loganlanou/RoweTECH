// Admin Dashboard JavaScript

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (sidebar && overlay) {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('admin-sidebar');
      if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
        toggleSidebar();
      }
    }
  });

  // Initialize Sortable for drag-and-drop where applicable
  initializeSortable();

  // Initialize inline editing
  initializeInlineEdit();

  // Update sidebar user info when Clerk is ready
  if (window.Clerk) {
    window.Clerk.load().then(() => {
      updateAdminUserInfo();
    });
  }
});

// Update user info in admin sidebar
function updateAdminUserInfo() {
  if (!window.Clerk || !window.Clerk.user) return;

  const user = window.Clerk.user;
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Admin';
  const email = user.primaryEmailAddress?.emailAddress || '';
  const imageUrl = user.imageUrl;

  // Update sidebar user info
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarEmail = document.getElementById('sidebar-user-email');
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');

  if (sidebarName) sidebarName.textContent = fullName;
  if (sidebarEmail) sidebarEmail.textContent = email;
  if (sidebarAvatar && imageUrl) {
    sidebarAvatar.innerHTML = `<img src="${imageUrl}" alt="${fullName}" class="w-10 h-10 rounded-full object-cover"/>`;
  }
}

// Initialize Sortable.js for drag-and-drop reordering
function initializeSortable() {
  // Gallery items sortable
  const galleryGrid = document.getElementById('gallery-sortable');
  if (galleryGrid && typeof Sortable !== 'undefined') {
    new Sortable(galleryGrid, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      dragClass: 'sortable-drag',
      handle: '.drag-handle',
      onEnd: function(evt) {
        const itemId = evt.item.dataset.id;
        const newIndex = evt.newIndex;
        updateSortOrder('gallery', itemId, newIndex);
      }
    });
  }

  // Page images sortable (per page group)
  const imageSortables = document.querySelectorAll('.images-sortable');
  imageSortables.forEach(function(container) {
    if (typeof Sortable !== 'undefined') {
      new Sortable(container, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        handle: '.drag-handle',
        onEnd: function(evt) {
          const itemId = evt.item.dataset.id;
          const newIndex = evt.newIndex;
          updateSortOrder('images', itemId, newIndex);
        }
      });
    }
  });
}

// Update sort order via API
function updateSortOrder(type, itemId, newIndex) {
  const endpoint = type === 'gallery'
    ? `/admin/api/gallery/${itemId}/sort`
    : `/admin/api/images/${itemId}/sort`;

  fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sort_order: newIndex })
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to update sort order');
    }
  }).catch(err => {
    console.error('Error updating sort order:', err);
  });
}

// Initialize inline editing for image URLs and alt text
function initializeInlineEdit() {
  // Image URL editing
  document.querySelectorAll('.editable-url').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const currentUrl = this.href || this.textContent;
      const itemId = this.dataset.id;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentUrl;
      input.className = 'w-full px-2 py-1 bg-secondary-800 border border-primary-500 text-white text-xs rounded focus:outline-none';

      const originalEl = this;
      originalEl.style.display = 'none';
      originalEl.parentNode.insertBefore(input, originalEl.nextSibling);
      input.focus();
      input.select();

      function saveUrl() {
        const newUrl = input.value;
        if (newUrl !== currentUrl) {
          updateImageUrl(itemId, newUrl);
        }
        input.remove();
        originalEl.style.display = '';
        originalEl.href = newUrl;
        originalEl.textContent = newUrl;
      }

      input.addEventListener('blur', saveUrl);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          saveUrl();
        } else if (e.key === 'Escape') {
          input.remove();
          originalEl.style.display = '';
        }
      });
    });
  });

  // Alt text editing
  document.querySelectorAll('.editable-alt').forEach(function(el) {
    el.addEventListener('click', function(e) {
      const currentAlt = this.textContent;
      const itemId = this.dataset.id;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentAlt;
      input.className = 'w-full px-2 py-1 bg-secondary-800 border border-primary-500 text-white text-xs rounded focus:outline-none';

      const originalEl = this;
      originalEl.style.display = 'none';
      originalEl.parentNode.insertBefore(input, originalEl.nextSibling);
      input.focus();
      input.select();

      function saveAlt() {
        const newAlt = input.value;
        if (newAlt !== currentAlt) {
          updateImageAlt(itemId, newAlt);
        }
        input.remove();
        originalEl.style.display = '';
        originalEl.textContent = newAlt;
      }

      input.addEventListener('blur', saveAlt);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          saveAlt();
        } else if (e.key === 'Escape') {
          input.remove();
          originalEl.style.display = '';
        }
      });
    });
  });
}

// Update image URL via API
function updateImageUrl(itemId, newUrl) {
  fetch(`/admin/api/images/${itemId}/url`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: newUrl })
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to update image URL');
    }
  }).catch(err => {
    console.error('Error updating image URL:', err);
  });
}

// Update image alt text via API
function updateImageAlt(itemId, newAlt) {
  fetch(`/admin/api/images/${itemId}/alt`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alt_text: newAlt })
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to update alt text');
    }
  }).catch(err => {
    console.error('Error updating alt text:', err);
  });
}

// Modal handling
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Confirmation dialog
function confirmDelete(message, onConfirm) {
  if (confirm(message)) {
    onConfirm();
  }
}

// Toast notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full opacity-0 transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-secondary-700'
  } text-white`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-full', 'opacity-0');
  });

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-full', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Export functions for global use
window.toggleSidebar = toggleSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
window.confirmDelete = confirmDelete;
window.showToast = showToast;
