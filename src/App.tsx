import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import ItemsTable from './components/ItemsTable';
import NotesSection from './components/NotesSection';
import InvoicePreview from './components/InvoicePreview';
import {
  InvoiceData,
  InvoiceItem,
  CompanyDetails,
  CustomerDetails,
  CurrencyCode,
  PrimaryColor,
} from './types/invoice';
import { generatePDF } from './utils/pdfGenerator';
import { formatCurrency } from './utils/currency';

function App() {
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(48); // px height for logo in preview/PDF
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>('#2563eb'); // Tailwind blue-600
  const [company, setCompany] = useState<CompanyDetails>({
    name: '',
    address: '',
    contact: '',
  });
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    address: '',
  });
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCompanyChange = (field: keyof CompanyDetails, value: string) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      rate: 0,
      quantity: 1,
      amount: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'rate' || field === 'quantity') {
            updatedItem.amount = updatedItem.rate * updatedItem.quantity;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF('invoice-preview', `invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const invoiceData: InvoiceData = {
    logo,
    logoSize,
    currency,
    primaryColor,
    company,
    customer,
    invoiceNumber,
    invoiceDate,
    items,
    notes,
    total,
  };

  useEffect(() => {
    document.title = 'Invoice Generator';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
          <p className="text-gray-600">Create professional invoices in minutes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-5 md:space-y-6">
            <InvoiceForm
              logo={logo}
              onLogoUpload={handleLogoUpload}
              logoSize={logoSize}
              onLogoSizeChange={setLogoSize}
              currency={currency}
              onCurrencyChange={setCurrency}
              primaryColor={primaryColor}
              onPrimaryColorChange={setPrimaryColor}
              company={company}
              onCompanyChange={handleCompanyChange}
              customer={customer}
              onCustomerChange={handleCustomerChange}
              invoiceNumber={invoiceNumber}
              onInvoiceNumberChange={setInvoiceNumber}
              invoiceDate={invoiceDate}
              onInvoiceDateChange={setInvoiceDate}
            />

            <ItemsTable
              items={items}
              currency={currency}
              primaryColor={primaryColor}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onUpdateItem={handleUpdateItem}
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">Total:</span>
                  <span
                    className="text-3xl font-bold ml-4"
                    style={{ color: primaryColor }}
                  >
                    {formatCurrency(total, currency)}
                  </span>
                </div>
              </div>
            </div>

            <NotesSection notes={notes} onNotesChange={setNotes} />

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <Download size={24} />
              <span>{isGenerating ? 'Generating PDF...' : 'Download Invoice PDF'}</span>
            </button>
          </div>

          <div className="lg:sticky lg:top-8 h-fit mt-4 lg:mt-0">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
              <p className="text-sm text-gray-600">Live preview of your invoice</p>
            </div>
            <div className="overflow-x-auto">
              <InvoicePreview data={invoiceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
