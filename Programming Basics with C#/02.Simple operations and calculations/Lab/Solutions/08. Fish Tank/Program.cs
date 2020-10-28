using System;

namespace _08._Fish_Tank
{
    class Program
    {
        static void SumLiters(int length, int width, int height, double filledPercentage)
        {
            int volumeInCm = length * width * height;             // in cm3
            double volumeInLiters = volumeInCm * 0.1 * 0.1 * 0.1;  // in dm3 and liters

            double availableLiters = volumeInLiters - volumeInLiters * filledPercentage;

            Console.WriteLine("{0:F3}", availableLiters);

        }

        static void Main(string[] args)
        {
            string lengthStr = Console.ReadLine();
            int length = int.Parse(lengthStr);

            string widthStr = Console.ReadLine();
            int width = int.Parse(widthStr);

            string heightStr = Console.ReadLine();
            int height = int.Parse(heightStr);

            string filledPercentageStr = Console.ReadLine();
            double filledPercentage = double.Parse(filledPercentageStr) / 100.0;

            SumLiters(length, width, height, filledPercentage);
        }
    }
}
