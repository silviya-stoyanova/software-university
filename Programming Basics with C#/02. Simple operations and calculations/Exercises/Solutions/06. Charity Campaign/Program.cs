using System;

namespace _06._Charity_Campaign
{
    class Program
    {
        static void Main(string[] args)
        {
            string daysStr = Console.ReadLine();
            string chefsStr = Console.ReadLine();
            string cakesStr = Console.ReadLine();
            string wafflesStr = Console.ReadLine();
            string pancakesStr = Console.ReadLine();

            double days = double.Parse(daysStr);
            double chefs = double.Parse(chefsStr);
            double cakes = double.Parse(cakesStr);
            double waffles = double.Parse(wafflesStr);
            double pancakes = double.Parse(pancakesStr);

            double totalMoneyFromCakes = cakes * chefs * days * 45;
            double totalMoneyFromWaffles = waffles * chefs * days * 5.8;
            double totalMoneyFromPancakes = pancakes * chefs * days * 3.2;

            double totalMoney = totalMoneyFromCakes + totalMoneyFromWaffles + totalMoneyFromPancakes;
            double expences = totalMoney * 1 / 8.0;
            double incomes = totalMoney - expences;

            Console.WriteLine("{0:f2}", incomes);
        }
    }
}
