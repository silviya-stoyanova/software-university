using System;

namespace _02._Numbers_form_N_to_1
{
    class Program
    {
        static void Main(string[] args)
        {
            int numsCount = int.Parse(Console.ReadLine());

            for (int i = numsCount; i > 0; i--)
            {
                Console.WriteLine(i);
            }
        }
    }
}
