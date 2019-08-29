import React from 'react'

import {AntCard, AntInput, AntButton} from '../../components/General'
import {ArrowButton} from '../../components/Animation'
import {getDateTimeArray, capitalizeUnderscore} from '../../utils'
import {SubscribeAPI} from '../../api/trackingApi'

import {Icon, Tabs, Form, Alert } from 'antd'
import { Row, Col } from 'antd';

const { TabPane } = Tabs;

const blinkingIcon = require('../../assets/img/Parcel for tracker timeline.png')

const TrackingTable = ({data, detail, count}) => (
  <div className='tracker-timeline-wrapper'>
    <ul className="tracker-timeline">
      {data.map((update, index) => {
        const date = getDateTimeArray(update.updated_on)
        let classes = ''
        if (index !== 0 || update.status === 'SUCCESS') {
          classes = 'complete'
        }
        const location = [...new Set([update.address, update.destination_country])].filter(Boolean).join(', ')

        return (
          <li className={`tracker__item active ${classes}`} key={update.update_id} style={{display: (count === 1?((!detail && index>1)?'none':''):((!detail)?'none':''))}}>
            <Row className="tracker__wrapper">
              <Col xs={10} className="tracker__time">
                <p className="tracker__time--date">{date[0]}</p>
                <p className="tracker__time--time">{date[1]}</p>
                <span className={`tracker__check ${update.status === 'SUCCESS' ? 'success':''}`}>
                  { (update.status !== 'SUCCESS' && data[0].status === update.status && index === 0)?
                      <span style={{paddingBottom: 6, background: 'white', display: 'block'}}>
                        <div className="tracker__onprogress shadow-animation">
                            <img src={blinkingIcon} width='15' height='15' alt="Blinking Icon"/>
                        </div>
                      </span>:
                      <Icon type="check-circle" theme="filled" className=" tracker_icon" />
                  }
                </span>
              </Col>
            
              <Col xs={14} className="tracker__shipment-status">
                <div className="tracker__description">
                  <div>
                    <p className="tracker__status">{
                      update.status === 'ORDER_INFO_RECEIVED' ?
                      'Order Info Received':
                      capitalizeUnderscore(update.status)}</p>
                  </div>
                  
                  <p className="tracker__text ">{update.detail_text}</p>
                </div>
                {(update.address || update.destination_country) &&
                <div className="tracker__location">
                  <span>{location}</span>
                </div>}
              </Col>
            </Row>
          </li>
        )
      })}
    </ul>
  </div>
)

class TrackingForm extends React.Component {
  state = {
    showDetails: false,
    subscribeTxt: "",
    subscribeValid: null
  }
  
  handleShowDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }

  handelInput = (e) => {
    const { value } = e.target;
    this.setState({
      subscribeTxt: value
    })
  }

  async subscribe(email) {
      const data = await SubscribeAPI.subscribeEmail(this.props.trackingNo, email)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var valid = re.test(values.email.toLowerCase());
      
      if (valid) {
        this.setState({
          subscribeValid: 'true'
        })

        this.subscribe(values.email.toLowerCase())

      } else {
        this.setState({
          subscribeValid: 'false'
        })
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const {data, trackingNo, count} = this.props
    const topStatus = data[0]
    const date = getDateTimeArray(topStatus.updated_on)
    const transport = require('../../assets/img/'+topStatus.status.toUpperCase()+'.png')

    return (
      <AntCard border="true" style={{marginBottom: 24}}>
      
          <p className='tracking-title'>Tracking Number</p>
          <h1 className='tracking-number'>{trackingNo}</h1>

        <hr/>
        {this.props.urgent &&
          <div className="status-alert-box bk-red">
            <div className='d-md-flex'>
              <div style={{flex: 0.8}}>
                <span className="status-alert">!</span>
              </div>
              <div style={{flex: 2}}>
                <p className="title">Urgent Update</p>
                <p className="description">Due to Indonesia public holiday, all orders delivered to Indonesia will be delayed. We are sorry for the inconvenience caused.</p>
              </div>
            </div>
          </div>
        }

        <p className='tracking-title '>Status Update</p>
        <div className={topStatus.status === 'SUCCESS'?'status-alert-box bk-green':'status-alert-box bk-blue'}>
          <Row style={{marginBottom: 10}} gutter={25}>
            <Col className="gutter-row" xs={10}>
              <div style={{width: '100%', textAlign:'center'}}>
                <img src={transport} alt="transport" style={{marginBottom: 10, marginTop: 6, width: (topStatus.status === 'ORDER_INFO_RECEIVED' || topStatus.status === 'ORDER_RECEIVED_BY_AIRLINE')?'70%':'80%'}}></img>
              </div>
            </Col>
            <Col className="gutter-row" xs={14}>
              <p className="title">{capitalizeUnderscore(topStatus.status)}</p>
              <p className="description" style={{minHeight: 52}}>{topStatus.detail_text}</p>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={10}>
              <p className="info hidden-xs">{date[0]+' '+date[1]}</p>
              <p className="info hidden-md" style={{ paddingTop: 10}}>{date[0].split(',')[0]+' at '+date[1]}</p> 
            </Col>
            <Col span={14}>
              <p className="info hidden-xs" style={{textAlign: 'right'}}>{(topStatus.address?topStatus.address+', ':'')+(topStatus.destination_country || '')}</p>
              <p className="info hidden-md" style={{textAlign: 'right', paddingTop: 10}}>{(topStatus.address?topStatus.address+', ':'')+(topStatus.destination_country || '')}</p>
            </Col>
          </Row>
        </div>
        <TrackingTable data={data} detail={this.state.showDetails} count={count}/>

        <a href='#/' className='text-normal text-medium text-center arrow'
          onClick={e => {
            e.preventDefault()
            this.handleShowDetails()}}
          >
          {this.state.showDetails ?
            <div><Icon type="up" /></div>:
          <div><ArrowButton index={trackingNo}/></div>
      }
          <p className="">{this.state.showDetails ? 'Click To Hide':'Click To Show More'} Details</p>
        </a>
        {this.state.showDetails && <hr className="m-20"/>}
        {this.state.showDetails && <div className="subscribe mb-0">
          <p className='tracking-title  mt-0' style={{paddingTop: 0}}>
            {capitalizeUnderscore('Subscribe to delivery updates')}</p>
          <Tabs className="" defaultActiveKey="1">
            <TabPane tab="Email" key="1">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item style={{marginBottom: 0}}>
                  <p className="sub-title">Receive delivery updates by email</p>
                  {getFieldDecorator('email', {
                    rules: [],
                  })(
                    <AntInput onChange = {this.handelInput} className={this.state.subscribeValid == 'true'?'success':(this.state.subscribeValid == 'false'?'error':'')}></AntInput>
                  )}
                  { this.state.subscribeValid == 'false' && <Alert className="mt-10" message="Invalid email address" type="error"  />}
                  { this.state.subscribeValid == 'true' && <Alert className="mt-10" message="Subscribe successfully" type="success"  />}
                </Form.Item>
                <Form.Item>
                  <AntButton type="primary" 
                          className="f-23" 
                          htmlType="submit" 
                          size='large' 
                          variant="green"
                          margin="23px 0 0 0"
                          disabled={this.state.subscribeTxt === ""}
                          width="100%"
                          disabledcolor="disabled"
                          >
                          Subscribe
                        </AntButton>  
                </Form.Item>
              </Form>
            </TabPane>
            
          </Tabs>
        </div>}
      </AntCard>
    )
  }
}


// <TabPane className="" tab="Push Notifications" key="2">
            //   Content of Tab Pane 2
            // </TabPane>

const Tracking = Form.create({ name: 'normal_login' })(TrackingForm);

export default Tracking