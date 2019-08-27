import React from 'react'
import TweenOne from 'rc-tween-one';

import {AntCard, AntTextarea, AntButton} from '../../components/General'
import {TrackingAPI} from '../../api/trackingApi'
import { LoadingScreen } from '../../components/General/Loading'

import Tracking from './Tracking'
import {Row, Col, Form} from 'antd'

const logo = require('../../assets/img/biglogo.png')
const home_back = require('../../assets/img/home-back.png')


class Public extends React.Component {
  state = {
    loading: false,
    data: null,
    loadingStarted: false,
    trackingNums: ''
  }

  componentDidMount() {
    this.props.path(false)
    const trackingNumbers = window.location.pathname.split('/')[1]
    if (trackingNumbers.length) {
      this.loadTrackings(trackingNumbers)
    }
  }

  async loadTrackings(nos) {
    await this.setTrackingNos(nos)

    window.history.replaceState(null, '', this.state.trackingNums)
    const data = await TrackingAPI.getTrackingData(this.state.trackingNums)
    this.setState({loading: false, data})
    this.props.path(true)
  }

  setTrackingNos(val) {
    this.setState({
      trackingNums: val.toString().split(','),
      loadingStarted: true,
      loading: true
    })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let nos = values.nos
        this.loadTrackings(nos)
      }
    }); 
  }

  preventSpecialCharacter = e => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
  }

  render() {
    let trackings
    if (this.state.loading) {
      trackings = <div style={{
        position: 'relative',
        marginTop: '4rem'
      }}><LoadingScreen/></div>
    } else if (this.state.data) {
      trackings = []
      for (let trackingNo in this.state.data) {
        if (this.state.data[trackingNo].length) {
          trackings.push(
            <Tracking key={trackingNo} trackingNo={trackingNo} data={this.state.data[trackingNo]} count={Object.keys(this.state.data).length}/>
          )
        } else {
          trackings.push(
            <AntCard border="true" style={{marginBottom: 24}} key={trackingNo}>
              <div className=" pt-20">
                <p className='tracking-title'>Tracking Number</p>
                <h1 className='tracking-number'>{trackingNo}</h1>
              </div>
              <hr className=""/>
              <div>
                <h2 className='text-center' style={{fontSize:22}}>No data</h2>
              </div>
            </AntCard>
          )
        }
      }
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <main style={{minHeight: 400}}>
        <div style={{position: 'relative'}}>
          <div>
          <Form onSubmit={this.handleSubmit.bind(this)} className='tracking-form'>
            { !this.state.data && 
              <div key="4" className="home-logo">
                <img src={logo} style={{maxWidth: '360px', maxHeight: '175px', width: '100%', marginBottom: '45px'}} className="xs-logo img-responsive" alt="Logo"></img>
                <p className="tag"></p>
              </div>
            }
            
            <TweenOne
              animation={{ 
                marginTop: -350, 
                duration: 200
              }}
              paused={!this.state.data}>
                { this.state.data && 
                  <div className="hiddenBox" style={{height: 360}}></div>
                }
            </TweenOne>

            <Row className="input-row" style={{display: 'flex', alignItems:'center'}}>
              <Col sm={16} className="gutter-row">
                <Form.Item label="">
                  {getFieldDecorator('nos', {
                    initialValue: this.state.trackingNums,
                    rules: [
                      { required: true, message: 'Please input tracking ID!' },
                      { max: 255, message: 'Ensure this field has no more than 255 characters' }
                    ],
                  })(<AntTextarea className="" key="3" 
                      round='true'
                      shadow='true' 
                      indent='true'
                      autosize 
                      placeholder='Enter Parcel Tracking ID' 
                      max={255}/>)}
                </Form.Item>
              </Col>
              <Col sm={8} className="gutter-row" style={{'textAlign':'right'}}>
                  { 
                      <AntButton className="" key="1" type="primary" 
                      htmlType="submit" 
                      shape="round" size='large' 
                      bold='true'
                      variant='white'
                      padding='0 15px'
                      greenborder='true'
                      disabled={this.state.loading}
                      width='90%'
                      fontSize='15px'
                      margin='0 0 29px 0'>
                      Track Shipments
                      </AntButton>
                  }
              </Col>
            </Row>
          </Form>
          </div>
          <TweenOne
            animation={{ 
              height: 0, 
              duration: 200,
              delay: 1000
            }}
            paused={!this.state.data}>
              { this.state.data && 
                <div style={{height: 550, position: 'relative', zIndex:-1}}></div>
              }
          </TweenOne>
          {trackings}
        </div>
        { !this.state.data && <div><img className="home-back" src={home_back} alt="logo"></img></div> }
      </main>
    )
  }
}

const PublicTrackingUI = Form.create({ name: 'coordinated' })(Public);

export default PublicTrackingUI