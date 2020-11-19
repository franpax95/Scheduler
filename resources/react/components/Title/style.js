import styled from 'styled-components';
import theme from 'styled-theming';

const titleColor = theme('mode', { light: '#2b4b88', dark: 'whitesmoke' });

export const Title = styled.h1`
    margin-bottom: 20px;

    color: ${titleColor};

    font-size: max(3vw, 30px);
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
`;
