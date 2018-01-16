@echo off

if "x%TC_ROOT%"=="x" (
echo TC_ROOT not set, exit...
goto :DONE)
if "x%TC_DATA%"=="x" (
echo TC_DATA  not set, exit...
goto :DONE)


call %TC_DATA%\tc_profilevars.bat

set yyyy=

set $tok=1-3
for /f "tokens=1 delims=.:/-, " %%u in ('date /t') do set $d1=%%u
if "%$d1:~0,1%" GTR "9" set $tok=2-4
for /f "tokens=%$tok% delims=.:/-, " %%u in ('date /t') do (
for /f "skip=1 tokens=2-4 delims=/-,()." %%x in ('echo.^|date') do (
set %%x=%%u
set %%y=%%v
set %%z=%%w
set $d1=
set $tok=))

if "%yyyy%"=="" set yyyy=%yy%
if /I %yyyy% LSS 100 set /A yyyy=2000 + 1%yyyy% - 100


set CurDate=%mm%/%dd%/%yyyy%

echo current date: %CurDate%

set dayCnt=%1

if "%dayCnt%"=="" set dayCnt=30

REM Substract your days here
set /A dd=1%dd% - 100 - %dayCnt%
set /A mm=1%mm% - 100

:CHKDAY
if /I %dd% GTR 0 goto SETFINAL
set /A mm=%mm% - 1
if /I %mm% GTR 0 goto ADJUSTDAY
set /A mm=12
set /A yyyy=%yyyy% - 1

:ADJUSTDAY
if %mm%==1 goto SET31
if %mm%==2 goto LEAPCHK
if %mm%==3 goto SET31
if %mm%==4 goto SET30
if %mm%==5 goto SET31
if %mm%==6 goto SET30
if %mm%==7 goto SET31
if %mm%==8 goto SET31
if %mm%==9 goto SET30
if %mm%==10 goto SET31
if %mm%==11 goto SET30
REM ** Month 12 falls through

:SET31
set /A dd=31 + %dd%
goto CHKDAY

:SET30
set /A dd=30 + %dd%
goto CHKDAY

:LEAPCHK
set /A tt=%yyyy% %% 4
if not %tt%==0 goto SET28
set /A tt=%yyyy% %% 100
if not %tt%==0 goto SET29
set /A tt=%yyyy% %% 400
if %tt%==0 goto SET29

:SET28
set /A dd=28 + %dd%
goto CHKDAY

:SET29
set /A dd=29 + %dd%
goto CHKDAY

:SETFINAL
if /I %mm% LSS 10 set mm=0%mm%
if /I %dd% LSS 10 set dd=0%dd%

REM Set IIS and AWS date variables
set AWSDT=%yyyy%-%mm%-%dd%

echo AWSDT = %AWSDT%

set /a p_yyyy=%yyyy%
set pdd=%dd%

if %mm%==01 (
set MON=Jan
set /a p_yyyy=%yyyy%-1
set  PMONTH=Dec
)
if %mm%==02 (
set MON=Feb
set  PMONTH=Jan
)
if %mm%==03 ( 
set MON=Mar
set PMONTH=Feb
if  %dd% GTR 28 (set /a  pdd=28)
)
if %mm%==04 (
set MON=Apr
set PMONTH=Mar
)
if %mm%==05 (
set MON=May
set PMONTH=Apr
)
if %mm%==06 (
set MON=Jun
set PMONTH=May
)
if %mm%==07 (
set MON=Jul
set PMONTH=Jun
)
if %mm%==08 (
set MON=Aug
set PMONTH=Jul
)
if %mm%==09 (
set MON=Sep
set PMONTH=Aug
)
if %mm%==10 (
set MON=Oct
set PMONTH=Sep
)
if %mm%==11 (
set MON=Nov
set PMONTH=Oct
)
if %mm%==12 (
set MON=Dec
set PMONTH=Nov
)

set TCDATE=%dd%-%MON%-%yyyy%
set TCDATE_last=%pdd%-%PMONTH%-%p_yyyy%
echo tc date is %TCDATE%
echo last monthtc date is %TCDATE_last%


echo purge_datasets -u=infodba -p=xxxx -g=dba -start_date=%TCDATE_last% -end_date=%TCDATE% -k=3 -skipInconsistencyCheck

:DONE
