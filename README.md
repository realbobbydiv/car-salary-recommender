SalaryCars
SalaryCars is a small full stack project that helps people understand if they can realistically afford a car based on their monthly salary and the budget they are willing to spend.
The idea is simple.
You enter your salary and your monthly car budget.
The system shows you 3 suitable cars and explains whether the choice is comfortable, borderline, or risky.
How it works
The user enters:
monthly salary
monthly car budget
minimum desired car year
The backend:
calculates annual salary
estimates a monthly car payment using price / 60 months
calculates what percentage of the salary the car would take
classifies each option as Comfortable, Borderline, or Risky
generates a short AI summary
The frontend:
displays the top 3 recommendations
shows percentage of salary
shows the AI generated explanation
Tech stack
Backend:
ASP.NET Core
.NET 10
Swagger
OpenAI SDK for AI summary
Frontend:
React
TypeScript
Vite
