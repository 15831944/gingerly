using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Xsl;
using System.Threading.Tasks;

namespace XmlToHTML
{
    class Program
    {
        static void Main(string[] args)
        {

        
            //load xml file
            var myXslTrans = new XslCompiledTransform();
            //load style sheet
            myXslTrans.Load(args[0]);

            //transfor source xml to traget html
            myXslTrans.Transform(args[1], args[2]); 
    

        }
    }
}
