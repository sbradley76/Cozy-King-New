import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight, Factory, Flag, HeartHandshake, MapPin, ShieldCheck, Sofa, Star } from 'lucide-react'

const pillars = [
  {icon:Flag,kicker:'Built on service',title:'Marine veteran founded',body:'Ken King brought the discipline, responsibility and service-first mindset of the Marine Corps into the way Cozy King approaches customers, products and partnerships.'},
  {icon:HeartHandshake,kicker:'Independent by design',title:'Family owned',body:'Cozy King remains family owned, keeping the company close to the dealers, property teams and people who actually specify, sell and live with the furniture.'},
  {icon:Factory,kicker:'Made in the USA',title:'Built in Tremont, Mississippi',body:'Every Cozy King product is made in the USA at our Tremont, Mississippi manufacturing operation—not sourced as a finished imported frame.'}
]

export default function Story(){return <>
  <section className="ck-story-hero">
    <div className="shell ck-story-hero__grid">
      <Reveal className="ck-story-hero__copy">
        <span className="eyebrow eyebrow--light">Our Story</span>
        <h1>Built from service. Shaped by the rooms we furnished first.</h1>
        <p>Cozy King grew from years spent selling, delivering and servicing furniture in demanding hospitality and coastal markets. Eventually, that experience became a manufacturing company with a simple goal: build the product we wanted to stand behind.</p>
        <div className="ck-story-hero__facts">
          <span><Flag/><b>Marine veteran</b><small>Founded by Ken King</small></span>
          <span><HeartHandshake/><b>Family owned</b><small>Independent & hands-on</small></span>
          <span><Factory/><b>Made in USA</b><small>Tremont, Mississippi</small></span>
        </div>
      </Reveal>
      <Reveal className="ck-story-hero__visual" delay={.08}>
        <img src="/assets/display/Staged_Sectional.jpg" alt="Cozy King sectional in a coastal interior"/>
        <div><Sofa/><span><b>Furniture built for the real room.</b>Experience in the field still informs the factory floor.</span></div>
      </Reveal>
    </div>
  </section>

  <section className="ck-story-origin">
    <div className="shell ck-story-origin__grid">
      <Reveal className="ck-story-origin__media">
        <img src="/assets/display/Landscape_Resort.jpeg" alt="Emerald Coast resort property" loading="lazy"/>
        <div className="ck-story-origin__badge"><MapPin/><span><b>Emerald Coast lessons</b>Carried into American manufacturing.</span></div>
      </Reveal>
      <Reveal className="ck-story-origin__copy" delay={.05}>
        <span className="eyebrow">From showroom to factory floor</span>
        <h2>The furniture business taught us what needed to be better.</h2>
        <p>Before Cozy King manufactured furniture, the King family worked on the retail side of the industry on Florida’s Emerald Coast. Homeowners were only part of the picture. Condos, vacation rentals, property managers and hospitality customers made it obvious that some rooms ask much more from a sofa.</p>
        <p>Repeated use exposes the details: frame construction, cushion support, the sleeper mechanism, upholstery choice, serviceability and whether the same product can be specified again when another unit needs it.</p>
        <blockquote>Instead of accepting those tradeoffs as “just how furniture is,” Cozy King started building around them.</blockquote>
      </Reveal>
    </div>
  </section>

  <section className="ck-story-values">
    <div className="shell">
      <Reveal className="ck-story-values__heading"><span className="eyebrow">What still defines us</span><h2>More than a name on the frame.</h2><p>These are the things that continue to shape how Cozy King builds, supports and grows.</p></Reveal>
      <div className="ck-story-values__grid">
        {pillars.map(({icon:Icon,kicker,title,body},i)=><Reveal key={title} delay={i*.05}><article><div className="ck-story-values__icon"><Icon/></div><span>{kicker}</span><h3>{title}</h3><p>{body}</p></article></Reveal>)}
      </div>
    </div>
  </section>

  <section className="ck-story-made">
    <div className="shell ck-story-made__grid">
      <Reveal className="ck-story-made__copy">
        <span className="eyebrow eyebrow--light">Made in USA · Tremont, Mississippi</span>
        <h2>Today, every Cozy King product is built here at home.</h2>
        <p>Our Tremont operation keeps the conversation between the people building the furniture and the people specifying, selling and servicing it much closer.</p>
        <div className="ck-story-made__points">
          <span><ShieldCheck/><b>American made</b><small>All Cozy King products are manufactured in the USA.</small></span>
          <span><Factory/><b>Direct manufacturing</b><small>Frames, upholstery and project requirements stay closer to the source.</small></span>
          <span><Star/><b>Built for repeat business</b><small>Products are designed to support dealers and hospitality partners beyond one order.</small></span>
        </div>
        <div className="ck-story-made__actions"><Link className="button button--red" to="/products">Explore Product Line <ArrowRight size={16}/></Link><Link className="button button--ghost-light" to="/contract">Work with Cozy King</Link></div>
      </Reveal>
      <Reveal className="ck-story-made__media" delay={.08}><img src="/assets/display/cozy-sofa.jpg" alt="Cozy King upholstered sofa" loading="lazy"/></Reveal>
    </div>
  </section>
</>}
