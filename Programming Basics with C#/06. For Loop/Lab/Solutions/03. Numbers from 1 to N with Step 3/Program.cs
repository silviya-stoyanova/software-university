using System;

namespace _03._Numbers_from_1_to_N_with_Step_3
{
    class Program
    {
        static void Main(string[] args)
        {
            int numsCount = int.Parse(Console.ReadLine());

            for (int i = 1; i <= numsCount; i+=3)
            {
                Console.WriteLine(i);
            }
        }
    }
}
