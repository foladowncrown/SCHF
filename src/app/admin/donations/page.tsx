"use client"

import { useState } from "react"
import { Search, Filter, DollarSign, Calendar, CheckCircle, XCircle, Clock, MoreVertical, Download, Eye } from "lucide-react"

const mockDonations = [
  {
    id: "1",
    donorName: "John Doe",
    donorEmail: "john@example.com",
    amount: 500,
    currency: "USD",
    paymentMethod: "stripe",
    status: "completed",
    isMonthly: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    donorName: "Sarah Miller",
    donorEmail: "sarah@example.com",
    amount: 100,
    currency: "USD",
    paymentMethod: "paystack",
    status: "completed",
    isMonthly: true,
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    donorName: "Anonymous",
    donorEmail: null,
    amount: 250,
    currency: "USD",
    paymentMethod: "stripe",
    status: "pending",
    isMonthly: false,
    createdAt: "2024-01-14T09:20:00Z",
  },
  {
    id: "4",
    donorName: "Michael Brown",
    donorEmail: "michael@example.com",
    amount: 50,
    currency: "USD",
    paymentMethod: "lemonsqueezy",
    status: "completed",
    isMonthly: false,
    createdAt: "2024-01-13T14:10:00Z",
  },
  {
    id: "5",
    donorName: "Emily Robinson",
    donorEmail: "emily@example.com",
    amount: 1000,
    currency: "USD",
    paymentMethod: "stripe",
    status: "refunded",
    isMonthly: false,
    createdAt: "2024-01-12T11:00:00Z",
  },
]

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle }> = {
  completed: { color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  pending: { color: "text-yellow-700", bg: "bg-yellow-100", icon: Clock },
  failed: { color: "text-red-700", bg: "bg-red-100", icon: XCircle },
  refunded: { color: "text-gray-700", bg: "bg-gray-100", icon: XCircle },
}

export default function DonationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donorEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (statusFilter === "all") return matchesSearch
    return matchesSearch && donation.status === statusFilter
  })

  const totalAmount = mockDonations
    .filter(d => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0)

  const monthlyDonors = mockDonations.filter(d => d.isMonthly && d.status === "completed").length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Donations</h2>
          <p className="text-foreground-light">Track and manage donation records</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">Total Received</p>
          <p className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">This Month</p>
          <p className="text-2xl font-bold text-foreground">$850</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">Monthly Donors</p>
          <p className="text-2xl font-bold text-foreground">{monthlyDonors}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">Avg. Donation</p>
          <p className="text-2xl font-bold text-foreground">$180</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "completed", "pending", "refunded"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-medium text-foreground">Donor</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Amount</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Method</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Type</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Date</th>
              <th className="text-right px-6 py-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDonations.map((donation) => {
              const status = statusConfig[donation.status]
              const StatusIcon = status.icon
              
              return (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{donation.donorName}</p>
                      {donation.donorEmail && (
                        <p className="text-sm text-foreground-light">{donation.donorEmail}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-foreground-light" />
                      <span className="font-semibold text-foreground">
                        {donation.amount.toLocaleString()}
                      </span>
                      <span className="text-foreground-light">{donation.currency}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm capitalize text-foreground-light">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {donation.isMonthly ? (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Monthly
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        One-time
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-foreground-light text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-foreground-light" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-foreground-light mx-auto mb-4" />
            <p className="text-foreground-light">No donations found</p>
          </div>
        )}
      </div>
    </div>
  )
}
