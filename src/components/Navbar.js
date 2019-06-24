import React from 'react'
import styled from 'styled-components'
import {Navbar as NavbarBs, Nav as NavBs} from 'react-bootstrap'
import {colors} from './themes'

export const NavbarBase = styled(NavbarBs)`
  background-color: white;
  height: 60px;
  box-shadow: ${props => props.shadow ? '0 2px 4px 0 rgba(183, 190, 197, 0.51)' : 'none'};
`

export const NavbarFlex = styled(NavbarBase)`
  display: flex;
  justify-content: center;
  img {
    height: 48px;
  }
`

const logo = require('../assets/img/janio-logo2.png')

export const NavbarWithLogo = () => (
  <NavbarFlex shadow="true" expand="lg">
      <img src={logo} alt="Janio" />
  </NavbarFlex>
)


export const Navbar = styled(NavbarBase)`
  padding: 0 30px;
`

export const NavbarCollapse = styled(NavbarBs.Collapse)`
  height: 100%;
`

export const Nav = styled(NavBs)`
  height: 100%;
`

export const MenuNavComponent = (props) => (
  <div className={props.className}>
    <span className="menu-title">{props.title}</span>
    {props.actions ?
      <div className="menu-actions">
        {props.actions}
      </div>
      : ''
    }
  </div>
)

export const MenuNav = styled(MenuNavComponent)`
  height: 60px;
  padding: 0 30px;
  background-color: ${colors.greyDarker};
  border-bottom: 1px solid ${colors.greyDarkest};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-title {
    font-size: 18px !important;
  }
  .menu-actions > * {
    margin-left: 8px;
  }
`