/** Shared domain types — ALL component prop interfaces live here. */

export interface OptimizedImage {
  avif: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NivelData {
  orden: number;
  numeral: string;
  nombre: string;
  edades: string;
  lema: string;
  descripcion: string;
  bullets: string[];
  horario: string;
  horarioNota: string;
  diaTipico: Array<{ hora: string; actividad: string }>;
  imagen?: OptimizedImage;
  imagenCaption: string;
  imagenPendiente: boolean;
}

export interface EventoData {
  orden: number;
  mes: string;
  nombre: string;
  descripcion: string;
}

export interface FaqData {
  orden: number;
  pregunta: string;
  respuesta: string;
}

export interface HitoData {
  orden: number;
  anio: string;
  hito: string;
  destacado: boolean;
}

export interface CifraData {
  valor: number | null;
  display: string;
  etiqueta: string;
  pendiente?: boolean;
}

/** Rail clause definition — sections announce themselves via data-clause attrs. */
export interface ClauseDef {
  numeral: string;
  id: string;
  label: string;
}
