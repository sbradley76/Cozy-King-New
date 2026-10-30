import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
export default function ProductCard({product,index=0}){
  return <Reveal delay={Math.min(index*.04,.16)}><Link to={`/product/${product.slug}`} className="product-card">
    <div className="product-card__media"><img src={product.image} alt={product.name} loading="lazy"/><span className="product-card__arrow"><ArrowUpRight/></span></div>
    <div className="product-card__body"><div><span className="eyebrow">{product.short}</span><h3>{product.name}</h3></div><p>{product.dimensions}</p></div>
  </Link></Reveal>
}
