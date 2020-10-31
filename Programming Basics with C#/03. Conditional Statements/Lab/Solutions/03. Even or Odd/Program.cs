using System;

namespace _03._Even_or_Odd
{
    class Program
    {
        static string CheckIsEvenOrOdd(double number)
        {
            bool isEven = number % 2 == 0;

            if (isEven)
            {
                return "even";
            }
            else
            {
                return "odd";
            }
        }

        static void Main(string[] args)
        {
            string numStr = Console.ReadLine();
            double num = double.Parse(numStr);

            string isEven = CheckIsEvenOrOdd(num);
            Console.WriteLine(isEven);
        }
    }
}
