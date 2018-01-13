for /F "tokens=1,2,3,4,5 delims=|" %%a in (merge1.input) do  (
	echo process  %%a
	echo process  %%b
	echo process  %%c
	echo process  %%d
	echo process  %%e
        echo export %%a %%b
)


