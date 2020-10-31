using System;

namespace _04._Metric_Converter
{
    class Program
    {
        static void Main(string[] args)
        {
            string speedStr = Console.ReadLine();
            double speed = double.Parse(speedStr);

            if (speed <= 10)
            {
                Console.WriteLine("slow");
            }
            else if (speed <= 50)
            {
                Console.WriteLine("average");
            }
            else if (speed <= 150)
            {
                Console.WriteLine("fast");
            }
            else if (speed <= 1000)
            {
                Console.WriteLine("ultra fast");
            }
            else
            {
                Console.WriteLine("extremely fast");
            }
        }
    }
}
