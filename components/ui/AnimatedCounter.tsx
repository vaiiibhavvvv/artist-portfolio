'use client'

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString() + suffix
      }
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}
