using System;

namespace _01._Convert_Meters_to_Kilometers
{
    class Program
    {
        static void Main(string[] args)
        {
            double meters = double.Parse(Console.ReadLine());
            double km = meters / 1000.0;
            Console.WriteLine($"{km:F3}");
        }
    }
}
