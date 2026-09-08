import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTENT_TYPE: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  // Only bare filenames we generated ourselves (randomUUID + known ext) — blocks path traversal.
  if (!/^[a-f0-9-]+\.(jpg|jpeg|png|webp)$/i.test(filename)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const filePath = path.join(process.cwd(), 'data', 'uploads', filename);

  try {
    const bytes = await readFile(filePath);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': CONTENT_TYPE[ext] || 'application/octet-stream',
        // Filenames are random and never reused for different content, so this is safe to cache forever.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}
