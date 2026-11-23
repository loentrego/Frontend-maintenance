// ============ Página de mantenimiento ============
//  · Reintento manual (sin recargas automáticas).
//  · Regreso estimado: si <main data-regreso="AAAA-MM-DDTHH:MM"> tiene una hora
//    (hora de Colombia), muestra la hora y una cuenta regresiva.
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);

  const btn = $('retry-btn');
  btn?.addEventListener('click', () => {
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Revisando…';
    setTimeout(() => window.location.reload(), 700);
  });

  const page = document.querySelector('.page');
  const crudo = (page?.dataset.regreso || '').trim();
  if (!crudo) return;
  const fin = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(crudo) ? crudo : crudo + '-05:00');
  if (isNaN(fin)) return;

  const inicio = Date.now();
  const total = Math.max(1, fin - inicio);
  const hora = fin.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Bogota' });
  page.classList.add('con-hora');
  $('eta-value').textContent = `Hacia las ${hora}`;
  const cuenta = $('eta-count');
  cuenta.hidden = false;

  const tic = () => {
    const falta = fin - Date.now();
    if (falta <= 0) {
      $('eta-label').textContent = 'Ya casi terminamos';
      $('eta-value').textContent = 'Prueba reintentar';
      cuenta.hidden = true;
      page.style.setProperty('--p', 100);
      return;
    }
    const m = Math.floor(falta / 60000), s = Math.floor((falta % 60000) / 1000);
    cuenta.textContent = m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m}:${String(s).padStart(2, '0')}`;
    page.style.setProperty('--p', Math.round(((Date.now() - inicio) / total) * 100));
    setTimeout(tic, 1000);
  };
  tic();
})();
