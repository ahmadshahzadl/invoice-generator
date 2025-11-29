import { Upload } from 'lucide-react';
import { CompanyDetails, CustomerDetails, CurrencyCode, PrimaryColor } from '../types/invoice';
import { CURRENCY_OPTIONS } from '../utils/currency';

interface InvoiceFormProps {
  logo: string | null;
  onLogoUpload: (file: File) => void;
  logoSize: number;
  onLogoSizeChange: (value: number) => void;
  currency: CurrencyCode;
  onCurrencyChange: (value: CurrencyCode) => void;
  primaryColor: PrimaryColor;
  onPrimaryColorChange: (value: PrimaryColor) => void;
  company: CompanyDetails;
  onCompanyChange: (field: keyof CompanyDetails, value: string) => void;
  customer: CustomerDetails;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  invoiceNumber: string;
  onInvoiceNumberChange: (value: string) => void;
  invoiceDate: string;
  onInvoiceDateChange: (value: string) => void;
}

export default function InvoiceForm({
  logo,
  onLogoUpload,
  logoSize,
  onLogoSizeChange,
  currency,
  onCurrencyChange,
  primaryColor,
  onPrimaryColorChange,
  company,
  onCompanyChange,
  customer,
  onCustomerChange,
  invoiceNumber,
  onInvoiceNumberChange,
  invoiceDate,
  onInvoiceDateChange,
}: InvoiceFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {logo && (
              <img src={logo} alt="Company Logo" className="h-20 w-20 object-contain" />
            )}
            <label
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg cursor-pointer transition-colors hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <Upload size={18} />
              <span>{logo ? 'Change Logo' : 'Upload Logo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Size (on invoice)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={32}
                max={120}
                step={4}
                value={logoSize}
                onChange={(e) => onLogoSizeChange(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-gray-600 whitespace-nowrap">{logoSize}px</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={company.name}
              onChange={(e) => onCompanyChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Company Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={company.address}
              onChange={(e) => onCompanyChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Company address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Info
            </label>
            <input
              type="text"
              value={company.contact}
              onChange={(e) => onCompanyChange('contact', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email, phone, etc."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => onCustomerChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={customer.address}
              onChange={(e) => onCustomerChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Customer address"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => onInvoiceNumberChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => onInvoiceDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {CURRENCY_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value as PrimaryColor)}
              className="h-10 w-12 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value as PrimaryColor)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="#2563eb"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Used for buttons, totals, and invoice highlights in the PDF.
          </p>
        </div>
      </div>
    </div>
  );
}
