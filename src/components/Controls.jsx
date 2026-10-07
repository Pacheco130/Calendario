import { MONTH_NAMES, YEARS } from '../utils/calendarLogic'

// Panel de control: selects de mes/año y botón de descarga.
export default function Controls({ month, year, onMonthChange, onYearChange, onDownload, loading }) {
  return (
    <div className="controls">
      <label>
        Mes
        <select value={month} onChange={(e) => onMonthChange(Number(e.target.value))}>
          {MONTH_NAMES.map((name, i) => (
            <option key={name} value={i}>{name}</option>
          ))}
        </select>
      </label>

      <label>
        Año
        <select value={year} onChange={(e) => onYearChange(Number(e.target.value))}>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>

      <button type="button" className="download-btn" onClick={onDownload} disabled={loading}>
        {loading ? 'Generando…' : 'Descargar Calendario en PDF'}
      </button>
    </div>
  )
}
