import { collections, products } from '../data/catalog.js'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Factory } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'

const familyCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1
  return acc
}, {})

const heroPrimary = products.find(product => product.slug === '1197-sleeper')
const heroSecondary = products.find(product => product.slug === 'kenzie-sectional')

export default function Products(){
  return <>
    <section className="products-overview-hero">
      <div className="reference-shell products-overview-hero__grid">
        <Reveal>
          <div className="products-overview-hero__copy">
            <span className="eyebrow"><Factory size={14}/> Manufacturer product line</span>
            <h1>Built to specify.<br/><em>Built to repeat.</em></h1>
            <p>Explore Cozy King sleeper sofas, modular sectionals, loveseats and accent seating manufactured for dealers, hotels, resorts, vacation rentals and multi-unit projects.</p>
            <div className="products-overview-hero__actions">
              <Link to="/collections/sleepers" className="button button--red">Explore Sleeper Sofas <ArrowRight size={17}/></Link>
              <Link to="/contract#inquiry" className="button button--outline">Start a Project <ArrowUpRight size={16}/></Link>
            </div>
            <div className="products-overview-hero__proof">
              <span><b>Made in USA</b>Tremont, Mississippi</span>
              <span><b>Commercial Grade</b>Built for repeat use</span>
              <span><b>Direct Support</b>Dealer & hospitality programs</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={.08}>
          <div className="products-overview-hero__visual" aria-label="Cozy King product examples">
            <div className="products-overview-hero__visual-card products-overview-hero__visual-card--primary">
              <span>Commercial sleeper</span>
              <img src={heroPrimary?.image} alt={heroPrimary?.name || 'Cozy King sleeper sofa'} fetchPriority="high"/>
              <div><b>{heroPrimary?.name}</b><small>{heroPrimary?.dimensions}</small></div>
            </div>
            <div className="products-overview-hero__visual-card products-overview-hero__visual-card--secondary">
              <span>Modular seating</span>
              <img src={heroSecondary?.image} alt={heroSecondary?.name || 'Cozy King modular sectional'} loading="eager"/>
              <div><b>{heroSecondary?.name}</b><small>Configurable by layout</small></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="products-family-section">
      <div className="reference-shell">
        <Reveal>
          <div className="products-family-section__head">
            <div>
              <span className="eyebrow">Shop the line by family</span>
              <h2>Four focused collections.<br/>One manufacturing partner.</h2>
            </div>
            <p>Start with the product family that fits the room, then work through frame, upholstery, sleeper system and configuration options with Cozy King.</p>
          </div>
        </Reveal>

        <div className="products-family-grid">
          {collections.map((collection,index) => <Reveal key={collection.slug} delay={index*.045}>
            <Link className="products-family-card" to={`/collections/${collection.slug}`}>
              <div className="products-family-card__media">
                <img src={collection.image} alt={collection.title} loading={index < 2 ? 'eager' : 'lazy'}/>
                <span>{String(index + 1).padStart(2,'0')}</span>
              </div>
              <div className="products-family-card__body">
                <div>
                  <span className="products-family-card__eyebrow">{collection.eyebrow}</span>
                  <h3>{collection.title}</h3>
                </div>
                <ArrowUpRight size={21}/>
                <p>{collection.description}</p>
                <small>{familyCounts[collection.slug] || 0} current {familyCounts[collection.slug] === 1 ? 'model' : 'models'}</small>
              </div>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="products-catalog-section">
      <div className="reference-shell">
        <Reveal>
          <div className="products-catalog-section__head">
            <div>
              <span className="eyebrow">Current product line</span>
              <h2>A tighter line,<br/>built to do more.</h2>
            </div>
            <p>Rather than thousands of disposable SKUs, Cozy King focuses on adaptable commercial frames, sleeper platforms and configurations that can carry across showrooms, guestrooms, condos and multi-unit projects.</p>
          </div>
        </Reveal>
        <div className="product-grid product-grid--all products-catalog-grid">
          {products.map((product,index)=><ProductCard key={product.slug} product={product} index={index}/>)}
        </div>
      </div>
    </section>
  </>
}
