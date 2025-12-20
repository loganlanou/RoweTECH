'use client'

import { useState } from 'react'

const contentSections = [
  {
    id: 'hero',
    name: 'Homepage Hero',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', value: 'Precision Machining &' },
      { key: 'subheadline', label: 'Sub-headline', type: 'text', value: 'Mold Repair Excellence' },
      { key: 'description', label: 'Description', type: 'textarea', value: 'RoweTech Machine & Engineering provides plastic injection mold repair, custom fixtures, EOAT tooling, and CNC machining for manufacturers across Wisconsin.' },
    ],
  },
  {
    id: 'about',
    name: 'About Section',
    fields: [
      { key: 'title', label: 'Title', type: 'text', value: 'Built on Expertise' },
      { key: 'content', label: 'Content', type: 'textarea', value: 'RoweTech Machine & Engineering was founded with a simple mission: provide manufacturers with reliable, high-quality machining and tooling services they can count on.' },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Information',
    fields: [
      { key: 'phone', label: 'Phone', type: 'text', value: '(715) 202-3631' },
      { key: 'address', label: 'Address', type: 'text', value: '549 Lavorata Rd' },
      { key: 'city', label: 'City, State, ZIP', type: 'text', value: 'Cadott, WI 54727' },
      { key: 'hours', label: 'Business Hours', type: 'text', value: 'Mon-Fri: 7:00 AM - 5:00 PM' },
    ],
  },
]

export default function AdminContentPage() {
  const [activeSection, setActiveSection] = useState(contentSections[0].id)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save - in production, this would save to a database
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Content saved! (Note: Database integration required for persistence)')
  }

  const currentSection = contentSections.find((s) => s.id === activeSection)

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
              {contentSections.map((section) => (
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
                      defaultValue={field.value}
                      rows={4}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      defaultValue={field.value}
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
