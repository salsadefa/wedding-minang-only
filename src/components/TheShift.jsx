import { motion } from 'framer-motion'

const CURTAIN_DURATION = 1.2
const TEXT_DELAY = 0.3
const TEXT_DURATION = 0.8
const ORNAMENT_DELAY = 0.2
const ORNAMENT_DURATION = 0.6

function TheShift() {
  return (
    <motion.section
      className="relative h-[100dvh] w-full overflow-hidden bg-maroon"
      aria-hidden="true"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      <div className="absolute inset-0 bg-maroon" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: CURTAIN_DURATION, ease: 'easeInOut' }}
        className="absolute inset-0 bg-maroon"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: CURTAIN_DURATION * 0.4, duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/songket-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '900px auto',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
        }}
      />

      <div className="relative flex h-[100dvh] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              delay: CURTAIN_DURATION + TEXT_DELAY,
              duration: TEXT_DURATION,
              ease: 'easeOut',
            }}
            className="space-y-3"
          >
            <p
              className="font-cormorant text-xs uppercase tracking-[0.45em] text-ivory sm:text-sm"
            >
              dan di sisi lain
            </p>
            <p className="font-cormorant text-2xl italic text-ivory sm:text-4xl">
              ada cerita yang lebih besar menanti
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              delay: CURTAIN_DURATION + TEXT_DELAY + TEXT_DURATION + ORNAMENT_DELAY,
              duration: ORNAMENT_DURATION,
              ease: 'easeOut',
            }}
            className="relative mt-2 h-4 w-[120px]"
          >
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default TheShift
