import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, BarChart2, ClipboardList, BrainCircuit } from "lucide-react";

const About = () => {
  const skills = [
    "Python", "SQL", "Power BI", "Excel", "MS SQL Server", "MySQL",
    "HTML/CSS", "PYODBC", "OOP", "Data Cleaning", "Reporting", "CRUD Operations"
  ];

  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Engineering",
      description: "Designing and managing relational databases with clean, normalized data using SQL, MySQL, and MS SQL Server."
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Data Analysis & Dashboards",
      description: "Transforming raw data into insightful dashboards with Power BI and Excel PivotTables."
    },
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Project Development",
      description: "Building CLI-based systems like CareerHub with pyodbc and exception handling using Python."
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "Analytical Thinking",
      description: "Strong focus on detail, critical thinking, and compliance awareness in business analytics."
    }
  ];

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a B.Tech graduate in AI & Data Science with hands-on experience in Python, SQL, Power BI, and Excel. I love cleaning messy datasets, building dashboards, and developing data-driven systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Journey */}
          <div className="space-y-6 animate-slide-in-left">
            <h3 className="text-2xl font-semibold text-foreground">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                My journey into data began with building CLI applications and cleaning datasets using SQL. I quickly found joy in exploring patterns, structuring unclean data, and visualizing results through intuitive dashboards.
              </p>
              <p>
                I've completed multiple real-world projects — from job board systems and Kaggle data cleaning to Power BI dashboards — and continually push myself to build scalable, clean, and insightful solutions.
              </p>
              <p>
                Outside of coding, I’m always upskilling, contributing to personal projects, and solving challenges on LeetCode.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Tools & Technologies I Use</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="p-6 bg-gradient-card backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
