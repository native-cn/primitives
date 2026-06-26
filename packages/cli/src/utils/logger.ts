import pico from "picocolors"

export function info(message: string) {
  console.log(pico.cyan(`  ${message}`))
}

export function success(message: string) {
  console.log(pico.green(`  ✓ ${message}`))
}

export function warn(message: string) {
  console.log(pico.yellow(`  ⚠ ${message}`))
}

export function error(message: string) {
  console.log(pico.red(`  ✗ ${message}`))
}

export function step(message: string) {
  console.log(`\n${pico.bold(pico.cyan(`▸ ${message}`))}`)
}

export function muted(message: string) {
  console.log(pico.dim(`  ${message}`))
}
