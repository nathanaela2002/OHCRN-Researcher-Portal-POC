/** @jsxImportSource @emotion/react */
import { css, ThemeProvider } from '@emotion/react';
import { ArrangerDataProvider } from '@overture-stack/arranger-components';
import { ReactElement, useEffect, useState } from 'react';
import createArrangerFetcher from './utils/arrangerFetcher';
import defaultTheme from './theme';

const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: 'http://localhost:5054',
});
import Facets from './components/Facets';

const configsQuery = `
	query ($documentType: String!, $index: String!) {
		hasValidConfig (documentType: $documentType, index: $index)
	}
`;

const App = (): ReactElement => {
	const [arrangerHasConfig, setArrangerHasConfig] = useState<boolean>(false);
	const [loadingArrangerConfig, setLoadingArrangerConfig] = useState<boolean>(true);
	const documentType = 'file';
	const index = 'datatable5_centric';

	useEffect(() => {
		arrangerFetcher({
			endpoint: 'graphql/hasValidConfig',
			body: JSON.stringify({
				variables: {
					documentType,
					index,
				},
				query: configsQuery,
			}),
		})
			.then(async ({ data } = { data: null }) => {
				if (data?.hasValidConfig) {
					await setArrangerHasConfig(data.hasValidConfig);
					await new Promise((resolve) => setTimeout(resolve, 1000));
					return setLoadingArrangerConfig(false);
				}
				throw new Error('Could not validate Arranger server configuration!');
			})
			.catch(async (err) => {
				console.warn(err);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setLoadingArrangerConfig(false);
			});
	}, []);

	const ConfigError =
		index && documentType
			? !arrangerHasConfig && (
				<span>
					No active configurations for the portal were found. Please make sure the index and GraphQL document type
					specified have been created in the Arranger Admin UI.
				</span>
			)
			: null;

	return (
		<ThemeProvider theme={defaultTheme}>
			<div>
				{loadingArrangerConfig ? (
					<div
						css={css`
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						background-color: #f5f5f5;
						height: 100vh;
					`}
					>
						<div>Loading...</div>
					</div>
				) : ConfigError ? (
					<div
						css={css`
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						min-height: calc(100vh - 120px);
						padding: 2rem;
						width: 100%;
					`}
					>
						<div
							css={css`
							max-width: 800px;
							width: 100%;
							padding: 20px;
							border: 1px solid #ccc;
							border-radius: 4px;
							background-color: #fff3cd;
						`}
						>
							<h2 style={{ marginTop: 0, color: '#856404' }}>Configuration Error</h2>
							<p style={{ color: '#856404' }}>{ConfigError}</p>
						</div>
					</div>
				) : (
					<ArrangerDataProvider
						apiUrl="http://localhost:5054"
						customFetcher={arrangerFetcher}
						documentType={documentType}
						theme={{
							colors: {
								common: {
									black: '#000000',
								},
							},
							components: {
								Loader: {
									size: '20px',
								},
							},
						}}
					>
						<div
							css={css`
							display: flex;
							height: 100vh;
						`}
						>
							<aside
								css={css`
								flex: 0 0 300px;
								flex-direction: column;
								background-color: #ffffff;
								z-index: 1;
								height: 100vh;
								overflow-y: scroll;
								border-right: 1px solid #ccc;
							`}
							>
								<Facets />
							</aside>
							<div
								css={css`
								display: flex;
								flex-direction: column;
								width: 100%;
								height: 100vh;
								overflow-y: scroll;
							`}
							>
								<div
									css={css`
									flex: 8.5;
									margin: 0 15px 0 15px;
									padding: 20px;
								`}
								>
									<h1>custom</h1>
								</div>
							</div>
						</div>
					</ArrangerDataProvider>
				)}
			</div>
		</ThemeProvider>
	);
};

export default App;
