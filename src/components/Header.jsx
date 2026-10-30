import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'

const productLinks = [
  ['Sleeper Sofas','/collections/sleepers'],
  ['Modular Sectionals','/collections/sectionals'],
  ['Loveseats','/collections/loveseats'],
  ['HAZ Chairs','/collections/chairs'],
  ['Sleeper Mechanisms','/mechanisms']
]

export default function Header() {
  const [open,setOpen] = useState(false)
  const [productsOpen,setProductsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  useEffect(() => { setOpen(false); setProductsOpen(false); window.scrollTo(0,0) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); setProductsOpen(false) }
    }
    const onPointer = (event) => {
      if (productsOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) setProductsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [productsOpen])

  return <>
    <header className="site-header site-header--reference">
      <div className="site-header__inner site-header__inner--wide">
        <Link to="/" className="site-logo" aria-label="Cozy King Manufacturing home"><Logo /></Link>

        <nav className="desktop-nav desktop-nav--reference" aria-label="Primary navigation">
          <div className="nav-dropdown" ref={dropdownRef}>
            <button onClick={() => setProductsOpen(v=>!v)} aria-expanded={productsOpen} aria-haspopup="true">Product Line <ChevronDown size={15}/></button>
            <AnimatePresence>
              {productsOpen && <motion.div
                className="nav-dropdown__menu"
                initial={reduceMotion ? false : { opacity:0, y:-8, scale:.985 }}
                animate={reduceMotion ? {} : { opacity:1, y:0, scale:1 }}
                exit={reduceMotion ? {} : { opacity:0, y:-6, scale:.99 }}
                transition={{ duration:.2, ease:[.22,1,.36,1] }}
              >
                <div><span className="eyebrow">Manufacturer product line</span><h3>Commercial upholstery built for repeat business.</h3><Link className="nav-dropdown__all" to="/products">View all products <ArrowUpRight size={14}/></Link></div>
                <div className="nav-dropdown__links">{productLinks.map(([label,to])=><Link key={to} to={to}>{label}<ArrowUpRight size={15}/></Link>)}</div>
              </motion.div>}
            </AnimatePresence>
          </div>
          <NavLink to="/contract">Hospitality & Contract</NavLink>
          <NavLink to="/projects">Applications</NavLink>
          <NavLink to="/story">Our Story</NavLink>
          <NavLink to="/dealer">Dealer Portal</NavLink>
        </nav>

        <div className="header-actions header-actions--reference">
          <Link to="/contract#inquiry" className="button button--small button--red header-project-button">Start a Project <ArrowRight size={16}/></Link>
          <button className="mobile-menu-toggle" onClick={()=>setOpen(v=>!v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open?<X/>:<Menu/>}</button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {open && <motion.div
        className="mobile-menu mobile-menu--reference"
        initial={reduceMotion ? false : { opacity:0, y:-10 }}
        animate={reduceMotion ? {} : { opacity:1, y:0 }}
        exit={reduceMotion ? {} : { opacity:0, y:-8 }}
        transition={{ duration:.22, ease:[.22,1,.36,1] }}
      >
        <div className="shell mobile-menu__inner">
          <Link to="/products" className="mobile-menu__primary">Product Line</Link>
          {productLinks.map(([label,to])=><Link key={to} to={to}>{label}</Link>)}
          <Link to="/contract">Hospitality & Contract</Link>
          <Link to="/projects">Applications</Link>
          <Link to="/story">Our Story</Link>
          <Link to="/dealer">Dealer Portal</Link>
          <Link to="/contract#inquiry" className="mobile-project-link">Start a Project <ArrowRight size={16}/></Link>
        </div>
      </motion.div>}
    </AnimatePresence>
  </>
}
