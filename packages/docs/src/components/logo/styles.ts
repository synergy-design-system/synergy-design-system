import { css } from '@microsoft/fast-element';

export const styles = css`
  :host {
    display: inline-block;
  }

  svg {
    box-sizing: border-box;
    display: block;
    min-width: 146px;

    /**
     * A protective space around the logo must always be maintained.
     * It gives the logo visual power, space and strength.
     * In this way, other design elements cannot diminish its effect and it always comes into its own.
     * The height of the I serves as the reference value for all measurement rules for the protected space of the logo.
     */
    padding: 11.2%;
  }

  /* Variant black (mostly for print) */
  :host([variant="black"]) g {
    fill: #000;
  }

  /* Variant white (use on dark backgrounds) */
  :host([variant="white"]) g {
    fill: #fff;
  }
`;
