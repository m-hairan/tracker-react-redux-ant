import React, { useState } from 'react'


const ContactNumbers = () => {
  const [show, setShow] = useState(false)

  const contacts = {
    'Malaysia': +60162992128,
    'Hong Kong': +85230018187,
    'Indonesia': +6285574677773,
    'Philippines': +6326263672,
    'Singapore': +6583395655,
  }
  const content = []
  for (let k in contacts) {
    content.push(<p key={k}>{k}: {contacts[k]}</p>)
  }

  return (
    <div className='mb-4'>
      <a href='#/' className='text-normal text-medium'
        onClick={e => {
          e.preventDefault()
          setShow(!show)
        }}>
        Contact Our Customer Service
        <i className='material-icons'>{show ? 'expand_less':'expand_more'}</i>
      </a>
      {show && <div className='mt-2'>{content}</div>}
    </div>
  )
}

export default ContactNumbers