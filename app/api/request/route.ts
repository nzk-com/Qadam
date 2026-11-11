import { NextResponse } from 'next/server'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/f6e02e421cc3402628113865db7b082b'

export async function POST(req: Request) {
  try {
    const incoming = await req.formData()
    const payload: Record<string, string> = {
      _subject: 'Qadam — новая заявка с сайта',
      _template: 'table',
      _captcha: 'false',
    }
    for (const [key, value] of incoming.entries()) {
      if (typeof value === 'string') payload[key] = value
    }

    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const text = await res.text()
    let json: { success?: boolean; message?: string } = {}
    try {
      json = JSON.parse(text)
    } catch {
      // HTML or empty
    }

    if (res.ok && json.success !== false) {
      return NextResponse.json({ ok: true })
    }

    console.error('FormSubmit', res.status, text.slice(0, 300))
    return NextResponse.json(
      { ok: false, status: res.status, message: json.message ?? 'upstream' },
      { status: 502 },
    )
  } catch (e) {
    console.error('FormSubmit error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
