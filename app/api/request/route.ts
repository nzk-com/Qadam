import { NextResponse } from 'next/server'

const FORM_ENDPOINT = 'https://formsubmit.co/f6e02e421cc3402628113865db7b082b'

export async function POST(req: Request) {
  try {
    const incoming = await req.formData()
    const data = new FormData()
    for (const [key, value] of incoming.entries()) {
      data.append(key, value)
    }
    data.set('_subject', 'Qadam — новая заявка с сайта')
    data.set('_template', 'table')
    data.set('_captcha', 'false')

    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      redirect: 'follow',
    })

    // FormSubmit may return 200 JSON or redirect HTML after success
    if (res.ok || res.status === 302 || res.status === 200) {
      return NextResponse.json({ ok: true })
    }

    const text = await res.text().catch(() => '')
    console.error('FormSubmit status', res.status, text.slice(0, 200))
    return NextResponse.json({ ok: false }, { status: 502 })
  } catch (e) {
    console.error('FormSubmit error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
