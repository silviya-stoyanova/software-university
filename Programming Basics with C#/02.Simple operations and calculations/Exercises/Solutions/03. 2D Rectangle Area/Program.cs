using System;

namespace _03._2D_Rectangle_Area
{
    class Program
    {
        static double GetArea(double a, double b)
        {
            double area = a * b;
            return area;
        }

        static double GetPerimeter(double a, double b)
        {
            double perimeter = 2 * (a + b);
            return perimeter;
        }

        static void Main(string[] args)
        {
            string x1Str = Console.ReadLine();
            string y1Str = Console.ReadLine();
            string x2Str = Console.ReadLine();
            string y2Str = Console.ReadLine();

            double x1 = double.Parse(x1Str);
            double y1 = double.Parse(y1Str);
            double x2 = double.Parse(x2Str);
            double y2 = double.Parse(y2Str);

            double a = Math.Abs(x1 - x2);
            double b = Math.Abs(y1 - y2);

            double area = GetArea(a, b);
            double perimeter = GetPerimeter(a, b);

            Console.WriteLine("{0:f2}", area);
            Console.WriteLine("{0:f2}", perimeter);
        }
    }
}
