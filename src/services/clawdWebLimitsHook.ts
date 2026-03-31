import { useEffect, useState } from 'react'
import {
  type ClawdWebLimits,
  currentLimits,
  statusListeners,
} from './clawdWebLimits.js'

export function useClawdWebLimits(): ClawdWebLimits {
  const [limits, setLimits] = useState<ClawdWebLimits>({ ...currentLimits })

  useEffect(() => {
    const listener = (newLimits: ClawdWebLimits) => {
      setLimits({ ...newLimits })
    }
    statusListeners.add(listener)

    return () => {
      statusListeners.delete(listener)
    }
  }, [])

  return limits
}
