"use client"

import { useState, useEffect } from "react"
import { Search, MessageSquare, CheckCircle, Clock, Trash2, Mail, Phone } from "lucide-react"

const statusConfig: Record<string, { color: string; bg: string; label: string; icon: typeof MessageSquare }> = {
  new: { color: "text-blue-700", bg: "bg-blue-100", label: "New", icon: MessageSquare },
  in_progress: { color: "text-yellow-700", bg: "bg-yellow-100", label: "In Progress", icon: Clock },
  resolved: { color: "text-green-700", bg: "bg-green-100", label: "Resolved", icon: CheckCircle },
}

const departmentLabels: Record<string, string> = {
  general: "General",
  medical: "Medical Services",
  partnerships: "Partnerships",
  donations: "Donations",
  volunteer: "Volunteering",
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  department: string
  message: string
  status: string
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  async function loadContacts() {
    try {
      const res = await fetch("/api/contacts")
      if (res.ok) {
        const data = await res.json()
        setContacts(data)
      }
    } catch (error) {
      console.error("Error loading contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      loadContacts()
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Are you sure you want to delete this contact?")) return
    try {
      await fetch(`/api/contacts?id=${id}`, { method: "DELETE" })
      setSelectedContact(null)
      loadContacts()
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (statusFilter === "all") return matchesSearch
    return matchesSearch && contact.status === statusFilter
  })

  const newCount = contacts.filter(c => c.status === "new").length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Contact Messages</h2>
          <p className="text-foreground-light">Manage inquiries from the contact form</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">Total Messages</p>
          <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">New</p>
          <p className="text-2xl font-bold text-blue-600">{newCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600">{contacts.filter(c => c.status === "in_progress").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-foreground-light text-sm">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{contacts.filter(c => c.status === "resolved").length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "new", "in_progress", "resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    statusFilter === status
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  {status === "all" ? "All" : status === "in_progress" ? "Progress" : status}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Contact</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Message</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Department</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-medium text-foreground">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-foreground-light">
                      Loading contacts...
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-foreground-light">
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => {
                    const status = statusConfig[contact.status] || statusConfig.new
                    const StatusIcon = status.icon
                    
                    return (
                      <tr
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedContact?.id === contact.id ? "bg-primary/5" : ""
                        } ${contact.status === "new" ? "font-semibold" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <p className="text-sm text-foreground-light">{contact.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-foreground">{contact.message.substring(0, 40)}...</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground-light">
                            {departmentLabels[contact.department] || contact.department}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground-light">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          {selectedContact ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Message Details</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => deleteContact(selectedContact.id)}
                    className="p-2 hover:bg-red-50 rounded-lg" 
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground text-lg">{selectedContact.name}</h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selectedContact.status]?.bg || ""} ${statusConfig[selectedContact.status]?.color || ""}`}>
                    {statusConfig[selectedContact.status]?.label || selectedContact.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground-light">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-primary">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3 text-foreground-light">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${selectedContact.phone}`} className="hover:text-primary">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-foreground-light mb-1">Department</p>
                  <p className="font-medium text-foreground">{departmentLabels[selectedContact.department] || selectedContact.department}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-foreground-light mb-2">Message</p>
                  <p className="text-foreground bg-gray-50 p-4 rounded-lg">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-foreground-light mb-1">Received</p>
                  <p className="font-medium text-foreground">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>

                <div className="pt-4">
                  <a 
                    href={`mailto:${selectedContact.email}`}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Reply via Email
                  </a>
                </div>

                {selectedContact.status !== "resolved" && (
                  <button 
                    onClick={() => updateStatus(selectedContact.id, "resolved")}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Resolved
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-foreground-light mx-auto mb-4" />
              <p className="text-foreground-light">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
