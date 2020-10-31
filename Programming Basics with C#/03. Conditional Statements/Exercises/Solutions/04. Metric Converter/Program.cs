using System;

namespace _04._Metric_Converter
{
    class Program
    {
        static void Main(string[] args)
        {
            string numberStr = Console.ReadLine();
            string inputUnit = Console.ReadLine();
            string outputUnit = Console.ReadLine();

            double number = double.Parse(numberStr);

            double numInCm = number;

            if (inputUnit == "mm")
            {
                numInCm = number / 10.0;
            }
            else if (inputUnit == "m")
            {
                numInCm = number * 100;
            }

            double outputNum = numInCm;

            if (outputUnit == "mm")
            {
                outputNum = numInCm * 10;
            }
            else if (outputUnit == "m")
            {
                outputNum = numInCm / 100.0;
            }

            Console.WriteLine($"{outputNum:f3}");
        }
    }
}
