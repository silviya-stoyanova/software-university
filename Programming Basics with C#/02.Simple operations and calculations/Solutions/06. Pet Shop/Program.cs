using System;

namespace _06._Pet_Shop
{
    class Program
    {
        static void AnimalsFoodExpenses(int dogs, int otherAnimals)
        {
            double dogsFoodPrice = 2.5;     // leva
            int otherAnimalsFoodPrice = 4;  // leva

            double expenses = dogs * dogsFoodPrice + otherAnimals * otherAnimalsFoodPrice;
            Console.WriteLine("{0:F2} lv.", expenses);
        }

        static void Main(string[] args)
        {
            string dogsCountStr = Console.ReadLine();
            int dogsCount = int.Parse(dogsCountStr);

            string otherAnimalsCountStr = Console.ReadLine();
            int otherAnimalsCount = int.Parse(otherAnimalsCountStr);

            AnimalsFoodExpenses(dogsCount, otherAnimalsCount);
        }
    }
}
