'use client'

import { useState } from 'react'
import Image from 'next/image'

const sampleImages = [
  {
    id: 1,
    title: 'CNC Milling Operation',
    category: 'CNC Machining',
    url: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&q=80',
  },
  {
    id: 2,
    title: 'Laser Cutting',
    category: 'Laser',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 3,
    title: 'Welding & Fabrication',
    category: 'Welding',
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
  },
  {
    id: 4,
    title: '3D Printing',
    category: '3D Printing',
    url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&q=80',
  },
]

export default function AdminGalleryPage() {
  const [images, setImages] = useState(sampleImages)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload - in production, this would upload to cloud storage
    setTimeout(() => {
      setIsUploading(false)
      alert('Upload functionality requires cloud storage integration (e.g., Cloudinary, AWS S3)')
    }, 1000)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-600">Gallery Management</h1>
          <p className="text-secondary-500 mt-1">Upload and manage gallery images</p>
        </div>
        <button onClick={handleUpload} disabled={isUploading} className="btn-primary">
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-xl border border-secondary-200 overflow-hidden group"
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
              To upload and manage images, integrate a cloud storage service (Cloudinary, AWS S3, or Vercel Blob).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
