@echo off
Title building mkdocs
mkdocs build
robocopy /move /e site .
exit