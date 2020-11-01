using System;

namespace _09._Left_and_Right_Sum
{
    class Program
    {
        static void Main(string[] args)
        {
            int numsCount = int.Parse(Console.ReadLine());
            int leftSum = 0;
            int rightSum = 0;

            for(int i = 0; i<numsCount; i++)
            {
                leftSum += int.Parse(Console.ReadLine());
            }

            for (int i = 0; i<numsCount; i++)
            {
                rightSum += int.Parse(Console.ReadLine());
            }

            int diff = Math.Abs(leftSum - rightSum);

            if (diff > 0)
            {
                Console.WriteLine($"No, diff = {diff}");
            }
            else
            {
                Console.WriteLine($"Yes, sum = {leftSum}");
            }
        }
    }
}
