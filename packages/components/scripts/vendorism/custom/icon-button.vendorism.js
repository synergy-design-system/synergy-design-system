export const vendorIconButton = (path, content) => {
  const output = { content, path };

  if (!path.includes('icon-button.component.ts')
    && !path.includes('icon-button.styles.ts')
    && !path.includes('icon-button.test.ts')
  ) {
    return output;
  }
  // Add size property
  const sizeProp = `/** The icon button's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the button. */`;
  output.content = output.content.replace('/** Disables the button. */', sizeProp);

  // Add color property
  const colorProp = `/**
  * The color of the icon button.
  * The default "currentColor" makes it possible to easily style the icon button from outside without any CSS variables.
  */
  @property({ reflect: true }) color: 'currentColor' | 'primary' | 'neutral'  = 'currentColor';

  /** Disables the button. */`;
  output.content = output.content.replace('/** Disables the button. */', colorProp);

  // Add size and color modifiers to components classMap
  const modifiers = `'icon-button--focused': this.hasFocus,
          'icon-button--small': this.size === 'small',
          'icon-button--medium': this.size === 'medium',
          'icon-button--large': this.size === 'large',
          'icon-button--primary': this.color === 'primary',
          'icon-button--neutral': this.color === 'neutral'`;
  output.content = output.content.replace("'icon-button--focused': this.hasFocus", modifiers);

  return output;
};
