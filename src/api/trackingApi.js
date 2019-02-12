import {http} from '.'

export const TrackingAPI = {
  getTrackingData: async (trackingNumbers) => {
    // trackingNumbers are array

    const payload = {
      get_related_updates: true,
      tracking_nos: trackingNumbers.map(t => ({tracking_no: t}))
    }
  
    const response = await http().post('/tracker/query-by-tracking-nos/', payload)
    const data = await response.data
    return data
  }
}