using System;

namespace _05._Dance_Hall
{
    class Program
    {
        static void Main(string[] args)
        {
            string hallLengthStr = Console.ReadLine();
            string hallWidthStr = Console.ReadLine();
            string wardrobeLengthStr = Console.ReadLine();

            double hallLength = double.Parse(hallLengthStr); 
            double hallWidth = double.Parse(hallWidthStr);
            double wardrobeLength = double.Parse(wardrobeLengthStr);

            double hallArea = hallLength * hallWidth;
            double wardrobeArea = Math.Pow(wardrobeLength, 2);
            double benchArea = hallArea / 10.0;

            double freeSpace = hallArea - wardrobeArea - benchArea;

            double spacePerDancer = 7040.0 / 100 / 100; // m2

            double dancers = Math.Floor(freeSpace / spacePerDancer);

            Console.WriteLine(dancers);
        }
    }
}
