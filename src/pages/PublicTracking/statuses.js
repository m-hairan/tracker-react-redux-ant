import React from 'react'
import ReactSVG from 'react-svg'
import { getDateTimeArray } from '../../utils';

export const TRACKER_STATUSES = [
  // {
  //   status: 'ORDER_INFO_RECEIVED',
  //   label: 'Order Is Being Processed By Seller',
  //   icon: () => (<ReactSVG src={require('../../../assets/img/icons/file.svg')} />)
  // },
  // {
  //   status: 'ORDER_PICKED_UP',
  //   label: 'Picked Up',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/box.svg')} />)
  // },
  // {
  //   status: 'ORDER_RECEIVED_AT_LOCAL_SORTING_CENTER',
  //   label: 'Local Sorting Center',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/storage.svg')} />),
  // },
  // {
  //   status: 'ORDER_RECEIVED_BY_AIRLINE',
  //   label: 'Airline',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/airline.svg')} />)
  // },
  // {
  //   status: 'PENDING_CUSTOMS_CLEARANCE',
  //   label: 'Customs Clearance',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/clearance.svg')} />)
  // },
  // {
  //   status: 'ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE',
  //   label: 'Destination Warehouse',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/warehouse.svg')} />)
  // },
  // {
  //   status: 'DELIVERY_IN_PROGRESS',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/delivery.svg')} />)
  // },
  // {
  //   status: 'SUCCESS',
  //   icon: () => (<ReactSVG src={require('../../assets/img/icons/delivery-success.svg')} />)
  // },
  // {
  //   status: 'FAILED_DUE_TO_WRONG_ADDRESS',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'FAILED_DUE_TO_CUSTOMER_UNCONTACTABLE',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'FAILED_DUE_TO_CUSTOMER_REJECT_ORDER',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'RETURNED_TO_LOCAL_SORTING_CENTER',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'RETURNED_TO_DESTINATION_WAREHOUSE',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'WITH_CUSTOMER_SERVICE',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'DESTROYED_AT_DESTINATION_WAREHOUSE',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'CANCELLED_BY_CUSTOMER',
  //   isStatusFail: true,
  // },
  // {
  //   status: 'RETURNED_TO_CLIENT',
  //   isStatusFail: true,
  // },
]

const failStatuses = [
  'FAILED_DUE_TO_WRONG_ADDRESS',
  'FAILED_DUE_TO_CUSTOMER_UNCONTACTABLE',
  'FAILED_DUE_TO_CUSTOMER_REJECT_ORDER',
  'RETURNED_TO_LOCAL_SORTING_CENTER',
  'RETURNED_TO_DESTINATION_WAREHOUSE',
  'WITH_CUSTOMER_SERVICE',
  'DESTROYED_AT_DESTINATION_WAREHOUSE',
  'CANCELLED_BY_CUSTOMER',
  'RETURNED_TO_CLIENT'
]

export const getTrackingList = updates => {
  let results = []
  const statuses = [...new Set(updates.map(u => u.status))]
  const lastStatus = statuses[0]
  const lastStatusIndex = TRACKER_STATUSES.findIndex(s => s.status === lastStatus)
  const lastStatusDate = getDateTimeArray(updates[0].updated_on)[0]
  const isFail = failStatuses.includes(lastStatus)

  if (lastStatus === 'SUCCESS') {
    TRACKER_STATUSES.slice(0, 8).forEach(s => {
      let className = 'complete'
      let date = null
      if (s.status === 'SUCCESS') {
        className = 'current complete'
        date = lastStatusDate
      }
      results.push({...s, className, date})
    })
    return results
  }

  const lastSuccessStatus = statuses.filter(s => !failStatuses.includes(s))[0]
  const lastSuccessStatusIndex = TRACKER_STATUSES.findIndex(s => s.status === lastSuccessStatus)
  for (let i=0; i < lastSuccessStatusIndex+1; i++) {
    const trackerStatus = TRACKER_STATUSES[i]
    let className = ''
    let date = null
    if (trackerStatus.status === lastSuccessStatus) {
      className = isFail ? 'complete':'current'
      date = isFail ? '' : lastStatusDate
    } else {
      className = 'complete'
    }

    results.push({...trackerStatus, className, date})
  }

  if (isFail) {
    results.push({
      ...TRACKER_STATUSES[lastStatusIndex],
      className:'current fail',
      icon: defaultErrorIcon,
      date: lastStatusDate})
  } else {
    for (let i=lastSuccessStatusIndex+1; i < 8; i++) {
      results.push({...TRACKER_STATUSES[i], className: ''})
    }
  }

  return results
}

export const defaultErrorIcon = () => (
  <ReactSVG src={require('../../assets/img/icons/exclamation-circle-solid.svg')} />
)