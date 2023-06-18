import { Global, css } from '@emotion/react';

const styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        border-radius: 5px;
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    html,
    body {
        width: 100%;
        min-height: 100vh;
        font-size: 20px;
        background-color: rgb(200 200 200 / 1);
        font-family: Lato, "sans-serif";
    }

`;

export const GlobalStyles = () => <Global styles={styles} />