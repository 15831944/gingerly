set login_str=" -u=infodba -p=infodba -g=dba "

set UGII_BASE_DIR=C:\Siemens\NX11
set UGII_ROOT_DIR=C:\Siemens\NX11\UGII\
SET TC_ROOT=C:\Siemens\TC_ROOT
SET TC_DATA=C:\Siemens\TC_DATA
rem SET PATH=C:\Siemens\NX11\nxbin;C:\Siemens\NX11\ugii;%PATH%
rem call %TC_DATA%\tc_profilevars

del /q /s merge.input

move c:\temp\*.ugcmd .

type *.ugcmd > merge.input
for /r %%i in (*_pdf.ugcmd) do  (
	echo delete  %%i
	del /Q /S  %%i 
)

for /F "tokens=1,2,3,4, 5 delims=|" %%a in (merge.input) do  (
  echo process  %%a
  echo process  %%b
  echo process  %%c
  echo process  %%d
  echo process  %%e
  SET partno=%%a
  SET partrev=%%b
  SET osname=%%c
  SET pdfname=%partno%_%partrev%.pdf
  SET rflag=%%d
  SET status=%%e

  if exist %osname% (
    echo watermark and impoprt pdf

    stampReleased.exe %osname%
    echo "%partno%|%partrev%|%partno%_%partrev%_rel.pdf|%osname%|" > %partno%_%partrev%_import.in
    echo createorupdatePdfDwg %login_str%  %partno%_%partrev%_import.in
    echo del /Q /S %partno%_%partrev%_import.in
    exit 0

 )

  if  "Z%%d"=="Z0" (
	echo export %%a %%b
        echo %UGII_BASE_DIR%\UGMANAGER\ugmanager_clone -pim=yes -o=export -asse=@DB/%%a/%%b -copy_n=specification:yes -default_n=autotranslate
	mkdir  %%a
	cd /d  %%a

        echo %UGII_BASE_DIR%\UGMANAGER\ugmanager_clone -pim=yes -o=export -asse=@DB/%%a/%%b -copy_n=specification:yes -default_n=autotranslate %login_str%
	echo  export pdf %%
	for /r %%i in (*dwg*.prt) do  (
	   echo process nx part  %%i
	   ug2pdf.exe %%i
	)


        echo del and create pdf ds ..
	del /Q /S *.prt  *.log *.clone
	cd ..
	rem del /Q /S %%a
  )
  if  "%%e"=="REL" (
     for /r %%i in (*.pdf) do  (
	echo process pdf  %%i
	SET tempfilename=%%i
	rename %tempfilename% %pdfname%
	echo stampReleased.exe %pdfname%
	echo "%partno%|%partrev%|%partno%_%partrev%_rel.pdf|%pdfname%|" > %partno%_%partrev%_import.in
        echo createorupdatePdfDwg %login_str%  %partno%_%partrev%_import.in
        echo del /Q /S %partno%_%partrev%_import.in
    )
  ) else (
     for /r %%i in (*.pdf) do  (
	echo process pdf  %%i
	SET tempfilename=%%i
	rename %tempfilename% %pdfname%
	echo stampPrem.exe %pdfname%
	echo "%partno%|%partrev%|%partno%_%partrev%_prem.pdf|%pdfname%|" >%partno%_%partrev%_import.in
        echo createorupdatePdfDwg %login_str%  %partno%_%partrev%_import.in
        echo del /Q /S %partno%_%partrev%_import.in
    )
  )
)

del /Q /S merge.input
