/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { BarChart, ChartsProvider, ChartsThemeProvider } from '@overture-stack/arranger-charts';
import { ReactElement } from 'react';
import { CustomUIThemeInterface } from '../theme';
import ErrorBoundary from '../components/ErrorBoundary';

const PrimaryCancerDiagnosisChart = (): ReactElement => {
    const theme = useTheme() as CustomUIThemeInterface;

    return (
        <div
            css={css`
				padding: 20px;
				background-color: ${theme.colors.white};
				border-radius: 8px;
				${theme.shadow.default};
				margin: 15px 0;
			`}
        >
            <h3
                css={css`
					margin: 0 0 20px 0;
					color: ${theme.colors.primary};
					font-size: 18px;
					font-weight: 600;
				`}
            >
                Primary Cancer Diagnosis
            </h3>

            <div style={{ height: '400px' }}>
                <ErrorBoundary>
                    <ChartsProvider debugMode={false} loadingDelay={0}>
                        <ChartsThemeProvider>
                            <BarChart
                                fieldName="data__selfReportedPrimaryCancerDiagnosis"
                                maxBars={15}
                                theme={{
                                    axisLeft: {
                                        legend: 'Diagnosis',
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

export default PrimaryCancerDiagnosisChart;

