import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Collection from './pages/Collection.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Mechanisms from './pages/Mechanisms.jsx'
import Contract from './pages/Contract.jsx'
import Projects from './pages/Projects.jsx'
import Story from './pages/Story.jsx'
import Dealer from './pages/Dealer.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App(){
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/><Route path="products" element={<Products/>}/>
    <Route path="collections/:slug" element={<Collection/>}/><Route path="product/:slug" element={<ProductDetail/>}/>
    <Route path="mechanisms" element={<Mechanisms/>}/><Route path="contract" element={<Contract/>}/>
    <Route path="projects" element={<Projects/>}/><Route path="story" element={<Story/>}/><Route path="dealer" element={<Dealer/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Route></Routes>
}
