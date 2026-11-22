// ============ Página de mantenimiento: reintento automático ============
(() => {
  'use strict';

  // PERILLA: cada cuántos segundos se vuelve a intentar entrar
  const SEGUNDOS = 60;

  const btn = document.getElementById('retry-btn');
  const count = document.getElementById('countdown');
  const note = document.getElementById('retry-note');
  let left = SEGUNDOS;

  function retry() {
    if (!btn) return;
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    if (note) note.textContent = 'Comprobando…';
    // Pequeña pausa para que se note la acción y luego recarga
    setTimeout(() => window.location.reload(), 600);
  }

  btn?.addEventListener('click', retry);

  const timer = setInterval(() => {
    // No contar si la pestaña está en segundo plano
    if (document.hidden) return;
    left -= 1;
    if (count) count.textContent = Math.max(0, left);
    if (left <= 0) { clearInterval(timer); retry(); }
  }, 1000);
})();
