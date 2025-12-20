import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-600">Dashboard</h1>
        <p className="text-secondary-500 mt-1">
          Manage your website content and images
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/content"
          className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-500 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
            <svg
              className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-secondary-600 mb-1">Manage Content</h3>
          <p className="text-sm text-secondary-500">
            Edit page text, headings, and descriptions
          </p>
        </Link>

        <Link
          href="/admin/gallery"
          className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-500 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
            <svg
              className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-secondary-600 mb-1">Gallery Images</h3>
          <p className="text-sm text-secondary-500">
            Upload and manage gallery photos
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white rounded-xl border border-secondary-200 p-6 hover:border-primary-500 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
            <svg
              className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-secondary-600 mb-1">Settings</h3>
          <p className="text-sm text-secondary-500">
            Configure site settings and admin users
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        <h2 className="font-semibold text-secondary-600 mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-medium">1</span>
            </div>
            <div>
              <p className="text-secondary-600 font-medium">Deploy to Vercel</p>
              <p className="text-sm text-secondary-500">
                For full admin functionality, deploy this site to Vercel instead of GitHub Pages.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-medium">2</span>
            </div>
            <div>
              <p className="text-secondary-600 font-medium">Configure Clerk</p>
              <p className="text-sm text-secondary-500">
                Set up Google OAuth in your Clerk dashboard and add your API keys.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-medium">3</span>
            </div>
            <div>
              <p className="text-secondary-600 font-medium">Set up database</p>
              <p className="text-sm text-secondary-500">
                Connect a database (like Supabase or PlanetScale) to store content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
