"use client"

import { useState } from "react"
import { Shield, Users, Edit, Check, X, Plus, Trash2, Key, FileText, Settings, DollarSign, Mail, MessageSquare, Globe, Save, Loader2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  isDefault: boolean
  userCount: number
}

const defaultRoles: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: ["dashboard", "pages", "team", "hero_slider", "donations", "currencies", "newsletter", "contacts", "live_support", "seo", "settings", "users", "roles"],
    isDefault: false,
    userCount: 1,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Full access except user management",
    permissions: ["dashboard", "pages", "team", "hero_slider", "donations", "currencies", "newsletter", "contacts", "live_support", "seo", "settings"],
    isDefault: false,
    userCount: 0,
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can manage content and pages",
    permissions: ["dashboard", "pages", "team", "hero_slider", "newsletter"],
    isDefault: false,
    userCount: 0,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to dashboard",
    permissions: ["dashboard"],
    isDefault: true,
    userCount: 0,
  },
]

const allPermissions = [
  { id: "dashboard", label: "Dashboard", icon: Globe, description: "View dashboard and analytics" },
  { id: "pages", label: "Pages", icon: FileText, description: "Manage site pages" },
  { id: "team", label: "Team", icon: Users, description: "Manage team members" },
  { id: "hero_slider", label: "Hero Slider", icon: Globe, description: "Manage hero slides" },
  { id: "donations", label: "Donations", icon: DollarSign, description: "View and manage donations" },
  { id: "currencies", label: "Currencies", icon: DollarSign, description: "Manage currencies" },
  { id: "newsletter", label: "Newsletter", icon: Mail, description: "Manage newsletter subscribers" },
  { id: "contacts", label: "Contacts", icon: MessageSquare, description: "View contact submissions" },
  { id: "live_support", label: "Live Support", icon: MessageSquare, description: "Configure live chat" },
  { id: "seo", label: "SEO", icon: Globe, description: "Manage SEO settings" },
  { id: "settings", label: "Settings", icon: Settings, description: "Manage site settings" },
  { id: "users", label: "User Management", icon: Users, description: "Manage users and roles" },
  { id: "roles", label: "Roles & Permissions", icon: Key, description: "Manage roles and permissions" },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles)
  const [selectedRole, setSelectedRole] = useState<Role>(roles[0])
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handlePermissionToggle = (permId: string) => {
    setSelectedRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r))
    setSaving(false)
    setEditMode(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const selectRole = (role: Role) => {
    setSelectedRole(role)
    setEditMode(false)
  }

  const groupedPermissions = [
    { category: "Content", items: allPermissions.filter(p => ["pages", "team", "hero_slider", "seo"].includes(p.id)) },
    { category: "Management", items: allPermissions.filter(p => ["donations", "currencies"].includes(p.id)) },
    { category: "Communication", items: allPermissions.filter(p => ["newsletter", "contacts", "live_support"].includes(p.id)) },
    { category: "System", items: allPermissions.filter(p => ["dashboard", "settings", "users", "roles"].includes(p.id)) },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Roles & Permissions</h2>
          <p className="text-foreground-light">Configure user roles and their permissions</p>
        </div>
        {editMode && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        )}
      </div>

      {saved && (
        <div style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={18} />
          Roles and permissions saved successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }} className="roles-grid">
        {/* Roles List */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Roles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => selectRole(role)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: selectedRole.id === role.id ? 'rgba(13,148,136,0.1)' : 'transparent',
                  color: selectedRole.id === role.id ? '#0D9488' : '#374151',
                  fontWeight: selectedRole.id === role.id ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={16} />
                    {role.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', marginLeft: '24px' }}>
                    {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                  </div>
                </div>
                {role.isDefault && (
                  <span style={{ fontSize: '10px', backgroundColor: '#E0F2F1', color: '#0D9488', padding: '2px 6px', borderRadius: '4px' }}>
                    Default
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Panel */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={24} />
                {selectedRole.name}
              </h3>
              <p style={{ color: '#64748B', marginTop: '4px' }}>{selectedRole.description}</p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn-primary"
              style={{ backgroundColor: editMode ? '#EF4444' : '#0D9488' }}
            >
              {editMode ? <><X size={16} /> Cancel</> : <><Edit size={16} /> Edit Permissions</>}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {groupedPermissions.map((group) => (
              <div key={group.category}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {group.category}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                  {group.items.map((perm) => {
                    const hasPermission = selectedRole.permissions.includes(perm.id)
                    return (
                      <div
                        key={perm.id}
                        onClick={() => editMode && handlePermissionToggle(perm.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          backgroundColor: hasPermission ? '#F0FDFA' : '#F8FAFC',
                          border: `1px solid ${hasPermission ? '#0D9488' : '#E2E8F0'}`,
                          borderRadius: '8px',
                          cursor: editMode ? 'pointer' : 'default',
                          opacity: editMode || hasPermission ? 1 : 0.6,
                        }}
                      >
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          backgroundColor: hasPermission ? '#0D9488' : '#E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {hasPermission ? (
                            <Check size={14} color="white" />
                          ) : (
                            <X size={14} color="#94A3B8" />
                          )}
                        </div>
                        <div>
                          <p style={{ fontWeight: 500, color: '#1E293B', fontSize: '14px' }}>{perm.label}</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>{perm.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          {editMode && (
            <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>Quick Actions</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedRole({ ...selectedRole, permissions: allPermissions.map(p => p.id) })}
                  style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedRole({ ...selectedRole, permissions: ['dashboard'] })}
                  style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Dashboard Only
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
