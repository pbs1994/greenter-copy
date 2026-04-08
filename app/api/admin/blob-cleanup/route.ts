/**
 * Admin-only maintenance route to list and delete Vercel Blob files.
 *
 * Use case: when a Payload media upload fails mid-flight and leaves an
 * orphan blob on Vercel Blob, subsequent uploads of the same filename
 * crash with "This blob already exists" (before addRandomSuffix was
 * enabled). This route lets an authenticated admin clean up stuck blobs.
 *
 * GET  /api/admin/blob-cleanup                  → list all blobs
 * GET  /api/admin/blob-cleanup?prefix=media/    → list with prefix filter
 * DELETE /api/admin/blob-cleanup?url=<blob-url> → delete a specific blob
 *
 * Auth: requires a Payload admin session cookie (uses payload.auth()).
 */

import { NextRequest, NextResponse } from 'next/server'
import { list, del, type ListBlobResultBlob } from '@vercel/blob'
import { getPayloadClient } from '@/lib/payload'
import { headers as nextHeaders } from 'next/headers'

async function requirePayloadAdmin() {
  const payload = await getPayloadClient()
  const headers = await nextHeaders()
  const { user } = await payload.auth({ headers })
  if (!user) {
    return { ok: false as const, status: 401, error: 'Unauthorized' }
  }
  return { ok: true as const, user, payload }
}

export async function GET(req: NextRequest) {
  const auth = await requirePayloadAdmin()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const prefix = req.nextUrl.searchParams.get('prefix') ?? undefined

  try {
    const result = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return NextResponse.json({
      count: result.blobs.length,
      blobs: result.blobs.map((b: ListBlobResultBlob) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'list failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requirePayloadAdmin()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const url = req.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'Missing ?url=... parameter' }, { status: 400 })
  }

  try {
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })
    return NextResponse.json({ deleted: url })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'delete failed' },
      { status: 500 }
    )
  }
}
