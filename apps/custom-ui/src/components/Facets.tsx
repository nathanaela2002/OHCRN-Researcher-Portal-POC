/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Aggregations, useArrangerTheme } from '@overture-stack/arranger-components';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/types';
import { ReactElement, useState, useEffect } from 'react';
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
						&,
						&.aggregation-group,
						&[class*="AggsGroup"] {
							border-bottom: 0.1rem solid #E5E7EB !important;
						}

						.header {
							position: sticky;
							top: 0;
							z-index: 10;
							background-color: ${theme.colors.white};
						}
						.title-wrapper {
							background-color: ${theme.colors.white};
                            /* Make wrapper a flex container to order siblings */
                            display: flex;
                            align-items: center;
							border-bottom: none !important;

							.title-control {
                                order: 1;
                                flex-grow: 1;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
								width: 100%;
								.collapsing-icon,
								.arrow-icon {
									order: 2;
									margin-left: auto;
                                    transition: transform 0.2s;
                                    color: #282A35;
                                    /* Target the path to override hardcoded fill */
                                    path {
                                        fill: #282A35 !important;
                                    }
								}
								.title {
									order: 1;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
									max-width: 14.5rem;
                                    margin-right: 0; /* Add some space between title and arrow */
								}

                                /* Enforce arrow rotation based on title attribute */
                                /* When title contains "expand" (collapsed), point down (0deg or default) */
                                &[title*="expand"] .arrow-icon {
                                    transform: rotate(0deg);
                                }
                                /* When title contains "collapse" (expanded), point up (180deg) */
                                &[title*="collapse"] .arrow-icon {
                                    transform: rotate(180deg);
                                }
							}

                            /* Move microscope icon to the left */
                            .filter-icon {
                                order: 0;
                                margin-right: -0.25rem;
                                flex-shrink: 0; /* Prevent icon from shrinking */
                            }

                            /* Hide alphabet sort icon */
                            .sorting-icon {
                                display: none !important;
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

						.bucket-item:has(input[type='checkbox']:checked) {
							&::before {
								content: "";
								position: absolute;

								top: -1px;
								bottom: -1px;

								left: 0px;
								right: 0px;

								background-color: #EFF8EC;
								border-radius: 4px;

								z-index: 0;
							}

							/* Change bucket count background when checked */
							[class*="BucketCount"],
							[class*="bucket-count"] {
								background-color: #B2DDA2 !important;
							}
						}

						/* Keep content above the green highlight */
						.bucket-item > * {
						position: relative;
						z-index: 1;
						}

						/* Style for Select All button */
						.custom-select-all-btn {
							color: #286C77 !important;
							text-decoration: underline;
							background: none !important;
							border: none !important;
							cursor: pointer;
							font-size: 11px !important;
							margin: 0 !important;
							padding: 0 16px !important;
							display: inline-block !important;
							font-weight: 300 !important;
							text-align: left !important;
							font-family: inherit;
							flex-shrink: 0;
							&:hover {
								text-decoration: underline;
							}
						}

						/* Container for Select All and More buttons */
						.custom-buttons-container {
							display: flex !important;
							align-items: center !important;
							justify-content: space-between !important;
							margin-top: 4px !important;
							width: 100% !important;
							flex-wrap: nowrap !important;
							position: relative !important;
						}

						/* Position More button to the right */
						.custom-buttons-container button.showMore-wrapper,
						.custom-buttons-container button[class*="MoreOrLessButton"],
						.custom-buttons-container button:not(.custom-select-all-btn) {
							margin-right: 8px !important;
							margin-left: auto !important;
							flex-shrink: 0 !important;
						}

					`,
					headerBackground: theme.colors.white,
					headerDividerColor: theme.colors.grey_2,
					headerFontColor: theme.colors.black,
				},
				BucketCount: {
					background: '#E5E7EB',
					fontSize: '0.75rem',
					css: css`
						margin-top: 0.1rem;
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
	const [isAllExpanded, setIsAllExpanded] = useState(false);

	useEffect(() => {
		// Debounce function to prevent rapid firing
		let debounceTimer: NodeJS.Timeout | null = null;
		const debounce = (fn: () => void, delay: number) => {
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(fn, delay);
		};

		const addSelectAllButtons = () => {
			// Find all aggregation groups first
			const aggregationGroups = document.querySelectorAll('[class*="AggsGroup"]');

			aggregationGroups.forEach(group => {
				// Find bucket items in this group
				const bucketItems = group.querySelectorAll('.bucket-item');
				if (bucketItems.length === 0) return;

				// Check if Select All button already exists - if so, ensure container is at end and More button is in it
				if (group.querySelector('.custom-select-all-btn')) {
					const existingContainer = group.querySelector('.custom-buttons-container') as HTMLElement;
					if (existingContainer) {
						const container = existingContainer.parentElement;
						// Ensure container is at the end
						if (container && container.lastElementChild !== existingContainer) {
							try {
								container.appendChild(existingContainer);
							} catch (e) {
								// Ignore errors - might be in the middle of React updates
							}
						}
						
						// Find More button that's not in the container
						const moreButtonOutside = Array.from(group.querySelectorAll('button')).find(btn => {
							if (btn.classList.contains('custom-select-all-btn')) return false;
							if ((btn as HTMLElement).closest('.custom-buttons-container')) return false;
							const text = (btn.textContent || '').trim();
							return /\+?\d*\s*more/i.test(text) || 
								text.toLowerCase() === 'more' ||
								text.toLowerCase() === 'less';
						}) as HTMLElement | undefined;
						
						if (moreButtonOutside && moreButtonOutside.isConnected && existingContainer.isConnected) {
							try {
								existingContainer.appendChild(moreButtonOutside);
							} catch (e) {
								// Ignore errors - button might have been removed by React
							}
						}
					}
					return;
				}

				// Find the more button in this group (but not if it's already in our container)
				const allButtons = group.querySelectorAll('button:not(.custom-select-all-btn)');
				let moreButton: HTMLElement | null = null;
				
				for (const button of Array.from(allButtons)) {
					// Skip if this button is already in our container
					if ((button as HTMLElement).closest('.custom-buttons-container')) {
						continue;
					}
					
					const buttonText = (button.textContent || '').trim();
					// Check if this is a "more" button
					if (/\+?\d*\s*more/i.test(buttonText) || 
						buttonText.toLowerCase() === 'more' ||
						buttonText.toLowerCase() === 'less') {
						moreButton = button as HTMLElement;
						break;
					}
				}

				// Find the container - use bucket items' parent (more reliable)
				const container = (bucketItems[0] as HTMLElement).parentElement;
				if (!container) return;

				// Check if we already have a buttons container
				let buttonsContainer = container.querySelector('.custom-buttons-container') as HTMLElement;
				
				if (!buttonsContainer) {
					// Create a container for both buttons
					buttonsContainer = document.createElement('div');
					buttonsContainer.className = 'custom-buttons-container';
					// Always append at the end
					container.appendChild(buttonsContainer);
				} else {
					// If container exists but isn't at the end, move it to the end
					if (container.lastElementChild !== buttonsContainer) {
						try {
							container.appendChild(buttonsContainer);
						} catch (e) {
							// Ignore errors - might be in the middle of React updates
						}
					}
				}

				// Create the Select All button if it doesn't exist - only create once
				if (!buttonsContainer.querySelector('.custom-select-all-btn')) {
					const selectAllBtn = document.createElement('button');
					selectAllBtn.className = 'custom-select-all-btn';
					selectAllBtn.innerText = 'Select All';

					selectAllBtn.onclick = (e) => {
						e.preventDefault();
						e.stopPropagation();
						
						// Find all checkboxes in this aggregation group
						const allCheckboxes = group.querySelectorAll('input[type="checkbox"]');
						const checkedCheckboxes = group.querySelectorAll('input[type="checkbox"]:checked');
						
						// If all are checked, deselect all; otherwise, select all unchecked
						if (checkedCheckboxes.length === allCheckboxes.length && allCheckboxes.length > 0) {
							// All are selected, so deselect all
							allCheckboxes.forEach((cb) => (cb as HTMLElement).click());
						} else {
							// Not all are selected, so select all unchecked
							const uncheckedCheckboxes = group.querySelectorAll('input[type="checkbox"]:not(:checked)');
							uncheckedCheckboxes.forEach((cb) => (cb as HTMLElement).click());
						}
					};

					// Insert Select All button into the container
					buttonsContainer.insertBefore(selectAllBtn, buttonsContainer.firstChild);
				}

				// Move the more button into the container if it exists and isn't already there
				if (moreButton && 
					!moreButton.closest('.custom-buttons-container') &&
					moreButton.isConnected &&
					buttonsContainer.isConnected) {
					try {
						buttonsContainer.appendChild(moreButton);
					} catch (e) {
						// If moving fails (e.g., node already removed by React), ignore it silently
					}
				}
			});
		};

		// Run immediately with a small delay to ensure DOM is ready
		const timeoutId = setTimeout(addSelectAllButtons, 100);

		// Set up observer to watch for DOM changes with debouncing
		const observer = new MutationObserver((mutations) => {
			// Only process if there are actual relevant changes
			const hasRelevantChanges = mutations.some(mutation => {
				// Check if buckets or buttons were added/removed
				return Array.from(mutation.addedNodes).some(node => 
					node.nodeType === 1 && (
						(node as Element).querySelector?.('.bucket-item') ||
						(node as Element).querySelector?.('button[class*="MoreOrLessButton"]') ||
						(node as Element).classList?.contains('bucket-item')
					)
				) || Array.from(mutation.removedNodes).some(node =>
					node.nodeType === 1 && (
						(node as Element).querySelector?.('.bucket-item') ||
						(node as Element).querySelector?.('button[class*="MoreOrLessButton"]')
					)
				);
			});

			if (hasRelevantChanges) {
				// Debounce to prevent rapid firing during re-renders
				debounce(addSelectAllButtons, 200);
			}
		});

		observer.observe(document.body, { 
			childList: true, 
			subtree: true
		});

		return () => {
			clearTimeout(timeoutId);
			if (debounceTimer) clearTimeout(debounceTimer);
			observer.disconnect();
		};
	}, []);

	const handleToggleAll = () => {
		const toggleButtons = document.querySelectorAll('.title-control');
		toggleButtons.forEach((button) => {
			const title = button.getAttribute('title');
			if (isAllExpanded) {
				// If currently expanded, we want to collapse.
				// Look for "Click to collapse" which means it IS expanded.
				if (title && title.includes('Click to collapse')) {
					(button as HTMLElement).click();
				}
			} else {
				// If currently collapsed, we want to expand.
				// Look for "Click to expand" which means it IS collapsed.
				if (title && title.includes('Click to expand')) {
					(button as HTMLElement).click();
				}
			}
		});
		setIsAllExpanded(!isAllExpanded);
	};

	return (
		<article
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 6px 8px 2px 8px;
					border-bottom: none;
					background-color: ${theme.colors.white};
					position: sticky;
					top: 0;
					z-index: 5;
				`}
			>
				<h2
					css={css`
						font-size: 16px;
						font-weight: 600;
						margin: 0;
					`}
				>
					Filters
				</h2>
				<button
					onClick={handleToggleAll}
					css={css`
                        background: none;
                        border: none;
                        color: #282A35;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        padding: 0;
                        /* Remove underline on hover */
                        &:hover {
                            text-decoration: none;
                        }
                    `}
				>
					{isAllExpanded ? 'Collapse All' : 'Expand All'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="10"
						height="10"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="4" /* Bolder arrow */
						strokeLinecap="round"
						strokeLinejoin="round"
						css={css`
                            margin-left: 4px;
                            transition: transform 0.2s;
                            transform: ${isAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
                        `}
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>
			</div>
			<Aggregations />
		</article>
	);
};

export default Facets;
