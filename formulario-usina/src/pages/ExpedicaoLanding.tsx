import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  Tent, Wrench, MapPinned, UtensilsCrossed, ShieldCheck, Users, ImageOff, ArrowRight, Check, Phone,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import TrailLine from '../components/TrailLine'
import Lightbox from '../components/Lightbox'

/* ────────────────────────────────────────────────────────────────────
   CONFIGURAÇÃO DE CONTEÚDO
──────────────────────────────────────────────────────────────────── */
const HERO_IMAGE = '/images/CamposFormulario.png'

const GALERIA_INSTAGRAM = [
  { src: '/images/Carrosel/imagem1.jpeg', alt: 'Registro da edição anterior — roteiro do primeiro dia' },
  { src: '/images/Carrosel/imagem2.jpeg', alt: 'Registro da edição anterior — roteiro do segundo dia' },
  { src: '/images/Carrosel/imagem3.jpeg', alt: 'Registro da estrutura de apoio da edição anterior' },
  { src: '/images/Carrosel/imagem4.jpeg', alt: 'Registro da hospedagem da edição anterior' },
  { src: '/images/Carrosel/imagem5.jpeg', alt: 'Registro de trilhas e paisagens da edição anterior' },
  { src: '/images/Carrosel/imagem6.jpeg', alt: 'Orientações da edição anterior' },
  { src: '/images/Carrosel/imagem7.jpeg', alt: 'Regras de segurança da edição anterior' },
  { src: '/images/Carrosel/imagem8.jpeg', alt: 'Registro de uma edição anterior da expedição' },
]

const INCLUSOS = [
  { icon: Tent, titulo: 'Hospedagem na serra', desc: 'Pousada reservada para todo o grupo durante os dias de expedição.' },
  { icon: Wrench, titulo: 'Apoio mecânico', desc: 'Equipe técnica acompanhando o comboio, pronta pra qualquer imprevisto.' },
  { icon: MapPinned, titulo: 'Roteiro guiado', desc: 'Trilhas selecionadas e sinalizadas, com guias que conhecem o terreno.' },
  { icon: UtensilsCrossed, titulo: 'Refeições nos dias de trilha', desc: 'Você foca em pilotar — a logística de comida a gente resolve.' },
  { icon: ShieldCheck, titulo: 'Suporte e segurança', desc: 'Equipe de resgate e protocolo de segurança em todo o percurso.' },
  { icon: Users, titulo: 'Grupo fechado', desc: 'Turma limitada, pensada pra criar uma experiência coletiva de verdade.' },
]

/* ── Roteiro dia a dia ──────────────────────────────────────────── */
const ROTEIRO = [
  {
    dia: 'Dia 1',
    data: 'Sexta-feira · 30/10',
    titulo: 'Chegada, abertura e pôr do sol',
    imagem: '/images/imagensRoteiro/imagem3.png',
    atividades: [
      'Chegada dos participantes por volta das 14h',
      'Café de boas-vindas e abertura do evento às 17h',
      'Saída no fim da tarde para a trilha',
      'Pôr do sol no Pico do Imbiri',
      'Jantar no Fattoria',
    ],
  },
  {
    dia: 'Dia 2',
    data: 'Sábado · 31/10',
    titulo: 'Primeiro dia de cachoeiras',
    imagem: '/images/imagensRoteiro/imagem2.png',
    atividades: [
      'Saída cedo para o roteiro de cachoeiras',
      'Percurso off-road pelo Caminho das Cachoeiras',
      'Almoço incluído',
      'Jantar incluído',
    ],
  },
  {
    dia: 'Dia 3',
    data: 'Domingo · 01/11',
    titulo: 'Segundo dia de cachoeiras',
    imagem: '/images/imagensRoteiro/imagem1.png',
    atividades: [
      'Saída cedo para o segundo dia do roteiro de cachoeiras',
      'Continuação do percurso off-road',
      'Almoço incluído',
      'Jantar incluído',
      'Hospedagem de domingo para segunda-feira incluída',
    ],
  },
  {
    dia: 'Dia livre',
    data: 'Segunda-feira · 02/11',
    titulo: 'Campos do Jordão ou retorno',
    imagem: '/images/imagensRoteiro/imagem3.png',
    atividades: [
      'Dia livre para aproveitar Campos do Jordão',
      'Retorno para casa no horário que cada participante preferir',
    ],
  },
]

/* ── Grid de fotos da expedição (3x2) ───────────────────────────── */
const FOTOS_EXPEDICAO = [
  { src: '/images/imagensExpedicao/foto1.jpg', alt: 'Registro da hospedagem de uma edição anterior' },
  { src: '/images/imagensExpedicao/foto2.jpg', alt: 'Quadriciclos reunidos em uma edição anterior' },
  { src: '/images/imagensExpedicao/foto3.jpg', alt: 'Grupo em trajeto off-road de uma edição anterior' },
  { src: '/images/imagensExpedicao/foto4.jpg', alt: 'Parada durante uma edição anterior' },
  { src: '/images/imagensExpedicao/foto5.jpg', alt: 'Trilha na Serra da Mantiqueira' },
  { src: '/images/imagensExpedicao/foto6.jpg', alt: 'Comboio off-road de uma edição anterior' },
]

/* ── Variantes de animação reutilizáveis ─────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

/* ── Imagem com fallback ── */
function ImagemComFallback({
  src, alt, aspectRatio = '4 / 5',
}: { src: string; alt: string; aspectRatio?: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <div style={{ width: '100%', aspectRatio, position: 'relative', overflow: 'hidden', background: '#F0F0EE', borderRadius: '1.25rem' }}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '1.25rem' }}
        />
      ) : (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '0.75rem', background: 'linear-gradient(155deg, #171717 0%, #0A0A0A 100%)',
            border: '1.5px dashed rgba(255,123,0,0.35)', borderRadius: '1.25rem', color: 'rgba(255,255,255,0.4)', padding: '1.5rem', textAlign: 'center',
          }}
        >
          <ImageOff size={22} style={{ color: '#FF7B00', opacity: 0.7 }} />
          <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', lineHeight: 1.6 }}>
            {alt}<br />(substitua por {src.split('/').pop()})
          </span>
        </div>
      )}
    </div>
  )
}

/* ── PostCard ── */
function PostCard({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{
        flex: '0 0 auto', width: 'clamp(210px, 24vw, 270px)', aspectRatio: '4 / 5',
        border: 'none', padding: 0, cursor: 'pointer', position: 'relative', overflow: 'hidden',
        background: '#F0F0EE', scrollSnapAlign: 'start',
      }}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
        />
      ) : (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '0.75rem', background: 'linear-gradient(155deg, #171717 0%, #0A0A0A 100%)',
            border: '1.5px dashed rgba(255,123,0,0.35)', color: 'rgba(255,255,255,0.4)', padding: '1.5rem', textAlign: 'center',
          }}
        >
          <ImageOff size={22} style={{ color: '#FF7B00', opacity: 0.7 }} />
          <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', lineHeight: 1.6 }}>
            {alt}<br />(substitua por {src.split('/').pop()})
          </span>
        </div>
      )}
      <div
        style={{
          position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)',
          display: 'flex', alignItems: 'flex-end', padding: '1rem', opacity: 0,
          transition: 'opacity 0.25s',
        }}
        className="post-card-overlay"
      >
        <span className="mono" style={{ color: '#fff', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          Ampliar
        </span>
      </div>
    </motion.button>
  )
}

/* ── DiaCard ── */
function DiaCard({ dia, invertido }: { dia: typeof ROTEIRO[number]; invertido: boolean }) {
  return (
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}
      className="roteiro-card-mobile"
      style={{
        display: 'flex', flexDirection: invertido ? 'row-reverse' : 'row', flexWrap: 'wrap',
        alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)', paddingTop: 'clamp(3rem, 6vh, 5rem)',
        paddingBottom: 'clamp(3rem, 6vh, 5rem)',
      }}
    >
      <motion.div variants={fadeUp} style={{ flex: '1.15 1 400px', minWidth: '300px', maxWidth: '560px' }}>
        <ImagemComFallback src={dia.imagem} alt={`Imagem de referência — ${dia.titulo}`} aspectRatio="4 / 3" />
      </motion.div>

      <div style={{ flex: '1 1 380px', minWidth: '280px' }}>
        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', marginBottom: '1.25rem' }}>
          <span className="display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.4rem)', color: '#FF7B00', lineHeight: 1 }}>
            {dia.dia}
          </span>
          <span className="mono" style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#888' }}>
            {dia.data}
          </span>
        </motion.div>
        <motion.h3
          variants={fadeUp}
          className="display" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: '#0A0A0A', marginBottom: '1.5rem' }}
        >
          {dia.titulo}
        </motion.h3>
        <motion.ul variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {dia.atividades.map(atividade => (
            <motion.li
              key={atividade} variants={fadeUp}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1.02rem', color: '#444', lineHeight: 1.65 }}
            >
              <span
                style={{
                  flexShrink: 0, width: '1.35rem', height: '1.35rem', borderRadius: '50%', background: 'rgba(255,123,0,0.1)',
                  color: '#FF7B00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.1rem',
                }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {atividade}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default function ExpedicaoLanding() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [fotosLightboxIndex, setFotosLightboxIndex] = useState<number | null>(null)

  return (
    <div style={{ background: '#fff' }}>
      <TopBar />

      {/* ── HERO: a arte é a protagonista, sem textos duplicados ── */}
      <section className="landing-poster-hero" aria-labelledby="landing-event-title">
        <h1 id="landing-event-title" className="sr-only">Expedição Caminho das Cachoeiras</h1>
        <img className="landing-poster-hero__image" src={HERO_IMAGE} alt="Expedição Caminho das Cachoeiras, de 30 de outubro a 1 de novembro" />
        <div className="landing-poster-hero__shade" aria-hidden />
      </section>

      <section className="landing-hero-action" aria-label="Informações principais da expedição">
        <div className="wrap landing-hero-action__inner">
          <div>
            <span className="mono landing-hero-action__date">30 OUT · 01 NOV 2026</span>
            <p className="landing-hero-action__place">Campos do Jordão + Santo Antônio do Pinhal · Saída de São Paulo</p>
          </div>
          <Link to="/inscricao" className="btn-primary landing-hero-action__button">
            Quero minha vaga <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <TrailLine>

        {/* ── SOBRE A EXPEDIÇÃO ──────────────── */}
        <section className="section" style={{ paddingBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
          <div className="wrap wrap-mobile-pad" style={{ maxWidth: '880px', marginLeft: 'clamp(0px, 8vw, 120px)' }}>
            <motion.span initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="eyebrow" style={{ marginBottom: '1rem' }}>
              A Expedição
            </motion.span>

            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              className="display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: '#0A0A0A', marginBottom: '1.5rem' }}
            >
              Cachoeiras à frente. Máquina pronta.
            </motion.h2>

            <motion.p
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', color: '#555', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '640px' }}
            >
              De 30 de outubro a 1º de novembro de 2026, a Expedição Off-Road Usina do Jet percorre
              o Caminho das Cachoeiras entre Campos do Jordão e Santo Antônio do Pinhal. A experiência
              termina com hospedagem incluída e uma segunda-feira livre para curtir a serra ou voltar para casa.
            </motion.p>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}
              className="event-date-grid"
              style={{ borderTop: '1px solid #EBEBEB', paddingTop: '2rem' }}
            >
              {[
                { n: '30 OUT', l: 'Chegada e abertura' },
                { n: '31 OUT', l: 'Cachoeiras · Dia 1' },
                { n: '01 NOV', l: 'Cachoeiras · Dia 2' },
                { n: '02 NOV', l: 'Check-out e dia livre' },
              ].map(stat => (
                <motion.div key={stat.l} variants={fadeUp}>
                  <p className="display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FF7B00', marginBottom: '0.35rem' }}>{stat.n}</p>
                  <p className="mono" style={{ fontSize: 'clamp(0.78rem, 1.4vw, 0.92rem)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#888' }}>{stat.l}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ROTEIRO DIA A DIA ────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap wrap-mobile-pad" style={{ marginLeft: 'clamp(0px, 8vw, 120px)' }}>
            <motion.span initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="eyebrow" style={{ marginBottom: '1rem' }}>
              O roteiro
            </motion.span>
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              className="display" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#0A0A0A', marginBottom: '3rem', maxWidth: '640px' }}
            >
              Do pôr do sol às cachoeiras, com segunda-feira livre.
            </motion.h2>

            <div style={{ borderTop: '1px solid #EBEBEB' }}>
              {ROTEIRO.map((dia, i) => (
                <div key={dia.dia} style={{ borderBottom: '1px solid #EBEBEB' }}>
                  <DiaCard dia={dia} invertido={i % 2 === 1} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALERIA DO INSTAGRAM ────────────────────────────── */}
        <section className="section" style={{ background: '#F7F7F5' }}>
          <div className="wrap wrap-mobile-pad" style={{ marginLeft: 'clamp(0px, 8vw, 120px)' }}>
            <motion.span initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="eyebrow" style={{ marginBottom: '1rem' }}>
              No Instagram
            </motion.span>
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              className="display" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#0A0A0A', marginBottom: '0.75rem' }}
            >
              Tudo o que rola por lá
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              style={{ fontSize: '1rem', color: '#777', marginBottom: '2.5rem', maxWidth: '520px' }}
            >
              Enquanto os novos conteúdos estão sendo preparados, relembre alguns registros da edição anterior. Clique em qualquer imagem para ampliar.
            </motion.p>
          </div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={staggerContainer}
            className="no-scrollbar reset-margin-mobile"
            style={{
              display: 'flex', gap: '1.25rem', overflowX: 'auto', scrollSnapType: 'x mandatory',
              padding: '0 clamp(1.5rem, 5vw, 7rem) 0.5rem', marginLeft: 'clamp(0px, 8vw, 120px)',
            }}
          >
            {GALERIA_INSTAGRAM.map((img, i) => (
              <PostCard key={img.src} src={img.src} alt={img.alt} onClick={() => setLightboxIndex(i)} />
            ))}
          </motion.div>
        </section>

        {/* ── O QUE ESTÁ INCLUSO ──────────────────────────────── */}
        <section className="section">
          <div className="wrap wrap-mobile-pad" style={{ marginLeft: 'clamp(0px, 8vw, 120px)' }}>
            <motion.span initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="eyebrow" style={{ marginBottom: '1rem' }}>
              O que está incluso
            </motion.span>
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              className="display" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#0A0A0A', marginBottom: '2.5rem' }}
            >
              Você foca na trilha. O resto é com a gente.
            </motion.h2>

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={staggerContainer}
              className="grid-inclusos-mobile"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
            >
              {INCLUSOS.map(item => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.titulo} variants={fadeUp}
                    style={{ border: '1px solid #EBEBEB', padding: '2rem', background: '#fff' }}
                  >
                    <div style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,123,0,0.08)', color: '#FF7B00', marginBottom: '1.25rem' }}>
                      <Icon size={20} />
                    </div>
                    <p className="display" style={{ fontSize: '1.05rem', color: '#0A0A0A', marginBottom: '0.6rem' }}>{item.titulo}</p>
                    <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.7 }}>{item.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

      </TrailLine>

      {/* ── LOCAÇÃO DE VEÍCULOS ──────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(5rem, 11vh, 8rem) 0', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', top: '-20%', right: '-10%', width: '55%', aspectRatio: '1 / 1', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,123,0,0.14) 0%, transparent 70%)', pointerEvents: 'none',
          }}
        />
        <div className="wrap wrap-mobile-pad" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <div style={{ flex: '1 1 380px', minWidth: '280px' }}>
            <motion.span initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="eyebrow" style={{ marginBottom: '1rem' }}>
              Locação de veículos
            </motion.span>
            <motion.h2
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              className="display" style={{ fontSize: 'clamp(2rem, 4.8vw, 3.2rem)', color: '#fff', marginBottom: '1.5rem', maxWidth: '520px' }}
            >
              Não tem UTV ou quadriciclo? A gente resolve.
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2.25rem', maxWidth: '480px' }}
            >
              Locação de quadriciclos e UTVs disponível pra quem não possui veículo próprio.
              Fale com a gente pelo WhatsApp e consulte valores e disponibilidade — a locação
              é à parte do pacote da expedição.
            </motion.p>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <a
                href="https://wa.me/5511964467000"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '1.1rem 2.5rem', fontSize: '0.78rem' }}
              >
                <Phone size={16} /> Consultar no WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}
            style={{
              flex: '1 1 300px', minWidth: '260px', border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.035)', padding: 'clamp(2rem, 4vw, 2.75rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {[
              'Quadriciclos e UTVs disponíveis para a expedição',
              'Ideal pra quem não possui veículo próprio',
              'Consulte valores pelo WhatsApp: +55 11 96446-7000',
            ].map(linha => (
              <motion.div key={linha} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <span
                  style={{
                    flexShrink: 0, width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'rgba(255,123,0,0.14)',
                    color: '#FF7B00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.1rem',
                  }}
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', lineHeight: 1.6 }}>{linha}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(5rem, 12vh, 9rem) 0' }}>
        <div className="wrap wrap-mobile-pad" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#fff', marginBottom: '1.25rem' }}
          >
            Bora pro Caminho das Cachoeiras?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '480px', marginBottom: '2.5rem', lineHeight: 1.7 }}
          >
            Vagas limitadas para garantir a segurança e a estrutura do grupo. Garanta seu lugar entre Campos do Jordão e Santo Antônio do Pinhal.
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <Link to="/inscricao" className="btn-primary" style={{ padding: '1.15rem 2.75rem', fontSize: '0.78rem' }}>
              Quero minha vaga <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem 0' }}>
        <div className="wrap wrap-mobile-pad" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <img src="/images/logo usina 1000px x 1000px.png" alt="Usina do Jet" style={{ height: '2.25rem', width: 'auto', objectFit: 'contain' }} />
          <p className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Usina do Jet. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <Lightbox
        images={GALERIA_INSTAGRAM}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <Lightbox
        images={FOTOS_EXPEDICAO}
        index={fotosLightboxIndex}
        onClose={() => setFotosLightboxIndex(null)}
        onNavigate={setFotosLightboxIndex}
      />
    </div>
  )
}
