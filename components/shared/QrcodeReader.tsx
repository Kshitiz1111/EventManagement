"use client"
import { useState } from 'react'
import { QrReader, QrReaderViewFinder } from 'reactjs-qr-code-reader'


const QrcodeReader = ({ orders }: any) => {
   const [read, setRead] = useState(true);
   const [orderIdVerified, setOrderIdVerified] = useState<undefined | boolean>(undefined);

   console.log("from qrreader: ", orders)

   const handleRead = (result: any) => {
      orders.map((order: any) => {
         console.log(order._id, result.text)
         if (order._id === result.text) {
            setOrderIdVerified(true);
            setTimeout(() => {
               setOrderIdVerified(undefined);
            }, 2000);
         } else {
            setOrderIdVerified(false);
            setTimeout(() => {
               setOrderIdVerified(undefined);
            }, 2000);
         }
      });
   }
   const handleScanError = (result: any) => {
      console.log("Error:", result);
   }


   return (
      <>
         <div className='relative'>
            <QrReader
               read={read}
               //The delay between each reading.
               scanDelay={300}
               //The delay to continue the reading process after a successful reading.
               scanSuccessDelay={800}
               onRead={(result) => handleRead(result)}
               onReadError={(result) => handleScanError(result)}
            >
               <QrReaderViewFinder color={(orderIdVerified === undefined) ? "#0000ff" : orderIdVerified ? "#00ea08" : "#eb0000"} />
            </QrReader>
            <div className='absolute  top-44 left-44 '>
               <span className={`${(orderIdVerified === undefined) ? "" : orderIdVerified ? "bg-green-500 " : "bg-red-500"} px-4 py-2 text-xl text-white rounded-full`}>{(orderIdVerified === undefined) ? "" : orderIdVerified ? "verified" : "unverified"}</span>
            </div>
         </div>
      </>
   )
}

export default QrcodeReader