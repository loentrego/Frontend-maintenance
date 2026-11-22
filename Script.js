// ============ Página de mantenimiento: reintento manual ============
(() => {
  'use strict';
  const btn = document.getElementById('retry-btn');
  btn?.addEventListener('click', () => {
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    // Pequeña pausa para que se note la acción y luego recarga
    setTimeout(() => window.location.reload(), 600);
  });
})();
