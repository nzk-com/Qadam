import { Hero, SiteHeader } from '@/components/landing/hero'
import { Audience } from '@/components/landing/audience'
import { Corpora, Footer, Quality, Services } from '@/components/landing/sections'
import { CtaBand } from '@/components/landing/cta-band'
import { Calculator } from '@/components/landing/calculator'
import { Faq } from '@/components/landing/faq'
import { RequestForm } from '@/components/landing/request-form'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Audience />
        <Services />
        <CtaBand variant="mid" />
        <Quality />
        <Corpora />
        <Calculator />
        <Faq />
        <CtaBand variant="final" />
        <RequestForm />
      </main>
      <Footer />
    </>
  )
}
