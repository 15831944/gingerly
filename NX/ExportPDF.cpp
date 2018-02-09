//ExportPDF

// Mandatory UF Includes
#include <uf.h>
#include <uf_object_types.h>


// Internal+External Includes
#include <NXOpen/Annotations.hxx>
#include <NXOpen/Assemblies_Component.hxx>
#include <NXOpen/Assemblies_ComponentAssembly.hxx>
#include <NXOpen/Body.hxx>
#include <NXOpen/BodyCollection.hxx>
#include <NXOpen/Face.hxx>
#include <NXOpen/Line.hxx>
#include <NXOpen/NXException.hxx>
#include <NXOpen/NXObject.hxx>
#include <NXOpen/Part.hxx>
#include <NXOpen/PartCollection.hxx>
#include <NXOpen/Session.hxx>

// Std C++ Includes
#include <iostream>
#include <cstring>
#include <sstream>

using namespace NXOpen;
using std::string;
using std::exception;
using std::stringstream;
using std::endl;
using std::cout;
using std::cerr;

// Export all drawing sheets in numerical order to a single PDF
// file, in external mode.
//
// Build this as an executable (.exe), and run it from the command line.
// Pass the name of the part that you want to process as a 
// command-line argument.

#include <uf.h>
#include <uf_ui.h>
#include <uf_obj.h>
#include <uf_part.h>
#include <NXOpen/Session.hxx>
#include <NXOpen/Drawings_DrawingSheet.hxx>
#include <NXOpen/Drawings_DrawingSheetCollection.hxx>
#include <NXOpen/NXObject.hxx>
#include <NXOpen/NXString.hxx>
#include <NXOpen/Part.hxx>
#include <NXOpen/PartCollection.hxx>
#include <NXOpen/PlotManager.hxx>
#include <NXOpen/PlotSourceBuilder.hxx>
#include <NXOpen/PrintPDFBuilder.hxx>
#include <NXOpen/NXObjectManager.hxx>

using namespace NXOpen;

#include <stdarg.h>

static void ECHO(char *format, ...)
{
    char msg[UF_UI_MAX_STRING_LEN+1];
    va_list args;
    va_start(args, format);
    vsnprintf(msg, UF_UI_MAX_STRING_LEN, format, args);
    va_end(args);
    UF_UI_open_listing_window();
    UF_UI_write_listing_window(msg);
    UF_print_syslog(msg, FALSE);
}

#define UF_CALL(X) (report_error( __FILE__, __LINE__, #X, (X)))

static int report_error( char *file, int line, char *call, int irc)
{
    if (irc)
    {
        char err[133];

        UF_get_fail_message(irc, err);
        ECHO("*** ERROR code %d at line %d in %s:\n",
            irc, line, file);
        ECHO("+++ %s\n", err);
        ECHO("%s;\n", call);
    }

    return(irc);
}

extern "C" DllExport int ufusr_ask_unload()
{
    return (int)Session::LibraryUnloadOptionImmediately;
}

static void perform_pdf_export_process (string file_name)
{
	ECHO("export pdf from  %s\n" , file_name);
	size_t pos = file_name.find(".prt");
	string part_id = file_name.substr(0, pos);
	ECHO("part id  %s  ---" , part_id);
	string pdf_file_name = part_id.append(".pdf");
	cout<<pdf_file_name << "---";
	string prem_pdf = part_id.append("_preliminary.pdf");
	cout<<prem_pdf <<'\n';

    Session *theSession = Session::GetSession();
    
    Part *workPart(theSession->Parts()->Work());

    PrintPDFBuilder *printPDFBuilder1;
    printPDFBuilder1 = workPart->PlotManager()->CreatePrintPdfbuilder();

    printPDFBuilder1->SetScale(1.0);

    printPDFBuilder1->SetAction(PrintPDFBuilder::ActionOptionNative);

    printPDFBuilder1->SetColors(PrintPDFBuilder::ColorBlackOnWhite);

    printPDFBuilder1->SetSize(PrintPDFBuilder::SizeOptionScaleFactor);

    //printPDFBuilder1->SetUnits(PrintPDFBuilder::UnitsOptionEnglish);

    //printPDFBuilder1->SetXDimension(8.5);

    //printPDFBuilder1->SetYDimension(11.0);

    printPDFBuilder1->SetRasterImages(false);

    //printPDFBuilder1->SetWatermark("");

    std::vector<NXObject *> sheets1;

    int ii;
    for (ii = 1; ii < 100; ii++)  // where 100 is the maximum expected
    {
        char dwg_name[MAX_ENTITY_NAME_SIZE+1];
        sprintf(dwg_name, "Sheet %d", ii);  // or "SH%d" depending on your naming convention
        tag_t dwg = NULL_TAG;
        UF_CALL(UF_OBJ_cycle_by_name_and_type(workPart->Tag(), dwg_name, UF_drawing_type, 
            FALSE, &dwg));
        if (dwg == NULL_TAG) continue;

        Drawings::DrawingSheet *aSheet = (Drawings::DrawingSheet *)NXObjectManager::Get(dwg);
        ECHO("found drawing:  %s\n", aSheet->Name().GetLocaleText());
        sheets1.push_back(aSheet);
    }

//  Add any with non-standard names just so they're all in there
    Drawings::DrawingSheetCollection* dc = workPart->DrawingSheets();
    for (Drawings::DrawingSheetCollection::iterator it = dc->begin(); it != dc->end(); it++)
    {
        Drawings::DrawingSheet *dwg = (*it);
        for (ii = 0; ii < sheets1.size(); ii++)
            if (sheets1[ii] == dwg) break;

        if (ii == sheets1.size())
        {
            ECHO("found drawing:  %s\n", dwg->Name().GetLocaleText());
            sheets1.push_back(dwg);
        }
    }

    ECHO("%d drawings found\n", sheets1.size());

    printPDFBuilder1->SourceBuilder()->SetSheets(sheets1);

    printPDFBuilder1->SetFilename(pdf_file_name);
    printPDFBuilder1->Commit();

	printPDFBuilder1->SetAddWatermark(true);
	printPDFBuilder1->SetWatermark("PRELIMINARY");
	printPDFBuilder1->SetFilename(prem_pdf);
    printPDFBuilder1->Commit();

    ECHO("Finished PDF export");
    printPDFBuilder1->Destroy();

}

static void check_load_status(UF_PART_load_status_p_t status)
{
    char
        msg[133] ={ "" };
    int
        ii;

    for (ii=0; ii<status->n_parts; ii++)
    {
        UF_get_fail_message(status->statuses[ii], msg);
        ECHO("    %s - %s\n", status->file_names[ii], msg);
    }

    UF_free(status->statuses);
    UF_free_string_array(status->n_parts, status->file_names);
}

int main( int argc, char *argv[] )
{
    int
        cnt = 0;
    tag_t
        part;
    char
        new_fspec[MAX_FSPEC_SIZE+1] = { "" },
        part_name[MAX_FSPEC_SIZE+1] = { "" };
    UF_PART_load_status_t
        status;

    if (!UF_CALL(UF_initialize()))  
    {
        UF_CALL(uc4624(0, argc, argv));

        while (uc4621(part_name) == 1)
        {
            ECHO("%d.  %s\n", ++cnt, part_name);


            UF_CALL(UF_PART_open(part_name, &part, &status));

            if (status.n_parts > 0) check_load_status(&status);

            if (!status.failed)
            {
                perform_pdf_export_process (part_name);
               
                UF_CALL(UF_PART_close_all());
            }
        }
        ECHO("\nProcessed %d parts.\n", cnt);

        UF_CALL(UF_terminate());
    }

    return 0;
}

