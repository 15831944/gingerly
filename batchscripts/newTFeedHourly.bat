@echo off
SET CURRENTTIME=%TIME%
echo %currenttime%
for /F "tokens=1 delims=:" %%h in ('echo %CURRENTTIME%') do (set /a HR=%%h )
for /F "tokens=2 delims=:" %%m in ('echo %CURRENTTIME%') do (set /a MIN=%%m )
for /F "tokens=1 delims=:" %%h in ('echo %CURRENTTIME%') do (set /a PHR=%%h - 1)

set /A mod = min %% 10
set /a C_MIN = %MIN% - %mod%

echo %c_min%
echo %mod%
echo %min%

IF %HR% LEQ 1 (
  echo "midnight check"
  IF %MIN% LEQ 9 (
     echo "midnight skip 2"
     set  midnight=2
     SET /a PMIN=00
     SET /a PHR=00
  ) ELSE (
     SET /a PMIN=%C_MIN% - 10
     SET /a PHR=%HR%
  )
) ELSE IF %HR% GEQ 23 (
  echo "previous night check"
  IF %MIN% GEQ 50 (
     echo "midnight break 1"
     set midnight=1
     SET /a PMIN=%C_MIN% - 10
     SET /a PHR=%HR%
     SET /a C_MIN=%MIN%
  ) ELSE (
     SET /a PMIN=%C_MIN% - 10
     SET /a PHR=%HR%
  )

) ELSE (
  IF %C_MIN% LEQ 9 (
	SET /a PMIN= 50
	SET /a PHR=%HR%-1
  ) ELSE (
	SET /a PMIN=%C_MIN% - 10
	SET /a PHR=%HR%
  )
)


IF %PMIN% LEQ 9 (
	SET PMIN=00
)
IF %C_MIN% LEQ 9 (
	SET C_MIN=00
)

IF %PHR% LEQ 9 (
	SET PHR=0%PHR%
)


echo  CURRENT TIME [%HR%:%C_MIN%]
echo  START TIME [%PHR%::%PMIN%]

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

set startDate="%day%-%tc_month%-%year% %PHR%:%PMIN%"
set endDate="%day%-%tc_month%-%year% %HR%:%C_MIN%"

