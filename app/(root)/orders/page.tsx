import Search from '@/components/shared/Search'
import { getOrdersByEvent } from '@/lib/actions/order.action'
import { IOrderItem } from '@/lib/database/models/order.model'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import QrcodeReader from '@/components/shared/QrcodeReader'


const OrdersPage = async ({ searchParams }: SearchParamProps) => {
   const eventId = (searchParams?.eventId as string) || ''
   const searchText = (searchParams?.query as string) || ''

   const orders: any = await getOrdersByEvent({ eventId, searchString: searchText })
   // console.log(orders);
   return (
      <>
         <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h1 className="wrapper h1-bold text-primary-500 text-center sm:text-left ">{orders[0]?.eventTitle}</h1>
            <div className='wrapper flex items-center'>
               <span className=" h2-bold text-center sm:text-left mr-4">Orders</span>
               <Dialog>
                  <DialogTrigger asChild>
                     <Button variant="outline">Verification [-]</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white sm:max-w-md">
                     <DialogHeader>
                        <DialogTitle>{orders[0]?.eventTitle}</DialogTitle>
                        <DialogDescription>
                           Scan your QR inside blue <span className='text-blue-700 font-bold'>[  ]</span> square.
                        </DialogDescription>
                     </DialogHeader>
                     <div className=" items-center space-x-2">
                        <div className="grid flex-1 gap-2 w-full h-96">
                           <QrcodeReader orders={orders} />
                        </div>
                     </div>
                     <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                           <Button type="button" variant="secondary">
                              Close
                           </Button>
                        </DialogClose>
                     </DialogFooter>
                  </DialogContent>
               </Dialog>
            </div>
         </section>

         <section className="wrapper mt-8">
            <Search placeholder="Search buyer name..." />
         </section>

         <section className="wrapper overflow-x-auto">
            <table className="w-full border-collapse border-t">
               <thead>
                  <tr className="p-medium-14 border-b text-grey-500">
                     <th className="min-w-[250px] py-3 text-left">Order ID</th>
                     <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
                     <th className="min-w-[150px] py-3 text-left">Buyer</th>
                     <th className="min-w-[100px] py-3 text-left">Created</th>
                     <th className="min-w-[100px] py-3 text-right">Amount</th>
                  </tr>
               </thead>
               <tbody>
                  {orders && orders.length === 0 ? (
                     <tr className="border-b">
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                           No orders found.
                        </td>
                     </tr>
                  ) : (
                     <>
                        {orders &&
                           orders.map((row: IOrderItem) => (
                              <tr
                                 key={row._id}
                                 className="p-regular-14 lg:p-regular-16 border-b "
                                 style={{ boxSizing: 'border-box' }}>
                                 <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                                 <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                                 <td className="min-w-[150px] py-4">{row.buyer}</td>
                                 <td className="min-w-[100px] py-4">
                                    {formatDateTime(row.createdAt).dateTime}
                                 </td>
                                 <td className="min-w-[100px] py-4 text-right">
                                    {formatPrice(row.totalAmount)}
                                 </td>
                              </tr>
                           ))}
                     </>
                  )}
               </tbody>
            </table>
         </section>
      </>
   )
}

export default OrdersPage