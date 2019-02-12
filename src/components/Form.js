import styled from 'styled-components'
import {Form} from 'react-bootstrap'
import {colors} from './themes'

export const FormGroup = styled(Form.Group)`
  margin-bottom: 24px;
`

export const FormControl = styled(Form.Control)`
  height: 48px;
  background-blend-mode: multiply;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff);
  border-radius: 0;
  border: 1px solid #b7bec5;
  padding: 12px 16px;
  border: 1px solid #b7bec5;
`

export const FormLabel = styled(Form.Label)`
  font-size: 14px !important;
  color: ${colors.textGrey}
`

export const TextError = styled.p`
  color: ${colors.danger}
`