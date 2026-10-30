export default function Logo({ light = false }) {
  return (
    <span className={`brand-mark ${light ? 'brand-mark--light' : ''}`}>
      <img src="/assets/display/Logo_Large.png" alt="Cozy King Manufacturing" />
      <span className="brand-mark__type"><strong>COZY KING</strong><small>MANUFACTURING</small></span>
    </span>
  )
}
