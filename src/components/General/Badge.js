import React from 'react'

export const CardBadge = ({title, content, handleClick}) => {
  return (
    <div className="badge-wrapper">
      <div className="badge__container">
        <div>
          <p className="badge__title">{title}</p>
          <p className="badge__text">{content}</p>
        </div>
        <div className="badge__close" onClick={handleClick}>
          <i className="material-icons icon">add_circle</i>
        </div>
      </div>
    </div>
    )
}
