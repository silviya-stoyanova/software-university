using System;

namespace _01._Sum_Seconds
{
    class Program
    {
        static void Main(string[] args)
        {
            string firstSecondsStr = Console.ReadLine();
            string secondSecondsStr = Console.ReadLine();
            string thirdSecondsStr = Console.ReadLine();

            int firstSeconds = int.Parse(firstSecondsStr);
            int secondSeconds = int.Parse(secondSecondsStr);
            int thirdSeconds = int.Parse(thirdSecondsStr);

            int totalSeconds = firstSeconds + secondSeconds + thirdSeconds;
            int minutes = totalSeconds / 60;
            int seconds = totalSeconds % 60;

            string secondsStr = seconds.ToString();

            if (seconds < 10)
            {
                secondsStr = $"0{seconds}";
            }

            Console.WriteLine($"{minutes}:{secondsStr}");

        }
    }
}
