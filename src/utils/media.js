import { css } from 'styled-components';

const breakpoints = {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1440,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
    return acc;
}, {});
