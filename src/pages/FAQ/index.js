import React from 'react'
import { Collapse, Icon } from 'antd';

const { Panel } = Collapse;


// Question and Answer List (It will come from api)
const QA_LIST = [
  {
    'title': '1. How long will my order take to be delivered?',
    'content': 'Please refer to the store or merchant from where you placed your order to get more information on delivery lead times. If your delivery is taking longer than expected, please reach out to us by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> with your tracking number and order details or by filling in the required details in the web widget found in the lower right portion of this page.'
  },
  {
    'title': '2. My order seems to be stuck at a certain stage of delivery. Why is it stuck?',
    'content': 'Janio works with several network delivery partners to ensure we get your packages to you at the soonest possible time. If the status of your package has been stuck at a certain stage longer than expected, please reach out to us by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> with your tracking number and order details or by filling in the web widget found in the lower right portion of this page. Our customer service agents will be more than happy to help address your concerns.'
  },
  {
    'title': '3. My delivery is late. Is this normal?', 
    'content': 'Late deliveries are never fun. While we do our best to deliver your parcels as fast as we can, delays may still happen from time to time. In such situations, please rest assured that we will follow up closely on the delivery status of your parcel and ensure that it reaches you as soon as possible. If you would like to speak to our customer service agents, you may do so by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> or by filling in the web widget found in the lower right portion of this page.'
  },
  {
    'title': '4. I wasn’t around when my delivery arrived! What do I do?',
    'content': 'At Janio, we do our best to get your packages to you at the soonest possible time. If you were not around to receive the package when the first delivery was attempted, we will re-attempt two (2) more times. If you need to reschedule a delivery, please reach out to us by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> or by filling in the web widget found in the lower right portion of this page and we will do our best to accommodate your request.'
  },
  {
    'title': '5. The tracker status shows “Success”, but I did not receive my parcel.',
    'content': 'Janio works with several network delivery partners to ensure we get your packages to you at the soonest possible time. If the status on our tracker page has been updated incorrectly, please reach out to us by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> or by filling in the web widget found in the lower right portion of this page. Our friendly customer service agents will be more than happy to help resolve your concerns.<br/><br/>If the tracker status is showing “Success” but you haven’t received your parcel, it could be due to one of several reasons:<br/><br/>1. The shipping address from your order is different. Kindly check if it matches the address you’re expecting your order to be delivered to.<br/>2. Someone else received the parcel on your behalf. This information is usually available on the tracker page when you click on Show Details.<br/><br/>The status on our tracker page has been updated incorrectly. Please reach out to us by sending an email to <a href="mailto: support@janio.asia">support@janio.asia</a> with your tracking number and order details or by filling in the web widget found in the lower right portion of this page. Our customer service team will be more than happy to help address your concerns.'
  }
]


export default class FAQ extends React.Component {

  render() {
    return (
      <main style={{textAlign: 'left', paddingBottom: 80, paddingTop: 20}}>
        <div className="custom-breadcrumb">
          <div className="breadcrumb-wrap">
              <div style={{flex: 0.7}} className="back"><a onClick={() => this.props.history.goBack()}><Icon type="left"/> Back</a></div>
              <div style={{flex: 1}} className="page-name">FAQ</div>
          </div>
        </div>
        <h1 className="topic">How can we help you?</h1>
        <Collapse 
          bordered={false} 
          defaultActiveKey={['0']} 
          expandIcon={({ isActive }) => isActive?<Icon type="minus"/>:<Icon type="plus"/>} 
          expandIconPosition = {'right'}
          style={{background: 'transparent'}}>

            {
              QA_LIST.map((qa, index) => {
                return(
                  <Panel header={qa.title} key={index}>
                    <p className="content" dangerouslySetInnerHTML={{__html: qa.content}}></p>
                  </Panel>  
                )
              })
            }

        </Collapse>
      </main>
    )
  }
}
