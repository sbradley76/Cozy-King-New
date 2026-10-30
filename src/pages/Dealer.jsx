import { useEffect, useState } from 'react'
import { LockKeyhole, LogOut, Plus, Trash2, Send, ShieldCheck, PackageCheck, Factory, ArrowRight } from 'lucide-react'
import fabrics from '../data/fabrics.json'

const types=['Sleeper Sofa','Loveseat','Accent Chair','Modular Sectional Piece']
const fabricNames=Object.keys(fabrics).sort()
const blankItem=()=>({type:'Sleeper Sofa',model:'1197',mechanism:'Cozy Sleep System',fabric:'',quantity:1,notes:''})

export default function Dealer(){
  const [me,setMe]=useState(null),[checking,setChecking]=useState(true),[message,setMessage]=useState(''),[items,setItems]=useState([blankItem()])
  useEffect(()=>{fetch('/api/auth/me').then(r=>r.ok?r.json():null).then(d=>setMe(d?.user||null)).finally(()=>setChecking(false))},[])
  async function login(e){e.preventDefault();setMessage('');const body=Object.fromEntries(new FormData(e.currentTarget));try{const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new Error(d.message);setMe(d.user)}catch(err){setMessage(err.message)}}
  async function logout(){await fetch('/api/auth/logout',{method:'POST'});setMe(null)}
  function update(i,key,val){setItems(items.map((x,n)=>n===i?{...x,[key]:val}:x))}
  async function order(e){e.preventDefault();setMessage('');const fd=new FormData(e.currentTarget);const body={poNumber:fd.get('poNumber'),contactName:fd.get('contactName'),contactEmail:fd.get('contactEmail'),contactPhone:fd.get('contactPhone'),notes:fd.get('notes'),items};try{const r=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new Error(d.message);setMessage(`Order ${d.orderNumber} submitted successfully.`);setItems([blankItem()]);e.currentTarget.reset()}catch(err){setMessage(err.message)}}
  if(checking)return <section className="ck-dealer-loading"><div className="shell"><span className="eyebrow">Dealer portal</span><p>Loading account…</p></div></section>

  if(!me)return <section className="ck-dealer">
    <div className="shell ck-dealer__grid">
      <div className="ck-dealer__visual">
        <img src="/assets/display/Staged_Caribbean.webp" alt="Cozy King sleeper sofa in a coastal property"/>
        <div className="ck-dealer__visual-wash"/>
        <div className="ck-dealer__visual-copy">
          <span className="eyebrow eyebrow--light">Dealer Portal</span>
          <h1>Direct tools for Cozy King partners.</h1>
          <p>Private order workflow for approved dealers working directly with the manufacturer.</p>
          <div className="ck-dealer__benefits">
            <span><PackageCheck/><b>Build orders</b><small>Products, fabrics, mechanisms & notes</small></span>
            <span><Factory/><b>Direct workflow</b><small>Orders route into Cozy King production tools</small></span>
            <span><ShieldCheck/><b>Account access</b><small>Private dealer credentials</small></span>
          </div>
        </div>
      </div>
      <div className="ck-dealer__login">
        <span className="eyebrow">Welcome back</span>
        <h2>Sign in to your dealer account.</h2>
        <p>Use the credentials assigned to your Cozy King dealer account.</p>
        <form onSubmit={login} className="ck-login-card">
          <label>Email<input type="email" name="email" required autoComplete="email"/></label>
          <label>Password<input type="password" name="password" required autoComplete="current-password"/></label>
          <button className="button button--red">Sign In <ArrowRight size={16}/></button>
          {message&&<p className="form-status">{message}</p>}
          <div className="ck-login-card__security"><LockKeyhole/><span>Dealer credentials are checked securely through the Cozy King account API.</span></div>
          <small>Local preview: configure your Hostinger database values in <code>.env</code> to enable login.</small>
        </form>
      </div>
    </div>
  </section>

  return <section className="ck-dealer-dashboard">
    <div className="shell">
      <div className="ck-dealer-dashboard__head">
        <div><span className="eyebrow">Dealer Portal</span><h1>{me.vendorName || 'Dealer'} orders</h1><p>Build and submit Cozy King product orders directly to the manufacturer.</p></div>
        <button className="button button--outline" onClick={logout}><LogOut size={16}/> Sign Out</button>
      </div>
      <form className="ck-order-builder" onSubmit={order}>
        <section className="ck-order-builder__section">
          <div className="ck-order-builder__section-head"><span>01</span><div><h2>Order information</h2><p>Reference and contact details for this submission.</p></div></div>
          <div className="order-meta"><label>PO number<input name="poNumber"/></label><label>Contact name<input name="contactName" required/></label><label>Contact email<input type="email" name="contactEmail" defaultValue={me.email} required/></label><label>Contact phone<input name="contactPhone"/></label></div>
        </section>

        <section className="ck-order-builder__section">
          <div className="ck-order-builder__section-head ck-order-builder__section-head--actions"><span>02</span><div><h2>Products</h2><p>Add each frame, upholstery selection and configuration.</p></div><button type="button" className="button button--outline button--small" onClick={()=>setItems([...items,blankItem()])}><Plus size={16}/> Add Product</button></div>
          <div className="order-items">{items.map((item,i)=><div className="ck-order-item" key={i}>
            <div className="ck-order-item__number">{String(i+1).padStart(2,'0')}</div>
            <div className="order-item__fields">
              <label>Type<select value={item.type} onChange={e=>update(i,'type',e.target.value)}>{types.map(x=><option key={x}>{x}</option>)}</select></label>
              <label>Model<input value={item.model} onChange={e=>update(i,'model',e.target.value)}/></label>
              <label>Mechanism<input value={item.mechanism} onChange={e=>update(i,'mechanism',e.target.value)}/></label>
              <label>Fabric<select value={item.fabric} onChange={e=>update(i,'fabric',e.target.value)} required><option value="">Select fabric</option>{fabricNames.map(x=><option key={x}>{x}</option>)}</select></label>
              <label>Qty<input type="number" min="1" value={item.quantity} onChange={e=>update(i,'quantity',Number(e.target.value))}/></label>
              <label className="span-2">Configuration notes<input value={item.notes} onChange={e=>update(i,'notes',e.target.value)}/></label>
            </div>
            {items.length>1&&<button type="button" className="icon-button" onClick={()=>setItems(items.filter((_,n)=>n!==i))} aria-label={`Remove product ${i+1}`}><Trash2/></button>}
          </div>)}</div>
        </section>

        <section className="ck-order-builder__section">
          <div className="ck-order-builder__section-head"><span>03</span><div><h2>Delivery & order notes</h2><p>Add anything the production team should see with the order.</p></div></div>
          <label>Order / delivery notes<textarea name="notes" rows="5"/></label>
          <div className="ck-order-builder__submit"><button className="button button--red"><Send size={16}/> Submit Order</button>{message&&<p className="form-status">{message}</p>}</div>
        </section>
      </form>
    </div>
  </section>
}
