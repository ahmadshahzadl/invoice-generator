## Invoice Generator (React + Vite + Tailwind)

A simple, fully client‑side **invoice generator** built with **React, TypeScript, Vite, Tailwind CSS, html2canvas, and jsPDF**.  
Create clean, A4‑sized invoices, customize branding (logo, colors, currency), and export high‑quality PDFs — all in the browser.

### Features

- **A4‑optimized invoice layout**
  - Fixed A4 proportions in the preview so the PDF matches a real page.
  - Company info on top‑left, invoice meta (number/date) on top‑right.
  - “Bill To” block, line‑items table, totals, and notes in a clear vertical flow.

- **Branding & appearance**
  - Upload your **company logo** and adjust its **size** with a slider.
  - Pick **any primary color** (via color picker or hex input) for:
    - Buttons
    - Total highlights
    - Table header, headings, and accents in the PDF

- **Flexible currency**
  - Choose from common currencies (USD, PKR, EUR, GBP, AED).
  - All amounts (items, total, PDF) use the selected currency symbol.

- **Items & totals**
  - Add/remove line items with description, rate, and quantity.
  - Amount and invoice total calculated automatically.

- **PDF export**
  - Uses `html2canvas` + `jsPDF` to capture the A4 preview and export a **single‑page PDF**.
  - Content is auto‑scaled so notes and totals stay on the same page.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open the printed URL (usually `http://localhost:5173`) in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint & typecheck (optional)

```bash
npm run lint
npm run typecheck
```

---

## Usage

1. **Company & logo**
   - Upload your logo in the **Logo** section (left column).
   - Adjust the **Logo Size (on invoice)** slider until it looks right in the preview.
   - Fill in company name, address, and contact details.

2. **Customer & invoice details**
   - Enter the **Customer Name** and **Address**.
   - Set **Invoice Number** and **Invoice Date**.
   - Choose **Currency** (USD / PKR / EUR / GBP / AED).
   - Choose a **Primary Color** using the color picker or hex field (e.g. `#2563eb`).

3. **Items**
   - Use **Add Item** to add line items.
   - Enter description, rate, and quantity; amount and total update automatically.

4. **Notes**
   - Add optional notes/terms in the **Notes** section (left column).  
   - Notes are rendered at the bottom of the invoice page in the PDF.

5. **Generate PDF**
   - Click **“Download Invoice PDF”**.
   - A single‑page A4 PDF is generated using the current preview, including:
     - Logo and company details
     - Customer and invoice info
     - Items table and totals
     - Notes
     - Selected **currency** and **primary color** styling

---

## Customization & Extensibility

- **Add more currencies**  
  Update the currency utilities and types in `src/utils/currency.ts` and `src/types/invoice.ts`.

- **Change layout**
  - Main invoice markup lives in `src/components/InvoicePreview.tsx`.
  - You can tweak typography, spacing, or sections there, and the PDF will follow.

- **Styling**
  - Global Tailwind setup is in `tailwind.config.js` and `src/index.css`.
  - Most of the layout is driven by Tailwind classes plus a dynamic primary color applied inline.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (bundler/dev server)
- **Tailwind CSS 3**
- **html2canvas** (HTML → canvas)
- **jsPDF** (canvas → PDF)
- **lucide-react** (icons)

---

## License

MIT License.  
You’re free to use, modify, and distribute this project in your own applications and products.


