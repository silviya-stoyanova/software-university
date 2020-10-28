using System;

namespace _07._Alcohol_Market
{
    class Program
    {
        static void Main(string[] args)
        {
            string whiskyPriceStr = Console.ReadLine();
            string beerLitresStr = Console.ReadLine();
            string wineLitresStr = Console.ReadLine();
            string brandyLitresStr = Console.ReadLine();
            string whiskyLitresStr = Console.ReadLine();

            double whiskyPrice = double.Parse(whiskyPriceStr);
            double beerLitres = double.Parse(beerLitresStr);
            double wineLitres = double.Parse(wineLitresStr);
            double brandyLitres = double.Parse(brandyLitresStr);
            double whiskyLitres = double.Parse(whiskyLitresStr);

            double brandyPrice = whiskyPrice / 2.0;
            double winePrice = brandyPrice - brandyPrice * 40 / 100.0;
            double beerPrice = brandyPrice - brandyPrice * 80 / 100.0;

            double totalExpences = 
                whiskyPrice * whiskyLitres +
                beerPrice * beerLitres +
                winePrice * wineLitres +
                brandyPrice * brandyLitres;

            Console.WriteLine("{0:f2}", totalExpences);
        }
    }
}
