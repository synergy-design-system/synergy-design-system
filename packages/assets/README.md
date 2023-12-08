## Documentation

[This package](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/assets) is taking care about getting assets (like logos, system icons and default icons) from Figma.
The folder structure of the assets corresponds to the structure of the Figma page.
 - **logos:** contains the variants of the SICK brand logo
 - **icons:** contains the standard icons based on [Material Icons](https://fonts.google.com/icons)
 - **system-icons:** contains a small subset of icons, that are internally used by the Synergy components

> **Note:** All assets from figma, which should not appear in this package (e.g. documentation), will start with an underscore (e.g. _my-doc-for-an-asset). This assets are getting filtered and ignored by this package.

### Setup
To update the assets from Figma, first of all a personal access token in Figma needs to be created.
The documentation how this can be achieved can be found [here](https://www.figma.com/developers/api#access-tokens).
The only needed scope is "File content" set to readonly.

After the creation of the personal access token, it needs to be saved in a ***.env*** file with the variable ***"FIGMA_PERSONAL_ACCESS_TOKEN"***.
It should look like following: 

```
FIGMA_PERSONAL_ACCESS_TOKEN = "my-personal-access-token"
```

### Update assets from Figma
If something in the Figma assets got changed, the assets of this package also needs to be updated.
To update the assets run following in the terminal of the assets package folder:
```
pnpm fetch-assets
```

