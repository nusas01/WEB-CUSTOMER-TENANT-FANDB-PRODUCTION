const handleDownloadQR = async (
  tableNumber = null,
  takeAway = null,
  imageUrl = '',
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
          const width = 400
          const padding = 30
          const qrSize = 280
          const qrX = (width - qrSize) / 2
          const qrY = padding + 60

          const isTakeAway = Boolean(takeAway)
          const titleText = isTakeAway ? 'TAKE AWAY QR' : `MEJA ${tableNumber}`
          
          // Hitung total tinggi canvas
          const totalHeight = 660

          canvas.width = width
          canvas.height = totalHeight

          // === BACKGROUND GRADIENT ===
          const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight)
          gradient.addColorStop(0, '#f8f9fa')
          gradient.addColorStop(1, '#e9ecef')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, width, totalHeight)

          // === HEADER SECTION ===
          ctx.fillStyle = '#1a1a1a'
          ctx.fillRect(0, 0, width, 100)
          
          // Title
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 26px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(titleText, width / 2, 50)
          
          // Subtitle
          ctx.font = '14px Arial, sans-serif'
          ctx.fillStyle = '#e0e0e0'
          const subtitleText = isTakeAway 
            ? 'Scan untuk pesan Take Away' 
            : 'Scan untuk pesan dari meja ini'
          ctx.fillText(subtitleText, width / 2, 75)

          // === QR CODE CONTAINER WITH SHADOW ===
          // Shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
          ctx.shadowBlur = 20
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 8
          
          // White container
          ctx.fillStyle = '#ffffff'
          const containerPadding = 15
          ctx.fillRect(
            qrX - containerPadding, 
            qrY - containerPadding, 
            qrSize + (containerPadding * 2), 
            qrSize + (containerPadding * 2)
          )
          
          // Reset shadow
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0

          // QR Code
          ctx.drawImage(image, qrX, qrY, qrSize, qrSize)

          // === LOGO NUSAS DI POJOK KANAN BAWAH QR ===
          const logo = new Image()
          logo.crossOrigin = 'anonymous'
          logo.src = 'https://assets.nusas.id/logo_nusas_1.png' // Sesuaikan dengan path logo Anda
          
          await new Promise((resolveLoad) => {
            logo.onload = () => {
              const logoSize = 45 // Ukuran logo yang kecil
              const logoX = qrX + qrSize - logoSize - 5
              const logoY = qrY + qrSize - logoSize - 5
              
              // Background putih untuk logo
              ctx.fillStyle = '#ffffff'
              ctx.fillRect(logoX - 3, logoY - 3, logoSize + 6, logoSize + 6)
              
              // Logo
              ctx.drawImage(logo, logoX, logoY, logoSize, logoSize)
              resolveLoad()
            }
            logo.onerror = () => {
              // Jika logo gagal dimuat, lanjutkan tanpa logo
              resolveLoad()
            }
          })

          // === SECURITY INFO SECTION (REDESIGNED) ===
          let currentY = qrY + qrSize + 50
          
          // Security Header
          ctx.fillStyle = '#2c3e50'
          ctx.font = 'bold 16px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('INFORMASI PENTING', width / 2, currentY)
          currentY += 25

          // Security box background - Lebih profesional
          const securityBoxY = currentY
          const securityBoxHeight = 145
          
          // Gradient background untuk box
          const boxGradient = ctx.createLinearGradient(0, securityBoxY, 0, securityBoxY + securityBoxHeight)
          boxGradient.addColorStop(0, '#fffbf0')
          boxGradient.addColorStop(1, '#fff8e6')
          
          const boxPadding = 20
          const boxRadius = 8
          
          // Rounded rectangle function
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
          
          roundRect(boxPadding, securityBoxY, width - (boxPadding * 2), securityBoxHeight, boxRadius)
          ctx.fillStyle = boxGradient
          ctx.fill()
          
          // Border
          ctx.strokeStyle = '#f39c12'
          ctx.lineWidth = 2
          ctx.stroke()

          // Security info text - Lebih clean dan profesional
          ctx.fillStyle = '#2c3e50'
          ctx.font = 'bold 13px Arial, sans-serif'
          ctx.textAlign = 'left'
          currentY += 22
          
          ctx.fillText('Pastikan sebelum scan:', boxPadding + 15, currentY)
          currentY += 25

          ctx.font = '12px Arial, sans-serif'
          const securityPoints = [
            { text: '✓ Alamat URL harus:', color: '#2c3e50', bold: false },
            { text: `   https://${window.location.hostname}/...`, color: '#2980b9', bold: true, mono: true },
            { text: '', color: '', bold: false },
            { text: 'Jika browser menampilkan peringatan "Situs Tidak Aman"', color: '#e74c3c', bold: true },
            { text: 'atau URL berbeda, JANGAN LANJUTKAN dan segera', color: '#e74c3c', bold: false },
            { text: 'laporkan ke staff kami.', color: '#e74c3c', bold: false }
          ]

          securityPoints.forEach((point) => {
            if (point.text === '') {
              currentY += 8
              return
            }
            
            ctx.fillStyle = point.color
            if (point.mono) {
              ctx.font = point.bold ? 'bold 11px monospace' : '11px monospace'
            } else {
              ctx.font = point.bold ? 'bold 12px Arial, sans-serif' : '12px Arial, sans-serif'
            }
            
            ctx.fillText(point.text, boxPadding + 15, currentY)
            currentY += 19
          })

          // === FOOTER ===
          currentY = totalHeight - 40
          ctx.fillStyle = '#7f8c8d'
          ctx.font = '11px Arial, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Keamanan dan kenyamanan Anda adalah prioritas kami', width / 2, currentY)
          ctx.fillText('Terima kasih telah berkunjung!', width / 2, currentY + 18)

          // Download
          const filename = isTakeAway ? `qr-take-away.png` : `qr-meja-${tableNumber}.png`

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
        reject(new Error('Gagal memuat gambar QR'))
      }
    })
  } catch (error) {
    if (onError) onError(error.message)
  } finally {
    if (onFinally) onFinally()
  }
}

export default handleDownloadQR
