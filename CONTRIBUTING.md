# Contributing <!-- omit in toc -->

Before contributing, please read our [community guidelines](#community-guidelines) and [terms of service](./TERMS.md).

## Table of Contents <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Development](#development)
  - [Production Builds](#production-builds)
  - [Releasing](#releasing)
- [Maintenance](#maintenance)
  - [Adding New Dependencies](#adding-new-dependencies)
  - [Create New Packages](#create-new-packages)
  - [Running Commands On Packages](#running-commands-on-packages)
- [Community Guidelines](#community-guidelines)

## Getting started

This project is a Javascript monorepo. To get started, you must first install the dependencies:

```
npm install
```

> **Heads up 👋**
>
> Running `npm install` installs dependencies for the root `package.json` file, and _all_ `package.json` files in the `packages/` folder. You do not need to do this yourself.

### Development

To develop for this project, you can run:

```
npm run develop
```

Or to work on a specific package or unit of this monorepo, you can run:

```
npm run develop -- --scope @spike/package-name
```

Or to work on a set of specific packages or units of this monorepo, you can run:

```
npm run develop -- --scope @spike/package-name,npm run develop -- --scope @spike/package-name-2
```

> **Heads up 👋**
>
> The `develop` script starts the `develop` script of every package inside the `packages` folder, or for the scope specified.

### Production Builds

To create a production build of each package, you can run:

```
npm run build
```

> **Heads up 👋**
>
> The `build` script starts the `build` script of every package inside the `packages` folder, or for the scope specified, and runs them in the correct order for you!

### Releasing

We're not there yet, we're just an alpha project. Stay tuned!

## Maintenance

### Adding New Dependencies

To add a new dependency to all packages of the monorepo, run:

```
npm run add -- package-name
```

To add a new dependency to only certain packages of the monorepo, run:

```
npm run add -- package-name --scope=@spike/package-name
```

### Create New Packages

To create a new package to the monorepo, you can run:

```
npm run create -- @spike/package-name
```

### Running Commands On Packages

To run a CLI command on all packages, run:

```
npm run exec -- "command args"
```

To run a CLI command on specific packages, run:

```
npm run exec -- "command args" --scope=@spike/package-name
```

## Community Guidelines

Don't be a jerk!
