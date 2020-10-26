using System;

namespace _03._Square_Area
{
    class Program
    {
        static void SquareArea(int number)
        {
            int squareArea = number * number;
            Console.WriteLine(squareArea);
        }

        static void Main(string[] args)
        {
            string numberAsStr = Console.ReadLine();
            int number = int.Parse(numberAsStr);
            SquareArea(number);
        }
    }
}
