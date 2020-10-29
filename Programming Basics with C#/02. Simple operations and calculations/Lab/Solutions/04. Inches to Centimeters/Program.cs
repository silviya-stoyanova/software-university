using System;

namespace _04._Inches_to_Centimeters
{
    class Program
    {
        static void InchesToCm(double inch)
        {
            double cm = inch * 2.54;
            Console.WriteLine(cm);
        }

        static void Main(string[] args)
        {
            string inchAsStr = Console.ReadLine();
            double inch = double.Parse(inchAsStr);

            InchesToCm(inch);
        }
    }
}
