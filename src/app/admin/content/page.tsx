'use client'

import { useEffect, useMemo, useState } from 'react'
import { AdminState, DEFAULT_ADMIN_STATE } from '@/lib/admin-defaults'

type SectionField = {
  key: string
  label: string
  type: 'text' | 'textarea'
}

export default function AdminContentPage() {
  const [state, setState] = useState<AdminState>(DEFAULT_ADMIN_STATE)
  const [activeSection, setActiveSection] = useState('hero')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('Loaded defaults. Saving writes to a local JSON store for now.')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/state', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as AdminState
          setState(data)
          setMessage('Loaded saved content. Edits persist to local JSON; wire DB for production.')
        }
      } catch (err) {
        console.error(err)
        setMessage('Using defaults. Failed to load saved content.')
      }
    }
    load()
  }, [])

  const sections = useMemo(() => {
    return [
      {
        id: 'hero',
        name: 'Homepage Hero',
        fields: [
          { key: 'headline', label: 'Headline', type: 'text' },
          { key: 'subheadline', label: 'Sub-headline', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaLabel', label: 'Primary CTA label', type: 'text' },
          { key: 'ctaHref', label: 'Primary CTA link', type: 'text' },
        ] as SectionField[],
      },
      {
        id: 'about',
        name: 'About Section',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'textarea' },
        ] as SectionField[],
      },
      {
        id: 'services',
        name: 'Services',
        fields: [
          { key: 'service1Title', label: 'Service 1 Title', type: 'text' },
          { key: 'service1Desc', label: 'Service 1 Description', type: 'textarea' },
          { key: 'service2Title', label: 'Service 2 Title', type: 'text' },
          { key: 'service2Desc', label: 'Service 2 Description', type: 'textarea' },
          { key: 'service3Title', label: 'Service 3 Title', type: 'text' },
          { key: 'service3Desc', label: 'Service 3 Description', type: 'textarea' },
        ] as SectionField[],
      },
      {
        id: 'contact',
        name: 'Contact Information',
        fields: [
          { key: 'phone', label: 'Phone', type: 'text' },
          { key: 'address', label: 'Address', type: 'text' },
          { key: 'city', label: 'City, State, ZIP', type: 'text' },
          { key: 'hours', label: 'Business Hours', type: 'text' },
        ] as SectionField[],
      },
    ]
  }, [])

  const currentSection = sections.find((s) => s.id === activeSection)

  const getValue = (field: string) => {
    switch (field) {
      case 'headline':
      case 'subheadline':
      case 'ctaLabel':
      case 'ctaHref':
        return state.hero[field]
      case 'description':
        return state.hero.description
      case 'title':
      case 'content':
        return state.about[field]
      case 'phone':
      case 'address':
      case 'city':
      case 'hours':
        return state.contact[field]
      case 'service1Title':
      case 'service2Title':
      case 'service3Title': {
        const index = Number(field[7]) - 1
        return state.services[index]?.title ?? ''
      }
      case 'service1Desc':
      case 'service2Desc':
      case 'service3Desc': {
        const index = Number(field[7]) - 1
        return state.services[index]?.description ?? ''
      }
      default:
        return ''
    }
  }

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'headline':
      case 'subheadline':
      case 'ctaLabel':
      case 'ctaHref':
        setState((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }))
        break
      case 'description':
        setState((prev) => ({ ...prev, hero: { ...prev.hero, description: value } }))
        break
      case 'title':
      case 'content':
        setState((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }))
        break
      case 'phone':
      case 'address':
      case 'city':
      case 'hours':
        setState((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }))
        break
      case 'service1Title':
      case 'service2Title':
      case 'service3Title':
      case 'service1Desc':
      case 'service2Desc':
      case 'service3Desc': {
        const index = Number(field[7]) - 1
        const key = field.includes('Desc') ? 'description' : 'title'
        setState((prev) => {
          const nextServices = prev.services.map((svc, idx) =>
            idx === index ? { ...svc, [key]: value } : svc
          )
          return { ...prev, services: nextServices }
        })
        break
      }
      default:
        break
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('Saving...')
    try {
      const res = await fetch('/api/admin/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error('Save failed')
      setMessage('Saved to local JSON. Connect DB for production persistence.')
    } catch (err) {
      console.error(err)
      setMessage('Save failed. Please retry.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-600">Content Management</h1>
          <p className="text-secondary-500 mt-1">Edit text content across your website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-secondary-200 p-4">
            <h2 className="font-semibold text-secondary-600 mb-3">Sections</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-secondary-500 hover:bg-secondary-100'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-secondary-200 p-6">
            <h2 className="font-semibold text-secondary-600 mb-4">{currentSection?.name}</h2>
            <div className="space-y-4">
              {currentSection?.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-secondary-600 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={getValue(field.key)}
                      onChange={(e) => setValue(field.key, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={getValue(field.key)}
                      onChange={(e) => setValue(field.key, e.target.value)}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">Database Required</p>
                <p className="text-sm text-yellow-700">
                  To persist content changes, connect a database (Supabase, PlanetScale, etc.)
                  and update the save handler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
