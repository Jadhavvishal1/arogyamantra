const items = [
  'Panchabhoutik Chikitsa',
  'Panchakarma Therapy',
  'Yoga Therapy · YCB Level 6',
  'Hair Regain Clinic',
  'Skinergy · Soundarya Mantra',
  'Handcrafted Ayurvedic Products',
  'KEM Hospital Trained',
  'Shirodhara · Abhyanga',
  'Women\'s Health Specialist',
  'Est. 1995 · Hadapsar Pune',
]

const Divider = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0 mx-6 opacity-40">
    <path d="M5 1L6.2 4H9.5L7 6.1L7.9 9L5 7.2L2.1 9L3 6.1L0.5 4H3.8L5 1Z" fill="white"/>
  </svg>
)

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y py-3" style={{ background: 'linear-gradient(90deg, #6B1010 0%, #8B1A1A 50%, #6B1010 100%)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center font-jost text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/85">
            <span>{item}</span>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}
