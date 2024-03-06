'use client'
import React from 'react';
import { useQRCode } from 'next-qrcode';

const Qrcode = ({ orderId }: { orderId: string }) => {
   const { Canvas } = useQRCode();
   return (
      <Canvas
         text={orderId}
         options={{
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
               dark: '#3c1eff',
               light: '#f2f2f2',
            },
         }}
         logo={{
            src: "/assets/logo-b.png",
            options: {
               width: 25,
               x: 0,
               y: 0,
            }
         }}
      />
   )
}

export default Qrcode