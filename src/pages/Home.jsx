import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Armchair,
  BedDouble,
  Building2,
  Factory,
  Hotel,
  Layers3,
  ShieldCheck,
  Store,
  Wrench,
  Handshake,
  MessageSquareQuote,
  PackageCheck
} from 'lucide-react'
import { mechanisms, products } from '../data/catalog.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import LazyVideo from '../components/LazyVideo.jsx'

const featuredProducts = [
  { ...products[0], showcaseDetail: 'Queen Sleeper' },
  { ...products[8], showcaseDimensions: 'Configurable layout', showcaseDetail: 'Dimensions vary by configuration' },
  { ...products[7], showcaseDetail: 'Swivel base' },
  { ...products[1], showcaseDetail: 'Queen Sleeper' }
]

const showcaseFamilies = [
  {
    icon: BedDouble,
    title: 'Sleeper sofas',
    body: 'Commercial-grade construction for hospitality and multi-unit projects.',
    to: '/collections/sleepers'
  },
  {
    icon: Layers3,
    title: 'Modular seating',
    body: 'Configurable sectionals to fit your space and specifications.',
    to: '/collections/sectionals'
  },
  {
    icon: Armchair,
    title: 'Accent chairs',
    body: 'Stylish, durable seating to complete any environment.',
    to: '/collections/chairs'
  }
]



const partnerTypes = [
  { icon: Store, label: 'Dealer partners' },
  { icon: Hotel, label: 'Hospitality groups' },
  { icon: Building2, label: 'Resort operators' },
  { icon: Layers3, label: 'Design + procurement' },
  { icon: BedDouble, label: 'Vacation rental teams' },
  { icon: Handshake, label: 'Property partners' }
]

const partnerSupport = [
  {
    icon: PackageCheck,
    eyebrow: 'Repeatable programs',
    title: 'Built to be easier to specify again.',
    body: 'Focused frames, clear specifications and repeatable configurations help partners carry a successful furniture program into the next room, phase or property.'
  },
  {
    icon: MessageSquareQuote,
    eyebrow: 'Direct manufacturer support',
    title: 'A real team behind the product.',
    body: 'From mechanism questions to upholstery guidance and replacement planning, Cozy King is built around long-term manufacturer relationships—not one-off transactions.'
  }
]

const audiences = [
  {
    icon: Store,
    title: 'Dealers & retailers',
    body: 'A dependable upholstery program, repeatable construction and direct manufacturer support for the showroom floor.'
  },
  {
    icon: Hotel,
    title: 'Hotels & resorts',
    body: 'Sleeper and seating programs designed around guest comfort, repeat use and property-wide consistency.'
  },
  {
    icon: Building2,
    title: 'Condos & vacation rentals',
    body: 'Space-conscious sleeper solutions and serviceable furniture for high-turnover coastal and resort properties.'
  },
  {
    icon: Layers3,
    title: 'Design & procurement',
    body: 'Frame, mechanism and upholstery guidance for multi-unit schedules, renovations and repeat specifications.'
  }
]

export default function Home(){
  return <main className="home-page">
    <section className="reference-hero">
      <div className="reference-hero__scene" aria-hidden="true"/>
      <div className="reference-hero__wash" aria-hidden="true"/>

      <div className="reference-hero__inner reference-shell">
        <div className="reference-hero__copy">
          <Reveal>
            <span className="reference-kicker"><i/> American-made sleeper sofas</span>
            <h1>
              <span>We manufacture<br/>sleeper sofas for</span>
              <em>hospitality, resorts,<br/>hotels and more.</em>
            </h1>
            <p>Commercial-grade sleeper sofas, modular sectionals and accent seating built for hotels, resorts, vacation rentals and multi-unit projects — made in Mississippi, USA.</p>
            <div className="reference-hero__actions">
              <Link className="button button--red reference-primary" to="/products">View the Product Line <ArrowRight size={18}/></Link>
              <Link className="button reference-secondary" to="/contract">Hospitality & Contract</Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="reference-hero__proof">
        <div className="reference-shell reference-proof-grid">
          <div className="reference-proof-item">
            <Factory aria-hidden="true"/>
            <span><b>Made in Mississippi</b><small>American craftsmanship and dependable supply.</small></span>
          </div>
          <div className="reference-proof-item">
            <ShieldCheck aria-hidden="true"/>
            <span><b>Built for Commercial</b><small>Engineered for durability in high-use environments.</small></span>
          </div>
          <div className="reference-proof-item">
            <Building2 aria-hidden="true"/>
            <span><b>Trusted Nationwide</b><small>A manufacturing partner for hospitality and multi-unit projects.</small></span>
          </div>
        </div>
      </div>
    </section>

    <section className="home-product-showcase">
      <div className="home-product-showcase__backdrop" aria-hidden="true"/>
      <div className="home-product-showcase__shell reference-shell">
        <div className="home-product-showcase__intro">
          <Reveal>
            <span className="home-product-showcase__accent" aria-hidden="true"/>
            <h2>Built to specify. Built to repeat.</h2>
            <p>Cozy King is a manufacturer of configurable sleeper sofas, modular sectionals, loveseats and accent seating for hospitality, resorts, hotels, vacation rentals and multi-unit projects.</p>
          </Reveal>
          <Reveal delay={.08}>
            <Link className="home-product-showcase__all" to="/products">See complete product line <ArrowRight size={18}/></Link>
          </Reveal>
        </div>

        <div className="home-product-showcase__grid">
          {featuredProducts.map((product,index)=><Reveal key={product.slug} delay={index*.05}>
            <Link className="showcase-product-card" to={`/product/${product.slug}`}>
              <div className="showcase-product-card__media">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async"/>
              </div>
              <div className="showcase-product-card__details">
                <div className="showcase-product-card__identity">
                  <span>{product.short}</span>
                  <h3>{product.name}</h3>
                </div>
                <div className="showcase-product-card__spec">
                  <strong>{product.showcaseDimensions || product.dimensions}</strong>
                  <small>{product.showcaseDetail}</small>
                </div>
              </div>
            </Link>
          </Reveal>)}
        </div>

        <div className="home-product-showcase__families">
          {showcaseFamilies.map(({icon:Icon,title,body,to})=>
            <Link key={title} to={to} className="showcase-family">
              <div className="showcase-family__icon"><Icon/><i/></div>
              <span><b>{title}</b><small>{body}</small></span>
            </Link>
          )}
        </div>
      </div>
    </section>

    <section className="partner-audience">
      <div className="partner-audience__scene" aria-hidden="true"/>
      <div className="partner-audience__wash" aria-hidden="true"/>
      <div className="reference-shell partner-audience__inner">
        <Reveal className="partner-audience__copy">
          <span className="partner-audience__kicker"><i/> Who we build for</span>
          <h2>A manufacturer partner for the people furnishing the property.</h2>
          <p>Whether you stock a showroom or specify an entire resort, our job is to make the furniture side of the project easier to repeat, with reliable manufacturing support, service and trust.</p>
        </Reveal>

        <div className="partner-audience__grid">
          {audiences.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.045}>
            <article className="partner-audience-card">
              <div className="partner-audience-card__top"><div className="partner-audience-card__icon"><Icon/></div><span>0{i+1}</span></div>
              <i className="partner-audience-card__rule" aria-hidden="true"/>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="partners-testimonials">
      <div className="reference-shell">
        <div className="partners-testimonials__head">
          <Reveal>
            <span className="partners-testimonials__kicker"><i/> Partners &amp; relationships</span>
            <h2>Furniture programs are better when the relationship repeats, too.</h2>
          </Reveal>
          <Reveal delay={.06}>
            <p>Cozy King works as a manufacturing partner behind showrooms, hospitality properties and multi-unit projects. The goal is simple: make the next specification easier than the first.</p>
          </Reveal>
        </div>

        <div className="partner-marquee" aria-label="Types of Cozy King partners">
          <div className="partner-marquee__fade partner-marquee__fade--left" aria-hidden="true"/>
          <div className="partner-marquee__fade partner-marquee__fade--right" aria-hidden="true"/>
          <div className="partner-marquee__track">
            {[...partnerTypes,...partnerTypes].map(({icon:Icon,label},i)=><div className="partner-chip" key={`${label}-${i}`} aria-hidden={i >= partnerTypes.length ? 'true' : undefined}>
              <span><Icon/></span><b>{label}</b>
            </div>)}
          </div>
        </div>

        <div className="partner-support-grid">
          {partnerSupport.map(({icon:Icon,eyebrow,title,body},i)=><Reveal key={title} delay={i*.06}>
            <article className="partner-support-card">
              <div className="partner-support-card__icon"><Icon/></div>
              <span>{eyebrow}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          </Reveal>)}
          <Reveal delay={.12}>
            <aside className="partner-testimonial-slot">
              <MessageSquareQuote/>
              <span>Partner voices</span>
              <h3>Repeat business is the review that matters most.</h3>
              <p>We build around clear specifications, direct support and serviceable furniture so dealers, hospitality teams and procurement partners can return to a successful program with confidence.</p>
              <Link className="text-arrow" to="/contract">Work with Cozy King <ArrowUpRight size={15}/></Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="section manufacturing-story"><div className="shell manufacturing-story__grid">
      <Reveal className="manufacturing-story__media">
        <img src="/assets/display/Staged_Sectional.jpg" alt="Cozy King Kenzie sectional in a hospitality interior" loading="lazy" decoding="async"/>
        <div className="manufacturing-story__stamp"><Factory/><span><b>Manufactured in</b>Tremont, Mississippi</span></div>
      </Reveal>
      <Reveal className="manufacturing-story__copy">
        <span className="eyebrow">Manufacturer first</span>
        <h2>The product is the beginning. The build is the business.</h2>
        <p>Cozy King grew from years of seeing furniture succeed—and fail—in demanding coastal markets. Today we manufacture around the needs of dealers and hospitality operators: durability, serviceability, repeatability and a better guest experience.</p>
        <div className="mfg-capabilities">
          <div><Wrench/><span><b>Commercial construction</b>Reinforced frames, high-density cushioning and components selected for repeat use.</span></div>
          <div><BedDouble/><span><b>Sleeper expertise</b>Multiple sleep platforms for different room footprints, budgets and operating needs.</span></div>
          <div><ShieldCheck/><span><b>Performance upholstery</b>Commercial fabrics, Sunbrella® and hospital-grade vinyl options for demanding environments.</span></div>
          <div><Layers3/><span><b>Repeatable programs</b>Focused frames and modular configurations make multi-unit specifications easier to maintain.</span></div>
        </div>
        <div className="manufacturing-story__links"><Link className="button button--red" to="/story">Our Story <ArrowRight size={16}/></Link><Link className="text-arrow" to="/contract">Talk about a project <ArrowUpRight size={15}/></Link></div>
      </Reveal>
    </div></section>

    <section className="section section--navy"><div className="shell">
      <SectionHeading eyebrow="Sleeper manufacturing" title="The sleeper system should match the operation." body="Hospitality properties do not all use furniture the same way. We offer multiple mechanisms so dealers and property teams can specify around room size, turnover, serviceability and guest comfort."/>
      <div className="mechanism-row mechanism-row--brand">{mechanisms.map((m,i)=><Reveal key={m.id} delay={i*.05}><Link to="/mechanisms" className="mechanism-tile"><span>0{i+1}</span><h3>{m.name}</h3><p>{m.description}</p><b>{m.kicker} <ArrowUpRight size={15}/></b></Link></Reveal>)}</div>
    </div></section>

    <section className="video-band video-band--manufacturer"><LazyVideo className="video-band__video" poster="/assets/display/cozy-sofa.jpg" src="/assets/videos/Cozy.mp4" type="video/mp4"/><div className="video-band__overlay"/><div className="shell video-band__content"><Reveal><span className="eyebrow eyebrow--light">Inside Cozy King</span><h2>Not a marketplace.<br/>A furniture manufacturer.</h2><p>See the people, process and thinking behind the frames we put into hospitality and dealer programs.</p><Link className="button button--light" to="/story">See how we build <ArrowRight size={17}/></Link></Reveal></div></section>

    <section className="section contract-cta"><div className="shell contract-cta__grid">
      <div><span className="eyebrow">Dealer · Hospitality · Contract</span><h2>Furnishing one showroom or one hundred rooms?</h2></div>
      <div><p>Send the scope, floor plan or furniture schedule. We’ll help align frames, sleeper mechanisms, upholstery and configurations with the way the property or sales floor actually operates.</p><div className="contract-cta__actions"><Link className="button button--red" to="/contract#inquiry">Start a project <ArrowUpRight size={17}/></Link><Link className="button button--outline" to="/dealer">Dealer portal</Link></div></div>
    </div></section>
  </main>
}
