"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Edit, Trash2, GripVertical, Image, X, Save, Eye, EyeOff, ArrowUp, ArrowDown, Upload, Loader2 } from "lucide-react"
import { HeroSlide, defaultHeroSlides } from "@/lib/heroSlides"

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
          className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50"
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
            Choose Image
          </button>
          <p className="text-xs text-gray-500 mt-1">Recommended: 1920x1080px</p>
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

const initialSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Together We Can Eliminate Hepatitis",
    subtitle: "Join the Movement",
    description: "We're leading the fight against hepatitis through prevention, testing, and community outreach. Every action counts in saving lives.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    ctaText: "Get Involved",
    ctaLink: "/volunteer",
    isActive: true,
  },
  {
    id: "2",
    title: "Free Hepatitis Screening",
    subtitle: "Know Your Status",
    description: "Early detection saves lives. Visit our centers for free, confidential hepatitis B and C testing.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80",
    ctaText: "Find a Center",
    ctaLink: "/programs#screening",
    isActive: true,
  },
  {
    id: "3",
    title: "Community Health Outreach",
    subtitle: "Bringing Care to You",
    description: "Our mobile clinics bring hepatitis education, testing, and treatment support to underserved communities.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    ctaText: "Learn More",
    ctaLink: "/programs#outreach",
    isActive: true,
  },
  {
    id: "4",
    title: "Treatment Support Program",
    subtitle: "We're Here to Help",
    description: "Access affordable treatment, counseling, and ongoing care support for those affected by hepatitis.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80",
    ctaText: "Get Support",
    ctaLink: "/programs#treatment",
    isActive: true,
  },
  {
    id: "5",
    title: "Every Donation Makes a Difference",
    subtitle: "Support Our Mission",
    description: "Your contribution helps us provide free testing, treatment, and education to communities in need.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    ctaText: "Donate Now",
    ctaLink: "/donate",
    isActive: true,
  },
]

export default function HeroSliderPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch('/api/hero-slider')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data)
        } else {
          setSlides(defaultHeroSlides)
        }
      } catch (error) {
        console.error("Error loading slides:", error)
        setSlides(defaultHeroSlides)
      } finally {
        setLoading(false)
      }
    }
    loadSlides()
  }, [])

  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    ctaText: "",
    ctaLink: "/",
    isActive: true,
  })

  const activeSlides = slides.filter(s => s.isActive)
  const sortedSlides = [...slides].sort((a, b) => {
    const aIndex = slides.indexOf(a)
    const bIndex = slides.indexOf(b)
    return aIndex - bIndex
  })

  const handleOpenModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide)
      setFormData(slide)
    } else {
      setEditingSlide(null)
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        ctaText: "",
        ctaLink: "/",
        isActive: true,
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSlide(null)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const slideData = {
        id: editingSlide?.id,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        imageUrl: formData.image,
        ctaText: formData.ctaText,
        ctaLink: formData.ctaLink,
        isActive: formData.isActive,
      }
      
      const res = await fetch('/api/hero-slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      })
      
      if (res.ok) {
        const savedSlide = await res.json()
        if (editingSlide) {
          setSlides(slides.map(s => s.id === editingSlide.id ? { ...s, ...formData } as HeroSlide : s))
        } else {
          setSlides([...slides, { ...formData, id: savedSlide.id } as HeroSlide])
        }
      }
    } catch (error) {
      console.error("Error saving slide:", error)
    } finally {
      setSaving(false)
      handleCloseModal()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/hero-slider?id=${id}`, { method: 'DELETE' })
      setSlides(slides.filter(s => s.id !== id))
    } catch (error) {
      console.error("Error deleting slide:", error)
    }
    setDeleteConfirm(null)
  }

  const handleToggleActive = async (id: string) => {
    const slide = slides.find(s => s.id === id)
    if (slide) {
      try {
        await fetch('/api/hero-slider', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, isActive: !slide.isActive })
        })
        setSlides(slides.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s))
      } catch (error) {
        console.error("Error toggling slide:", error)
      }
    }
  }

  const moveSlide = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= slides.length) return
    
    const newSlides = [...slides]
    const temp = newSlides[index]
    newSlides[index] = newSlides[newIndex]
    newSlides[newIndex] = temp
    
    const reorderedSlides = newSlides.map((s, i) => ({ ...s, order: i }))
    setSlides(reorderedSlides)
    
    try {
      await fetch('/api/hero-slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', slides: reorderedSlides.map(s => ({ id: s.id, order: s.order })) })
      })
    } catch (error) {
      console.error("Error reordering slides:", error)
    }
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
          <h2 className="text-2xl font-heading font-bold text-foreground">Hero Slider</h2>
          <p className="text-foreground-light">Manage your homepage hero slides ({activeSlides.length} active)</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Slide
        </button>
      </div>

      {/* Preview Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">Public Preview</p>
            <p className="text-sm text-blue-700">Your slider will show {activeSlides.length} slides on the homepage</p>
          </div>
          <a href="/" target="_blank" className="ml-auto text-sm text-blue-600 hover:underline">
            View Live Page →
          </a>
        </div>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {sortedSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`bg-white rounded-xl border overflow-hidden ${slide.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}
          >
            <div className="flex items-stretch">
              {/* Drag Handle + Image */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 border-r">
                <button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === slides.length - 1}
                  className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-200 ml-2">
                  {slide.image ? (
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {slide.subtitle}
                      </span>
                      {!slide.isActive && (
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground">{slide.title}</h3>
                    <p className="text-sm text-foreground-light mt-1 line-clamp-1">{slide.description}</p>
                    <p className="text-xs text-foreground-light mt-1">
                      CTA: <span className="text-primary">{slide.ctaText}</span> → {slide.ctaLink}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(slide.id)}
                      className={`p-2 rounded-lg ${slide.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                      title={slide.isActive ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                    >
                      {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenModal(slide)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(slide.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Image className="w-12 h-12 text-foreground-light mx-auto mb-4" />
          <p className="text-foreground-light mb-4">No slides created yet</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            Create Your First Slide
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-heading font-bold">{editingSlide ? 'Edit' : 'Add'} Slide</h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <ImageUpload
                label="Background Image"
                value={formData.image || ""}
                onChange={(value) => setFormData({ ...formData, image: value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="input"
                    placeholder="e.g., Join the Movement"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Active</label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm">Show on homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="Slide title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input resize-none"
                  rows={3}
                  placeholder="Slide description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="input"
                    placeholder="e.g., Learn More"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Button Link</label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="input"
                    placeholder="/programs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button onClick={handleCloseModal} className="px-4 py-2 text-foreground hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving || !formData.title || !formData.image}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {editingSlide ? 'Save Changes' : 'Add Slide'}
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
              <h3 className="text-xl font-heading font-bold mb-2">Delete Slide?</h3>
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
