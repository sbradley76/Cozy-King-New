import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers3,
  Maximize2,
  Palette,
  Ruler,
  Settings2,
  ShieldCheck
} from 'lucide-react'
import { products, mechanisms } from '../data/catalog.js'
import NotFound from './NotFound.jsx'

const collectionMeta = {
  sleepers: { label: 'Sleeper Sofas', back: 'Sleeper Sofas' },
  sectionals: { label: 'Sectionals', back: 'Kenzie Sectionals' },
  loveseats: { label: 'Loveseats', back: 'Loveseats' },
  chairs: { label: 'Accent Chairs', back: 'HAZ Chairs' }
}

const productExtras = {
  '1197-sleeper': {
    sleepSurface: '60” W × 72” L', seatHeight: '20”', seatDepth: '22”', armWidth: '6”',
    overview: 'The 1197 is a go-to for hospitality, multi-unit, and residential projects where durability, comfort and clean styling are essential. Its classic straight-arm design adapts to a wide range of interiors and upholstery programs.',
    specs: [['Overall Dimensions','80” W × 36” D × 36” H'],['Seat Height','20”'],['Seat Depth','22”'],['Arm Width','6”'],['Sleep Surface','60” W × 72” L (Queen)'],['Frame','Kiln-dried hardwood'],['Standard Leg','Tapered wood block (multiple finishes)'],['Cushions','High-density foam (standard or firm)'],['Back Configuration','Loose or attached (configurable)']]
  },
  '1005-sleeper': {
    sleepSurface: '60” W × 72” L', seatHeight: '20”', seatDepth: '22”', armWidth: '8”',
    overview: 'The 1005 brings a softer curved-arm profile to the Cozy King sleeper line while keeping the reinforced frame, replaceable sleeper components and project-ready upholstery options required for hospitality use.'
  },
  'kenzie-sleeper': {
    sleepSurface: '60” W × 72” L', seatHeight: '20”', seatDepth: '24”', armWidth: '7”',
    overview: 'The Kenzie Sleeper pairs the deep-seat comfort and contemporary profile of the Kenzie collection with a commercial sleeper platform for properties that want a more relaxed residential look.'
  },
  'bella-33-sleeper': {
    sleepSurface: '60” W × 72” L', seatHeight: '21”', seatDepth: '22”', armWidth: '7”',
    overview: 'Bella 33 is a tailored three-seat sleeper platform with loose backs, comfortable proportions and flexible cushion configurations for hospitality and residential programs.'
  },
  '1197-vivian-sleeper': {
    sleepSurface: '60” W × 72” L', seatHeight: '20”', seatDepth: '22”', armWidth: '6”',
    overview: 'The Vivian treatment gives the proven 1197 platform a more refined upholstery presentation while retaining the commercial frame, serviceability and sleeper flexibility of the core collection.'
  }
}

function detailFor(product){
  const extra = productExtras[product.slug] || {}
  const isSleeper = product.category === 'sleepers' || product.tags?.includes('Sleeper') || product.tags?.includes('SBA')
  const hasSleeperOptions = isSleeper || product.features?.some(feature => /sleeper/i.test(feature))
  const isChair = product.category === 'chairs'
  const isSectional = product.category === 'sectionals'

  const primaryStats = isSleeper ? [
    { icon: Maximize2, label:'Overall dimensions', value: product.dimensions },
    { icon: BedDouble, label:'Sleep surface', value: extra.sleepSurface || 'Available by configuration' },
    { icon: Ruler, label:'Seat height', value: extra.seatHeight || 'Project specification' },
    { icon: Ruler, label:'Arm width', value: extra.armWidth || 'Varies by frame' }
  ] : isChair ? [
    { icon: Maximize2, label:'Overall dimensions', value: product.dimensions },
    { icon: Ruler, label:'Seat profile', value:'Commercial comfort' },
    { icon: Settings2, label:'Base', value: product.slug.includes('swivel') ? '360° swivel' : 'Stationary' },
    { icon: Palette, label:'Upholstery', value:'Customizable' }
  ] : isSectional ? [
    { icon: Maximize2, label:'Overall dimensions', value:'Built by configuration' },
    { icon: Layers3, label:'Modules', value:'Multiple pieces' },
    { icon: BedDouble, label:'Sleeper modules', value:'Available' },
    { icon: Palette, label:'Upholstery', value:'Customizable' }
  ] : [
    { icon: Maximize2, label:'Overall dimensions', value: product.dimensions },
    { icon: Ruler, label:'Seat profile', value:'Compact commercial' },
    { icon: ShieldCheck, label:'Frame', value:'Commercial grade' },
    { icon: Palette, label:'Upholstery', value:'Customizable' }
  ]

  const specs = extra.specs || [
    ['Overall Dimensions', product.dimensions],
    ['Frame', 'Commercial hardwood construction'],
    ['Cushions', 'High-density foam'],
    ['Upholstery', 'Performance fabric, Sunbrella® and vinyl options'],
    ['Configuration', isSectional ? 'Modular — varies by layout' : isChair ? (product.slug.includes('swivel') ? '360° swivel base' : 'Stationary base') : 'Project configurable'],
    ...(isSleeper ? [['Sleeper System','Cozy Sleep or Classic Square on select frames']] : [])
  ]

  return {
    isSleeper,
    hasSleeperOptions,
    overview: extra.overview || `${product.name} is built for hospitality, commercial and residential projects where dependable construction, repeatable specifications and serviceable upholstery matter.`,
    primaryStats,
    specs
  }
}

export default function ProductDetail(){
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [active, setActive] = useState(0)

  useEffect(() => { setActive(0); window.scrollTo({ top: 0, behavior: 'auto' }) }, [slug])
  if(!product) return <NotFound />

  const collection = collectionMeta[product.category] || { label:'Product Line', back:'Products' }
  const siblings = products.filter(p => p.category === product.category)
  const currentIndex = siblings.findIndex(p => p.slug === product.slug)
  const prev = siblings[(currentIndex - 1 + siblings.length) % siblings.length]
  const next = siblings[(currentIndex + 1) % siblings.length]
  const detail = detailFor(product)
  const cozy = mechanisms.find(m => m.id === 'cozy')
  const classic = mechanisms.find(m => m.id === 'classic')
  const sba = mechanisms.find(m => m.id === 'sba')
  const productMechanisms = product.tags?.includes('SBA') ? [sba].filter(Boolean) : [cozy, classic].filter(Boolean)

  const chooseImage = (direction) => {
    const total = product.gallery.length
    if(total < 2) return
    setActive(i => (i + direction + total) % total)
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })

  return <main className="pdp">
    <section className="pdp-top">
      <div className="shell pdp-topbar">
        <Link className="pdp-back" to={`/collections/${product.category}`}><ChevronLeft size={18}/> Back to {collection.back}</Link>
        {siblings.length > 1 && <div className="pdp-sibling-nav" aria-label="Browse products in this collection">
          <Link to={`/product/${prev.slug}`}><ChevronLeft size={18}/> Previous</Link>
          <span aria-hidden="true" />
          <Link to={`/product/${next.slug}`}>Next <ChevronRight size={18}/></Link>
        </div>}
      </div>

      <div className="shell pdp-hero-grid">
        <div className="pdp-gallery-wrap">
          <div className="pdp-gallery-stage">
            <img src={product.gallery[active]} alt={`${product.name} view ${active + 1}`} />
            <button className="pdp-zoom" aria-label="View larger product image" onClick={() => window.open(product.gallery[active], '_blank', 'noopener,noreferrer')}><Maximize2 size={22}/></button>
          </div>

          <div className="pdp-thumb-row">
            {product.gallery.length > 1 && <button className="pdp-thumb-arrow" onClick={() => chooseImage(-1)} aria-label="Previous image"><ChevronLeft size={22}/></button>}
            <div className="pdp-thumbs">
              {product.gallery.map((src, i) => <button key={`${src}-${i}`} className={active === i ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`}>
                <img src={src} alt="" />
              </button>)}
            </div>
            {product.gallery.length > 1 && <button className="pdp-thumb-arrow" onClick={() => chooseImage(1)} aria-label="Next image"><ChevronRight size={22}/></button>}
          </div>
        </div>

        <aside className="pdp-summary">
          <div className="pdp-eyebrow"><i />{product.short}</div>
          <h1>{product.name}</h1>
          <p className="pdp-lead">{product.description} Designed for durability, comfort and repeat use in hospitality and residential environments.</p>
          <div className="pdp-summary-rule" />

          <div className="pdp-stat-grid">
            {detail.primaryStats.map(({icon:Icon,label,value}) => <div className="pdp-stat" key={label}>
              <Icon size={28}/><b>{label}</b><span>{value}</span>
            </div>)}
          </div>

          <div className="pdp-actions">
            <Link className="button" to="/contract#inquiry">Request a Quote <ArrowRight size={17}/></Link>
            <Link className="button button--outline" to="/dealer">Dealer Portal</Link>
          </div>
          <p className="pdp-fine">Exact specifications can vary by mechanism, orientation and custom upholstery. Contact Cozy King for current production specifications.</p>
        </aside>
      </div>
    </section>

    <nav className="pdp-tabs" aria-label="Product information">
      <div className="shell pdp-tabs__inner">
        <button onClick={() => scrollTo('overview')} className="active">Overview</button>
        <button onClick={() => scrollTo('dimensions')}>Dimensions</button>
        {detail.hasSleeperOptions && <button onClick={() => scrollTo('mechanisms')}>Mechanisms</button>}
        <button onClick={() => scrollTo('upholstery')}>Upholstery Options</button>
        <button onClick={() => scrollTo('configurations')}>Configurations</button>
        <button onClick={() => scrollTo('downloads')}>Downloads</button>
      </div>
    </nav>

    <section className="pdp-detail-section" id="overview">
      <div className="shell pdp-info-grid">
        <article className="pdp-info-card pdp-overview-card">
          <h2>Built for Real Use</h2>
          <p>{detail.overview}</p>
          <ul>
            {product.features.map(feature => <li key={feature}><Check size={18}/><span>{feature}</span></li>)}
            {!product.features.some(x => /Mississippi|USA/i.test(x)) && <li><Check size={18}/><span>Made in Mississippi, USA</span></li>}
          </ul>
        </article>

        <article className="pdp-info-card" id="dimensions">
          <h2>Key Specifications</h2>
          <dl className="pdp-spec-table">
            {detail.specs.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </article>

        {detail.isSleeper ? <article className="pdp-info-card pdp-mechanism-card" id="mechanism-summary">
          <h2>Sleeper Mechanism Options</h2>
          <p>Choose the sleep system that fits your project needs.</p>
          <div className="pdp-mechanism-options">
            {[cozy, classic].filter(Boolean).map(mech => <Link key={mech.id} to="/mechanisms" className="pdp-mechanism-option">
              <div><img src={mech.image} alt={mech.name}/></div>
              <b>{mech.name.replace(' System','')}</b>
              <span>{mech.id === 'cozy' ? 'Our standard, reliable commercial sleeper system.' : 'A heavy-duty option for high turnover and extended use.'}</span>
            </Link>)}
          </div>
        </article> : <article className="pdp-info-card pdp-config-card" id="configurations">
          <h2>Configuration Options</h2>
          <p>Work directly with Cozy King to specify the frame, layout, base and upholstery combination that fits the property.</p>
          <div className="pdp-config-points">
            <span><Layers3/>Project-specific configurations</span>
            <span><Palette/>Performance upholstery options</span>
            <span><ShieldCheck/>Commercial-grade construction</span>
          </div>
        </article>}
      </div>
    </section>

    <section className="pdp-secondary" id="upholstery">
      <div className="shell pdp-secondary-grid">
        <div>
          <span className="eyebrow">Material program</span>
          <h2>Upholstery that fits the property.</h2>
          <p>Choose from performance fabrics, Sunbrella®, hospitality vinyls and project-specific textiles. Our team can help match durability, cleanability and aesthetic requirements to the application.</p>
        </div>
        <div className="pdp-secondary-cards" id={detail.isSleeper ? 'configurations' : undefined}>
          <div><Palette/><b>Performance textiles</b><span>Commercial fabrics, vinyls and outdoor-rated options.</span></div>
          <div><Layers3/><b>Repeatable programs</b><span>Specify a consistent construction and finish package across a property or dealer program.</span></div>
          <div><ShieldCheck/><b>Manufacturer support</b><span>Work directly with Cozy King on project fit, serviceability and production details.</span></div>
        </div>
      </div>
    </section>

    {detail.hasSleeperOptions && <section className="pdp-mechanism-guide" id="mechanisms">
      <div className="shell">
        <div className="pdp-mechanism-guide__head">
          <div>
            <span className="eyebrow">Sleeper systems</span>
            <h2>{product.tags?.includes('SBA') ? 'A sleeper solution built for tighter footprints.' : 'Choose the mechanism around how the room gets used.'}</h2>
          </div>
          <div>
            <p>{product.tags?.includes('SBA') ? 'The Sleep Between Arms configuration is designed for projects where floor space is limited and a traditional forward-opening sleeper is not the best fit.' : 'Cozy King offers more than one way to turn a seating piece into a sleep surface. Match the mechanism to turnover, serviceability, guest comfort and the requirements of the property.'}</p>
            <Link className="text-arrow" to="/mechanisms">Compare all sleeper systems <ArrowRight size={16}/></Link>
          </div>
        </div>

        <div className={`pdp-mechanism-guide__grid ${productMechanisms.length === 1 ? 'pdp-mechanism-guide__grid--single' : ''}`}>
          {productMechanisms.map(mech => <article className="pdp-mechanism-feature" key={mech.id}>
            <div className="pdp-mechanism-feature__media">
              <img src={mech.image} alt={mech.name}/>
            </div>
            <div className="pdp-mechanism-feature__body">
              <span className="pdp-mechanism-feature__kicker">{mech.kicker}</span>
              <h3>{mech.name}</h3>
              <p>{mech.description}</p>
              <ul>
                {mech.points.map(point => <li key={point}><Check size={17}/><span>{point}</span></li>)}
              </ul>
              <Link className="pdp-mechanism-feature__link" to="/mechanisms">Learn about this system <ArrowRight size={16}/></Link>
            </div>
          </article>)}
        </div>

        <p className="pdp-mechanism-guide__note">Mechanism availability can vary by frame, size and project configuration. Cozy King can confirm the current production options for this model before specification or ordering.</p>
      </div>
    </section>}

    <section className="pdp-downloads" id="downloads">
      <div className="shell pdp-downloads__inner">
        <div><span className="eyebrow">Specification support</span><h2>Need this piece on a schedule?</h2><p>Request current specifications, upholstery guidance, mechanism details or a project quote directly from Cozy King.</p></div>
        <div className="pdp-download-actions"><Link className="button" to="/contract#inquiry">Start a Project <ArrowRight size={17}/></Link><Link className="button button--outline" to="/dealer"><Download size={17}/> Dealer Resources</Link></div>
      </div>
    </section>
  </main>
}
