import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const niveles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/niveles' }),
  schema: z.object({
    orden: z.number(),
    numeral: z.string(),
    nombre: z.string(),
    edades: z.string(),
    lema: z.string(),
    descripcion: z.string(),
    bullets: z.array(z.string()),
    horario: z.string(),
    horarioNota: z.string(),
    diaTipico: z.array(z.object({ hora: z.string(), actividad: z.string() })),
    imagen: z.string(),
    imagenCaption: z.string(),
    imagenPendiente: z.boolean().default(false),
  }),
});

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/eventos' }),
  schema: z.object({
    orden: z.number(),
    mes: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    orden: z.number(),
    pregunta: z.string(),
    respuesta: z.string(),
  }),
});

const hitos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hitos' }),
  schema: z.object({
    orden: z.number(),
    anio: z.string(),
    hito: z.string(),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { niveles, eventos, faqs, hitos };
