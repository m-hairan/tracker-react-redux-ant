import React from 'react'
import {Icon} from 'antd'
import './ArrowButton.css'
import $ from 'jquery';

export class ArrowButton extends React.Component {

  constructor(props) {
    super(props)
    this.state ={

    }
    this.changeSomething = this.changeSomething.bind(this)
    this.timer = null
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.changeSomething();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

    

  changeSomething(){
    var curr = $('#arrow'+this.props.index+' li.active');
    var next = $('#arrow'+this.props.index+' li.active').next();
    if(next[0] === undefined)
      next = $('#arrow'+this.props.index+' li').eq(0);

    curr.removeClass('active');
    next.addClass('active');
  }

  render () {
    return (
      <div className="text-center centered">
            <div className="arrow" id={'arrow'+this.props.index}>
              <ul className="list-unstyled">
                <li className="p p1 active">
                  <Icon type="down" />
                </li>
                <li className="p p2">
                    <Icon type="down" />
                </li>
                <li className="p p3">
                  <Icon type="down" />
                </li>
              </ul>
            </div>
          </div>
    )
  }
}
