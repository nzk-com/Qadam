import { Hero, SiteHeader } from '@/components/landing/hero'
import { Corpora, Footer, Quality, Services } from '@/components/landing/sections'
import { Calculator } from '@/components/landing/calculator'
import { RequestForm } from '@/components/landing/request-form'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Quality />
        <Corpora />
        <Calculator />
        <RequestForm />
      </main>
      <Footer />
    </>
  )
}
