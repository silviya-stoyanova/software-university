using System;

namespace _01._Greeting_by_Name
{
    class Program
    {
        static void Main(string[] args)
        {
            string name = Console.ReadLine();
            string greeting = $"Hello, {name}!";
            Console.WriteLine(greeting);
        }
    }
}
