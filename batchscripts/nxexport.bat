set UGII_BASE_DIR=C:\Siemens\NX11
set UGII_LANG=english
set UGII_ROOT_DIR=C:\Siemens\NX11\UGII\

set path=c:\Siemens\NX11\NXBIN\managed;c:\Siemens\NX11\NXBIN;C:\Siemens\NX11\UGII;%PATH%


call %TC_DATA%\tc_profilevars

ug_export.bat -part=200636 -rev=A

ugmanager_clone -pim=yes -o=export -par=@DB/200636/A -default_n=autotranslate

ugmanager_clone -pim=yes -o=export -asse=@DB/200636/A -copy_n=specification:yes -default_n=autotranslate

C:\Windows\System32\cmd.exe /k ugiicmd.bat 

C:\Windows\System32\cmd.exe /k ugiicmd.bat "C:\Siemens\NX11"

rem import_file

release_man -item=200636 -rev=A -dataset -status=W4_RELEASED  -datasetName="200636-A"  -relation=IMAN_specification -datasetType="UGMASTER"
