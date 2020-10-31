using System;

namespace _07._Area_of_Figures
{
    class Program
    {
        static double SumArea(string figureType, double firstNum)
        {
            double area = 0;

            if (figureType == "square")
            {
                area = Math.Pow(firstNum, 2);
            }
            else if (figureType == "rectangle")
            {
                string secondNumStr = Console.ReadLine();
                double secondNum = double.Parse(secondNumStr);
                area = firstNum * secondNum;
            }
            else if (figureType == "circle")
            {
                area = Math.PI * Math.Pow(firstNum, 2);
            }
            else if (figureType == "triangle")
            {
                string secondNumStr = Console.ReadLine();
                double secondNum = double.Parse(secondNumStr);
                area = firstNum * secondNum / 2.0;
            }

            return area;
        }

        static void Main(string[] args)
        {
            string figure = Console.ReadLine();
            string aStr = Console.ReadLine();
            double a = double.Parse(aStr);

            double area = SumArea(figure, a);

            Console.WriteLine($"{area:f3}");
        }
    }
}
