import React from 'react'
import { Menu, Dropdown, Icon, Affix } from 'antd';

const MENUITEM = ['English', 'Bahasa Indonesia', '中文']
const logo = require('../../assets/img/janio-logo2.png')

// Ante Design
const menu = (props) => {
  return( 
    <Menu onClick={(e) => {
      props.changeLanguage(e.key)
    }} >
      { 
        MENUITEM.map((value, key) => (
          <Menu.Item key={value} >
            <a rel="noopener noreferrer" className={props.current === value ? 'active':''}>
              <span className="icon-content">{ props.current === value && <Icon type="check" />}</span> {value}
            </a>
          </Menu.Item>))
      }
    </Menu>
    )
};

export const NavbarWithLogo = (props) => (
  <div>
    <Affix style={{ position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    zIndex: 10, 
                    boxShadow: '0 2px 4px 0 rgba(183,190,197,0.51)',
                    background: 'white'}}>
      <div className="new-navbar-wrap">
         <a href='/'><img className="logo" src={logo} alt="logo"/></a>
         <Dropdown overlay={menu(props)} trigger={['click']} placement="bottomRight">
            <a className="ant-dropdown-link lang-dropdown">
              {props.current} <Icon type="caret-down" />
            </a>
          </Dropdown>
      </div>
    </Affix>
  </div>
)