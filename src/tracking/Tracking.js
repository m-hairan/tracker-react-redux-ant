import React from 'react'
import Swiper from 'react-id-swiper'

import {Card} from '../components'
import {getDateTimeArray, capitalizeUnderscore} from '../utils'
import { getTrackingList, defaultErrorIcon } from './statuses'

require('swiper/dist/css/swiper.min.css')

const TrackingStatusTimeline = ({data}) => {
  const trackingListIcons = getTrackingList(data)

  const date = getDateTimeArray(data[0].updated_on)[0]
  
  let icons = []

  trackingListIcons.forEach((status, index) => {
    let statusClass = ''
    if (!status.grey) {
      if (index === trackingListIcons.length - 1) { // last loop
        statusClass = 'current'

        if (status.isStatusFail) {
          statusClass += ' fail'
        }
        if (status.status === 'SUCCESS' && !status.grey) {
          statusClass += ' complete'
        }
      } else {
        if (status.current) {
          statusClass = 'current'
        } else {
          statusClass = 'complete'
        }
      }
    }

    const icon = status.icon ? status.icon() : defaultErrorIcon()
    const label = status.label ? status.label : capitalizeUnderscore(status.status)
    icons.push(
      <li className={`tracker__item ${statusClass}`} key={status.status}>
        <div className="tracker__wrapper">
          <div className="tracker__icon">
            <span className="tracker__check">
              {statusClass.includes('fail') ? 
              <i className="material-icons">add_circle</i>:
              <i className="material-icons">check_circle</i>}
            </span>
            {icon}
          </div>
          <div className="tracker__status">
            <span>{label}</span>
          </div>
        </div>

        {statusClass.includes('current') && (
          <div className="tracker__date">
            <span>{date}</span>
          </div>
        )}
      </li>
    )
  })

  const wiperParams = {
    slidesPerView: 2.75,
    centeredSlides: true,
    activeSlideKey: trackingListIcons[trackingListIcons.length - 1].status,
  }

  return (
    <>
    <div className='d-none d-sm-block'>
      <ul className='tracker-status-timeline'>
        {icons}
      </ul>
    </div>
    <div className='d-block d-sm-none'>
    <Swiper WrapperEl='ul' wrapperClass='tracker-status-timeline' {...wiperParams}>
      {icons}
    </Swiper>
    </div>
    </>
  )
}

const TrackingTable = ({data}) => (
  <div className='tracker-timeline-wrapper'>
    <div className='d-none d-md-flex'>
      <p style={{flex: 1, paddingLeft: 50, marginLeft: 28}}>Time</p>
      <p style={{flex: 2, paddingLeft: 18}}>Shipment Status</p>
    </div>
    <ul className="tracker-timeline">
      {data.map((update, index) => {
        const date = getDateTimeArray(update.updated_on)
        let classes = ''
        if (index !== 0 || update.status === 'SUCCESS') {
          classes = 'complete'
        }

        const location = [...new Set([update.address, update.destination_country])].filter(Boolean).join(', ')

        return (
          <li className={`tracker__item active ${classes}`} key={update.update_id}>
          <span className={`tracker__check ${update.status === 'SUCCESS' ? 'success':''}`}>
            <i className="material-icons">check_circle</i>
          </span>
          <div className="tracker__wrapper d-flex flex-sm-row flex-column">
            <div className="tracker__time">
              <div>
                <p className="tracker__status">{capitalizeUnderscore(update.status)}</p>
              </div>
              <p className="tracker__time--date">{date[0]}</p>
              <p className="tracker__time--time">{date[1]}</p>
            </div>
  
            <div className="tracker__shipment-status">
              <div className="tracker__description">
                <p className="tracker__text">{update.main_text}</p>
                <p className="tracker__text">{update.detail_text}</p>
              </div>
              {(update.address || update.destination_country) &&
              <div className="tracker__location">
                <span>Location: {location}</span>
              </div>}
            </div>
          </div>
        </li>
        )
      })}
    </ul>
  </div>
)


class Tracking extends React.Component {
  state = {
    showDetails: false
  }
  
  handleShowDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }
  
  render() {
    const {data, trackingNo} = this.props
    return (
      <Card border style={{marginBottom: 24}}>
        <div style={{padding: 32}}>
          <div style={{textAlign: 'center', marginBottom: 32}}>
            <p className='f-16 text-normal no-margin'>Tracking Number</p>
            <h1 className='text-bold no-margin tracking-number'>{trackingNo}</h1>
          </div>

          <TrackingStatusTimeline data={data} />

          <a href='#/' className='text-normal text-medium'
            onClick={e => {
              e.preventDefault()
              this.handleShowDetails()}}
            >
            {this.state.showDetails ? 'Hide':'Show'} Details
            {this.state.showDetails ?
            <i className='material-icons'>expand_less</i>:
            <i className='material-icons'>expand_more</i>}
          </a>
        </div>

        {this.state.showDetails ? <TrackingTable data={data} />: ''}
      </Card>
    )
  }
}

export default Tracking