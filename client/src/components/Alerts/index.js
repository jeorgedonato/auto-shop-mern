import React from 'react'

const Alerts = (variant, message, id) => {
  return (
    <>
      <div id={id} className={`alert alert-${variant}`} role='alert'>
        {message}
      </div>
    </>
  )
}

export default Alerts
