import styled from 'styled-components'
import {colors} from './themes'
import {Card as CardBs} from 'react-bootstrap'

export const Card = styled(CardBs)`
  border-radius: 3px;
  box-shadow: ${props => props.border ? 'none' : '0 0 4px 0 rgba(179, 179, 179, 0.5)'};
  background-color: #ffffff;
  border: ${props => props.border ? `1px solid ${colors.greyDarkest}`: 'none'};

  .card-body {
    padding: 28px
  }
`