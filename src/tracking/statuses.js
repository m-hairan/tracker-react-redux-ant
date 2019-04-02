import React from 'react'
import ReactSVG from 'react-svg'

export const TRACKER_STATUSES = [
  {
    status: 'ORDER_INFO_RECEIVED',
    label: 'Info Received',
    icon: () => (<ReactSVG src={require('../assets/img/icons/file.svg')} />)
  },
  {
    status: 'ORDER_PICKED_UP',
    label: 'Picked Up',
    icon: () => (<ReactSVG src={require('../assets/img/icons/box.svg')} />)
  },
  {
    status: 'ORDER_RECEIVED_AT_LOCAL_SORTING_CENTER',
    label: 'Local Sorting Center',
    icon: () => (<ReactSVG src={require('../assets/img/icons/storage.svg')} />),
  },
  {
    status: 'ORDER_RECEIVED_BY_AIRLINE',
    label: 'Airline',
    icon: () => (<ReactSVG src={require('../assets/img/icons/airline.svg')} />)
  },
  {
    status: 'PENDING_CUSTOMS_CLEARANCE',
    label: 'Customs Clearance',
    icon: () => (<ReactSVG src={require('../assets/img/icons/clearance.svg')} />)
  },
  {
    status: 'ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE',
    label: 'Destination Warehouse',
    icon: () => (<ReactSVG src={require('../assets/img/icons/warehouse.svg')} />)
  },
  {
    status: 'DELIVERY_IN_PROGRESS',
    icon: () => (<ReactSVG src={require('../assets/img/icons/delivery.svg')} />)
  },
  {
    status: 'SUCCESS',
    icon: () => (<ReactSVG src={require('../assets/img/icons/delivery-success.svg')} />)
  },
  {
    status: 'FAILED_DUE_TO_WRONG_ADDRESS',
    isStatusFail: true,
  },
  {
    status: 'FAILED_DUE_TO_CUSTOMER_UNCONTACTABLE',
    isStatusFail: true,
  },
  {
    status: 'FAILED_DUE_TO_CUSTOMER_REJECT_ORDER',
    isStatusFail: true,
  },
  {
    status: 'RETURNED_TO_LOCAL_SORTING_CENTER',
    isStatusFail: true,
  },
  {
    status: 'RETURNED_TO_DESTINATION_WAREHOUSE',
    isStatusFail: true,
  },
  {
    status: 'WITH_CUSTOMER_SERVICE',
    isStatusFail: true,
  },
  {
    status: 'DESTROYED_AT_DESTINATION_WAREHOUSE',
    isStatusFail: true,
  },
  {
    status: 'CANCELLED_BY_CUSTOMER',
    isStatusFail: true,
  },
  {
    status: 'RETURNED_TO_CLIENT',
    isStatusFail: true,
  },
]

export const getTrackingList = updates => {
  // [
  //   "PENDING_CUSTOMS_CLEARANCE",
  //   "ORDER_RECEIVED_AT_DESTINATION_WAREHOUSE",
  //   "DELIVERY_IN_PROGRESS",
  //   "RETURNED_TO_DESTINATION_WAREHOUSE"
  // ]
  const statuses = [...new Set(updates.map(u => u.status))].reverse()
  const results = []

  statuses.forEach((status, index) => {
    const trackerStatusIndex = TRACKER_STATUSES.findIndex(s => s.status === status)
    const trackerStatus = TRACKER_STATUSES[trackerStatusIndex]

    if (trackerStatus.isStatusFail) {
      results.push(trackerStatus)
    } else {
      TRACKER_STATUSES.forEach((s, i) => {
        if (i <= trackerStatusIndex) {
          const inResult = results.some(r => r.status === s.status)
          if (!inResult) { results.push(s) }
        }
      })
    }
  })

  return results
}

export const defaultErrorIcon = () => (
  <ReactSVG src={require('../assets/img/icons/exclamation-circle-solid.svg')} />
)