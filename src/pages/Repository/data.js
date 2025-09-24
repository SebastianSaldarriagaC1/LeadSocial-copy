// src/pages/Repository/data.js
export const ARCHIVE_GROUPS = [
  {
    id: 'g1',
    date: '14/marzo/2025',
    items: [
      {
        id: 'a1',
        title: '🐣 Nuevo Departamento en Preventa – ¡Ubicación…',
        tag: 'Orgánico',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
        caption:
          'Descubre tu próximo hogar en una zona de alta valorización. Acabados premium y espacios pensados para ti.',
      },
      {
        id: 'a2',
        title: '🏠 Nuevo Departamento en Preventa – ¡Ubicación…',
        tag: 'Orgánico',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
        caption:
          'Diseño moderno, excelente iluminación y zonas comunes espectaculares. ¡Agenda tu visita!',
      },
      {
        id: 'a3',
        title: '✨ Nuevo Departamento en Preventa – ¡Ubicación…',
        tag: 'Orgánico',
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
        caption:
          'Un proyecto con todo lo que necesitas para vivir o invertir con tranquilidad.',
      },
      {
        id: 'a4',
        title: '🌆 Nuevo Departamento en Preventa – ¡Ubicación…',
        tag: 'Orgánico',
        image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop',
        caption:
          'Vistas espectaculares y acceso a las principales vías. ¡Últimas unidades!',
      },
      {
        id: 'a5',
        title: '🏡 Nuevo Departamento en Preventa – ¡Ubicación…',
        tag: 'Orgánico',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop',
        caption:
          'Comodidad, ubicación y estilo. Pregunta por nuestros planes de financiación.',
      },
    ],
  },
];

export function findArchivedById(id) {
  for (const g of ARCHIVE_GROUPS) {
    const item = g.items.find((it) => it.id === id);
    if (item) return item;
  }
  return null;
}
