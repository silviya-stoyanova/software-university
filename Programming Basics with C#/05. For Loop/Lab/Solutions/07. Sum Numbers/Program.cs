using System;

namespace _07._Sum_Numbers
{
    class Program
    {
        static void Main(string[] args)
        {
            int numsCount = int.Parse(Console.ReadLine());
            int sum = 0;
            
            while (numsCount > 0)
            {
                sum += int.Parse(Console.ReadLine());
                numsCount--;
            }

            Console.WriteLine(sum);
        }
    }
}
