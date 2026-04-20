import { ImageResponse } from 'next/og'

export const alt = 'Greenter — Rénovation Énergétique RGE'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #0f7a3d 0%, #1a9e52 55%, #38c172 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Greenter
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 980,
            }}
          >
            Rénovation Énergétique Certifiée RGE
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              opacity: 0.92,
              maxWidth: 980,
            }}
          >
            Pompe à chaleur · Panneaux solaires · Isolation · Audit
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            fontWeight: 500,
            opacity: 0.95,
          }}
        >
          <div style={{ display: 'flex' }}>Devis gratuit sous 48h</div>
          <div style={{ display: 'flex' }}>greenter.fr</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
