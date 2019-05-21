import styled from 'styled-components'
import {Form} from 'react-bootstrap'
import {colors} from './themes'
import {default as TxtArea} from 'react-textarea-autosize'

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
  color: ${colors.textGrey};
`

export const TextError = styled.p`
  color: ${colors.danger};
`

export const Textarea = styled(TxtArea)`
  background-blend-mode: multiply;
  border-radius: 0;
  border: 1.5px solid #E6E6F3;
  padding: 12px 16px;
  resize: none;
`