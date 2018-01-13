

using System;
using NXOpen;
using NXOpen.UF;
using NXOpen.Assemblies;





public class Program
{
    // class members
    private static Session theSession;
    private static UFSession theUfSession;
    private static ListingWindow lw;
    public static Program theProgram;
    public static bool isDisposeCalled;
    public static BasePart workPart;
    public static UFUgmgr nxMgr;

    //------------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------------
    public Program()
    {
        try
        {
            theSession = Session.GetSession();
            theUfSession = UFSession.GetUFSession();
            lw = theSession.ListingWindow;
            workPart = theSession.Parts.BaseWork;
            

            isDisposeCalled = false;
        }
        catch (NXOpen.NXException ex)
        {
            // ---- Enter your exception handling code here -----
            // UI.GetUI().NXMessageBox.Show("Message", NXMessageBox.DialogType.Error, ex.Message);
        }
    }

    static void startANT()
    {
        BasePart original = theSession.Parts.BaseDisplay;

        setANTOrderAndSaveAllLevels(theSession.Parts.BaseDisplay);

        PartLoadStatus loadStatus;
        theSession.Parts.SetDisplay(original, false, true, out loadStatus);
        reportPartLoadStatus(loadStatus);
    }


    static void setANTOrderAndSaveAllLevels(BasePart thePart)
    {
        NXOpen.Assemblies.Component root = thePart.ComponentAssembly.RootComponent;
        if (root == null) return;

        PartLoadStatus loadStatus;
        theSession.Parts.SetDisplay(thePart, false, true, out loadStatus);
        reportPartLoadStatus(loadStatus);

        NXOpen.Assemblies.ComponentOrder componentOrder1 =
            (NXOpen.Assemblies.ComponentOrder)
            thePart.ComponentAssembly.OrdersSet.FindObject("Alphabetic");
        componentOrder1.Activate();

        thePart.Save(BasePart.SaveComponents.False, BasePart.CloseAfterSave.False);

        foreach (NXOpen.Assemblies.Component kid in root.GetChildren())
        {
            setANTOrderAndSaveAllLevels((BasePart)kid.Prototype);
           
            
        }
    }



    public static void reportComponentChildren(Component comp, int indent)
    {
        // Component child = null;
        string space = null;
        Part c_part = null;

        for (int ii = 1; ii <= indent; ii++) space = space + " ";

        foreach (Component child in comp.GetChildren())
        {
            string part_name;
            string refset_name;
            string instance_name;
            double[] origin = new double[3];
            double[] csys_matrix = new double[9];
            double[,] transform = new double[4, 4];

            theUfSession.Assem.AskComponentData(
                child.Tag,
                out part_name,
                out refset_name,
                out instance_name,
                origin,
                csys_matrix,
                transform);

            Console.WriteLine(space + "Name: " + child.Name + " Display: " + child.DisplayName + " Instance: " + instance_name);
            if (child.DisplayName != instance_name)
            {
                Console.WriteLine(space + " -> renaming instance to " + child.DisplayName);
                Tag instance_tag = theUfSession.Assem.AskInstOfPartOcc(child.Tag);
                theUfSession.Assem.RenameInstance(instance_tag, child.DisplayName);
            }

            reportComponentChildren(child, indent + 1);
        }
    }

    //------------------------------------------------------------------------------
    //  Explicit Activation
    //      This entry point is used to activate the application explicitly
    //------------------------------------------------------------------------------
    public static int Main(string[] args)
    {
        Console.WriteLine("Enter the main program");



        int retValue = 0;
        try
        {
            theProgram = new Program();

            //echo the arguments
            lw.Open();
            lw.WriteLine("Args.length=" + args.Length.ToString());
            for (int ii = 0; ii < args.Length; ii++)
            {
                lw.WriteLine("Processing : ["+ii.ToString() + "] = " + args[ii]);
                PartLoadStatus loadStatus;
                lw.WriteLine("before open part" );
                workPart = theSession.Parts.OpenBaseDisplay(args[ii], out loadStatus);
                lw.WriteLine("after open part");
                lw.WriteLine("unloaded parts:" + loadStatus.NumberUnloadedParts);
                
                if (loadStatus.NumberUnloadedParts > 0) {
                    int inx;
                    for ( inx=0; inx<loadStatus.NumberUnloadedParts ; inx ++) {
                        lw.WriteLine("Failed to load: " + loadStatus.GetPartName(inx).ToString());
                        lw.WriteLine("Because: "+ loadStatus.GetStatusDescription(inx).ToString());
                    }
                }



                int partCount = 0;
                partCount = theUfSession.Part.AskNumParts();
                Part part;
                part = theSession.Parts.Display;
                lw.WriteLine("Loaded part quantity: " + partCount);


                Component root = theSession.Parts.Display.ComponentAssembly.RootComponent;
                //BasePart original = theSession.Parts.BaseDisplay;
                //NXOpen.Assemblies.Component root = original.ComponentAssembly.RootComponent;
                reportComponentChildren(root, 0);

                startANT();

                part.Save(BasePart.SaveComponents.True, BasePart.CloseAfterSave.True);





            }

            theProgram.Dispose();
        }
        catch (NXOpen.NXException ex)
        {
            // ---- Enter your exception handling code here -----

        }

        Console.WriteLine("Leave the main program");
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

        }
    }

    static void Echo(string output)
    {
        theSession.ListingWindow.Open();
        theSession.ListingWindow.WriteLine(output);
        theSession.LogFile.WriteLine(output);
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

    public static int GetUnloadOption(string arg)
    {
        return System.Convert.ToInt32(Session.LibraryUnloadOption.Immediately);
    }


}

