import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { getSelectedRole } from '../services/roleService'

const SCANNER_ELEMENT_ID = 'machine-qr-reader'

const extractMachineId = (rawText) => {
  if (!rawText) {
    return null
  }

  const trimmed = rawText.trim()

  try {
    const parsed = JSON.parse(trimmed)
    return parsed.machine_id || parsed.machineId || parsed.id || null
  } catch {
    // Not JSON, continue with plain text patterns.
  }

  const machineParamMatch = trimmed.match(/[?&]machine_id=([^&]+)/i)
  if (machineParamMatch && machineParamMatch[1]) {
    return decodeURIComponent(machineParamMatch[1])
  }

  const slashMatch = trimmed.match(/\/machine\/(.+)$/i)
  if (slashMatch && slashMatch[1]) {
    return decodeURIComponent(slashMatch[1])
  }

  return trimmed
}

function QRScanner() {
  const navigate = useNavigate()
  const selectedRole = getSelectedRole()
  const scannerRef = useRef(null)
  const hasScannedRef = useRef(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState('')

  const stopScanner = async () => {
    const scanner = scannerRef.current
    if (!scanner) {
      return
    }

    try {
      if (scanner.isScanning) {
        await scanner.stop()
      }
      await scanner.clear()
    } catch {
      // Ignore clear/stop teardown errors.
    } finally {
      scannerRef.current = null
      setIsActive(false)
    }
  }

  const startScanner = async () => {
    setError('')
    setIsStarting(true)
    hasScannedRef.current = false

    try {
      await stopScanner()
      const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID)
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        async (decodedText) => {
          if (hasScannedRef.current) {
            return
          }

          const machineId = extractMachineId(decodedText)
          if (!machineId) {
            setError('QR scanned but machine_id was not found.')
            return
          }

          hasScannedRef.current = true
          await stopScanner()
          if (selectedRole === 'recycler') {
            navigate(`/recycler/machine/${machineId}`)
            return
          }

          navigate(`/machine/${machineId}`)
        },
        () => {
          // Ignore frame-by-frame decode errors to keep UI clean.
        }
      )

      setIsActive(true)
    } catch (scannerError) {
      const message = scannerError?.message || 'Unable to start camera scanner.'
      if (message.toLowerCase().includes('permission')) {
        setError('Camera permission denied. Please allow camera access and try again.')
      } else {
        setError(message)
      }
      await stopScanner()
    } finally {
      setIsStarting(false)
    }
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return (
    <div className="scanner-box">
      <p>Click start, allow camera access, and scan the machine QR code.</p>

      <div className="scanner-actions">
        {!isActive ? (
          <button type="button" className="btn-primary" onClick={startScanner} disabled={isStarting}>
            {isStarting ? 'Starting camera...' : 'Start Scanner'}
          </button>
        ) : (
          <button type="button" className="btn-secondary" onClick={stopScanner}>
            Stop Scanner
          </button>
        )}
      </div>

      <div id={SCANNER_ELEMENT_ID} className="scanner-reader" />

      {error && <p className="form-error scanner-error">{error}</p>}
    </div>
  )
}

export default QRScanner
