using System;

namespace _07._Yard_Greening
{
    class Program
    {
        static void SumDiscount(double squareMeters)
        {
            double pricePerSquareMeter = 7.61; // leva
            double discount = 18 / 100.0;

            double standardPrice = squareMeters * pricePerSquareMeter;
            double finalPrice = standardPrice - standardPrice * discount;
            double discountPrice = standardPrice - finalPrice;

            Console.WriteLine("The final price is: {0:F2} lv.", finalPrice);
            Console.WriteLine("The discount is: {0:F2} lv.", discountPrice);
        }

        static void Main(string[] args)
        {
            string squareMetersAsStr = Console.ReadLine();
            double squareMeters = double.Parse(squareMetersAsStr);
            SumDiscount(squareMeters);
        }
    }
}
