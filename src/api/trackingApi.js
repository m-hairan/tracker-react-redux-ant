import {http} from '.'

export const TrackingAPI = {
  getTrackingData: async (trackingNumbers) => {
    // trackingNumbers are array
    let validArray = []
    trackingNumbers.map(t => {
      if( t.trim() != '' && t.trim() != '%20')
      validArray.push({tracking_no: t.trim()})
    })
    const payload = {
      get_related_updates: true,
      tracking_nos: validArray
    }
  
    const response = await http().post('/tracker/query-by-tracking-nos/', payload)
    const data = await response.data
    return data
  }
}