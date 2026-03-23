import React from 'react'
import empaiLogo from "@/assets/empai.png";
const EmpAi = () => {
  return (
     <div className="  h-full">
        <div className="bg-white rounded-[21px] shadow-sm border border-slate-100 p-4 h-full flex flex-col items-center justify-center">
            <img src={empaiLogo} alt="" className='w-24 h-24' />
            <div className='text-center mt-4'>
                <h2 className='2xl:text-xl  font-semibold text-black'>Ask EMP AI ASSISTANT</h2>
                <p className='text-black/80 text-xs'>Ready to assist you anytime</p>
            </div>
        </div>
     </div>
  )
}

export default EmpAi