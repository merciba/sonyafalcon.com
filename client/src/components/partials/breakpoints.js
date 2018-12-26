import { css } from "styled-components";
import mobile from "is-mobile";

export const sizes = {
  huge: 5000,
  desktoplarge: 1920,
  desktop: 1200,
  tablet: 1100,
  mobile: 480
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const screenIs = query => {
  switch (query) {
    case "huge":
      return window.innerWidth > sizes.huge;
    case "desktoplarge":
      return (
        window.innerWidth <= sizes.desktoplarge &&
        window.innerWidth > sizes.desktop
      );
    case "desktop":
      return (
        window.innerWidth <= sizes.desktop && window.innerWidth > sizes.tablet
      );
    case "tablet":
      return (
        window.innerWidth <= sizes.tablet && window.innerWidth > sizes.mobile
      );
    case "mobile":
      return (
        (window.innerWidth <= sizes.mobile ||
          window.innerHeight <= sizes.mobile)
      );
    default:
      return false;
  }
};
