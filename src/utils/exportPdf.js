import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const MARGIN_MM = 5 // margen de página reducido (la impresora suele aceptar >= 4-5 mm)
const CAPTURE_SCALE = 6 // ~300 dpi o más en el PDF final

/**
 * Captura un nodo del DOM y lo guarda como PDF A4 vertical a página completa.
 *
 * Para que el calendario abarque toda la hoja sin deformar texto ni bordes,
 * en la copia que se captura (no en la vista previa) se estira la altura de las
 * filas hasta que el contenedor tenga la misma proporción que el área útil de la hoja.
 */
export async function downloadNodeAsPdf(node, fileName) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const availW = pageW - MARGIN_MM * 2
  const availH = pageH - MARGIN_MM * 2

  const canvas = await html2canvas(node, {
    scale: CAPTURE_SCALE,
    backgroundColor: '#ffffff',
    useCORS: true,
    onclone: (_doc, cloned) => {
      // Quita el borde, el relleno y la sombra del contenedor: solo cuenta el contenido.
      cloned.style.boxShadow = 'none'
      cloned.style.border = 'none'
      cloned.style.padding = '0'
      cloned.querySelector('table').style.marginBottom = '0'
      const cells = cloned.querySelectorAll('tbody td')
      const rows = cloned.querySelectorAll('tbody tr').length
      const targetH = cloned.offsetWidth * (availH / availW)

      // Dos pasadas por si el navegador redondea alturas de fila.
      for (let pass = 0; pass < 2; pass++) {
        const extra = targetH - cloned.offsetHeight
        if (Math.abs(extra) < 0.5) break
        cells.forEach((td) => {
          const current = parseFloat(getComputedStyle(td).height)
          td.style.height = `${current + extra / rows}px`
        })
      }
    },
  })

  // Ajuste final por proporción exacta (casi siempre llena el área útil completa).
  const ratio = canvas.width / canvas.height
  let w = availW
  let h = w / ratio
  if (h > availH) {
    h = availH
    w = h * ratio
  }

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', (pageW - w) / 2, (pageH - h) / 2, w, h)
  pdf.save(fileName)
}

