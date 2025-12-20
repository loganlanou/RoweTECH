'use client'

import { useState } from 'react'
import { AUTHORIZED_ADMIN_EMAILS } from '@/config/authorized-users'

export default function AdminSettingsPage() {
  const [emails, setEmails] = useState<string[]>([...AUTHORIZED_ADMIN_EMAILS])
  const [newEmail, setNewEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleAddEmail = () => {
    if (newEmail && !emails.includes(newEmail.toLowerCase())) {
      setEmails([...emails, newEmail.toLowerCase()])
      setNewEmail('')
    }
  }

  const handleRemoveEmail = (email: string) => {
    if (emails.length > 1) {
      setEmails(emails.filter((e) => e !== email))
    } else {
      alert('You must have at least one admin user')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert(
      'Settings saved locally! To permanently add admin users, update the authorized-users.ts config file.'
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-600">Settings</h1>
        <p className="text-secondary-500 mt-1">Configure site settings and admin access</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Admin Users */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="font-semibold text-secondary-600 mb-4">Authorized Admin Users</h2>
          <p className="text-sm text-secondary-500 mb-4">
            Only these email addresses can access the admin panel.
          </p>

          <div className="space-y-3 mb-4">
            {emails.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between bg-secondary-50 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <span className="text-secondary-600">{email}</span>
                </div>
                <button
                  onClick={() => handleRemoveEmail(email)}
                  className="text-secondary-400 hover:text-red-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
            <button
              onClick={handleAddEmail}
              className="px-4 py-2 bg-secondary-100 text-secondary-600 font-medium rounded-lg hover:bg-secondary-200 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> To permanently add users, update{' '}
              <code className="bg-blue-100 px-1 rounded">src/config/authorized-users.ts</code>
            </p>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="font-semibold text-secondary-600 mb-4">Site Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-1">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="RoweTech Machine & Engineering"
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="contact@rowetechmachine.com"
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="(715) 202-3631"
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Clerk Configuration */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6 lg:col-span-2">
          <h2 className="font-semibold text-secondary-600 mb-4">Authentication Setup</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-secondary-600 mb-2">Clerk Dashboard</h3>
              <p className="text-sm text-secondary-500 mb-3">
                Configure Google OAuth and get your API keys from the Clerk dashboard.
              </p>
              <a
                href="https://dashboard.clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-medium"
              >
                <span>Open Clerk Dashboard</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="font-medium text-secondary-600 mb-2">Setup Checklist</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border-2 border-secondary-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  </div>
                  <span className="text-secondary-500">Create Clerk application</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border-2 border-secondary-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  </div>
                  <span className="text-secondary-500">Enable Google OAuth provider</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border-2 border-secondary-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  </div>
                  <span className="text-secondary-500">Add API keys to environment variables</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border-2 border-secondary-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-300 rounded-full"></div>
                  </div>
                  <span className="text-secondary-500">Deploy to Vercel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} disabled={isSaving} className="btn-primary">
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
