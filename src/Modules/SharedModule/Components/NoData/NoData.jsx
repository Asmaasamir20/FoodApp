import React from 'react'
import NoDataa from "../../../../assets/images/no-data.png"
export default function NoData() {
  return (
    <>
   <div className="text-center my-4">
      <div className='NoDataaimg'>
      <img src={NoDataa} alt=""  className='w-100'/>
      </div>
 

    <h4 className='mt-3'>NoData !</h4>
    <p className='px-5'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
   </div>
    
   </>
  )
}
