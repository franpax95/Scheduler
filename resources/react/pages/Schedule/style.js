import styled from 'styled-components';

export const StyledSchedule = styled.div`
    padding: 8vh 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const StyledTitle = styled.h1`
    margin: 10vh 0 4vh 0;

    color: white;

    font-size: max(3vw, 30px);
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
`;

export const StyledTaskRow = styled.div`
    margin: 10px 0;
    padding: 20px;
    width: 70vw;
    max-width: 600px;
    min-width: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
    background-color: darkgray;
`;

export const StyledTaskRowButton = styled.button`
    margin: 10px 0;
    padding: 15px 20px;
    width: 70vw;
    max-width: 600px;
    min-width: 250px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border-radius: 5px;
    background-color: lightgray;
    -webkit-box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 10px -10px rgba(0,0,0,0.75);

    font-size: min(18px, max(13px, 1.8vw));

    transition: background-color .1s, color .1s;

    &:hover{
        background-color: darkgray;
    }

    &:active{
        background-color: gray;
    }
`;

export const StyledTaskInput = styled.input`
    margin-right: auto;
    width: 80%;
    max-width: 400px;
    min-width: 150px;

    cursor: default;
    border: none;
    border-bottom: solid 1.5px darkgray;
    background-color: inherit;

    font-size: min(20px, max(14px, 2.2vw));

    transition: background-color .2s, border .2s;

    @media (max-width: 500px) {
        margin-right: 5px;
    }
    
    &:focus {
        cursor: auto;
        background-color: lightgray;
        border-bottom: solid 1.5px gray;
    }
`;

export const StyledDeleteButton = styled.button`
    background: none;
    border: none; 

    & *{
        margin-top: 2px;
        color: red;
        font-size: 25px;
        transition: color .2s;
    }

    &:hover *{
        color: #cc0000;
    }

    &:active * {
        color: #800000;
    }
`;