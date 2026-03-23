"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X, DollarSign } from "lucide-react"

const initialCurrencies = [
  { id: "1", code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1.0, isDefault: true, isActive: true, sortOrder: 1 },
  { id: "2", code: "NGN", name: "Nigerian Naira", symbol: "₦", exchangeRate: 1500, isDefault: false, isActive: true, sortOrder: 2 },
]

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState(initialCurrencies)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCurrency, setNewCurrency] = useState({
    code: "",
    name: "",
    symbol: "",
    exchangeRate: 1,
    isDefault: false,
    isActive: true,
    sortOrder: 0,
  })

  const handleAdd = () => {
    if (!newCurrency.code || !newCurrency.name || !newCurrency.symbol) return
    
    const id = Date.now().toString()
    setCurrencies([...currencies, { ...newCurrency, id, sortOrder: currencies.length + 1 }])
    setNewCurrency({
      code: "",
      name: "",
      symbol: "",
      exchangeRate: 1,
      isDefault: false,
      isActive: true,
      sortOrder: 0,
    })
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setCurrencies(currencies.filter(c => c.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setCurrencies(currencies.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  const handleSetDefault = (id: string) => {
    setCurrencies(currencies.map(c => 
      c.id === id ? { ...c, isDefault: true } : { ...c, isDefault: false }
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Currencies</h1>
          <p className="text-foreground-light">Manage donation currencies and exchange rates</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Currency
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Currency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Currency Code</label>
              <input
                type="text"
                placeholder="USD"
                value={newCurrency.code}
                onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="US Dollar"
                value={newCurrency.name}
                onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Symbol</label>
              <input
                type="text"
                placeholder="$"
                value={newCurrency.symbol}
                onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Exchange Rate (to USD)</label>
              <input
                type="number"
                placeholder="1.0"
                value={newCurrency.exchangeRate}
                onChange={(e) => setNewCurrency({ ...newCurrency, exchangeRate: parseFloat(e.target.value) || 1 })}
                className="input"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <Check className="w-4 h-4" />
              Save Currency
            </button>
            <button onClick={() => setIsAdding(false)} className="text-foreground-light hover:text-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Currency List */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Currency</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Code</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Exchange Rate</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Default</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{currency.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono font-semibold">{currency.symbol}{currency.code}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-foreground-light">
                    {currency.exchangeRate.toLocaleString()} {currency.code === "USD" ? "" : "NGN/USD"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleToggleActive(currency.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currency.isActive 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {currency.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="py-3 px-4">
                  {currency.isDefault ? (
                    <span className="text-primary font-medium">Default</span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(currency.id)}
                      className="text-foreground-light hover:text-primary"
                    >
                      Set as default
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(currency.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currencies.length === 0 && (
          <div className="text-center py-12 text-foreground-light">
            No currencies added yet. Click "Add Currency" to get started.
          </div>
        )}
      </div>
    </div>
  )
}
