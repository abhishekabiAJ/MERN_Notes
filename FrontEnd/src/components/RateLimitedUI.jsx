import React from 'react'

const RateLimitedUI = () => {
  return (
    <div className="mt-5 p-5 bg-red-100 text-red-800 border border-red-200 rounded-lg shadow-md">
       
      <p>You are being rate limited. Please wait before making more requests.</p>
    </div>
  )
}

export default RateLimitedUI
