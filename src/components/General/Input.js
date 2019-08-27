import styled from 'styled-components'
import { colors } from './themes'
import { Input } from 'antd'

const { Search, TextArea } = Input;

export const AntInput = styled(Input)`
  // box-shadow: ${props => props.shadow?colors.defaultShadow:'none'};
  height: 48px !important;
  font-size: 16px;
  border: ${colors.defaultBorder};
  text-indent: ${props => props.indent ? '20px': 'initial'};
  border-radius: ${props => props.round ? '50px': 'none'};
  font-family: 'AvenirLTStd-Book' !important;

  @media (max-width: 576px) {
    text-indent: 3px !important;
    height: 40px !important;
  }
`


export const AntTextarea = styled(TextArea)`
  // box-shadow: ${props => props.shadow?colors.defaultShadow:'none'};
  font-size: 16px;
  min-height: 48px !important;
  border: ${colors.defaultBorder};
  padding: 11px 20px;
  border-radius: ${props => props.round ? '25px': 'none'};
  font-family: 'AvenirLTStd-Book' !important;
  resize: none;

  @media (max-width: 576px) {
    text-indent: 3px !important;
    height: 40px !important;
  }
`

export const AntSearchInput = styled(Search)`
  input {
    box-shadow: none;
    border-radius: 0px;
    height: 48px !important;
    font-size: 16px;
    border: 2px solid #E8E8E8;
    border-right: none;
  }

  button {
    border-radius: 0px;
    background: #1FCECA;
    border: 0px;
    font-size: 18px;
    height: 48px !important;
  }
`