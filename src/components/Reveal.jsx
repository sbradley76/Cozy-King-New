import { motion, useReducedMotion } from 'framer-motion'
export default function Reveal({children,className='',delay=0}){
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={reduce?{}:{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
