# tiny-stack-vm

A tiny stack virtual machine for make.fun's tiny-stack-vm-01 competition.
Runs all 40 bytecode programs of a set and writes each one's stdout and
exit code.

Run with Node 22: `node main.ts` — reads `/input/<id>/program.bin` and
`/input/<id>/input.bin`, writes `/output/<id>/stdout.bin` and
`/output/<id>/exit.txt` for `i001`–`i040`.

Implements the published ISA: 32-bit wrapping arithmetic, a 256-value data
stack, a 64-entry call stack, 256 words of memory, input/output, branches,
calls, and all ten traps with their exit codes.
