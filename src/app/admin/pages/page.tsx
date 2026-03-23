"use client"

import { useState, useRef } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Search, FileText, Calendar, X, Save, ExternalLink, Upload, Image } from "lucide-react"

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
          className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Image className="w-8 h-8 text-gray-400" />
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
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Choose File
          </button>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP. Max 2MB.</p>
        </div>
        {preview && (
          <button
            type="button"
            onClick={() => { setPreview(""); onChange(""); }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

interface Page {
  id: string
  title: string
  slug: string
  subtitle: string
  excerpt: string
  content: string
  featuredImage: string
  isPublished: boolean
  metaTitle: string
  metaDescription: string
  updatedAt: string
}

const initialPages: Page[] = [
  {
    id: "1",
    title: "About Us",
    slug: "about",
    subtitle: "Our Mission & Vision",
    excerpt: "Learn about our mission to eliminate hepatitis and improve healthcare access.",
    content: "Full page content here...",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    isPublished: true,
    metaTitle: "About Us - SCHF",
    metaDescription: "Learn about SCHF's mission to eliminate hepatitis.",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Our Programs",
    slug: "programs",
    subtitle: "What We Do",
    excerpt: "Comprehensive hepatitis care programs serving communities.",
    content: "Full page content here...",
    featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    isPublished: true,
    metaTitle: "Our Programs - SCHF",
    metaDescription: "Explore our comprehensive healthcare programs.",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Donate",
    slug: "donate",
    subtitle: "Support Our Work",
    excerpt: "Support our mission with your donation.",
    content: "Full page content here...",
    featuredImage: "",
    isPublished: true,
    metaTitle: "Donate - SCHF",
    metaDescription: "Support SCHF with your donation.",
    updatedAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Contact Us",
    slug: "contact",
    subtitle: "Get In Touch",
    excerpt: "Get in touch with our team.",
    content: "Full page content here...",
    featuredImage: "",
    isPublished: true,
    metaTitle: "Contact Us - SCHF",
    metaDescription: "Contact SCHF team.",
    updatedAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Volunteer",
    slug: "volunteer",
    subtitle: "Join Our Team",
    excerpt: "Join our team of volunteers.",
    content: "Full page content here...",
    featuredImage: "",
    isPublished: false,
    metaTitle: "Volunteer - SCHF",
    metaDescription: "Join SCHF as a volunteer.",
    updatedAt: "2024-01-10",
  },
]

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")
  const [showModal, setShowModal] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<Partial<Page>>({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    isPublished: false,
    metaTitle: "",
    metaDescription: "",
  })

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "published") return matchesSearch && page.isPublished
    if (filter === "draft") return matchesSearch && !page.isPublished
    return matchesSearch
  })

  const handleOpenModal = (page?: Page) => {
    if (page) {
      setEditingPage(page)
      setFormData(page)
    } else {
      setEditingPage(null)
      setFormData({
        title: "",
        slug: "",
        subtitle: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        isPublished: false,
        metaTitle: "",
        metaDescription: "",
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPage(null)
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const slug = formData.slug || formData.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

    if (editingPage) {
      setPages(pages.map(p => p.id === editingPage.id ? { 
        ...p, 
        ...formData, 
        slug: slug || p.slug,
        updatedAt: new Date().toISOString().split("T")[0]
      } as Page : p))
    } else {
      const newPage: Page = {
        id: Date.now().toString(),
        title: formData.title || "",
        slug: slug || "",
        subtitle: formData.subtitle || "",
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        featuredImage: formData.featuredImage || "",
        isPublished: formData.isPublished ?? false,
        metaTitle: formData.metaTitle || formData.title || "",
        metaDescription: formData.metaDescription || formData.excerpt || "",
        updatedAt: new Date().toISOString().split("T")[0],
      }
      setPages([...pages, newPage])
    }

    setSaving(false)
    handleCloseModal()
  }

  const handleTogglePublish = (id: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p))
  }

  const handleDelete = (id: string) => {
    setPages(pages.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Pages</h2>
          <p className="text-foreground-light">Manage your site content ({pages.length} pages)</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Page
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            All ({pages.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "published" ? "bg-primary text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            Published ({pages.filter(p => p.isPublished).length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "draft" ? "bg-primary text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            Drafts ({pages.filter(p => !p.isPublished).length})
          </button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-medium text-foreground">Title</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Slug</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Status</th>
              <th className="text-left px-6 py-4 font-medium text-foreground">Last Updated</th>
              <th className="text-right px-6 py-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{page.title}</p>
                      <p className="text-sm text-foreground-light truncate max-w-xs">{page.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">/{page.slug}</code>
                    <a href={`/${page.slug}`} target="_blank" className="text-foreground-light hover:text-primary">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      page.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {page.isPublished ? <><Eye className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-foreground-light">
                    <Calendar className="w-4 h-4" />
                    {page.updatedAt}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleTogglePublish(page.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title={page.isPublished ? "Unpublish" : "Publish"}
                    >
                      {page.isPublished ? <EyeOff className="w-4 h-4 text-foreground-light" /> : <Eye className="w-4 h-4 text-foreground-light" />}
                    </button>
                    <button
                      onClick={() => handleOpenModal(page)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-foreground-light" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(page.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-foreground-light mx-auto mb-4" />
            <p className="text-foreground-light mb-4">No pages found</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              Create Your First Page
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-heading font-bold">{editingPage ? 'Edit' : 'Create'} Page</h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input"
                    placeholder="Page Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    className="input"
                    placeholder="page-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="input"
                  placeholder="Page subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="input resize-none"
                  rows={2}
                  placeholder="Brief description for listings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input resize-none font-mono text-sm"
                  rows={8}
                  placeholder="Page content (HTML or Markdown)..."
                />
              </div>

              <ImageUpload
                label="Featured Image"
                value={formData.featuredImage || ""}
                onChange={(value) => setFormData({ ...formData, featuredImage: value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="input"
                    placeholder="SEO Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <input
                    type="text"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="input"
                    placeholder="SEO Description"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary"
                />
                <label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 text-foreground hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving || !formData.title}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {editingPage ? 'Save Changes' : 'Create Page'}
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
              <h3 className="text-xl font-heading font-bold mb-2">Delete Page?</h3>
              <p className="text-foreground-light">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
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
