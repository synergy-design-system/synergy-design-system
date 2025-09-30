import { css } from 'lit';

export default css`
  .popup {
    /* Clear UA styles for [popover] */
    :where(&) {
      background: unset;
      border: unset;
      color: unset;
      height: unset;
      inset: unset;
      margin: unset;
      overflow: unset;
      padding: unset;
      width: unset;
    }
  }
`;
