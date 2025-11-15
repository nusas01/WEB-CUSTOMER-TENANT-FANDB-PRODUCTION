const handleDownloadQR = async (
  tableNumber = null,
  takeAway = null,
  imageUrl = '',
  storeName = 'Nama Toko',
  callbacks = {} // { onStart, onSuccess, onError, onFinally }
) => {
  const { onStart, onSuccess, onError, onFinally } = callbacks

  if (onStart) onStart()

  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const image = new Image()

    image.crossOrigin = 'anonymous'
    image.src = `https://assets.nusas.id/${imageUrl}`

    await new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          // Layout horizontal - lebih lebar
          const width = 900
          const height = 500
          const padding = 40

          canvas.width = width
          canvas.height = height

          const isTakeAway = Boolean(takeAway)

          // === BACKGROUND ===
          // Modern gradient background
          const bgGradient = ctx.createLinearGradient(0, 0, width, height)
          bgGradient.addColorStop(0, '#ffffff')
          bgGradient.addColorStop(1, '#f8fafc')
          ctx.fillStyle = bgGradient
          ctx.fillRect(0, 0, width, height)

          // === LEFT SECTION - INFORMASI ===
          const leftWidth = 480
          const rightStart = leftWidth + 40

          // Header
          ctx.fillStyle = '#0f172a'
          ctx.font = 'bold 36px Arial, sans-serif'
          ctx.textAlign = 'left'
          const titleText = isTakeAway ? 'Pesanan Take Away' : `Meja ${tableNumber}`
          ctx.fillText(titleText, padding, padding + 40)

          // Subtitle dengan icon scan effect
          ctx.fillStyle = '#64748b'
          ctx.font = '16px Arial, sans-serif'
          const subtitleText = isTakeAway 
            ? 'Scan kode QR untuk pesan take away' 
            : 'Scan kode QR untuk melakukan pemesanan'
          ctx.fillText(subtitleText, padding, padding + 75)

          // Divider line
          ctx.strokeStyle = '#e2e8f0'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(padding, padding + 100)
          ctx.lineTo(leftWidth - padding, padding + 100)
          ctx.stroke()

          // === HOW TO USE SECTION ===
          let currentY = padding + 140

          ctx.fillStyle = '#1e293b'
          ctx.font = 'bold 18px Arial, sans-serif'
          ctx.fillText('How to Order:', padding, currentY)
          currentY += 35

          const steps = [
            { num: '1', text: 'Open your phone camera' },
            { num: '2', text: 'Point at the QR code' },
            { num: '3', text: 'Tap the notification' },
            { num: '4', text: 'Browse & order easily' }
          ]

          ctx.font = '15px Arial, sans-serif'
          steps.forEach((step, index) => {
            // Number circle
            ctx.fillStyle = '#3b82f6'
            ctx.beginPath()
            ctx.arc(padding + 15, currentY - 5, 15, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 14px Arial, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(step.num, padding + 15, currentY + 1)

            // Step text
            ctx.fillStyle = '#475569'
            ctx.font = '15px Arial, sans-serif'
            ctx.textAlign = 'left'
            ctx.fillText(step.text, padding + 45, currentY)

            currentY += 32
          })

          // === SECURITY INFO BOX ===
          currentY += 10
          const securityBoxY = currentY
          const securityBoxHeight = 120

          // Security box with modern style
          const roundRect = (x, y, w, h, r) => {
            ctx.beginPath()
            ctx.moveTo(x + r, y)
            ctx.lineTo(x + w - r, y)
            ctx.quadraticCurveTo(x + w, y, x + w, y + r)
            ctx.lineTo(x + w, y + h - r)
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
            ctx.lineTo(x + r, y + h)
            ctx.quadraticCurveTo(x, y + h, x, y + h - r)
            ctx.lineTo(x, y + r)
            ctx.quadraticCurveTo(x, y, x + r, y)
            ctx.closePath()
          }

          roundRect(padding, securityBoxY, leftWidth - padding * 2, securityBoxHeight, 12)
          
          // Gradient background
          const secGradient = ctx.createLinearGradient(padding, securityBoxY, padding, securityBoxY + securityBoxHeight)
          secGradient.addColorStop(0, '#fef3c7')
          secGradient.addColorStop(1, '#fef9e7')
          ctx.fillStyle = secGradient
          ctx.fill()

          // Border
          ctx.strokeStyle = '#f59e0b'
          ctx.lineWidth = 2
          ctx.stroke()

          // Security icon area (simulated)
          ctx.fillStyle = '#f59e0b'
          ctx.beginPath()
          ctx.arc(padding + 20, securityBoxY + 25, 12, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 14px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('!', padding + 20, securityBoxY + 30)

          // Security text
          ctx.fillStyle = '#92400e'
          ctx.font = 'bold 15px Arial, sans-serif'
          ctx.textAlign = 'left'
          ctx.fillText('Security Check', padding + 45, securityBoxY + 30)

          ctx.fillStyle = '#78716c'
          ctx.font = '13px Arial, sans-serif'
          const securityLines = [
            `Verify URL: https://${window.location.hostname}`,
            'Ensure browser shows "Secure" connection',
            'Report any suspicious warnings to staff'
          ]

          let secY = securityBoxY + 55
          securityLines.forEach(line => {
            ctx.fillText(line, padding + 20, secY)
            secY += 22
          })

          // === RIGHT SECTION - QR CODE ===
          const qrSize = 320
          const qrX = rightStart + 30
          const qrY = (height - qrSize) / 2 - 20

          // QR Container with elegant shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.08)'
          ctx.shadowBlur = 30
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 10

          const qrPadding = 20
          roundRect(
            qrX - qrPadding,
            qrY - qrPadding,
            qrSize + qrPadding * 2,
            qrSize + qrPadding * 2,
            16
          )
          ctx.fillStyle = '#ffffff'
          ctx.fill()

          // Reset shadow
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0

          // Border
          ctx.strokeStyle = '#e2e8f0'
          ctx.lineWidth = 1
          ctx.stroke()

          // QR Code
          ctx.drawImage(image, qrX, qrY, qrSize, qrSize)

          // === LOGO NUSAS IN QR CORNER ===
          const logo = new Image()
          logo.crossOrigin = 'anonymous'
          logo.src = 'https://assets.nusas.id/logo_nusas_1.png'
          
          await new Promise((resolveLoad) => {
            logo.onload = () => {
              const logoSize = 50
              const logoX = qrX + qrSize - logoSize - 8
              const logoY = qrY + qrSize - logoSize - 8
              
              // White rounded background for logo
              ctx.fillStyle = '#ffffff'
              roundRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 8)
              ctx.fill()
              
              ctx.strokeStyle = '#e2e8f0'
              ctx.lineWidth = 1
              ctx.stroke()
              
              // Logo
              ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
              resolveLoad()
            }
            logo.onerror = () => resolveLoad()
          })

          // === STORE NAME BELOW QR ===
          const storeY = qrY + qrSize + qrPadding + 30
          
          ctx.fillStyle = '#0f172a'
          ctx.font = 'bold 22px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(storeName, qrX + qrSize / 2, storeY)

          // Powered by nusas
          ctx.fillStyle = '#94a3b8'
          ctx.font = '12px Arial, sans-serif'
          ctx.fillText('powered by nusas', qrX + qrSize / 2, storeY + 25)

          // === FOOTER ===
          ctx.fillStyle = '#cbd5e1'
          ctx.font = '11px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Your safety and comfort are our priority • Thank you for visiting!', width / 2, height - 20)

          // === DECORATIVE ELEMENTS ===
          // Top-left corner accent
          ctx.fillStyle = '#3b82f6'
          ctx.fillRect(0, 0, 4, 60)
          ctx.fillRect(0, 0, 60, 4)

          // Download
          const filename = isTakeAway ? `qr-takeaway.png` : `qr-table-${tableNumber}.png`

          const link = document.createElement('a')
          link.download = filename
          link.href = canvas.toDataURL('image/png', 1.0)
          link.click()

          if (onSuccess) onSuccess(filename)

          resolve()
        } catch (error) {
          reject(error)
        }
      }

      image.onerror = () => {
        reject(new Error('Failed to load QR image'))
      }
    })
  } catch (error) {
    if (onError) onError(error.message)
  } finally {
    if (onFinally) onFinally()
  }
}

export default handleDownloadQR