'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AdminState, DEFAULT_ADMIN_STATE, GalleryItem } from '@/lib/admin-defaults'

export default function AdminGalleryPage() {
  const [state, setState] = useState<AdminState>(DEFAULT_ADMIN_STATE)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(DEFAULT_ADMIN_STATE.gallery[0]?.id ?? null)
  const [displayMode, setDisplayMode] = useState<'grid' | 'masonry'>('grid')
  const [status, setStatus] = useState('Loaded defaults. Saving writes to a local JSON store.')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/state', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as AdminState
          setState(data)
          setSelectedId(data.gallery[0]?.id ?? null)
          setStatus('Loaded saved gallery. Edits persist locally; connect storage for production.')
        }
      } catch (err) {
        console.error(err)
        setStatus('Using defaults. Failed to load saved gallery.')
      }
    }
    load()
  }, [])

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      alert('Upload requires storage integration (UploadThing/Cloudinary/S3).')
    }, 800)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setState((prev) => {
        const filtered = prev.gallery.filter((img) => img.id !== id)
        return { ...prev, gallery: filtered }
      })
      setSelectedId((prev) => (prev === id ? null : prev))
    }
  }

  const handleSelect = (id: number) => {
    setSelectedId(id)
  }

  const handleEdit = (id: number, key: 'title' | 'category' | 'url', value: string) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.map((img) => (img.id === id ? { ...img, [key]: value } : img)),
    }))
  }

  const handleSave = async () => {
    setStatus('Saving...')
    try {
      const res = await fetch('/api/admin/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error('Save failed')
      const data = (await res.json()) as { state: AdminState }
      setState(data.state)
      setStatus('Saved to local JSON. Connect UploadThing/Cloudinary + DB for production.')
    } catch (err) {
      console.error(err)
      setStatus('Save failed. Please retry.')
    }
  }

  const addImage = () => {
    const nextId = Math.max(0, ...state.gallery.map((g) => g.id)) + 1
    const placeholder: GalleryItem = {
      id: nextId,
      title: `New Image ${nextId}`,
      category: 'Uncategorized',
      url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    }
    setState((prev) => ({ ...prev, gallery: [...prev.gallery, placeholder] }))
    setSelectedId(nextId)
  }

  const selectedImage = state.gallery.find((img) => img.id === selectedId)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-600">Gallery Management</h1>
          <p className="text-secondary-500 mt-1">{status}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-secondary-200 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            Save Gallery
          </button>
          <button
            onClick={addImage}
            className="px-4 py-2 border border-secondary-200 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            Add Placeholder
          </button>
          <button onClick={handleUpload} disabled={isUploading} className="btn-primary">
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-secondary-700">Selected image</h2>
              <p className="text-sm text-secondary-500">
                Update title, category, and source URL. Changes save to local JSON until storage is wired.
              </p>
            </div>
            <div className="flex gap-2">
              {(['grid', 'masonry'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDisplayMode(mode)}
                  className={`px-3 py-1 rounded-lg text-sm border ${
                    displayMode === mode
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-secondary-200 text-secondary-500 hover:border-secondary-300'
                  }`}
                >
                  {mode === 'grid' ? 'Grid' : 'Masonry'}
                </button>
              ))}
            </div>
          </div>

          {selectedImage ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-secondary-200 bg-secondary-50">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/85 text-xs font-semibold text-secondary-700">
                  {selectedImage.category}
                </div>
              </div>
              <div className="space-y-3">
                <label className="space-y-1 block">
                  <span className="text-sm font-medium text-secondary-600">Title</span>
                  <input
                    value={selectedImage.title}
                    onChange={(e) => handleEdit(selectedImage.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-sm font-medium text-secondary-600">Category</span>
                  <input
                    value={selectedImage.category}
                    onChange={(e) => handleEdit(selectedImage.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-sm font-medium text-secondary-600">Image URL</span>
                  <input
                    value={selectedImage.url}
                    onChange={(e) => handleEdit(selectedImage.id, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          ) : (
            <p className="text-secondary-500 text-sm">Select an image to edit.</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-secondary-200 p-6 space-y-3">
          <h2 className="font-semibold text-secondary-700">Storage recommendations</h2>
          <p className="text-sm text-secondary-500">
            Pair Clerk auth with UploadThing or Cloudinary for uploads, and store image metadata in Supabase/Postgres.
          </p>
          <ul className="list-disc list-inside text-sm text-secondary-600 space-y-1">
            <li>Use a drag-and-drop uploader and persist returned URLs + alt text in a `gallery_items` table.</li>
            <li>Revalidate `/gallery` after changes so the live site matches admin edits.</li>
            <li>Keep alt text accessible; add a field when you wire storage.</li>
          </ul>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
          <svg
            className="w-12 h-12 text-secondary-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          <p className="text-secondary-600 font-medium">
            Drag and drop images here, or click to browse
          </p>
          <p className="text-sm text-secondary-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
        </div>
      </div>

      {/* Image Grid */}
      <div
        className={
          displayMode === 'masonry'
            ? 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'
            : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }
      >
        {state.gallery.map((image) => (
          <div
            key={image.id}
            className={`bg-white rounded-xl border border-secondary-200 overflow-hidden group ${
              displayMode === 'masonry' ? 'break-inside-avoid' : ''
            } ${selectedId === image.id ? 'border-primary-500 shadow-lg shadow-primary-500/10' : ''}`}
            onClick={() => handleSelect(image.id)}
          >
            <div className="aspect-square relative">
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="p-2 bg-white rounded-lg hover:bg-secondary-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-secondary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-secondary-600 truncate">{image.title}</h3>
              <p className="text-sm text-secondary-500">{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
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
            <p className="text-sm font-medium text-yellow-800">Cloud Storage Required</p>
            <p className="text-sm text-yellow-700">
              Wire UploadThing/Cloudinary (or S3) to replace the placeholder uploader, and persist metadata in your DB.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
