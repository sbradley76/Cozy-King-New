import { mechanisms } from '../data/catalog.js'
import Reveal from '../components/Reveal.jsx'
import { Check, ArrowRight, BedDouble, Ruler, Wrench, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const choose = [
  {icon:BedDouble,title:'Guest comfort',copy:'Start with how often the sleeper will be used and the level of sleep comfort the room needs to deliver.'},
  {icon:Ruler,title:'Room footprint',copy:'Opening direction and available floor area matter as much as sofa dimensions when the sleeper is deployed.'},
  {icon:Wrench,title:'Serviceability',copy:'For high-turnover properties, choose a system your team can understand, inspect and support over time.'},
  {icon:ShieldCheck,title:'Use pattern',copy:'A resort rental program and an occasional-use owner unit may call for different mechanism priorities.'}
]

export default function Mechanisms(){return <>
  <section className="ck-mech-hero">
    <div className="shell ck-mech-hero__grid">
      <Reveal className="ck-mech-hero__copy">
        <span className="eyebrow eyebrow--light">Sleeper systems</span>
        <h1>The mechanism is part of the furniture specification.</h1>
        <p>Cozy King offers multiple sleep systems so dealers and hospitality partners can match comfort, footprint and use pattern to the property—not settle for one mechanism everywhere.</p>
        <div className="ck-mech-hero__actions">
          <Link className="button button--red" to="/collections/sleepers">View Sleeper Sofas <ArrowRight size={16}/></Link>
          <Link className="button button--ghost-light" to="/contract#inquiry">Specify a Project</Link>
        </div>
      </Reveal>
      <Reveal className="ck-mech-hero__visual" delay={.08}>
        <div className="ck-mech-hero__image"><img src="/assets/display/Cozy.png" alt="Cozy Sleep System sleeper mechanism"/></div>
        <div className="ck-mech-hero__badge"><b>Factory installed</b><span>Matched to compatible Cozy King frames.</span></div>
      </Reveal>
    </div>
  </section>

  <section className="ck-mech-intro">
    <div className="shell ck-mech-intro__grid">
      <Reveal><span className="eyebrow">Three approaches</span><h2>Choose the sleep system around the room.</h2></Reveal>
      <Reveal delay={.05}><p>Each mechanism solves a different specification problem. The right choice depends on the frame, guest expectations, available opening space and how hard the property will use the sleeper.</p></Reveal>
    </div>
  </section>

  <section className="ck-mech-list">
    <div className="shell">
      {mechanisms.map((m,i)=><Reveal key={m.id} className={`ck-mech-card ${i%2?'ck-mech-card--reverse':''}`}>
        <div className="ck-mech-card__media">
          <span className="ck-mech-card__number">0{i+1}</span>
          <img src={m.image} alt={m.name} loading={i ? 'lazy' : 'eager'}/>
        </div>
        <div className="ck-mech-card__body">
          <span className="eyebrow">{m.kicker}</span>
          <h2>{m.name}</h2>
          <p>{m.description}</p>
          <div className="ck-mech-card__points">{m.points.map(p=><span key={p}><Check size={16}/>{p}</span>)}</div>
          <Link className="text-arrow" to="/contract#inquiry">Ask about compatibility <ArrowRight size={15}/></Link>
        </div>
      </Reveal>)}
    </div>
  </section>

  <section className="ck-mech-choose">
    <div className="shell">
      <Reveal className="ck-mech-choose__heading"><span className="eyebrow eyebrow--light">Specification guide</span><h2>Four things to decide before you choose a mechanism.</h2></Reveal>
      <div className="ck-mech-choose__grid">
        {choose.map(({icon:Icon,title,copy},i)=><Reveal key={title} delay={i*.04}><article><Icon/><h3>{title}</h3><p>{copy}</p></article></Reveal>)}
      </div>
      <Reveal className="ck-mech-choose__bottom">
        <div><b>Not sure which system belongs in the schedule?</b><span>Send the room type, frame and expected use. We’ll help narrow it down.</span></div>
        <Link className="button button--red" to="/contract#inquiry">Start the Specification <ArrowRight size={16}/></Link>
      </Reveal>
    </div>
  </section>
</>}
