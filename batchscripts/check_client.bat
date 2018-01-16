@echo off

IF not EXIST \\zwuvm\temp\tc_client.version (
echo "Can not find the target version, continue to launch TC client"
 goto tc_launch
) 

for /F "tokens=*" %%A in  ( \\zwuvm\temp\tc_client.version) do  (
   ECHO Processing %%A.... 
   SET TC_VERSION=%%A
)
if  "X%TC_VERSION%"=="X"  (
    Echo Can not find the target version, continue TC...
    goto tc_launch
)

echo "find the target version %TC_VERSION%, continue to check"
IF EXIST %TC_VERSION% goto tc_launch
   
echo "The TC client is out of date, please update..."
set /p answer=Do you want to update TC client now (Y/N)?
if /i "%answer:~,1%" EQU "Y"  goto tc_update
if /i "%answer:~,1%" EQU "N"  goto tc_launch


:tc_update
echo Answer Yes, start updating TC client
exit /b

:tc_launch
echo starting TC

