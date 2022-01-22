@echo off
for /l %%i in (1,1,100) do (
echo # %%i>zzz%%i.md
mkdir assets\zzz%%i.md
echo >.\assets\zzz%%i.md\background.jpg
)
pause