import React from 'react'
import { useState, useRef } from 'react'

import styled from 'styled-components'
import { QRCodeCanvas } from 'qrcode.react'

const QRCodeGeneratorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const QRCodeGeneratorTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`
const QRCodeCanvasContainer = styled.div`
  display: flex;
`
const QRCodeGeneratorForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const QRCodeGeneratorField = styled.div`
  font-size: 14px;
  position: relative;
  border-top: 20px solid transparent;
`
const QRCodeGeneratorInput = styled.input`
  width: 250px;
  border: none;
  color: black;
  padding: 12px;
  font-size: 14px;
  margin-top: 20px;
  border-radius: 3px;
  background-color: #f2f2f2;
  font-family: Arial, Helvetica, sans-serif;

  ::placeholder {
    color: black;
    font-size: 12px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
`
const QRCodeGeneratorFormButton = styled.button`
  width: 200px;
  height: 40px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  font-weight: bold;
  border-radius: 3px;
  background-color: #f2f2f2;
  border-color: transparent;
  font-family: Arial, Helvetica, sans-serif;
`

export default function QrCode() {
  const [url, setUrl] = useState('')
  const qrRef = useRef()

  const downloadQRCode = (e) => {
    e.preventDefault()
    let canvas = qrRef.current.querySelector('canvas')
    let image = canvas.toDataURL('image/png')
    let anchor = document.createElement('a')
    anchor.href = image
    anchor.download = `qr-code.png`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    setUrl('')
  }

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value)
  }

  return (
    <QRCodeGeneratorContainer>
      <QRCodeGeneratorTitle>QR Code Generator</QRCodeGeneratorTitle>
      <QRCodeCanvasContainer ref={qrRef}>
        <QRCodeCanvas
          id="qrCode"
          value={url}
          size={200}
          bgColor={'white'}
          level={'H'}
        />
      </QRCodeCanvasContainer>
      <QRCodeGeneratorForm onSubmit={downloadQRCode}>
        <QRCodeGeneratorField>
          <QRCodeGeneratorInput
            id="url-field"
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="Enter URL"
          />
        </QRCodeGeneratorField>
        <QRCodeGeneratorFormButton type="submit" disabled={!url}>
          Download QR Code
        </QRCodeGeneratorFormButton>
      </QRCodeGeneratorForm>
    </QRCodeGeneratorContainer>
  )
}
