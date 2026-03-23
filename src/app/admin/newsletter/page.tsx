"use client"

import { useState } from "react"
import { Search, Mail, Users, Send, Plus, Download, BarChart3, Trash2, Edit, CheckCircle } from "lucide-react"

const mockSubscribers = [
  { id: "1", email: "john@example.com", name: "John Doe", subscribedAt: "2024-01-15", isActive: true },
  { id: "2", email: "sarah@example.com", name: "Sarah Miller", subscribedAt: "2024-01-14", isActive: true },
  { id: "3", email: "michael@example.com", name: "Michael Brown", subscribedAt: "2024-01-13", isActive: true },
  { id: "4", email: "emily@example.com", name: "Emily Robinson", subscribedAt: "2024-01-12", isActive: false },
  { id: "5", email: "david@example.com", name: "David Williams", subscribedAt: "2024-01-11", isActive: true },
]

const mockCampaigns = [
  { id: "1", subject: "January Newsletter - New Programs", sentAt: "2024-01-15", recipients: 1250, opens: 450, clicks: 120, status: "sent" },
  { id: "2", subject: "Year-End Appeal", sentAt: "2024-01-01", recipients: 1200, opens: 580, clicks: 210, status: "sent" },
  { id: "3", subject: "Holiday Greetings", sentAt: "2023-12-25", recipients: 1150, opens: 420, clicks: 85, status: "sent" },
]

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState<"subscribers" | "campaigns">("subscribers")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubscribers = mockSubscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Newsletter</h2>
          <p className="text-foreground-light">Manage subscribers and email campaigns</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          {activeTab === "campaigns" ? (
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-5 h-5" />
              New Campaign
            </button>
          ) : (
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Subscriber
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
            activeTab === "subscribers"
              ? "border-primary text-primary"
              : "border-transparent text-foreground-light hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Subscribers ({mockSubscribers.length})
          </div>
        </button>
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
            activeTab === "campaigns"
              ? "border-primary text-primary"
              : "border-transparent text-foreground-light hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Campaigns ({mockCampaigns.length})
          </div>
        </button>
      </div>

      {/* Subscribers Tab */}
      {activeTab === "subscribers" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground-light text-sm">Total Subscribers</p>
                  <p className="text-xl font-bold text-foreground">{mockSubscribers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-foreground-light text-sm">Active</p>
                  <p className="text-xl font-bold text-foreground">{mockSubscribers.filter(s => s.isActive).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-foreground-light" />
                </div>
                <div>
                  <p className="text-foreground-light text-sm">Unsubscribed</p>
                  <p className="text-xl font-bold text-foreground">{mockSubscribers.filter(s => !s.isActive).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Email</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Name</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Subscribed</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
                  <th className="text-right px-6 py-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{subscriber.name}</td>
                    <td className="px-6 py-4 text-foreground-light">{subscriber.subscribedAt}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscriber.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {subscriber.isActive ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4 text-foreground-light" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-foreground">Subject</th>
                <th className="text-left px-6 py-4 font-medium text-foreground">Sent</th>
                <th className="text-left px-6 py-4 font-medium text-foreground">Recipients</th>
                <th className="text-left px-6 py-4 font-medium text-foreground">Opens</th>
                <th className="text-left px-6 py-4 font-medium text-foreground">Clicks</th>
                <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{campaign.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground-light">{campaign.sentAt}</td>
                  <td className="px-6 py-4 text-foreground">{campaign.recipients.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-foreground">{campaign.opens}</span>
                      <span className="text-foreground-light text-sm ml-1">
                        ({((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-foreground">{campaign.clicks}</span>
                      <span className="text-foreground-light text-sm ml-1">
                        ({((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
