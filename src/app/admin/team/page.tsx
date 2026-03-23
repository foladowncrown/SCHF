"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Users, Mail, Linkedin, Image, X, Check, Eye, EyeOff, Save, Upload } from "lucide-react"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(value)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-4">
        <div 
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Image className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Choose
          </button>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP.</p>
        </div>
        {preview && (
          <button
            type="button"
            onClick={() => { setPreview(""); onChange(""); }}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string | null
  imageUrl: string | null
  linkedin: string | null
  isPublished: boolean
  order: number
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    position: "",
    bio: null,
    imageUrl: null,
    linkedin: null,
    isPublished: true,
    order: 0,
  })

  useEffect(() => {
    loadTeam()
  }, [])

  async function loadTeam() {
    try {
      const res = await fetch("/api/team")
      if (res.ok) {
        const data = await res.json()
        setTeam(data)
      }
    } catch (error) {
      console.error("Error loading team:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTeam = team.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  async function handleSave() {
    if (!formData.name || !formData.position) {
      alert("Name and position are required")
      return
    }
    
    setSaving(true)
    
    try {
      const payload = editingMember?.id 
        ? { ...formData, id: editingMember.id }
        : formData
      
      const res = await fetch("/api/team", {
        method: editingMember?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        await loadTeam()
        handleCloseModal()
      }
    } catch (error) {
      console.error("Error saving team member:", error)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/team?id=${id}`, { method: "DELETE" })
      await loadTeam()
      setDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting team member:", error)
    }
  }

  async function handleTogglePublish(id: string) {
    const member = team.find(m => m.id === id)
    if (member) {
      try {
        await fetch("/api/team", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, isPublished: !member.isPublished }),
        })
        await loadTeam()
      } catch (error) {
        console.error("Error toggling team member:", error)
      }
    }
  }

  function handleOpenModal(member?: TeamMember) {
    if (member) {
      setEditingMember(member)
      setFormData({
        name: member.name,
        position: member.position,
        bio: member.bio,
        imageUrl: member.imageUrl,
        linkedin: member.linkedin,
        isPublished: member.isPublished,
        order: member.order,
      })
    } else {
      setEditingMember(null)
      setFormData({
        name: "",
        position: "",
        bio: null,
        imageUrl: null,
        linkedin: null,
        isPublished: true,
        order: team.length + 1,
      })
    }
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setEditingMember(null)
    setFormData({
      name: "",
      position: "",
      bio: null,
      imageUrl: null,
      linkedin: null,
      isPublished: true,
      order: 0,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Team Members</h2>
          <p className="text-foreground-light">Manage your team profiles ({team.length} members)</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            All ({team.length})
          </button>
          <button className="px-4 py-2 bg-gray-100 text-foreground rounded-lg text-sm font-medium hover:bg-gray-200">
            Published ({team.filter(m => m.isPublished).length})
          </button>
          <button className="px-4 py-2 bg-gray-100 text-foreground rounded-lg text-sm font-medium hover:bg-gray-200">
            Draft ({team.filter(m => !m.isPublished).length})
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-foreground-light">Loading team members...</p>
          </div>
        ) : filteredTeam.length === 0 && !loading ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
            <Users className="w-12 h-12 text-foreground-light mx-auto mb-4" />
            <p className="text-foreground-light mb-4">No team members found</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              Add Your First Team Member
            </button>
          </div>
        ) : (
          filteredTeam.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative bg-gray-100">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-foreground-light" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1">
                  <button 
                    onClick={() => handleOpenModal(member)}
                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-foreground" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm(member.id)}
                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              {!member.isPublished && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">Draft</span>
                </div>
              )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.position}</p>
                <p className="text-foreground-light text-sm line-clamp-2 mb-3">{member.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <Linkedin className="w-4 h-4 text-foreground-light" />
                      </a>
                    )}
                  </div>
                <button
                  onClick={() => handleTogglePublish(member.id)}
                  className={`p-2 rounded-lg ${member.isPublished ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                >
                  {member.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-heading font-bold">{editingMember ? 'Edit' : 'Add'} Team Member</h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="input"
                    placeholder="Medical Director"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value || null })}
                  className="input resize-none"
                  rows={3}
                  placeholder="Brief biography..."
                />
              </div>

              <ImageUpload
                label="Photo"
                value={formData.imageUrl || ""}
                onChange={(value) => setFormData({ ...formData, imageUrl: value || null })}
              />

              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value || null })}
                  className="input"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="input"
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm font-medium">Publish immediately</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 text-foreground hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving || !formData.name || !formData.position}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Delete Team Member?</h3>
              <p className="text-foreground-light">This action cannot be undone. This member will be permanently removed.</p>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
