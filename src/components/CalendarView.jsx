import { forwardRef } from 'react'
import { MONTH_NAMES, WEEK_DAYS, buildCalendarWeeks } from '../utils/calendarLogic'

// Renderiza la plantilla estricta. El ref apunta a .calendar-container,
// que es el único nodo que se captura para el PDF.
const CalendarView = forwardRef(function CalendarView({ month, year }, ref) {
  // Ejemplo: si el mes empieza en miércoles, la primera semana es
  // [null, null, 1, 2, 3, 4, 5] -> dos <td></td> vacíos antes del 1.
  // La última semana se completa con null hasta tener siempre 7 celdas por fila.
  const weeks = buildCalendarWeeks(year, month)

  return (
    <div className="calendar-container" ref={ref}>
      <h1>{MONTH_NAMES[month]}</h1>
      <div className="year">{year}</div>

      <table>
        <thead>
          <tr>
            {WEEK_DAYS.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((day, i) => (
                <td key={i}>{day}</td> // day === null -> <td></td> vacío
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default CalendarView
