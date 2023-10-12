# @synergy-design-system/components

Synergy Web Component library based on [shoelace](https://shoelace.style/).

## Local setup
### Using the vendor cli
The vendor cli is taking care about updating our code base according to a new version of shoelace.

To change the shoelace version, that should be downloaded, change the version in the config of `./scripts/vendorism.js`.
To download it use the command `pnpm vendor.get`.
If code in our components library should be updated to this new shoelace version use `pnpm vendor.set`.

All shoelace files are per default readonly and are disabled from being changed. To change this files can be ejected. This can be done via:
`pnpm vendor.eject "src/declaration.d.ts"`.
