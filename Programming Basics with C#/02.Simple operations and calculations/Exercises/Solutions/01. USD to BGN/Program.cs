using System;

namespace _01._USD_to_BGN
{
    class Program
    {
        static void ConvertUsdToBn(double usd)
        {
            double bgn = usd * 1.79549;
            Console.WriteLine("{0:f2}", bgn);
        }

        static void Main(string[] args)
        {
            string usdStr = Console.ReadLine();
            double usd = double.Parse(usdStr);
            convertUsdToBn(usd);
        }
    }
}
