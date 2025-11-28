import colors from './colors';

const defaultTheme = {
    colors,
    shadow: {
        default: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);',
        right: 'box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);',
    },
};

export default defaultTheme;
export type CustomUIThemeInterface = typeof defaultTheme;
