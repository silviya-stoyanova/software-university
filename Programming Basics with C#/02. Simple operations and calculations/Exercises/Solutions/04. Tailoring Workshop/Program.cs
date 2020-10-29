using System;

namespace _04._Tailoring_Workshop
{
    class Program
    {
        static double CalculatePriceInUsd(double rectangles, double squares)
        {
            double rectanglesPrice = rectangles * 7;
            double squaresPrice = squares * 9;
            double totalPrice = rectanglesPrice + squaresPrice;
            return totalPrice;
        }

        static double ConvertUsdToBgn(double usd)
        {
            double bgn = usd * 1.85;    
            return bgn;
        }

        static void Main(string[] args)
        {
            string tablesStr = Console.ReadLine();
            string tablesLengthStr = Console.ReadLine();
            string tablesWidthStr = Console.ReadLine();

            int tables = int.Parse(tablesStr);
            double tablesLength = double.Parse(tablesLengthStr);
            double tablesWidth = double.Parse(tablesWidthStr);

            double squareSide = tablesLength / 2.0;

            double rectangleArea = (tablesLength + 2 * 0.3) * (tablesWidth + 2 * 0.3);
            double squareArea = Math.Pow(squareSide, 2);

            double totalRectangles = tables * rectangleArea;
            double totalSquares = tables * squareArea;

            double pricreInUsd = CalculatePriceInUsd(totalRectangles, totalSquares);
            double pricreInBgn = ConvertUsdToBgn(pricreInUsd);

            Console.WriteLine("{0:F2} USD", pricreInUsd);
            Console.WriteLine("{0:F2} BGN", pricreInBgn);
        }
    }
}
