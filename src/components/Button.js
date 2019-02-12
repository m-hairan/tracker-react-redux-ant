import styled, {css} from 'styled-components'
import {darken, lighten} from 'polished'
import {Button as ButtonBs} from 'react-bootstrap'
import {colors} from './themes'


export const Button = styled(ButtonBs)`
  color: ${props => !props.variant || props.variant === 'light' ? colors.primary: colors.white};
  background-color: ${props => colors[props.variant]};
  border-radius: ${props => props.circle ? '50%' : '3px'};
  font-size: 14px;
  font-weight: ${props => props.bold ? 500:'normal'};
  box-shadow: ${props => props.shadow ? '0 0 4px 0 #d1d1d1;': 'none'};
  ${props => {
    let padding
    if (props.circle) {
      padding = css`padding: '.375rem';`
    } else {
      padding = css`padding: '.375rem .75rem';`
    }
    if (props.size && props.size === 'lg') {
      padding = css`
        padding: .5rem 1rem;
        font-size: 1.25rem;
      `
    }
    return padding
  }}

  ${props => {
    if (props.variant === 'light') {
      return css`
        color: ${colors.primary};
        background-color: ${colors.greyButton};
      `
    } else if (props.variant === 'primary') {
      return css`
        color: ${colors.white};
        background-color: ${colors.primary};
      `
    } else if (props.variant === 'default') {
      return css`
        color: ${colors.primary};
        background-color: ${colors.white};
        border-color: ${colors.primary};

        &:hover {
          color: ${colors.white};
          background-color: ${colors.primary};
      `
    }
  }}

  &:hover {
    background-color: ${
      props => !props.variant || props.variant === 'light' ? darken(0.1, colors.white):lighten(.15, colors.primary)};
  }
`
