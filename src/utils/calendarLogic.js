// Lógica pura del calendario (sin React): fácil de probar y reutilizar.

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// La semana inicia en Lunes.
export const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export const YEARS = Array.from({ length: 2035 - 2020 + 1 }, (_, i) => 2020 + i)

/** Número de días del mes (month: 0-11). Día 0 del mes siguiente = último día de este mes. */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Cantidad de celdas vacías antes del día 1.
 * Date.getDay() devuelve 0=Domingo, 1=Lunes ... 6=Sábado.
 * Como nuestra semana inicia en Lunes, desplazamos con (getDay() + 6) % 7:
 *   Lunes -> 0 vacías, Martes -> 1, Miércoles -> 2 ... Domingo -> 6.
 */
export function getLeadingBlanks(year, month) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

/**
 * Devuelve la cuadrícula como un arreglo de semanas (filas de 7 posiciones).
 * Cada posición es un número de día o null (celda vacía).
 */
export function buildCalendarWeeks(year, month) {
  const cells = [
    ...Array(getLeadingBlanks(year, month)).fill(null), // vacías al inicio
    ...Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1),
  ]

  // Rellena con vacías al final para completar la última semana.
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}
