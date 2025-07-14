import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "/SRL.jpg"


// === Loading Overlay Component ===
const ProjectsLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg border border-gray-700 animate-fade-in">
      {/* Brand Name */}
      <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />

      {/* Loader Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-white text-lg font-medium">Loading Projects...</p>
    </div>
  </div>
);

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (e.g., fetching data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "SQL Data Cleaning – Layoffs Dataset (Kaggle)",
      description:
        "Cleaned 10,000+ records in MySQL using TRIM(), CASE, ROW_NUMBER(), and CTEs. Resolved missing and duplicate data, standardized categories, and validated schema structure.",
      image: "https://i.postimg.cc/h496dhbt/Screenshot-2025-07-11-210259.png ",
      technologies: ["MySQL", "SQL", "CTE", "Window Functions"],
      github:
        "https://github.com/Srishankar123/Data-Cleaning/tree/main/Data%20Cleaning%20Tables ",
    },
    {
      id: 2,
      title: "Power BI Dashboard – Data Professional Survey",
      description:
        "Built a survey analytics dashboard for 1,000+ professionals using Power BI. Calculated KPIs with DAX and visualized tool usage, salaries, and job roles using charts and maps.",
      image: "https://i.postimg.cc/tRr898XX/Data-Professional-Survey-Power-BI-page-0001.jpg ",
      technologies: ["Power BI", "DAX", "Survey Analytics"],
      github:
        "https://github.com/Srishankar123/Powerbi-Projects/tree/main ",
    },
    {
      id: 3,
      title: "Excel Q1 Sales Report – Adventure Works",
      description:
        "Structured messy business data using functions like PROPER(), IF(), SUMIF(), MONTH(). Built KPIs, monthly breakdowns, % YOY trends, and interactive PivotTables & Slicers.",
      image:
        "https://raw.githubusercontent.com/Srishankar123/Excel-Projects/refs/heads/main/Quater%20One%20Report/Pictures%20Of%20the%20Tables/Pivot%20Table%20and%20Slicers.png ",
      technologies: ["Excel", "Formulas", "PivotTables", "Data Cleaning"],
      github:
        "https://github.com/Srishankar123/Excel-Projects/tree/main/Quater%20One%20Report ",
    },
    {
      id: 4,
      title: "CareerHub Job Board System",
      description:
        "CLI-based job portal built in Python with Admin and Applicant modules. Used pyodbc to connect to SQL Server with DAO structure for CRUD operations and custom exception handling.",
      image:
        "https://i.postimg.cc/1zm6zVzN/Screenshot-2025-07-11-200842.png ",
      technologies: [
        "Python",
        "PYODBC",
        "SQL Server",
        "OOP",
        "Exception Handling",
      ],
      github:
        "https://github.com/Srishankar123/Python_Projects/tree/main/Coding%20Challenge%20Python/CareerHub ",
    },
    {
      id: 5,
      title: "Complaint Management System",
      description:
        "Full-stack Flask web app for registering and tracking user complaints. Includes escalation workflows, admin/employee views, and status management.",
      image: "https://www.yyan.in/wp-content/uploads/2025/02/Complaint-Page-Slider-1.webp",
      technologies: ["Flask", "HTML/CSS", "SQLite", "Bootstrap"],
      github:
        "https://github.com/Srishankar123/Complaint-Management ",
      live: "https://complaint-management-4no8.onrender.com/ ",
    },
    {
      id: 6,
      title: "EDA & Data Cleaning – Layoffs Dataset (Excel)",
      description:
        "Performed data cleaning and exploratory data analysis (EDA) on the Layoffs dataset using Excel. Handled missing values, duplicates, and categorical inconsistencies. Used formulas like IF(), PROPER(), TRIM(), and created PivotTables for insights.",
      image:
        "https://i.postimg.cc/J0NNzGgy/Screenshot-2025-07-11-211537.png ",
      technologies: [
        "Excel",
        "EDA",
        "Data Cleaning",
        "Spreadsheet Logic",
        "Analytics",
      ],
      github:
        "https://github.com/Srishankar123/EDA-Projects/blob/main/EDA%20on%20layoffs%20dataset ",
    },
  ];

  return (
    <>
      {/* Loader */}
      {isLoading && <ProjectsLoader />}

      {/* Projects Section */}
      {!isLoading && (
        <section id="projects" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These are real-world systems I built in Python, Flask, SQL, Excel, and Power BI.
                Each project demonstrates practical experience in analytics, automation, and business reporting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden bg-gradient-card backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant group animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={
                        project.image.startsWith("http")
                          ? project.image
                          : `https://images.unsplash.com/ ${project.image}?w=600&h=400&fit=crop`
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      {project.live && !project.live.endsWith(".png") && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 group/btn"
                          asChild
                        >
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                            Live Demo
                          </a>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 group/btn"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Projects;