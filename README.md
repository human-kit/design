# human-kit design

Styled, accessible components for Svelte 5. You copy them into your project, and then the code is yours.

The behavior and the accessibility come from [`@human-kit/ui`](https://ui.human-kit.com). This kit adds the look: design tokens, a light and a dark theme, variants, and Tailwind CSS classes.

## Use the kit

The project must use SvelteKit, Svelte 5 and Tailwind CSS v4.

```bash
npx @human-kit/design init
npx @human-kit/design add button dialog select
```

`init` writes `human-kit.json`, the `cn()` helper and the theme. `add` copies the components to `src/lib/components/ui`, and installs the packages that they import.

## Repository layout

- `registry/` holds the source of the components, the theme and the helpers.
  - `registry/src/ui/<name>/` holds one component. Each folder is one registry item.
  - `registry/registry.json` holds the title and the description of each item.
  - `registry/scripts/build.ts` writes one JSON file per item to `docs/static/r`. It finds the files and the dependencies from the imports.
- `packages/cli/` is the `@human-kit/design` package: the `init` and `add` commands.
- `docs/` is the documentation site. It shows the components from `registry/`, and it serves the registry JSON files at `/r`.

## Develop

```bash
pnpm install
pnpm run dev        # build the registry, then start the docs
pnpm run test       # the CLI tests
pnpm run check      # svelte-check and tsc
pnpm run contrast   # the WCAG contrast of the theme
pnpm run lint       # prettier and eslint
```

### Rules for a registry file

- Import a helper with `@registry/lib/utils`, and another component with `@registry/ui/<name>`. The CLI changes these paths to the aliases of the project.
- Import a third-party package only if it is in `registry/package.json`. The build reads the version range from that file.
- Use only the semantic tokens of the theme, never a palette shade or a `dark:` class.
- Show the focus ring on `data-focus-visible`, not on `:focus-visible`. The primitives set it from the input modality, also when the focus comes back from an overlay.

## License

MIT
