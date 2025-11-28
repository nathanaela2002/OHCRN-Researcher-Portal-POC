/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Aggregations, useArrangerTheme } from '@overture-stack/arranger-components';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/types';
import { ReactElement } from 'react';
import { CustomUIThemeInterface } from '../theme';
import { checkIconSvg } from './icons/CheckIcon';

// Generate data URL from CheckIcon SVG
const checkIconDataUrl = encodeURIComponent(checkIconSvg);

const getAggregationsStyles = (theme: CustomUIThemeInterface): UseThemeContextProps => {
	// Encode the primary_dark color for use in SVG data URLs
	const primaryDarkEncoded = encodeURIComponent(theme.colors.primary_dark);
	
	return {
		callerName: 'Data-Table-4-Facets',
		components: {
				Aggregations: {
				AggsGroup: {
					collapsedBackground: theme.colors.white,
					headerSticky: true,
					css: css`
						.header {
							position: sticky;
							top: 0;
							z-index: 10;
							background-color: ${theme.colors.white};
						}
						.title-wrapper {
							background-color: ${theme.colors.white};
							.title-control {
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
								width: 100%;
								.collapsing-icon,
								.arrow-icon {
									order: 2;
									margin-left: auto;
								}
								.title {
									order: 1;
								}
							}
						}
						.title {
							font-size: 14px;
							font-weight: 600;
							line-height: 20px;
						}
						.toggle-button {
							font-size: 12px;
							padding: 2px 5px 8px 5px;
							margin-left: 5px;
							.toggle-button-option {
								border: 1px solid #ddd;
								&:nth-of-type(2) {
									border-left: 0px;
									border-right: 0px;
								}
							}
							.toggle-button-option .bucket-count {
								font-size: 11px;
								display: inline-block;
								background-color: #e0e0e0;
								padding: 0 3px;
								border-radius: 3px;
							}
							.toggle-button-option.active {
								background-color: #e3f2fd;
								.bucket-count {
									background-color: #000000ff;
								}
							}
							.toggle-button-option.disabled {
								background-color: #f5f5f5;
								color: #999;
							}
						}
						input[type='checkbox'] {
						/* hide the native checkbox completely */
						appearance: none;
						-webkit-appearance: none;
						width: 1rem;
						height: 1rem;
						border: 1px solid #BABCC2;
						border-radius: 3px;
						display: inline-flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						background: white; /* unselected box */
						}

						input[type='checkbox']:checked {
						background-color: #64BC46;
						border: 1px solid #64BC46;
						}

						input[type='checkbox']:checked::after {
						content: url("data:image/svg+xml,${checkIconDataUrl}");
						display: block;
						width: 12px;
						height: 9px;
						margin-bottom: 0.4rem;
						}
						.bucket-item {
						position: relative;
						margin: 2px 0;
						padding: 2px 8px;
						}

						.bucket-item:has(input[type='checkbox']:checked)::before {
						content: "";
						position: absolute;

						top: 0px;
						bottom: 0px;

						left: 0px;
						right: 0px;

						background-color: #EFF8EC;
						border-radius: 4px;

						z-index: 0;
						}

						/* Keep content above the green highlight */
						.bucket-item > * {
						position: relative;
						z-index: 1;
						}


					`,
					groupDividerColor: theme.colors.grey_3,
					headerBackground: theme.colors.white,
					headerDividerColor: theme.colors.grey_2,
					headerFontColor: theme.colors.black,
				},
				BucketCount: {
					background: '#B2DDA2',
					fontSize: '0.75rem',
					css: css`
						margin-top: 0.2rem;
					`,
				},
				FilterInput: {
					css: css`
						border-radius: 5px;
						border: 1px solid ${theme.colors.primary};
						margin: 6px 5px 7px 0;
						&.focused {
							box-shadow: inset 0 0 2px 1px ${theme.colors.primary};
						}
						& input {
							font-size: 12px;
							&::placeholder {
								color: ${theme.colors.black};
							}
						}
						input[type='text' i] {
							margin-left: 5px;
							margin-top: 2px;
						}
					`,
				},
				MoreOrLessButton: {
					css: css`
						font-size: 11px;
						&::before {
							padding-top: 3px;
							margin-right: 3px;
						}
						&.more::before {
							content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3E%3Cpath fill='${primaryDarkEncoded}' fill-rule='evenodd' d='M7.637 6.029H6.034v1.613c0 .291-.24.53-.534.53-.294 0-.534-.239-.534-.53V6.03H3.363c-.294 0-.534-.238-.534-.529 0-.29.24-.529.534-.529h1.603V3.358c0-.291.24-.53.534-.53.294 0 .534.239.534.53V4.97h1.603c.294 0 .534.238.534.529 0 .29-.24.529-.534.529M5.5 0C2.462 0 0 2.462 0 5.5S2.462 11 5.5 11 11 8.538 11 5.5 8.538 0 5.5 0'/%3E%3C/svg%3E%0A");
						}
						&.less::before {
							content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 20 20'%3E%3Cpath fill='${primaryDarkEncoded}' fill-rule='evenodd' d='M13.81 10.952H6.19c-.523 0-.952-.428-.952-.952s.429-.952.952-.952h7.62c.523 0 .952.428.952.952s-.429.952-.952.952M10 0C4.476 0 0 4.476 0 10s4.476 10 10 10 10-4.476 10-10S15.524 0 10 0'/%3E%3C/svg%3E%0A");
						}
					`,
					fontColor: theme.colors.primary_dark,
				},
			RangeAgg: {
				css: css`
					&[data-fieldName='analysis.host.host_age'] .unit-wrapper {
						display: none;
					}
				`,
				RangeLabel: {
					borderRadius: '0.2rem',
					fontWeight: 'bold !important',
					css: css`
						font-size: 11px;
						background-color: #e0e0e0;
						&:last-of-type,
						&:nth-of-type(4) {
							background-color: #ffffff;
							color: #999;
						}
					`,
					padding: '0 0.2rem',
				},
				RangeSlider: {
					borderColor: '#ddd',
					disabledBackground: '#e0e0e0',
				},
				RangeTrack: {
					disabledInBackground: theme.colors.grey_1,
					disabledOutBackground: theme.colors.grey_3,
					inBackground: theme.colors.primary,
					outBackground: theme.colors.grey_1,
				},
			},
			TextHighlight: {
				css: css`
					&.active {
						color: #04518C !important;
					}
				`,
			},
			TreeJointIcon: {
				fill: theme.colors.primary,
				size: 8,
				transition: 'all 0s',
			},
		},
	},
	} as UseThemeContextProps;
};

const Facets = (): ReactElement => {
	const theme = useTheme() as CustomUIThemeInterface;
	useArrangerTheme(getAggregationsStyles(theme));
	return (
		<article
			css={css`
				display: flex;
				flex-direction: column;
				height: 100%;
			`}
		>
			<h2
				css={css`
					font-size: 16px;
					font-weight: 600;
					padding: 6px 0 2px 8px;
					margin: 0;
					border-bottom: 1px solid #e0e0e0;
					background-color: ${theme.colors.white};
					position: sticky;
					top: 0;
					z-index: 5;
				`}
			>
				Filters
			</h2>
			<Aggregations />
		</article>
	);
};

export default Facets;

