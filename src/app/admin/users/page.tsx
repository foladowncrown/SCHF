"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Users, Shield, Mail, Phone, Building, Loader2, X, Save, Eye, EyeOff, UserCheck, UserX } from "lucide-react"

interface User {
  id: string
  name: string | null
  email: string
  role: string
  permissions: string
  isActive: boolean
  phone: string | null
  department: string | null
  createdAt: string
}

const roles = [
  { id: "super_admin", label: "Super Admin", description: "Full access to all features" },
  { id: "admin", label: "Admin", description: "Full access except user management" },
  { id: "editor", label: "Editor", description: "Can manage content and pages" },
  { id: "viewer", label: "Viewer", description: "Read-only access" },
]

const permissions = [
  { id: "dashboard", label: "Dashboard" },
  { id: "pages", label: "Pages" },
  { id: "team", label: "Team" },
  { id: "hero_slider", label: "Hero Slider" },
  { id: "donations", label: "Donations" },
  { id: "currencies", label: "Currencies" },
  { id: "newsletter", label: "Newsletter" },
  { id: "contacts", label: "Contacts" },
  { id: "live_support", label: "Live Support" },
  { id: "seo", label: "SEO" },
  { id: "settings", label: "Settings" },
  { id: "users", label: "User Management" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
    permissions: [] as string[],
    phone: "",
    department: "",
    isActive: true,
  })

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const res = await fetch('/api/admin/users')
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || 
      (filter === "active" && user.isActive) ||
      (filter === "inactive" && !user.isActive)
    return matchesSearch && matchesFilter
  })

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name || "",
        email: user.email,
        password: "",
        role: user.role,
        permissions: user.permissions ? user.permissions.split(",") : [],
        phone: user.phone || "",
        department: user.department || "",
        isActive: user.isActive,
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "viewer",
        permissions: [],
        phone: "",
        department: "",
        isActive: true,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const userData = {
        ...formData,
        permissions: formData.permissions.join(","),
      }

      const url = editingUser ? `/api/admin/users?id=${editingUser.id}` : '/api/admin/users'
      const method = editingUser ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser ? { id: editingUser.id, ...userData } : userData)
      })

      if (res.ok) {
        await loadUsers()
        handleCloseModal()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save user")
      }
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      await loadUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
    setDeleteConfirm(null)
  }

  const handleToggleActive = async (user: User) => {
    try {
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive })
      })
      await loadUsers()
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }))
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#0D9488' }} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">User Management</h2>
          <p className="text-foreground-light">Manage staff accounts and permissions ({users.length} users)</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"}`}
          >
            All ({users.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "active" ? "bg-green-500 text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"}`}
          >
            Active ({users.filter(u => u.isActive).length})
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "inactive" ? "bg-red-500 text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"}`}
          >
            Inactive ({users.filter(u => !u.isActive).length})
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>User</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Created</th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E0F2F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#0D9488', fontWeight: 600 }}>{user.name?.charAt(0) || user.email.charAt(0)}</span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, color: '#1E293B' }}>{user.name || "No name"}</p>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, backgroundColor: '#F0FDF4', color: '#166534' }}>
                    {roles.find(r => r.id === user.role)?.label || user.role}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <button
                    onClick={() => handleToggleActive(user)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: user.isActive ? '#DCFCE7' : '#FEE2E2', color: user.isActive ? '#166534' : '#991B1B' }}
                  >
                    {user.isActive ? <><Eye size={14} /> Active</> : <><EyeOff size={14} /> Inactive</>}
                  </button>
                </td>
                <td style={{ padding: '16px', color: '#64748B' }}>{user.department || "-"}</td>
                <td style={{ padding: '16px', color: '#64748B', fontSize: '14px' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleOpenModal(user)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                      <Edit size={18} color="#64748B" />
                    </button>
                    <button onClick={() => setDeleteConfirm(user.id)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                      <Trash2 size={18} color="#EF4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Users size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#64748B' }}>No users found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-heading font-bold">{editingUser ? 'Edit' : 'Add'} User</h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    placeholder="john@schf.org"
                    disabled={!!editingUser}
                  />
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-1">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input"
                    placeholder="Enter password"
                  />
                </div>
              )}

              {editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-1">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input"
                    placeholder="New password"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="input"
                    placeholder="e.g., IT, Marketing"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                  placeholder="+234 123 456 7890"
                />
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {permissions.map(perm => (
                    <label key={perm.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: formData.permissions.includes(perm.id) ? '#F0FDFA' : '#F8FAFC', borderRadius: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        style={{ accentColor: '#0D9488' }}
                      />
                      <span style={{ fontSize: '14px' }}>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#0D9488' }}
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 text-foreground hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || (!editingUser && !formData.password)}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingUser ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Delete User?</h3>
              <p className="text-foreground-light">This action cannot be undone. This user will be permanently removed.</p>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
