using System;

namespace _05._Projects_Creation
{
    class Program
    {
        static void WriteOutput(string architect, double hours, double projects)
        {
            string a = $"The architect {architect} will need {hours} hours to complete {projects} project/s.";
            Console.WriteLine(a);
        }

        static void Main(string[] args)
        {
            string architect = Console.ReadLine();
            string projectsCountAsStr = Console.ReadLine();
            double projectsCount = double.Parse(projectsCountAsStr);

            int estimatedHoursPerProject = 3;
            double hours = projectsCount * estimatedHoursPerProject;

            WriteOutput(architect, hours, projectsCount);
        }
    }
}
