# VOLOFEST 2026 — La Voloband

Landing del **VOLOFEST**, el evento de aniversario de La Voloband, edición Halloween / disfraces.

**Sábado 24 de octubre de 2026 · 6:00 PM – 1:00 AM**
Jardín y Salón de Fiestas Las Garzas — Hermenegildo Galeana 1028, El Coyol, Veracruz.

Publicada en **https://volofest.lavoloband.com**

## Line-up

La Voloband · Sheriff · Elefantes de Dalí · Seren (SRN) · VIORS · Galatas

> El ingeniero de audio salió de la página; falta que confirmen al nuevo.

> Fuimos Ácidos canceló y ya no aparece en el line-up. Ojo: dos carteles de la
> campaña (`final-chapter.jpg` y `halloween2026.jpg`) todavía llevan su nombre
> impreso en el arte.

## Boletos

| Fase | Precio |
|---|---|
| Primeros 50 boletos | $90 — **agotado** |
| Venta general | $120 |
| Día del evento (con disfraz) | $150 |
| Día del evento (sin disfraz) | $180 |
| Mesa (4 personas) | $1,200 |

La mesa incluye: mesa con 4 sillas, 4 boletos de acceso, botella a elección,
1 servicio (refresco y agua mineral), hielo, shots de bienvenida y plato de snacks.

Ventas por WhatsApp: **229 270 8672**

## Patrocinadores

**VERABEAT** — patrocinador oficial. Logos en `assets/logos/verabeat.*`
(logotipo) y `assets/logos/verabeat-banda.*` (la ilustración, en negativo
para que se lea sobre el fondo oscuro).

## Términos y condiciones

Viven dentro de `index.html`, en el modal `#terminos`, y solo se ven al pulsar
cualquier botón con `data-terms` (uno debajo de los boletos y otro en el pie).
Los puntos se numeran solos con un contador CSS: para agregar o quitar uno basta
con meter o sacar un `<li>`, no hay que renumerar nada.

## Estructura

```
index.html          — página completa
css/styles.css      — estilos
js/main.js          — countdown, reveals, murciélagos, lightbox, parallax
assets/brand/       — logos VOLOFEST y La Voloband, boleto, murciélagos
assets/posters/     — carteles de la campaña
assets/logos/       — logos de las bandas invitadas y de patrocinadores
CNAME               — dominio de GitHub Pages
```

Sitio estático, sin build. Para editar precios, fecha o line-up basta con tocar `index.html`.
La cuenta regresiva apunta a la constante `TARGET` en `js/main.js`.
