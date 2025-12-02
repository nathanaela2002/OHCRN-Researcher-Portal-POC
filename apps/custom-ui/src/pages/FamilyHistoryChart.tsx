/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { BarChart, ChartsProvider, ChartsThemeProvider } from '@overture-stack/arranger-charts';
import { ReactElement } from 'react';
import { CustomUIThemeInterface } from '../theme';
import ErrorBoundary from '../components/ErrorBoundary';

const FamilyHistoryChart = (): ReactElement => {
    const theme = useTheme() as CustomUIThemeInterface;

    return (
        <div
            css={css`
				padding: 12px;
				background-color: ${theme.colors.white};
				border-radius: 8px;
				border: 1px solid #BABCC2;
				margin: 15px 0;
			`}
        >
            <h3
                css={css`
					margin: 0 0 10px 0;
					color: ${theme.colors.black};
					font-family: 'Montserrat', sans-serif;
					font-size: 14px;
					font-weight: 600;
				`}
            >
                Family History of Cancer
            </h3>

            <div style={{ height: '180px' }}>
                <ErrorBoundary>
                    <ChartsProvider debugMode={false} loadingDelay={0}>
                        <ChartsThemeProvider>
                            <BarChart
                                fieldName="data__familyHistoryOfCancer"
                                maxBars={15}
                                theme={{
                                    axisLeft: {
                                        legend: 'History',
                                    },
                                    axisBottom: {
                                        legend: 'Count',
                                    },
                                }}
                            />
                        </ChartsThemeProvider>
                    </ChartsProvider>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default FamilyHistoryChart;

