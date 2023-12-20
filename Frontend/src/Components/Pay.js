import React from 'react'

export default function Pay() {
  return (
    <div className="container" style={{"display":"flex" , "justifyContent":"center" , "alignItems":"center" , "minHeight":"100vh"}}>
        <button className="btn bg-danger ms-2 fw-semibold text-white" type="submit">Pay</button>
    </div>
  )
}
