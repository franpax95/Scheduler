import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledDateSchedules = styled.section`
    padding: 12vh 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledScheduleLink = styled(Link)`
    width: max(70vw, 300px);
    max-width: 900px;
    height: 80px;
    margin-bottom: max(5vh, 30px);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #666666;
    color: white;

    font-size: max(2vw, 20px);
    font-weight: bold;

    transition: background-color .4s;

    &:hover {
        background-color: #4d4d4d;
    }

    &:active {
        background-color: #262626;
    }
`;

export const StyledScheduleDate = styled.span`
    margin-bottom: 20px;

    color: white;

    font-size: max(3vw, 30px);
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
`;