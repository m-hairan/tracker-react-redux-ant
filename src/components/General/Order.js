import styled, {css} from 'styled-components'
import {colors} from './themes'

export const PropertyText = styled.p`
  font-size: 15px;
`
export const SectionTitle = styled.p`
  color: ${colors.primaryLight};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 30px;
`
export const PropertyTitle = styled.p`
  margin-bottom: 6px;
  font-size: 15px;
  color: ${colors.textGrey};
`
export const Section = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;

  ${props => props.noBorder ? '' : css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.greyDarker}
    }
    `
  }
`