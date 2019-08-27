import React from 'react'
import ReactSVG from 'react-svg'

export const LoadingScreen = () => (
  <div className='d-flex flex-column justify-content-center align-items-center center-screen'>
    <LoadingIcon />
    <h6 className="md-0">Loading Data</h6>
  </div>
)

const loadingIcon = require('../../assets/img/loading.svg')
export const LoadingIcon = () => (
  <ReactSVG src={loadingIcon} svgStyle={{
    height: 40
  }} />
)
