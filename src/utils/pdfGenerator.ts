import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePDF(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('Invoice element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Get exact page size from jsPDF (in mm)
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Start with image taking full page width
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Scale down further if the content is taller than the page so that
  // everything fits on a single A4 page (no extra pages).
  let renderWidth = imgWidth;
  let renderHeight = imgHeight;

  if (imgHeight > pageHeight) {
    const scale = pageHeight / imgHeight;
    renderWidth = imgWidth * scale;
    renderHeight = imgHeight * scale;
  }

  // Center horizontally, align to top
  const x = (pageWidth - renderWidth) / 2;
  const y = 0;

  pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);

  pdf.save(fileName);
}
