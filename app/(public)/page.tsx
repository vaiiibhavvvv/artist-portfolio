import HeroSection from '@/components/sections/HeroSection'
import FeaturedWorks from '@/components/sections/FeaturedWorks'
import ArtistIntro from '@/components/sections/ArtistIntro'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorks />
      <ArtistIntro />
      <Testimonials />
      <CTASection />
    </>
  )
}
