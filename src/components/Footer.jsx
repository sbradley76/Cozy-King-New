import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const productLinks = [
  ['Sleeper Sofas', '/collections/sleepers'],
  ['Sectionals', '/collections/sectionals'],
  ['Loveseats', '/collections/loveseats'],
  ['Accent Chairs', '/collections/chairs'],
  ['Sleeper Systems', '/mechanisms'],
]

const workLinks = [
  ['Hospitality & Contract', '/contract'],
  ['Applications', '/projects'],
  ['Our Story', '/story'],
  ['Dealer Portal', '/dealer'],
]

export default function Footer(){
  return (
    <footer className="site-footer footer-v3">
      <section className="footer-v3__cta">
        <div className="footer-v3__palm" aria-hidden="true" />
        <div className="shell footer-v3__cta-inner">
          <div className="footer-v3__cta-copy">
            <p className="footer-v3__eyebrow">Direct from the manufacturer</p>
            <h2>Put Cozy King on the<br className="footer-v3__desktop-break"/> next furniture schedule.</h2>
            <p className="footer-v3__lead">
              Dealer stocking, hotel and resort programs, vacation-rental packages<br className="footer-v3__desktop-break"/> and multi-unit specifications.
            </p>
            <div className="footer-v3__actions">
              <Link className="footer-v3__button footer-v3__button--primary" to="/contract#inquiry">
                Start a Project <ArrowRight size={19} strokeWidth={2.1}/>
              </Link>
              <Link className="footer-v3__button footer-v3__button--outline" to="/products">
                View Product Line <ArrowRight size={19} strokeWidth={2.1}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-v3__rule" />

      <div className="shell footer-v3__grid">
        <section className="footer-v3__brand" aria-label="Cozy King Manufacturing">
          <Logo light />
          <p>
            Upholstered furniture manufactured in Tremont, Mississippi for dealers,
            hospitality groups, vacation-rental operators, designers and property professionals.
          </p>
        </section>

        <nav className="footer-v3__column" aria-label="Product line">
          <h3>Product Line</h3>
          <span className="footer-v3__accent" aria-hidden="true" />
          <div className="footer-v3__links">
            {productLinks.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
          </div>
        </nav>

        <nav className="footer-v3__column" aria-label="Work with Cozy King">
          <h3>Work With Us</h3>
          <span className="footer-v3__accent" aria-hidden="true" />
          <div className="footer-v3__links">
            {workLinks.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}
          </div>
        </nav>

        <section className="footer-v3__column footer-v3__factory">
          <h3>Factory</h3>
          <span className="footer-v3__accent" aria-hidden="true" />
          <div className="footer-v3__contact">
            <p>Tremont, Mississippi</p>
            <a href="tel:+16622210783">(662) 221-0783</a>
            <a href="mailto:info@thecozyking.com">info@thecozyking.com</a>
          </div>
          <span className="footer-v3__mini-rule" aria-hidden="true" />
          <p className="footer-v3__factory-copy">
            Serving furniture dealers, procurement teams and hospitality properties nationwide.
          </p>
        </section>
      </div>

      <div className="shell footer-v3__bottom">
        <span>© {new Date().getFullYear()} The Cozy King LLC</span>
        <span>Upholstered Furniture Manufacturing <b aria-hidden="true">•</b> Tremont, Mississippi</span>
      </div>
    </footer>
  )
}
