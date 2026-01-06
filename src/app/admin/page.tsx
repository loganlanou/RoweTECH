'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AdminState, DEFAULT_ADMIN_STATE, ServiceCard } from '@/lib/admin-defaults'

const layoutChips = [
  { key: 'grid', label: 'Card Grid' },
  { key: 'stacked', label: 'Stacked Story' },
]

const spacingChips = [
  { key: 'roomy', label: 'Roomy Padding' },
  { key: 'compact', label: 'Compact Padding' },
]

const galleryChips = [
  { key: 'masonry', label: 'Masonry' },
  { key: 'grid', label: 'Uniform Grid' },
]

export default function AdminDashboard() {
  const [site, setSite] = useState<AdminState>(DEFAULT_ADMIN_STATE)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState('Draft changes are stored locally. Connect a database to persist.')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/state', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as AdminState
          setSite(data)
          setSite(data)
          setStatus('Loaded latest admin state from local store.')
        }
      } catch (err) {
        console.error(err)
        setStatus('Using defaults; failed to load saved state.')
      }
    }
    load()
  }, [])

  const updateHero = (key: keyof AdminState['hero'], value: string) => {
    setSite((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }))
  }

  const updateLayout = (key: keyof AdminState['layout'], value: string) => {
    setSite((prev) => ({ ...prev, layout: { ...prev.layout, [key]: value as never } }))
  }

  const updateSeo = (key: keyof AdminState['seo'], value: string) => {
    setSite((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }))
  }

  const updateMedia = (key: keyof AdminState['media'], value: string) => {
    setSite((prev) => ({ ...prev, media: { ...prev.media, [key]: value } }))
  }

  const updateService = (id: number, key: keyof ServiceCard, value: string) => {
    setSite((prev) => ({
      ...prev,
      services: prev.services.map((svc) => (svc.id === id ? { ...svc, [key]: value } : svc)),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setStatus('Saving changes...')
    try {
      const res = await fetch('/api/admin/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site),
      })
      if (!res.ok) {
        throw new Error('Save failed')
      }
      const data = (await res.json()) as { state: AdminState }
      setSite(data.state)
      setStatus(
        'Changes saved to local JSON store. Connect Supabase (content) + UploadThing/Cloudinary (media) for production.'
      )
    } catch (err) {
      console.error(err)
      setStatus('Save failed. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const heroPreviewImage = useMemo(
    () =>
      site.hero.background ||
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80',
    [site.hero.background]
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-primary-500 font-semibold uppercase tracking-wide">Admin</p>
          <h1 className="text-3xl font-bold text-secondary-700">Site Command Center</h1>
          <p className="text-secondary-500">{status}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 border border-secondary-200 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            View Site
          </Link>
          <button onClick={handleSave} disabled={isSaving} className="btn-primary">
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/content"
          className="bg-white border border-secondary-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
              A
            </div>
            <div>
              <p className="font-semibold text-secondary-700">Page copy & CTAs</p>
              <p className="text-sm text-secondary-500">Edit headlines, paragraphs, and calls-to-action.</p>
            </div>
          </div>
        </Link>
        <Link
          href="/admin/gallery"
          className="bg-white border border-secondary-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
              G
            </div>
            <div>
              <p className="font-semibold text-secondary-700">Images & Alt text</p>
              <p className="text-sm text-secondary-500">Swap hero media and gallery shots.</p>
            </div>
          </div>
        </Link>
        <Link
          href="/admin/settings"
          className="bg-white border border-secondary-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
              S
            </div>
            <div>
              <p className="font-semibold text-secondary-700">Access & SEO</p>
              <p className="text-sm text-secondary-500">Authorized admins, metadata, and deploy hints.</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editors */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-secondary-700">Homepage hero</h2>
                <p className="text-sm text-secondary-500">Update headline, CTA, phone, and hero layout.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-secondary-500">Layout</span>
                <div className="flex gap-2">
                  {['split', 'overlay'].map((key) => (
                    <button
                      key={key}
                      onClick={() => updateHero('layout', key)}
                      className={`px-3 py-1 rounded-lg text-sm border ${
                        site.hero.layout === key
                          ? 'border-primary-500 text-primary-600 bg-primary-50'
                          : 'border-secondary-200 text-secondary-500 hover:border-secondary-300'
                      }`}
                    >
                      {key === 'split' ? 'Split' : 'Overlay'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Headline</span>
                <input
                  value={site.hero.headline}
                  onChange={(e) => updateHero('headline', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Subheadline</span>
                <input
                  value={site.hero.subheadline}
                  onChange={(e) => updateHero('subheadline', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1 md:col-span-2">
                <span className="text-sm font-medium text-secondary-600">Description</span>
                <textarea
                  rows={3}
                  value={site.hero.description}
                  onChange={(e) => updateHero('description', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">CTA label</span>
                <input
                  value={site.hero.ctaLabel}
                  onChange={(e) => updateHero('ctaLabel', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">CTA link</span>
                <input
                  value={site.hero.ctaHref}
                  onChange={(e) => updateHero('ctaHref', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Phone number</span>
                <input
                  value={site.hero.phone}
                  onChange={(e) => updateHero('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Hero background image</span>
                <input
                  value={site.hero.background}
                  onChange={(e) => updateHero('background', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://..."
                />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-secondary-700">Services & value props</h2>
                <p className="text-sm text-secondary-500">Edit cards shown on services and home pages.</p>
              </div>
              <div className="flex gap-2">
                {layoutChips.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => updateLayout('servicesLayout', chip.key)}
                    className={`px-3 py-1 rounded-lg text-sm border ${
                      site.layout.servicesLayout === chip.key
                        ? 'border-primary-500 text-primary-600 bg-primary-50'
                        : 'border-secondary-200 text-secondary-500 hover:border-secondary-300'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {site.services.map((service) => (
                <div key={service.id} className="border border-secondary-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-secondary-700">Card {service.id}</h3>
                    <span className="text-xs text-secondary-500">Desktop + mobile</span>
                  </div>
                  <label className="space-y-1 block">
                    <span className="text-sm text-secondary-600">Title</span>
                    <input
                      value={service.title}
                      onChange={(e) => updateService(service.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className="text-sm text-secondary-600">Description</span>
                    <textarea
                      rows={3}
                      value={service.description}
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </label>
                  <label className="space-y-1 block">
                    <span className="text-sm text-secondary-600">Image URL</span>
                    <input
                      value={service.image}
                      onChange={(e) => updateService(service.id, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-secondary-700">Layout, spacing, and gallery</h2>
                <p className="text-sm text-secondary-500">Keep color scheme, but fine-tune density and galleries.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-secondary-600">Spacing preset</p>
                <div className="flex flex-wrap gap-2">
                  {spacingChips.map((chip) => (
                    <button
                      key={chip.key}
                      onClick={() => updateLayout('spacing', chip.key)}
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        site.layout.spacing === chip.key
                          ? 'border-primary-500 text-primary-600 bg-primary-50'
                          : 'border-secondary-200 text-secondary-500 hover:border-secondary-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-secondary-600">Gallery layout</p>
                <div className="flex flex-wrap gap-2">
                  {galleryChips.map((chip) => (
                    <button
                      key={chip.key}
                      onClick={() => updateLayout('galleryLayout', chip.key)}
                      className={`px-3 py-2 rounded-lg text-sm border ${
                        site.layout.galleryLayout === chip.key
                          ? 'border-primary-500 text-primary-600 bg-primary-50'
                          : 'border-secondary-200 text-secondary-500 hover:border-secondary-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Gallery cover image</span>
                <input
                  value={site.media.galleryCover}
                  onChange={(e) => updateMedia('galleryCover', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Brand badge / watermark</span>
                <input
                  value={site.media.brandBadge}
                  onChange={(e) => updateMedia('brandBadge', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-secondary-700">SEO & metadata</h2>
                <p className="text-sm text-secondary-500">Keep titles and descriptions aligned with your services.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Page title</span>
                <input
                  value={site.seo.title}
                  onChange={(e) => updateSeo('title', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-sm font-medium text-secondary-600">Meta description</span>
                <input
                  value={site.seo.description}
                  onChange={(e) => updateSeo('description', e.target.value)}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-secondary-700">Integration blueprint</h2>
                <p className="text-sm text-secondary-500">
                  Recommended stack for seamless editing, based on common production setups.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                Clerk + DB + Media
              </span>
            </div>
            <ul className="space-y-2 text-sm text-secondary-600 list-disc list-inside">
              <li>Auth: Clerk (already wired) with an allowlist of admin emails.</li>
              <li>
                Content: Supabase or Vercel Postgres (JSONB for page sections) via a simple `/api/admin/content`
                route using Zod validation.
              </li>
              <li>
                Media: UploadThing or Cloudinary widget for drag-and-drop uploads; store returned URLs in the DB and
                mirror to the gallery.
              </li>
              <li>
                Editing UI: TipTap or BlockNote for rich text; keep Tailwind tokens to preserve the current color
                scheme.
              </li>
              <li>
                Publishing: server actions to persist on save, plus ISR revalidation (`revalidatePath('/')`) so
                live pages stay in sync.
              </li>
            </ul>
          </div>
        </div>

        {/* Preview & guide */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
            <div className="p-4 border-b border-secondary-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Live preview (mobile & desktop)</p>
                <p className="font-semibold text-secondary-700">Hero + services snapshot</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold">
                {site.layout.spacing === 'compact' ? 'Compact' : 'Roomy'}
              </span>
            </div>
            <div className="space-y-6 p-4">
              <div className="relative overflow-hidden rounded-lg border border-secondary-200">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700/80 via-secondary-700/70 to-secondary-700/60" />
                <Image
                  src={heroPreviewImage}
                  alt="Hero preview"
                  width={800}
                  height={500}
                  className="w-full h-48 object-cover"
                  priority
                />
                <div
                  className={`absolute inset-0 ${site.hero.layout === 'overlay' ? 'bg-black/40' : 'bg-gradient-to-r from-secondary-900/80 via-secondary-900/40 to-transparent'}`}
                />
                <div
                  className={`absolute inset-0 flex ${
                    site.hero.layout === 'split'
                      ? 'md:flex-row flex-col md:items-center md:justify-between'
                      : 'flex-col justify-end'
                  } p-4 gap-3`}
                >
                  <div className="max-w-md space-y-2">
                    <p className="text-primary-200 text-xs uppercase tracking-wide">Hero</p>
                    <h3 className="text-white text-xl font-bold leading-tight drop-shadow">
                      {site.hero.headline}
                    </h3>
                    <p className="text-secondary-100 text-sm max-h-20 overflow-hidden">
                      {site.hero.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-semibold">
                        {site.hero.ctaLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/80 text-secondary-700 text-xs font-semibold">
                        {site.hero.phone}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="px-3 py-2 rounded-lg bg-white/80 text-secondary-700 text-xs font-semibold border border-white/60">
                      {site.hero.layout === 'split' ? 'Split layout' : 'Overlay layout'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-secondary-700">Services preview</p>
                  <span className="text-xs text-secondary-500">
                    {site.layout.servicesLayout === 'grid' ? 'Card grid' : 'Stacked story'}
                  </span>
                </div>
                <div
                  className={`grid gap-3 ${
                    site.layout.servicesLayout === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {site.services.slice(0, 2).map((svc) => (
                    <div
                      key={svc.id}
                      className="rounded-lg border border-secondary-200 bg-white p-3 flex items-start gap-3"
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary-100 border border-secondary-200 flex-shrink-0">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-700 text-sm">{svc.title}</p>
                        <p className="text-secondary-500 text-xs max-h-12 overflow-hidden">
                          {svc.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-secondary-200 p-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
                ?
              </div>
              <div>
                <p className="font-semibold text-secondary-700">Publishing checklist</p>
                <ul className="mt-2 space-y-1 text-sm text-secondary-600 list-disc list-inside">
                  <li>Deploy to Vercel for serverless middleware and Clerk protection.</li>
                  <li>Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` env vars.</li>
                  <li>
                    Connect DB + storage, then swap the save handler for a server action that writes to your tables and
                    revalidates affected routes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
