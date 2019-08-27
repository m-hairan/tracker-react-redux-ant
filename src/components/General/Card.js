import styled from 'styled-components'
import {colors} from './themes'

import {Card as antCard} from 'antd'

export const AntCard = styled(antCard)`
  border-radius: 20px;
  background-color: ${colors.white};
  box-shadow: ${colors.defaultShadow};
  margin-top: 5px;
  text-align: left;

	.ant-card-body {
		padding: 33px;

		.tracking-title {
			font-size: 17px;
			color: #858997;
			margin-bottom: 5px;
			font-family: 'AvenirLTStd-Heavy' !important;
		}

		.tracking-number {
			font-size: 25px;
			color: #050593
			font-family: 'AvenirLTStd-Heavy' !important;
		}
	}

	@media (max-width: 450px) {
  		.ant-card-body {
  			padding: 20px 15px;

  			.tracking-title {
  				font-size: 14px;
  				font-weight:100;
  			}

  			.tracking-number {
				font-size: 22px;
			}


			.status-alert-box {
				padding: 8px 10px;

				.ant-row {
					margin-bottom: 3px !important;
				}

				p.title {
					font-size: 18px !important;
				}

				p.description {
					font-size: 16px !important;
					margin-bottom: 0 !important;
				}
			}

  		}
	}
`