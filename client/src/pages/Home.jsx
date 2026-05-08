import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Services from '../components/Services'
import ShopPreview from '../components/ShopPreview'
import Gallery from '../components/Gallery'
import BeforeAfter from '../components/BeforeAfter'
import InstagramFeed from '../components/InstagramFeed'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <ShopPreview />
      <Gallery />
      <BeforeAfter />
      <Reviews />
      <InstagramFeed />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
