using System;

namespace _01._Excellent_Result
{
    class Program
    {
        static bool CompareValues(double value, double minValue)
        {
            if (value >= minValue)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        static void PrintWhenChecksPassed(bool passedCheck)
        {
            if (passedCheck)
            {
                Console.WriteLine("Excellent!");
            }
        }

        static void Main(string[] args)
        {
            double minGrade = 5.5;
            string inputGradeStr = Console.ReadLine();
            double inputGrade = double.Parse(inputGradeStr);
            bool isHeigherThanMinGrade = CompareValues(inputGrade, minGrade);

            PrintWhenChecksPassed(isHeigherThanMinGrade);
        }
    }
}
