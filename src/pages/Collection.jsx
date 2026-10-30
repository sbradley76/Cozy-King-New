import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Building2, Layers3,
  Maximize2, Palette, Ruler, RotateCw, ShieldCheck
} from 'lucide-react'
import { collections, products } from '../data/catalog.js'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'

const collectionPresentation = {
  sleepers: {
    intro: 'Built for repeat use, specified for the room.',
    heroImage: '/assets/display/sleeper-sofa-hero.webp',
    heroPosition: 'center center',
    benefits: [
      [ShieldCheck, 'Commercial-grade construction', 'Engineered for durability in high-use environments, with quality you can trust.'],
      [Palette, 'Custom upholstery options', 'Wide selection of contract-grade fabrics, finishes and configurations.'],
      [Building2, 'Built for hospitality projects', 'Ideal for hotels, resorts, vacation rentals and multi-unit properties.']
    ]
  },
  sectionals: {
    intro: 'Modular by design, specified for the room.',
    heroImage: '/assets/display/Staged_Sectional.jpg',
    heroPosition: 'center center',
    benefits: [
      [Layers3, 'Modular by design', 'Configure chairs, armless pieces, chaises, wedges and sleeper modules around the floor plan.'],
      [Ruler, 'Layout support', 'Send us the room dimensions and our team can help map the right Kenzie configuration.'],
      [Building2, 'Built for larger projects', 'A repeatable seating platform for resorts, condos, common areas and multi-unit schedules.']
    ]
  },
  loveseats: {
    intro: 'Compact in footprint, commercial in construction.',
    heroImage: '/assets/display/Staged_Caribbean.webp',
    heroPosition: 'center center',
    benefits: [
      [ShieldCheck, 'Commercial-grade construction', 'The same reinforced frame standards used across our full-size upholstery line.'],
      [Maximize2, 'Space-conscious footprint', 'A practical choice for guestrooms, condos and layouts where every inch matters.'],
      [Palette, 'Performance upholstery', 'Specify contract-grade fabrics, vinyls and finishes around the needs of the property.']
    ]
  },
  chairs: {
    intro: 'Accent seating built to work harder.',
    heroImage: '/assets/display/partner-section-scene.webp',
    heroPosition: 'center right',
    benefits: [
      [RotateCw, 'Stationary or swivel', 'Choose the HAZ silhouette on a fixed base or a smooth 360-degree swivel platform.'],
      [ShieldCheck, 'Built for repeat use', 'Commercial materials and reinforced construction for guestrooms and shared spaces.'],
      [Palette, 'Custom upholstery options', 'Coordinate the chair with your wider furniture package and performance requirements.']
    ]
  }
}

function CollectionProductCard({ product, index }) {
  const note = product.category === 'sleepers'
    ? 'Sleeper ready'
    : product.category === 'sectionals'
      ? 'Modular configuration'
      : product.category === 'chairs'
        ? 'Commercial accent seating'
        : 'Compact commercial seating'

  return (
    <Reveal delay={Math.min(index * .05, .12)}>
      <Link to={`/product/${product.slug}`} className="collection-product-card">
        <div className="collection-product-card__media">
          <img src={product.image} alt={product.name} loading={index === 0 ? 'eager' : 'lazy'} />
        </div>
        <div className="collection-product-card__rule" />
        <div className="collection-product-card__body">
          <div>
            <span>{product.short}</span>
            <h3>{product.name}</h3>
          </div>
          <p>{product.dimensions}<small>{note}</small></p>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Collection(){
  const { slug } = useParams()
  const collection = collections.find(c => c.slug === slug)
  if(!collection) return <NotFound/>

  const list = products.filter(p => p.category === slug)
  const presentation = collectionPresentation[slug] || collectionPresentation.sleepers

  return <>
    <section className={`collection-hero-v2 collection-hero-v2--${slug}`}>
      <img
        className="collection-hero-v2__image"
        src={presentation.heroImage}
        alt=""
        style={{ objectPosition: presentation.heroPosition }}
      />
      <div className="collection-hero-v2__shade" />
      <div className="shell collection-hero-v2__content">
        <Reveal>
          <Link className="collection-hero-v2__back" to="/products">
            <ArrowLeft size={15}/> All products
          </Link>
          <span className="collection-hero-v2__eyebrow"><i /> {collection.eyebrow}</span>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <a className="button button--red collection-hero-v2__cta" href="#collection-models">
            View the product line <ArrowRight size={17}/>
          </a>
        </Reveal>
      </div>
    </section>

    <section className="collection-catalog" id="collection-models">
      <div className="shell">
        <div className="collection-catalog__intro">
          <Reveal><h2>{presentation.intro}</h2></Reveal>
          <Reveal delay={.05}>
            <p>Choose a frame, then tailor upholstery and configuration around your property. Contract partners can work directly with Cozy King on larger schedules and custom requirements.</p>
          </Reveal>
        </div>

        <div className={`collection-product-grid collection-product-grid--count-${list.length}`}>
          {list.map((product,index) => <CollectionProductCard key={product.slug} product={product} index={index}/>)}
        </div>
      </div>

      <div className="collection-benefits">
        <div className="shell collection-benefits__grid">
          {presentation.benefits.map(([Icon,title,body], index) => (
            <Reveal key={title} delay={index * .04}>
              <div className="collection-benefit">
                <div className="collection-benefit__icon"><Icon size={39}/></div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {slug === 'sectionals' && <div className="shell">
        <div className="layout-help collection-layout-help">
          <div>
            <span className="eyebrow">Kenzie layout support</span>
            <h3>Send the floor plan. We’ll map the pieces.</h3>
          </div>
          <Link className="button button--red" to="/contract#inquiry">Get layout help <ArrowUpRight size={16}/></Link>
        </div>
      </div>}
    </section>
  </>
}
