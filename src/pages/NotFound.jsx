import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
export default function NotFound(){return <section className="ck-404">
  <div className="ck-404__palm" aria-hidden="true"/>
  <div className="shell ck-404__inner">
    <span className="eyebrow eyebrow--light">404 · Room not found</span>
    <h1>That specification<br/>isn’t on the schedule.</h1>
    <p>The page may have moved while Cozy King was rebuilding the site. The product line and project tools are still right where they should be.</p>
    <div className="ck-404__actions"><Link className="button button--red" to="/"><ArrowLeft size={16}/> Back Home</Link><Link className="button button--ghost-light" to="/products">View Product Line <ArrowRight size={16}/></Link></div>
  </div>
</section>}
