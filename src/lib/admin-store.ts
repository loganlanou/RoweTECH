import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import {
  AdminState,
  DEFAULT_ADMIN_STATE,
  GalleryItem,
  ServiceCard,
} from './admin-defaults'
import 'server-only'

const DATA_PATH = path.join(process.cwd(), 'data', 'admin-state.json')
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SUPABASE_TABLE = process.env.SUPABASE_ADMIN_TABLE || 'admin_state'

const mergeNested = (incoming: Partial<AdminState> | null | undefined): AdminState => {
  const safe = incoming ?? {}

  return {
    hero: { ...DEFAULT_ADMIN_STATE.hero, ...(safe.hero ?? {}) },
    layout: { ...DEFAULT_ADMIN_STATE.layout, ...(safe.layout ?? {}) },
    seo: { ...DEFAULT_ADMIN_STATE.seo, ...(safe.seo ?? {}) },
    media: { ...DEFAULT_ADMIN_STATE.media, ...(safe.media ?? {}) },
    services: Array.isArray(safe.services) && safe.services.length > 0 ? sanitizeServices(safe.services) : DEFAULT_ADMIN_STATE.services,
    about: { ...DEFAULT_ADMIN_STATE.about, ...(safe.about ?? {}) },
    contact: { ...DEFAULT_ADMIN_STATE.contact, ...(safe.contact ?? {}) },
    gallery: Array.isArray(safe.gallery) && safe.gallery.length > 0 ? sanitizeGallery(safe.gallery) : DEFAULT_ADMIN_STATE.gallery,
  }
}

const sanitizeServices = (services: unknown): ServiceCard[] => {
  if (!Array.isArray(services)) return DEFAULT_ADMIN_STATE.services
  return services
    .map((svc, idx) => ({
      id: Number((svc as ServiceCard).id ?? idx + 1),
      title: String((svc as ServiceCard).title ?? '').trim() || (DEFAULT_ADMIN_STATE.services[idx]?.title ?? 'Service'),
      description: String((svc as ServiceCard).description ?? '').trim() || (DEFAULT_ADMIN_STATE.services[idx]?.description ?? ''),
      image: String((svc as ServiceCard).image ?? (DEFAULT_ADMIN_STATE.services[idx]?.image ?? '')).trim(),
    }))
    .filter((svc) => svc.title.length > 0)
}

const sanitizeGallery = (items: unknown): GalleryItem[] => {
  if (!Array.isArray(items)) return DEFAULT_ADMIN_STATE.gallery
  return items
    .map((item, idx) => ({
      id: Number((item as GalleryItem).id ?? idx + 1),
      title: String((item as GalleryItem).title ?? '').trim() || `Gallery item ${idx + 1}`,
      category: String((item as GalleryItem).category ?? '').trim() || 'General',
      url: String((item as GalleryItem).url ?? '').trim() || DEFAULT_ADMIN_STATE.gallery[idx % DEFAULT_ADMIN_STATE.gallery.length]?.url,
    }))
    .filter((item) => !!item.url)
}

async function readFromSupabase(): Promise<AdminState | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=state&limit=1`, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Supabase read failed')
    const data = (await res.json()) as { state: Partial<AdminState> }[]
    if (!data?.[0]?.state) return null
    return mergeNested(data[0].state)
  } catch (err) {
    console.error('Supabase read error', err)
    return null
  }
}

async function writeToSupabase(nextState: Partial<AdminState>): Promise<AdminState | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  const merged = mergeNested(nextState)
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify([{ id: 1, state: merged }]),
    })
    if (!res.ok) throw new Error('Supabase write failed')
    return merged
  } catch (err) {
    console.error('Supabase write error', err)
    return null
  }
}

export async function readAdminState(): Promise<AdminState> {
  const supabaseState = await readFromSupabase()
  if (supabaseState) return supabaseState
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8')
    const parsed = JSON.parse(raw) as Partial<AdminState>
    return mergeNested(parsed)
  } catch {
    return DEFAULT_ADMIN_STATE
  }
}

export async function writeAdminState(nextState: Partial<AdminState>): Promise<AdminState> {
  const supabaseSaved = await writeToSupabase(nextState)
  if (supabaseSaved) return supabaseSaved
  const merged = mergeNested(nextState)
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(merged, null, 2), 'utf8')
  return merged
}

export const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status })
