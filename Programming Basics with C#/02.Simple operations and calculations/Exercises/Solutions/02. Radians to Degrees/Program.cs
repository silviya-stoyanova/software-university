using System;

namespace _02._Radians_to_Degrees
{
    class Program
    {
        static void ConvertRadiansToDegrees(double radians)
        {
            double degrees = radians * 180 / Math.PI;
            double roundedDegrees = Math.Round(degrees);
            Console.WriteLine(roundedDegrees);
        }

        static void Main(string[] args)
        {
            string radiansStr = Console.ReadLine();
            double radians = double.Parse(radiansStr);
            ConvertRadiansToDegrees(radians);
        }
    }
}
