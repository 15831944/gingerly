using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel; 
using Office = Microsoft.Office.Core;

namespace csv2excel2
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting the main prog");
            Excel.Application excelApp = new Excel.Application();
            excelApp.Visible = true;
            Excel.Workbook newWorkbook = excelApp.Workbooks.Add();
            Console.WriteLine("Importing CSV");
            ImportCSV(args[0],(Excel.Worksheet)(newWorkbook.Worksheets[1]),  (Excel.Range)(((Excel.Worksheet)newWorkbook.Worksheets[1]).get_Range("$A$1")),  new int[] { 2, 2, 2, 2, 2, 2, 2 }, true );
       
        }


         static void ImportCSV(string importFileName, Excel.Worksheet destinationSheet,   Excel.Range destinationRange,    int[] columnDataTypes,    bool autoFitColumns)
         {
             Console.WriteLine("Entering import CSV");
            destinationSheet.QueryTables.Add("TEXT;" + Path.GetFullPath(importFileName),
            destinationRange, Type.Missing);
            destinationSheet.QueryTables[1].Name = Path.GetFileNameWithoutExtension(importFileName);
            destinationSheet.QueryTables[1].FieldNames = true;
            destinationSheet.QueryTables[1].RowNumbers = false;
            destinationSheet.QueryTables[1].FillAdjacentFormulas = false;
            destinationSheet.QueryTables[1].PreserveFormatting = true;
            destinationSheet.QueryTables[1].RefreshOnFileOpen = false;
            destinationSheet.QueryTables[1].RefreshStyle = Excel.XlCellInsertionMode.xlInsertDeleteCells; //XlCellInsertionModel//.xlInsertDeleteCells;
            destinationSheet.QueryTables[1].SavePassword = false;
            destinationSheet.QueryTables[1].SaveData = true;
            destinationSheet.QueryTables[1].AdjustColumnWidth = true;
            destinationSheet.QueryTables[1].RefreshPeriod = 0;
            destinationSheet.QueryTables[1].TextFilePromptOnRefresh = false;
            destinationSheet.QueryTables[1].TextFilePlatform = 437;
            destinationSheet.QueryTables[1].TextFileStartRow = 1;
            destinationSheet.QueryTables[1].TextFileParseType = Excel.XlTextParsingType.xlDelimited;// XlTextParsingType.xlDelimited;
            destinationSheet.QueryTables[1].TextFileTextQualifier = Excel.XlTextQualifier.xlTextQualifierDoubleQuote;// XlTextQualifier.xlTextQualifierDoubleQuote;
            destinationSheet.QueryTables[1].TextFileConsecutiveDelimiter = false;
            destinationSheet.QueryTables[1].TextFileTabDelimiter = false;
            destinationSheet.QueryTables[1].TextFileSemicolonDelimiter = false;
            destinationSheet.QueryTables[1].TextFileCommaDelimiter = false;
            destinationSheet.QueryTables[1].TextFileOtherDelimiter = "|";
            destinationSheet.QueryTables[1].TextFileSpaceDelimiter = false;
            destinationSheet.QueryTables[1].TextFileColumnDataTypes = columnDataTypes;

            //Logger.GetInstance().WriteLog("Importing data...");
            destinationSheet.QueryTables[1].Refresh(false);

            if (autoFitColumns == true)
                destinationSheet.QueryTables[1].Destination.EntireColumn.AutoFit();

            // cleanup
            destinationSheet.QueryTables[1].Delete();// QueryTables[1].Delete();
        }
        
    }
    

   

}
