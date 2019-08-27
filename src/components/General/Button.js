import styled from 'styled-components'
import {Button} from 'antd'
import {colors} from './themes'


export const AntButton = styled(Button)`
  color: ${props => props.greenborder?'#1fceca':colors.white} !important;
  background-color: ${props => props.disabled?colors[props.disabledcolor]:colors[props.variant]} !important;
  font-size: ${props => props.fontSize?props.fontSize:'18px'} !important;
  font-family: 'AvenirLTStd-Heavy' !important;
  border: ${props => props.greenborder?'2px solid #1fceca':0} !important;
  // box-shadow: ${colors.defaultShadow};
  height: 48px !important;
  padding: ${props => props.padding } !important;
  margin: ${props => props.margin } !important;
  width: ${props=> props.width?props.width: 'initial'};

  &:hover {
    background-color: ${
        props => props.greenborder?'#1fceca':''
      } !important;
    border: ${props => props.greenborder?'2px solid #1fceca':0} !important;
    color: ${
        props => props.greenborder?'white':''
      } !important;
  }

  @media (max-width: 576px) {
    font-size: 13px !important;
    width: 100% !important;
  }
`
