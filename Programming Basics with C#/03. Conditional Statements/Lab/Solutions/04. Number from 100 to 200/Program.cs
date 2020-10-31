using System;

namespace _04._Number_from_100_to_200
{
    class Program
    {
        static void Main(string[] args)
        {
            string numStr = Console.ReadLine();
            double num = double.Parse(numStr);

            if (num < 100)
            {
                Console.WriteLine("Less than 100");
            }
            else if (num >= 100 && num <= 200)
            {
                Console.WriteLine("Between 100 and 200");
            }
            else if (num >= 200)
            {
                Console.WriteLine("Greater than 200");
            }
        }
    }
}
