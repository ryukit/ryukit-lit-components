import {css} from 'lit';

export const sharedStyles = css `
  :host {
    --block-indent: 8px;
    --block-indent-negative: -8px;
    --block-indent-x2: 16px;
    --block-indent-x3: 32px;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  .mb0 {
    margin-bottom: 0;
  }
  .mt0 {
    margin-top: 0;
  }
`;
