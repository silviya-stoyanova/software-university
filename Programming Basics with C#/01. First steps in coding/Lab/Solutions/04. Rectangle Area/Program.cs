using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _04.Rectangle_Area
{
    class Program
    {
        static void Main(string[] args)
        {
            string aString = Console.ReadLine();
            string bString = Console.ReadLine();

            int aInt = Convert.ToInt32(aString);
            int bInt = Convert.ToInt32(bString);

            Console.WriteLine(aInt * bInt);
        }
    }
}
