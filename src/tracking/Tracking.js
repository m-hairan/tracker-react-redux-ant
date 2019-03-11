import React from 'react'
import ReactSVG from 'react-svg'
import Swiper from 'react-id-swiper'

import {Card} from '../components'
import {getDateTimeArray, capitalizeUnderscore} from '../utils'

require('swiper/dist/css/swiper.min.css')

const statusMapping = {
  ORDER_INFO_RECEIVED: {
    label: 'Info Received',
    i: 0,
    icon: () => (<ReactSVG src={require('../assets/img/icons/file.svg')} />)
  },
  ORDER_PICKED_UP: {
    label: 'Picked Up',
    i: 1,
    icon: () => (<ReactSVG src={require('../assets/img/icons/box.svg')} />)
  },
  ORDER_RECEIVED_AT_LOCAL_SORTING_CENTER: {
    label: 'Local Sorting Center',
    i: 2,
    icon: () => (<ReactSVG src={require('../assets/img/icons/storage.svg')} />)
  },
  ORDER_RECEIVED_BY_AIRLINE: {
    label: 'Airline',
    i: 3,
    icon: () => (<ReactSVG src={require('../assets/img/icons/airline.svg')} />)
  },
  PENDING_CUSTOMS_CLEARANCE: {
    label: 'Customs Clearance',
    i: 4,
    icon: () => (<ReactSVG src={require('../assets/img/icons/clearance.svg')} />)
  },
  ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE: {
    label: 'Destination Warehouse',
    i: 5,
    icon: () => (<ReactSVG src={require('../assets/img/icons/warehouse.svg')} />)
  },
  DELIVERY_IN_PROGRESS: {
    label: 'Delivery in Progress',
    i: 6,
    icon: () => (<ReactSVG src={require('../assets/img/icons/delivery.svg')} />)
  },
  SUCCESS: {
    label: 'Success',
    i: 7,
    icon: () => (<ReactSVG src={require('../assets/img/icons/delivery-success.svg')} />)
  },
  FAILED_DUE_TO_WRONG_ADDRESS: {
    failFor: 'SUCCESS'
  },
  FAILED_DUE_TO_CUSTOMER_UNCONTACTABLE: {
    failFor: 'SUCCESS'
  },
  FAILED_DUE_TO_CUSTOMER_REJECT_ORDER: {
    failFor: 'SUCCESS'
  },
  RETURNED_TO_LOCAL_SORTING_CENTER: {
    failFor: 'ORDER_RECEIVED_AT_LOCAL_SORTING_CENTER'
  },
  RETURNED_TO_DESTINATION_WAREHOUSE: {
    failFor: 'ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE'
  },
  WITH_CUSTOMER_SERVICE: {
    failFor: 'DELIVERY_IN_PROGRESS'
  },
  DESTROYED_AT_DESTINATION_WAREHOUSE: {
    failFor: 'ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE'
  },
  CANCELLED_BY_CUSTOMER: {
    failFor: 'SUCCESS'
  },
  RETURNED_TO_CLIENT: {
    failFor: 'SUCCESS'
  }
}

const TrackingStatusTimeline = ({data}) => {
  let lastStatus = data[0].status

  const date = getDateTimeArray(data[0].updated_on)[0]
  const statusFromMapping = statusMapping[lastStatus]
  const failFor = statusFromMapping.failFor
  
  let icons = []
  let currentIndex = 0

  if (failFor) {
    lastStatus = failFor
  }
  
  for (let status in statusMapping) {
    let statusClass = ''
    if (statusMapping[lastStatus].i > statusMapping[status].i) {
      statusClass = 'complete'
    } else if (lastStatus === status) {      
      statusClass = 'current'
      if (failFor) {
        statusClass = 'current fail'
      }
      currentIndex = status
    }

    if (status === 'SUCCESS' && lastStatus === 'SUCCESS') {
      statusClass = 'current complete'
      currentIndex = status
    }

    if (!statusMapping[status].failFor) {
      icons.push(
        <li className={`tracker__item ${statusClass}`} key={status}>
          <div className="tracker__wrapper">
            <div className="tracker__icon">
              <span className="tracker__check">
                {statusClass.includes('fail') ? 
                <i className="material-icons">add_circle</i>:
                <i className="material-icons">check_circle</i>}
              </span>
              {statusMapping[status].icon()}
            </div>
            <div className="tracker__status">
              <span>{statusMapping[status].label}</span>
            </div>
          </div>

          {statusClass.includes('current') && (
            <div className="tracker__date">
              <span>{date}</span>
            </div>
          )}
        </li>
      )
    }

    if (status === failFor) {
      break
    }
  }

  const params = {
    slidesPerView: 2.75,
    centeredSlides: true,
    activeSlideKey: currentIndex,
  }

  return (
    <>
    <div className='d-none d-sm-block'>
      <ul className='tracker-status-timeline'>
        {icons}
      </ul>
    </div>
    <div className='d-block d-sm-none'>
    <Swiper WrapperEl='ul' wrapperClass='tracker-status-timeline' {...params}>
      {icons}
    </Swiper>
    </div>
    </>
  )
}

const TrackingTable = ({data}) => (
  <div className='tracker-timeline-wrapper'>
    <div className='d-none d-md-flex' style={{paddingLeft: 80}}>
      <p style={{width: '30%'}}>Time</p>
      <p>Shipment Status</p>
    </div>
    <ul className="tracker-timeline">
      {data.map((update, index) => {
        const date = getDateTimeArray(update.updated_on)
        let classes = ''
        if (index !== 0 || update.status === 'SUCCESS') {
          classes = 'complete'
        }

        return (
          <li className={`tracker__item active ${classes}`} key={update.update_id}>
          <span className={`tracker__check ${update.status === 'SUCCESS' ? 'success':''}`}>
            <i className="material-icons">check_circle</i>
          </span>
          <div className="tracker__wrapper d-flex flex-sm-row flex-column">
            <div className="tracker__time">
              <p className="tracker__time--date">{date[0]}</p>
              <p className="tracker__time--time">{date[1]}</p>
            </div>
  
            <div style={{width: '100%'}}>
              <div className="tracker__description">
                <p className="tracker__status">{capitalizeUnderscore(update.status)}</p>
                <p className="tracker__text">{update.main_text}</p>
              </div>
              {update.destination_country &&
              <div className="tracker__location">
                <span>Location: {update.destination_country}</span>
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