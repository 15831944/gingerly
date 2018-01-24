@echo off
setlocal enableDelayedExpansion
for %%F in (w444*) do (
  set "name=%%F"
  ren "!name!" "!name:w444_=mjgh_!"
)
