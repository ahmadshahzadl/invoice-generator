export interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

export interface CompanyDetails {
  name: string;
  address: string;
  contact: string;
}

export interface CustomerDetails {
  name: string;
  address: string;
}

export type CurrencyCode = 'USD' | 'PKR' | 'EUR' | 'GBP' | 'AED';

// CSS color value used for primary accent (e.g. "#2563eb" or "rgb(37,99,235)")
export type PrimaryColor = string;

export interface InvoiceData {
  logo: string | null;
  // Logo height in pixels, used to scale the logo in the preview/PDF
  logoSize: number;
  // Selected currency for all monetary values
  currency: CurrencyCode;
  // Primary accent color for the UI/invoice theme
  primaryColor: string; // CSS color value (e.g. "#2563eb")
  company: CompanyDetails;
  customer: CustomerDetails;
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceItem[];
  notes: string;
  total: number;
}
