import { InvoiceData } from '../types/invoice';
import { formatCurrency } from '../utils/currency';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  return (
    <div
      id="invoice-preview"
      className="bg-white w-[794px] min-h-[1050px] mx-auto flex flex-col text-gray-900 p-8"
    >
      {/* Header: company (top-left) and invoice details (top-right) */}
      <div className="flex items-start justify-between mb-6 border-b pb-4" style={{ borderColor: '#e5e7eb' }}>
        <div>
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="mb-3 object-contain"
              style={{
                height: data.logoSize || 48,
                maxHeight: 120,
                width: 'auto',
              }}
            />
          )}
          <div className="text-xs">
            <h2 className="font-semibold text-base text-gray-900">
              {data.company.name || 'Company Name'}
            </h2>
            <p className="text-gray-600 whitespace-pre-line mt-1">
              {data.company.address || 'Company Address'}
            </p>
            <p className="text-gray-600 mt-1">
              {data.company.contact || 'Contact Info'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h1
            className="text-2xl font-bold tracking-wide"
            style={{ color: data.primaryColor }}
          >
            INVOICE
          </h1>
          <div className="mt-3 text-xs">
            <div className="flex justify-end gap-2 mb-1">
              <span className="font-semibold text-gray-700">Invoice #</span>
              <span className="text-gray-900">{data.invoiceNumber || 'INV-001'}</span>
            </div>
            <div className="flex justify-end gap-2">
              <span className="font-semibold text-gray-700">Date</span>
              <span className="text-gray-900">
                {data.invoiceDate || new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To section below header */}
      <div className="mb-6">
        <h3
          className="font-semibold text-xs mb-1 tracking-wide"
          style={{ color: data.primaryColor }}
        >
          BILL TO
        </h3>
        <div className="text-xs">
          <p className="font-medium text-gray-900">{data.customer.name || 'Customer Name'}</p>
          <p className="text-gray-600 whitespace-pre-line mt-1">
            {data.customer.address || 'Customer Address'}
          </p>
        </div>
      </div>

      {/* Items table */}
      <table className="w-full mb-6 text-xs">
        <thead>
          <tr className="border-b-2" style={{ borderColor: data.primaryColor }}>
            <th
              className="text-left py-2 px-2 font-semibold w-16"
              style={{ color: data.primaryColor }}
            >
              SR NO
            </th>
            <th
              className="text-left py-2 px-2 font-semibold"
              style={{ color: data.primaryColor }}
            >
              DESCRIPTION
            </th>
            <th
              className="text-right py-2 px-2 font-semibold w-24"
              style={{ color: data.primaryColor }}
            >
              RATE
            </th>
            <th
              className="text-right py-2 px-2 font-semibold w-20"
              style={{ color: data.primaryColor }}
            >
              QTY
            </th>
            <th
              className="text-right py-2 px-2 font-semibold w-28"
              style={{ color: data.primaryColor }}
            >
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {data.items.length > 0 ? (
            data.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2 px-2 text-gray-700">{index + 1}</td>
                <td className="py-2 px-2 text-gray-900">{item.description || '-'}</td>
                <td className="py-2 px-2 text-gray-900 text-right">
                  {formatCurrency(item.rate, data.currency)}
                </td>
                <td className="py-2 px-2 text-gray-900 text-right">{item.quantity}</td>
                <td className="py-2 px-2 text-gray-900 text-right font-medium">
                  {formatCurrency(item.amount, data.currency)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                No items added
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total section directly below table, smaller and cleaner for A4 */}
      <div className="flex justify-end mb-4">
        <div
          className="w-64 border rounded-md px-4 py-3 text-xs bg-gray-50"
          style={{ borderColor: data.primaryColor }}
        >
          <div className="flex justify-between items-center">
            <span
              className="font-semibold tracking-wide"
              style={{ color: data.primaryColor }}
            >
              TOTAL
            </span>
            <span
              className="font-semibold text-base text-gray-900"
              style={{ color: data.primaryColor }}
            >
              {formatCurrency(data.total, data.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes anchored towards the end of the page */}
      {data.notes && (
        <div className="border-t border-gray-200 pt-4 mt-auto text-xs">
          <h3
            className="font-semibold mb-1 tracking-wide"
            style={{ color: data.primaryColor }}
          >
            NOTES
          </h3>
          <p className="text-gray-600 whitespace-pre-line leading-relaxed">{data.notes}</p>
        </div>
      )}
    </div>
  );
}
