using System;

namespace _02._Bonus_Score
{
    class Program
    {
        static void Main(string[] args)
        {
            string scoreStr = Console.ReadLine();
            double score = double.Parse(scoreStr);

            double bonusScore = 0;
            double extraBonusScore = 0;

            if (score <= 100)
            {
                bonusScore += 5;
            }
            else if (score > 1000)
            {
                bonusScore += score * 10 / 100.0;
            }
            else if (score > 100)
            {
                bonusScore += score * 20 / 100.0;
            }

            if (score % 2 == 0)
            {
                extraBonusScore += 1;
            }
            else
            {
                if (score % 5 == 0)
                {
                    extraBonusScore += 2;
                }
            }

            score += bonusScore + extraBonusScore;

            Console.WriteLine(bonusScore + extraBonusScore);
            Console.WriteLine(score);
        }
    }
}
