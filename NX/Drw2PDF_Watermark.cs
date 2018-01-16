using System;
using NXOpen;
using NXOpen.UF;

public class Program
{
    // class members
    private static Session theSession;
    private static UFSession theUfSession;
    private  static BasePart workPart;

    public static Program theProgram;
    public static bool isDisposeCalled;

    //------------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------------
    public Program()
    {
        try
        {
            theSession = Session.GetSession();
            theUfSession = UFSession.GetUFSession();
            workPart = theSession.Parts.Work;

            isDisposeCalled = false;
        }
        catch (NXOpen.NXException ex)
        {
            // ---- Enter your exception handling code here -----
            // UI.GetUI().NXMessageBox.Show("Message", NXMessageBox.DialogType.Error, ex.Message);
            Echo(ex.Message);
            
        }
    }

    public static void DoIt()
    {
        PartLoadStatus loadStatus;
        Echo("Enter DoIt ");

        foreach (Part aPart in theSession.Parts.ToArray())
        {
            Echo("Loo thru parts in the session should be one ");
            NXObject[] sheets1 = aPart.DrawingSheets.ToArray();
            if (sheets1.Length == 0) continue;


            Echo("Process Sheet " + sheets1.Length);
            PrintPDFBuilder printPDFBuilder1 = aPart.PlotManager.CreatePrintPdfbuilder();

            printPDFBuilder1.SourceBuilder.SetSheets(sheets1);

            printPDFBuilder1.Filename = aPart.FullPath.Replace(".prt", ".pdf");
            //printPDFBuilder1.Filename = "C:\\Temp\\" + aPart.Leaf.Replace(".prt", ".pdf");

            
            Echo("pdf :" + printPDFBuilder1.Filename);
          
            printPDFBuilder1.Size = NXOpen.PrintPDFBuilder.SizeOption.Dimension;
            printPDFBuilder1.OutputText = NXOpen.PrintPDFBuilder.OutputTextOption.Polylines;
            printPDFBuilder1.Units = NXOpen.PrintPDFBuilder.UnitsOption.English;
            printPDFBuilder1.YDimension = 8.5;
            printPDFBuilder1.XDimension = 11.0;
            printPDFBuilder1.RasterImages = true;
            printPDFBuilder1.Append = false;
            // printPDFBuilder1.AddWatermark = true;
            //printPDFBuilder1.Watermark = "ZTEST WATERMARK";
            printPDFBuilder1.Colors = PrintPDFBuilder.Color.BlackOnWhite;
        
 
            try {
                //Echo("before commit 1");
                printPDFBuilder1.Commit();
                //Echo("afgter commit 1");
            }
            catch (NXException ex) // See PR 6851770
            {
                Echo("Caught NXException " + ex.Message);
                //reportPartLoadStatus(loadStatus);
                printPDFBuilder1.Commit();
            }
            Echo("Created " + printPDFBuilder1.Filename);


            printPDFBuilder1.Filename = aPart.FullPath.Replace(".prt", "_preliminary.pdf");
            printPDFBuilder1.AddWatermark = true;
            printPDFBuilder1.Watermark = "PRELIMINARY";
            try
            {
                //Echo("before commit 1");
                printPDFBuilder1.Commit();
                //Echo("afgter commit 1");
            }
            catch (NXException ex) // See PR 6851770
            {
                Echo("Caught NXException " + ex.Message);
                //reportPartLoadStatus(loadStatus);
                printPDFBuilder1.Commit();
            }


            Echo("Created " + printPDFBuilder1.Filename);

            printPDFBuilder1.Destroy();

        }

        Echo("Leave DoIt ");
    }


    //------------------------------------------------------------------------------
    //  Explicit Activation
    //      This entry point is used to activate the application explicitly
    //------------------------------------------------------------------------------
    public static int Main(string[] args)
    {
        int retValue = 0;
        try
        {
            theProgram = new Program();

            //TODO: Add your application code here 
            for (int ii = 0; ii < args.Length; ii++)
            {
                Echo("Processing: [" + ii.ToString() + "] = " + args[ii]);
                PartLoadStatus loadStatus;
                Echo("open part");
                workPart = (Part) theSession.Parts.OpenBaseDisplay(args[ii], out loadStatus);

                //workPart = (Part)theSession.Parts.Work;
                if (workPart != null)
                {

                    Echo("before pdf func");
                    DoIt();
                    Echo("After pdf func");
                    workPart.Close(BasePart.CloseWholeTree.True, BasePart.CloseModified.CloseModified, null);
                }


                //workPart.Save(BasePart.SaveComponents.False, BasePart.CloseAfterSave.True);
            }




            theProgram.Dispose();
        }
        catch (NXOpen.NXException ex)
        {
            // ---- Enter your exception handling code here -----
            Echo(ex.Message);

        }
        return retValue;
    }

    //------------------------------------------------------------------------------
    // Following method disposes all the class members
    //------------------------------------------------------------------------------
    public void Dispose()
    {
        try
        {
            if (isDisposeCalled == false)
            {
                //TODO: Add your application code here 
            }
            isDisposeCalled = true;
        }
        catch (NXOpen.NXException ex)
        {
            // ---- Enter your exception handling code here -----
            Echo(ex.Message);

        }
    }

    static void reportPartLoadStatus(PartLoadStatus load_status)
    {
        if (load_status.NumberUnloadedParts == 0) return;

        Echo("  Load notes:");

        for (int ii = 0; ii < load_status.NumberUnloadedParts; ii++)
        {
            Echo("  " + load_status.GetPartName(ii) + " - "
                    + load_status.GetStatusDescription(ii));
        }
    }

    public static void Echo(string output)
    {
        theSession.ListingWindow.Open();
        theSession.ListingWindow.WriteLine(output);
        theSession.LogFile.WriteLine(output);
    }

    public static int GetUnloadOption(string arg)
    {
        return System.Convert.ToInt32(Session.LibraryUnloadOption.Immediately);
    }
}

