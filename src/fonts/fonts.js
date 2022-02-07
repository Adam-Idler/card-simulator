import { createGlobalStyle } from 'styled-components';

import RobotoMonoWoff from './RobotoMono-Regular.woff';
import RobotoMonoWoff2 from './RobotoMono-Regular.woff2';

const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto Mono';
        src: url(${RobotoMonoWoff2}) format('woff2'),
             url(${RobotoMonoWoff}) format('woff');
        font-weight: 400;
    }

    body {
        overflow: hidden;
        font-family: 'Roboto Mono', sans-serif;
    }
`;

export default FontStyles;
