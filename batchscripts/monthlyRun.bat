@echo off

set /a year=%date:~10,4%
set /a p_year=%year%-1

set month_num=%date:~4,2%
set day=%date:~7,2%

set  tc_month=month

REM echo %year%
REM echo %day%
REM echo %month_num%
REM echo %p_year%


if %month_num%==01 (
    if %day% GEQ 10 (
	set startDate="01-Jan-%year% 01:00"
	set endDate="15-Jan-%year% 01:00"
    ) else (
	set startDate="15-Dec-%p_year% 01:00"
	set endDate="01-Jan-%year% 01:00"
    )
)
if %month_num%==02 (
    if %day% GEQ 10 (
	set startDate="01-Feb-%year% 01:00"
	set endDate="15-Feb-%year% 01:00"
    ) else (
	set startDate="15-Jan-%year% 01:00"
	set endDate="01-Feb-%year% 01:00"
    )
)
if %month_num%==03 (
    if %day% GEQ 10 (
	set startDate="01-Mar-%year% 01:00"
	set endDate="15-Mar-%year% 01:00"
    ) else (
	set startDate="15-Feb-%year% 01:00"
	set endDate="01-Mar-%year% 01:00"
    )
)
if %month_num%==04 (
    if %day% GEQ 10 (
	set startDate="01-Apr-%year% 01:00"
	set endDate="15-Apr-%year% 01:00"
    ) else (
	set startDate="15-Mar-%year% 01:00"
	set endDate="01-Apr-%year% 01:00"
    )
)
if %month_num%==05 (
    if %day% GEQ 10 (
	set startDate="01-May-%year% 01:00"
	set endDate="15-May-%year% 01:00"
    ) else (
	set startDate="15-Apr-%year% 01:00"
	set endDate="01-May-%year% 01:00"
    )
)
if %month_num%==06 (
    if %day% GEQ 10 (
	set startDate="01-Jun-%year% 01:00"
	set endDate="15-Jun-%year% 01:00"
    ) else (
	set startDate="15-May-%year% 01:00"
	set endDate="01-Jun-%year% 01:00"
    )
)
if %month_num%==07 (
    if %day% GEQ 10 (
	set startDate="01-Jul-%year% 01:00"
	set endDate="15-Jul-%year% 01:00"
    ) else (
	set startDate="15-Jun-%year% 01:00"
	set endDate="01-Jul-%year% 01:00"
    )
)
if %month_num%==08 (
    if %day% GEQ 10 (
	set startDate="01-Aug-%year% 01:00"
	set endDate="15-Aug-%year% 01:00"
    ) else (
	set startDate="15-Jul-%year% 01:00"
	set endDate="01-Aug-%year% 01:00"
    )
)
if %month_num%==09 (
    if %day% GEQ 10 (
	set startDate="01-Sep-%year% 01:00"
	set endDate="15-Sep-%year% 01:00"
    ) else (
	set startDate="15-Aug-%year% 01:00"
	set endDate="01-Sep-%year% 01:00"
    )
)
if %month_num%==10 (
    if %day% GEQ 10 (
	set startDate="01-Oct-%year% 01:00"
	set endDate="15-Oct-%year% 01:00"
    ) else (
	set startDate="15-Sep-%year% 01:00"
	set endDate="01-Oct-%year% 01:00"
    )
)
if %month_num%==11 (
    if %day% GEQ 10 (
	set startDate="01-Nov-%year% 01:00"
	set endDate="15-Nov-%year% 01:00"
    ) else (
	set startDate="15-Oct-%year% 01:00"
	set endDate="01-Nov-%year% 01:00"
    )
)
if %month_num%==12 (
    if %day% GEQ 10 (
	set startDate="01-Dec-%year% 01:00"
	set endDate="15-Dec-%year% 01:00"
    ) else (
	set startDate="15-Nov-%year% 01:00"
	set endDate="01-Dec-%year% 01:00"
    )
)


echo %startDate%
echo %endDate%
