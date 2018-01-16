@echo off
set year=%date:~10,4%
set month_num=%date:~4,2%
set day=%date:~7,2%

set  tc_month=month

echo %year%
echo %day%
echo %month_num%

if %month_num%==01 set tc_month=Jan
if %month_num%==02 set tc_month=Feb
if %month_num%==03 set tc_month=Mar
if %month_num%==04 set tc_month=Apr
if %month_num%==05 set tc_month=May
if %month_num%==06 set tc_month=Jun
if %month_num%==07 set tc_month=Jul
if %month_num%==08 set tc_month=Aug
if %month_num%==09 set tc_month=Sep
if %month_num%==10 set tc_month=Oct
if %month_num%==11 set tc_month=Nov
if %month_num%==12 set tc_month=Dec

echo %tc_month%

set startDate="%day%-%tc_month%-%year% 00:00"
set endDate="%day%-%tc_month%-%year% 23:59"

call %TC_DATA%\tc_profilevars

cd /d c:\temp


for /r %%F in (*) do if %%~zF==0 del "%%F"


