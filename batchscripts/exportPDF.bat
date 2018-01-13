set UGII_BASE_DIR=C:\Siemens\NX11
set UGII_ROOT_DIR=C:\Siemens\NX11\UGII\
set path=C:\Siemens\NX11\nxbin;C:\Siemens\NX11\ugii;%PATH%
for /r %%i in (*dwg*.prt) do  (
	echo process nx part  %%i
	ug2pdf.exe %%i

)

