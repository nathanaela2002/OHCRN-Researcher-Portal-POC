/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Aggregations, useArrangerTheme } from '@overture-stack/arranger-components';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/types';
import { ReactElement } from 'react';
import { CustomUIThemeInterface } from '../theme';

const getAggregationsStyles = (theme: CustomUIThemeInterface): UseThemeContextProps => ({
	callerName: 'Data-Table-5-Facets',
	components: {
		Aggregations: {
			AggsGroup: {
				collapsedBackground: theme.colors.grey_2,
				css: css`
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
								background-color: #90caf9;
							}
						}
						.toggle-button-option.disabled {
							background-color: #f5f5f5;
							color: #999;
						}
					}
				`,
				groupDividerColor: theme.colors.grey_3,
				headerBackground: theme.colors.white,
				headerDividerColor: theme.colors.grey_2,
				headerFontColor: theme.colors.black,
			},
			BucketCount: {
				background: 'rgba(4, 81, 140, 0.45)',
				fontSize: '0.75rem',
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
						content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11'%3E%3Cpath fill='%2304518C' fill-rule='evenodd' d='M7.637 6.029H6.034v1.613c0 .291-.24.53-.534.53-.294 0-.534-.239-.534-.53V6.03H3.363c-.294 0-.534-.238-.534-.529 0-.29.24-.529.534-.529h1.603V3.358c0-.291.24-.53.534-.53.294 0 .534.239.534.53V4.97h1.603c.294 0 .534.238.534.529 0 .29-.24.529-.534.529M5.5 0C2.462 0 0 2.462 0 5.5S2.462 11 5.5 11 11 8.538 11 5.5 8.538 0 5.5 0'/%3E%3C/svg%3E%0A");
					}
					&.less::before {
						content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 20 20'%3E%3Cpath fill='%2304518c' fill-rule='evenodd' d='M13.81 10.952H6.19c-.523 0-.952-.428-.952-.952s.429-.952.952-.952h7.62c.523 0 .952.428.952.952s-.429.952-.952.952M10 0C4.476 0 0 4.476 0 10s4.476 10 10 10 10-4.476 10-10S15.524 0 10 0'/%3E%3C/svg%3E%0A");
					}
				`,
				fontColor: theme.colors.primary,
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
} as UseThemeContextProps);

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
				`}
			>
				Filters
			</h2>
			<Aggregations />
		</article>
	);
};

export default Facets;

