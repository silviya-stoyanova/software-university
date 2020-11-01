using System;

namespace _08._Number_sequence
{
    class Program
    {
        static void Main(string[] args)
        {
            int maxNum = int.MinValue;
            int minNum = int.MaxValue;

            int numsCount = int.Parse(Console.ReadLine());

            while (numsCount > 0)
            {
                int num = int.Parse(Console.ReadLine());

                if (num >= maxNum)
                {
                    maxNum = num;
                }

                if (num <= minNum)
                {
                    minNum = num;
                }

                numsCount--;
            }

            Console.WriteLine($"Max number: {maxNum}");
            Console.WriteLine($"Min number: {minNum}");
        }
    }
}
