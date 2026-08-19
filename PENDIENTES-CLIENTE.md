# Pendientes del cliente — U.E.P. Belén Sanjuán

Todo lo que aparece `[entre corchetes]` en el sitio necesita el dato real.

## Datos duros
- [ ] **Número de WhatsApp de admisiones** → `src/lib/site.ts` (`WHATSAPP_HREF`)
- [ ] Dirección completa de la sede → Footer + Contacto
- [ ] Teléfono y correo → Footer + Contacto
- [ ] Número de estudiantes activos → cifras del home (`HomeCifras.tsx`)
- [ ] Montos de inscripción y mensualidades → Admisiones
- [ ] Fechas del proceso de admisión → Admisiones
- [ ] Hora de tarde extendida (maternal) → `src/content/niveles/maternal.json`
- [ ] Horarios exactos por nivel (los actuales son referenciales)
- [ ] Días de respuesta de la evaluación → Admisiones paso 03
- [ ] Respuestas FAQ: transporte escolar y métodos de pago → `src/content/faqs/`
- [ ] Hitos del legado (2 por confirmar) → `src/content/hitos/`
- [ ] Nombre de la dirección general → Home (carta) 
- [ ] Mes del Mundial BSJ → `src/content/eventos/e3.json`

## Verificaciones históricas
- [ ] **"Fundada en 1989"** — tomado del escudo (MCMLXXXIX). El IG dice "39 años"
      (daría 1987). Confirmar cuál es correcto; hoy el sitio usa 1989/37 años.
- [ ] Reseña de la maestra Belén Sanjuán (1916-2004) y la cita — marcadas como
      referenciales en Proyecto Educativo.

## Fotografía (sesión pendiente)
Las fotos actuales vienen del Instagram (640px — sirven de maqueta, no de
producción). Slots marcados como "lámina pendiente":
- [ ] Retrato de la dirección
- [ ] Retrato histórico de la maestra Belén Sanjuán (archivo)
- [ ] Misa / convivencias
- [ ] Acto de grado
- [ ] Aulas por nivel + fachada
- [ ] Reemplazos en alta resolución de: comunidad, mundial, cancha

## Integraciones
- [ ] Formulario de contacto: hoy valida y muestra estados, pero no envía.
      Conectar Web3Forms (gratis) o correo del colegio → `ContactoCuerpo.tsx`.
- [ ] Accesos de familias (calendario, circulares, útiles, uniformes): enlaces
      placeholder hasta que el colegio entregue los documentos.
- [ ] Dominio propio (hoy: subdominio Vercel) — actualizar `site` en
      `astro.config.mjs` al dominio final.
