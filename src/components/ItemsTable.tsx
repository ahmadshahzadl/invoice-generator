import { Plus, Trash2 } from 'lucide-react';
import { InvoiceItem, CurrencyCode, PrimaryColor } from '../types/invoice';
import { formatCurrency } from '../utils/currency';

interface ItemsTableProps {
  items: InvoiceItem[];
  currency: CurrencyCode;
  primaryColor: PrimaryColor;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
}

export default function ItemsTable({
  items,
  currency,
  primaryColor,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: ItemsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Items</h3>
        <button
          onClick={onAddItem}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={18} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-16">
                Sr No
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-28">
                Rate
              </th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-24">
                Quantity
              </th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-32">
                Amount
              </th>
              <th className="py-3 px-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-2 text-sm text-gray-600">{index + 1}</td>
                <td className="py-3 px-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Item description"
                  />
                </td>
                <td className="py-3 px-2">
                  <input
                    type="number"
                    value={item.rate || ''}
                    onChange={(e) =>
                      onUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-right"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </td>
                <td className="py-3 px-2">
                  <input
                    type="number"
                    value={item.quantity || ''}
                    onChange={(e) =>
                      onUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-right"
                    placeholder="0"
                    step="1"
                    min="0"
                  />
                </td>
                <td className="py-3 px-2 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(item.amount, currency)}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items added yet. Click "Add Item" to get started.
        </div>
      )}
    </div>
  );
}
