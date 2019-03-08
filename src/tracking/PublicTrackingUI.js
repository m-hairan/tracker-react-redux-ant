import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Card, Button, Container, FormControl, NavbarWithLogo} from '../components'
import {TrackingAPI} from '../api/trackingApi'
import Tracking from './Tracking'
import { LoadingScreen } from '../components/Loading';

export default class PublicTrackingUI extends React.Component {
  state = {
    loading: false,
    data: null
  }

  componentDidMount() {
    const trackingNumbers = window.location.pathname.split('/')[1]
    if (trackingNumbers.length) {
      this.trackingInput.value = trackingNumbers.replace(' ', '')
      this.loadTrackings()
    }
  }

  async loadTrackings() {
    this.setState({loading: true})
    const trackingNos = this.trackingInput.value.replace(' ', '').split(',')
    window.history.replaceState(null, '', trackingNos)
    const data = await TrackingAPI.getTrackingData(trackingNos)
    this.setState({loading: false, data})
  }
  
  handleSubmit(e) {
    e.preventDefault()
    this.loadTrackings()
  }

  render() {
    let trackings
    if (this.state.loading) {
      trackings = <div style={{
        position: 'relative',
        marginTop: '4rem'
      }}><LoadingScreen /></div>
    } else if (this.state.data) {
      trackings = []
      for (let trackingNo in this.state.data) {
        if (this.state.data[trackingNo].length) {
          trackings.push(
            <Tracking key={trackingNo} trackingNo={trackingNo} data={this.state.data[trackingNo]} />
          )
        } else {
          trackings.push(
            <Card border style={{marginBottom: 24}} key={trackingNo}>
              <div style={{padding: 32}}>
                <div style={{textAlign: 'center', marginBottom: 32}}>
                  <p className='f-16 text-normal no-margin'>Tracking Number</p>
                  <h1 className='tracking-number text-bold no-margin'>{trackingNo}</h1>
                </div>

                <div>
                  <h2 className='text-center'>No data</h2>
                </div>
              </div>
            </Card>
          )
        }
      }
    }

    return (
      <main>
      <NavbarWithLogo />

      <Container style={styles.container}>
        <Row>
          <Col md={{ span: 10, offset: 1 }} xs={12}>
            <h1 className='text-grey f-16'>Input Your Tracking Number</h1>

            <Card border style={{marginBottom: 24}}>
              <form onSubmit={this.handleSubmit.bind(this)} className='tracking-form'>
              <div style={styles.cardBody} className='d-flex flex-sm-row flex-column'>
                <FormControl ref={el => this.trackingInput = el} required={true} />
                <Button
                  variant='primary' size='lg'
                  type="submit">Track Deliveries</Button>
              </div>
              </form>
            </Card>

            {trackings}
          </Col>
        </Row>
      </Container>

      </main>
    )
  }
}

const styles = {
  container: {paddingBottom: 64},
  cardBody: {padding: 12}
}