using System;

namespace _02._Greater_Number
{
    class Program
    {
        static double ReturnGreaterNumber(double a, double b)
        {
            if (a > b)
            {
                return a;
            }
            else
            {
                return b;
            }
        }

        static void Main(string[] args)
        {
            string firstNumStr = Console.ReadLine();
            string secondNumStr = Console.ReadLine();

            double firstNum = double.Parse(firstNumStr);
            double secondNum = double.Parse(secondNumStr);

            double greaterNumber = ReturnGreaterNumber(firstNum, secondNum);
            Console.WriteLine(greaterNumber);
        }
    }
}
