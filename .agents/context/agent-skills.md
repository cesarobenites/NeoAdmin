# Using NeoAdmin with AI coding agents

NeoAdmin keeps its canonical project guidance in `AGENTS.md`, `.agents/rules/`, `.agents/context/`, and `.agents/skills/`. These files are repository instructions and reusable development workflows; they are not runtime assets and do not belong in `docs/`.

## Work inside this repository

1. Open the NeoAdmin repository as the agent's workspace.
2. Let the agent read the root `AGENTS.md`; it points to project standards and the architecture context.
3. Ask for the concrete task and expected result. Mention a skill by task, such as Bootstrap, Pug, SCSS, TypeScript, dates, tables, or build.
4. The agent reads only the relevant `SKILL.md`, changes source under `src/`, and runs `npm run build` when the change affects the site.
5. Review the diff and generated page under `docs/` before committing or publishing.

Skills describe repeatable work. They are not plugins, packages, or application code, and copying them does not install the NeoAdmin theme into a host application.

## Use NeoAdmin as a standalone template

Clone or download this repository as the application itself. Run `npm install`, use `npm run dev` while changing Pug, SCSS, TypeScript, or Sass variables, then run `npm run build`. The generated `docs/` directory is the static site distribution and can be served by GitHub Pages. Keep the source repository when you want future theme updates to remain easy to merge.

## Use NeoAdmin inside an existing Vue or Angular application

NeoAdmin is not currently published as a framework component package. `npm run build:vue` creates an ES module profile with automatic initialization disabled; it does not generate Vue components. An Angular adapter or generator is not implemented.

For either host framework, copy or build the theme assets into that application's public asset directory, then adapt the semantic examples from `src/pug/` into Vue templates or Angular component templates. Import the required theme and icon styles once from the host application, and use the host router and component lifecycle. Add only the Bootstrap JavaScript and NeoAdmin TypeScript behavior that the host actually needs; initialize it once at the application shell if its page-wide listeners are used. Do not copy the complete generated Pug pages into a routed component or assume that the current Vue build manages component mount and disposal.

The current repository workflow for framework hosts is asset and markup reuse, not `npm install neoadmin` or automatic folder generation. A future framework package should define an explicit npm package, host-specific entry points, component lifecycle adapters, asset paths, and release validation before being described as a Vue or Angular integration.

## Add the skills to a host project

Copy only the relevant `neo-admin-skill-*` folders from `.agents/skills/` into the host project's `.agents/skills/`. Keep the host project's own architecture in its own context files; do not copy NeoAdmin source paths as though they belonged to the host.

No single instruction path is discovered by every AI coding tool. Keep NeoAdmin's rules and workflows in one canonical place, then connect each tool through the native project-instruction mechanism it supports. Claude Code can use a concise `CLAUDE.md` pointer to `AGENTS.md`; Codex can use `AGENTS.md`; Gemini CLI can receive `AGENTS.md` as project context; Antigravity can use repository rules and skills; Copilot and other tools can use their own project instructions as a short pointer. Ask the agent to read the relevant `.agents/skills/*/SKILL.md` when skill discovery is not automatic. Avoid maintaining conflicting copies of the same standards, and verify tool-specific discovery behavior against its current documentation.

## Official agent guidance

- [OpenAI Codex project instructions and skills](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex)
- [OpenAI skill structure](https://developers.openai.com/plugins/concepts/skills)
- [Claude Code project memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [Cursor project rules](https://docs.cursor.com/context/rules-for-ai)
