import { useRef, useState } from 'react'
import Controls from './components/Controls'
import CalendarView from './components/CalendarView'
import { MONTH_NAMES } from './utils/calendarLogic'
import { downloadNodeAsPdf } from './utils/exportPdf'
import './App.css'

export default function App() {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(
    Math.min(Math.max(today.getFullYear(), 2020), 2035),
  )
  const [loading, setLoading] = useState(false)
  const calendarRef = useRef(null)

  const handleDownload = async () => {
    if (!calendarRef.current) return
    setLoading(true)
    try {
      await downloadNodeAsPdf(calendarRef.current, `calendario_${MONTH_NAMES[month]}_${year}.pdf`)
    } catch (err) {
      console.error(err)
      alert('No se pudo generar el PDF.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <Controls
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
        onDownload={handleDownload}
        loading={loading}
      />
      <section className="preview">
        <CalendarView ref={calendarRef} month={month} year={year} />
      </section>
    </main>
  )
}
