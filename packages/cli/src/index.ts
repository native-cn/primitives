#!/usr/bin/env node
import { Command } from "commander"
import pkg from "../package.json" with { type: "json" }
import { init } from "./commands/init"
import { add } from "./commands/add"
import { build } from "./commands/build"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const program = new Command()

program
  .name("native-cn")
  .description("CLI for native-cn — shadcn/ui primitives for React Native")
  .version(pkg.version)

program
  .command("init")
  .description("Initialize native-cn in your project")
  .option("-y, --yes", "Skip confirmation", false)
  .option("-f, --force", "Overwrite existing config", false)
  .option("--cwd <cwd>", "Working directory", process.cwd())
  .action(async (opts) => {
    await init({ cwd: opts.cwd, yes: opts.yes, force: opts.force })
  })

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Component names to add")
  .option("--cwd <cwd>", "Working directory", process.cwd())
  .option("--registry <path>", "Path to registry.json", undefined)
  .action(async (components: string[], opts) => {
    await add({ cwd: opts.cwd, registry: opts.registry, components })
  })

program
  .command("build")
  .description("Build the registry from source")
  .option("--cwd <cwd>", "Working directory", process.cwd())
  .option("--registry <path>", "Path to registry JSON", undefined)
  .option("-o, --output <path>", "Output path", undefined)
  .action(async (opts) => {
    await build({ cwd: opts.cwd, registry: opts.registry, output: opts.output })
  })

program.parse()
