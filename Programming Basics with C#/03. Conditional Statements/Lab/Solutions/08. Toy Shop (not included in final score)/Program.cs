using System;

namespace _08._Toy_Shop__not_included_in_final_score_
{
    class Program
    {
        static void Main(string[] args)
        {
            double puzzelPrice = 2.6;
            double dollPrice = 3;
            double bearPrice = 4.1;
            double minionPrice = 8.2;
            double truckPrice = 2;

            string excursionPriceStr = Console.ReadLine();
            string puzzelsStr = Console.ReadLine();
            string dollsStr = Console.ReadLine();
            string bearsStr = Console.ReadLine();
            string minionsStr = Console.ReadLine();
            string trucksStr = Console.ReadLine();

            double excursionPrice = double.Parse(excursionPriceStr);
            int puzzels = int.Parse(puzzelsStr);
            int dolls = int.Parse(dollsStr);
            int bears = int.Parse(bearsStr);
            int minions = int.Parse(minionsStr);
            int trucks = int.Parse(trucksStr);

            int totalToys = puzzels + dolls + bears + minions + trucks;
            double totalPrice = puzzels * puzzelPrice + dolls * dollPrice + bears * bearPrice + minions * minionPrice + trucks * truckPrice;

            if (totalToys >= 50)
            {
                double discount = totalPrice * 25 / 100.0;
                totalPrice -= discount;
            }

            double expenses = totalPrice * 10 / 100.0;
            totalPrice -= expenses;

            if (totalPrice >= excursionPrice)
            {
                double leftMoney = totalPrice - excursionPrice;
                Console.WriteLine($"Yes! {leftMoney:f2} lv left.");
            }
            else
            {
                double neededMoney = excursionPrice - totalPrice;
                Console.WriteLine($"Not enough money! {neededMoney:f2} lv needed.");
            }
        }
    }
}
