import { useEffect, useState } from 'react'
import { Building2, ClipboardCheck, Factory, Layers3, ArrowRight, CheckCircle2, Repeat2, Sofa, BedDouble } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const audiences = [
  {icon:Sofa,title:'Dealers & retailers',copy:'A focused upholstery line with direct manufacturer support for showroom stocking, special orders and repeat business.'},
  {icon:Building2,title:'Hotels & resorts',copy:'Sleeper and seating programs designed around guest comfort, repeat use, replacement planning and property-wide consistency.'},
  {icon:BedDouble,title:'Condos & vacation rentals',copy:'Space-conscious sleeper solutions and serviceable furniture for high-turnover coastal and rental properties.'},
  {icon:Layers3,title:'Design & procurement',copy:'Frame, mechanism, upholstery and configuration guidance for multi-unit schedules, renovations and repeat specifications.'}
]

export default function Contract(){
  const [status,setStatus]=useState(''); const [loading,setLoading]=useState(false)
  useEffect(()=>{if(location.hash==='#inquiry')setTimeout(()=>document.getElementById('inquiry')?.scrollIntoView({behavior:'smooth'}),100)},[])
  async function submit(e){e.preventDefault();setLoading(true);setStatus('');const body=Object.fromEntries(new FormData(e.currentTarget));try{const r=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json(); if(!r.ok)throw new Error(d.message||'Could not submit'); setStatus('Thanks — your project request has been received.'); e.currentTarget.reset()}catch(err){setStatus(err.message.includes('database')?'Local preview is working. Connect Hostinger MySQL in .env to store inquiries.':err.message)}finally{setLoading(false)}}
  return <>
    <section className="ck-contract-hero">
      <img src="/assets/display/Rosemary_Beach_Pool.jpeg" alt="" className="ck-contract-hero__image"/>
      <div className="ck-contract-hero__wash"/>
      <div className="shell ck-contract-hero__content">
        <Reveal>
          <span className="eyebrow eyebrow--light">Hospitality & Contract</span>
          <h1>Specify once. <em>Build a program you can repeat.</em></h1>
          <p>Direct manufacturer support for dealers, designers, developers, property managers and hospitality teams—from one replacement sofa to a multi-unit furniture schedule.</p>
          <div className="ck-contract-hero__actions"><a className="button button--red" href="#inquiry">Start a Project <ArrowRight size={16}/></a><Link className="button button--ghost-light" to="/projects">See Applications</Link></div>
        </Reveal>
      </div>
    </section>

    <section className="ck-contract-audience">
      <div className="shell">
        <Reveal className="ck-contract-audience__heading"><span className="eyebrow">Who we build for</span><h2>A manufacturer partner for the people furnishing the property.</h2><p>Whether you stock a showroom or specify an entire resort, our job is to make the furniture side of the project easier to repeat.</p></Reveal>
        <div className="ck-contract-audience__grid">{audiences.map(({icon:Icon,title,copy},i)=><Reveal key={title} delay={i*.04}><article><Icon/><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div>
      </div>
    </section>

    <section className="ck-contract-capabilities">
      <div className="shell ck-contract-capabilities__grid">
        <Reveal className="ck-contract-capabilities__heading"><span className="eyebrow eyebrow--light">Direct from the manufacturer</span><h2>A shorter line between the room and the factory.</h2><p>Bring us the scope, room type, quantities and performance requirements. We’ll help turn that into a repeatable furniture specification.</p></Reveal>
        <div className="ck-contract-capabilities__cards">
          <Reveal><article><Factory/><h3>Direct manufacturing</h3><p>Work closer to the source on frames, fabrics, sleeper systems and production requirements.</p></article></Reveal>
          <Reveal delay={.04}><article><Repeat2/><h3>Multi-unit consistency</h3><p>Repeat successful products across rooms and future replacements without losing configuration flexibility.</p></article></Reveal>
          <Reveal delay={.08}><article><ClipboardCheck/><h3>Project support</h3><p>Share floor plans, furniture schedules and operational needs so we can help refine the specification.</p></article></Reveal>
        </div>
      </div>
    </section>

    <section className="ck-contract-process">
      <div className="shell ck-contract-process__grid">
        <Reveal><span className="eyebrow">How we work</span><h2>From scope to production in three clear steps.</h2><p>You do not need a finished specification to start the conversation.</p></Reveal>
        <ol>
          <Reveal><li><b>01</b><span><strong>Send the scope</strong>Property type, unit count, floor plan, target install date and the pieces you’re considering.</span></li></Reveal>
          <Reveal delay={.04}><li><b>02</b><span><strong>Build the specification</strong>We align frames, sleeper systems, upholstery and layouts around use, footprint and budget.</span></li></Reveal>
          <Reveal delay={.08}><li><b>03</b><span><strong>Confirm & produce</strong>Approved project details move into manufacturing with direct communication from the team.</span></li></Reveal>
        </ol>
      </div>
    </section>

    <section className="ck-contract-inquiry" id="inquiry">
      <div className="shell ck-contract-inquiry__grid">
        <Reveal className="ck-contract-inquiry__copy">
          <span className="eyebrow eyebrow--light">Start a project</span>
          <h2>Tell us what you’re furnishing.</h2>
          <p>You don’t need a perfect spec sheet. Send what you know and we’ll start there.</p>
          <div className="ck-contract-inquiry__note"><CheckCircle2/><span><b>Dealer already?</b> Use the Dealer Portal for order workflow and account-specific tools.</span></div>
        </Reveal>
        <Reveal delay={.06}>
          <form className="ck-contract-form" onSubmit={submit}>
            <div className="field-grid"><label>Name<input name="name" required/></label><label>Company<input name="company"/></label><label>Email<input type="email" name="email" required/></label><label>Phone<input name="phone"/></label></div>
            <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select one</option><option>Vacation rental / condo</option><option>Hotel / resort</option><option>Multi-family</option><option>Residential project</option><option>Retail / dealer stocking</option><option>Other</option></select></label>
            <div className="field-grid"><label>Estimated units<input name="units" placeholder="e.g. 24 units"/></label><label>Target timing<input name="timing" placeholder="e.g. Spring 2027"/></label></div>
            <label>Project details<textarea name="message" rows="6" required placeholder="Tell us what you are furnishing, products you like, location, quantities or anything else useful."/></label>
            <input className="honeypot" name="website" tabIndex="-1" autoComplete="off"/>
            <button className="button button--red" disabled={loading}>{loading?'Sending…':'Send Project Request'} <ArrowRight size={16}/></button>
            {status&&<p className="form-status">{status}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  </>
}
