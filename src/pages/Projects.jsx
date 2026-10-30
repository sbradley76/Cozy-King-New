import { Link } from 'react-router-dom'
import { ArrowRight, Building2, BedDouble, Layers3, Repeat2, ShieldCheck, Sofa } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const applications = [
  {
    title:'Hotels & resorts',
    tag:'Hospitality programs',
    img:'/assets/display/Landscape_Resort.jpeg',
    copy:'Guest-room and common-area seating built around comfort, turnover, serviceability and consistent replacement specifications.',
    points:['Sleeper programs','Repeatable specifications','Performance upholstery']
  },
  {
    title:'Vacation rentals & condos',
    tag:'High-turnover properties',
    img:'/assets/display/Staged_Caribbean.webp',
    copy:'Space-conscious sleeper and seating solutions for coastal condos, rental portfolios and properties that need durable furniture without an institutional look.',
    points:['Compact footprints','Sleeper flexibility','Property-wide consistency']
  },
  {
    title:'Multi-unit & development',
    tag:'Scale with control',
    img:'/assets/display/Maj_Sun.jpg',
    copy:'A focused upholstery line that makes it easier to repeat frames, fabrics and configurations across units while adapting to individual floor plans.',
    points:['Schedule support','Repeat ordering','Configuration guidance']
  },
  {
    title:'Dealers & design teams',
    tag:'Direct manufacturer support',
    img:'/assets/display/Staged_Sectional.jpg',
    copy:'A manufacturer relationship for showrooms, designers and procurement teams that need a dependable upholstery line and someone who can help specify it.',
    points:['Dealer programs','Fabric guidance','Direct communication']
  }
]

const support = [
  {icon:Repeat2,title:'Built to repeat',copy:'Keep successful frames, fabrics and sleeper systems consistent across multiple rooms, units and future replacements.'},
  {icon:Layers3,title:'Built to configure',copy:'Match modular layouts, sleeper systems and upholstery choices to the room instead of forcing every project into one package.'},
  {icon:ShieldCheck,title:'Built for real use',copy:'Commercial-minded construction and serviceability help the furniture hold up where turnover and daily use are part of the job.'}
]

export default function Projects(){return <>
  <section className="ck-app-hero">
    <img src="/assets/display/partner-section-scene.webp" alt="" className="ck-app-hero__image"/>
    <div className="ck-app-hero__wash"/>
    <div className="shell ck-app-hero__content">
      <Reveal>
        <span className="eyebrow eyebrow--light">Applications</span>
        <h1>Furniture made for the places <em>people actually use hard.</em></h1>
        <p>From a single showroom floor to an entire resort schedule, Cozy King builds upholstered furniture around repeat use, guest comfort and specifications that need to work again tomorrow.</p>
        <div className="ck-app-hero__actions">
          <Link className="button button--red" to="/contract#inquiry">Start a Project <ArrowRight size={16}/></Link>
          <Link className="button button--ghost-light" to="/products">View Product Line <ArrowRight size={16}/></Link>
        </div>
      </Reveal>
      <Reveal className="ck-app-hero__proof" delay={.08}>
        <span><Building2/><b>Hospitality</b><small>Hotels, resorts & multi-unit</small></span>
        <span><BedDouble/><b>Sleeper focused</b><small>Guest-ready sleep systems</small></span>
        <span><Sofa/><b>American made</b><small>Built in Tremont, Mississippi</small></span>
      </Reveal>
    </div>
  </section>

  <section className="ck-app-intro">
    <div className="shell ck-app-intro__grid">
      <Reveal><span className="eyebrow">Where Cozy King fits</span><h2>A product line built around how the property operates.</h2></Reveal>
      <Reveal delay={.05}><p>Different properties create different demands. The common thread is furniture that needs to look residential, feel comfortable and still make operational sense when a room turns over, a unit needs replacement, or the same specification has to be ordered again.</p></Reveal>
    </div>
  </section>

  <section className="ck-applications">
    <div className="shell ck-applications__grid">
      {applications.map((item,i)=><Reveal key={item.title} delay={(i%2)*.04}>
        <article className="ck-application-card">
          <div className="ck-application-card__media"><img src={item.img} alt={item.title} loading="lazy"/></div>
          <div className="ck-application-card__body">
            <span className="eyebrow">{item.tag}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <ul>{item.points.map(point=><li key={point}><i/> {point}</li>)}</ul>
          </div>
        </article>
      </Reveal>)}
    </div>
  </section>

  <section className="ck-app-support">
    <div className="shell">
      <Reveal className="ck-app-support__heading"><span className="eyebrow eyebrow--light">Why a manufacturer relationship matters</span><h2>Specify with the next room in mind.</h2></Reveal>
      <div className="ck-app-support__grid">
        {support.map(({icon:Icon,title,copy},i)=><Reveal key={title} delay={i*.05}><div className="ck-app-support__card"><Icon/><h3>{title}</h3><p>{copy}</p></div></Reveal>)}
      </div>
      <Reveal className="ck-app-support__cta">
        <div><span className="eyebrow eyebrow--light">Have a schedule, floor plan or property list?</span><h3>Send us what you have. We’ll help shape the furniture specification.</h3></div>
        <Link className="button button--red" to="/contract#inquiry">Talk to Cozy King <ArrowRight size={16}/></Link>
      </Reveal>
    </div>
  </section>
</>}
