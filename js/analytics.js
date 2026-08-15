/* ============================================================
   ANALYTICS — VOLOFEST
   ------------------------------------------------------------
   1) Pega aqui abajo tu ID de medicion de Google Analytics 4.
      Se ve asi: G-ABC1234XYZ  (lo sacas en analytics.google.com)
   2) Cuenta visitas y clics. Ademas separa los botones de
      boletos: preventa, general y mesa.
   ============================================================ */

const GA_ID   = 'G-E8B07VWJPE';   // La Voloband
const SITIO   = 'volofest';

/* ---------- Carga de Google Analytics ---------- */
(function () {
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return;  // sin ID, no carga nada

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID, { sitio: SITIO });
})();

/* ---------- Helper por si quieres mandar eventos a mano ---------- */
window.trackEvent = function (nombre, datos) {
  if (typeof gtag === 'function') gtag('event', nombre, Object.assign({ sitio: SITIO }, datos || {}));
};

/* ---------- Que tipo de boleto pidieron por WhatsApp ---------- */
function tipoBoleto(href) {
  const h = decodeURIComponent(href).toLowerCase();
  if (h.includes('preventa'))      return 'preventa_90';
  if (h.includes('venta general')) return 'general_120';
  if (h.includes('mesa'))          return 'mesa_1200';
  return 'general';
}

/* ---------- Clics en enlaces y botones (automatico) ---------- */
document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href]');
  if (!a) return;

  const href = a.getAttribute('href') || '';
  const texto = (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 60);

  if (href.includes('wa.me')) {
    window.trackEvent('clic_boletos_whatsapp', {
      tipo_boleto: tipoBoleto(href),
      link_text: texto,
      link_url: href
    });
    return;
  }

  let evento = null;
  if (href.startsWith('mailto:'))                  evento = 'clic_mail';
  else if (href.startsWith('tel:'))                evento = 'clic_telefono';
  else if (href.includes('maps.app.goo.gl'))       evento = 'clic_mapa';
  else if (href.includes('lavoloband.com'))        evento = 'clic_sitio_banda';
  else if (href.includes('instagram.com'))         evento = 'clic_instagram';
  else if (href.includes('tiktok.com'))            evento = 'clic_tiktok';
  else if (href.includes('youtube.com'))           evento = 'clic_youtube';
  else if (href.includes('open.spotify.com'))      evento = 'clic_spotify';
  else if (/^https?:\/\//.test(href))              evento = 'clic_enlace_externo';
  else if (href.startsWith('#'))                   evento = 'clic_menu';

  if (!evento) return;
  window.trackEvent(evento, { link_text: texto, link_url: href });
}, true);
