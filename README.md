# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

#  ======== initial prompt ==========>J’ai besoin d’une application qui couvre tous les besoins décrits ci-dessous :


But de l’application:

- générer automatiquement, par Gemini ai, un ensemble de descriptions de tests fonctionnels de type bdd
- qui devront couvrir au minimum 90% du code de la business logique
- et une couverture de 100% des features fonctionnelles, y compris les tests des flux positifs, des flux négatifs et des exceptions ou cas limites pour s’assurer que les features sont resilientes
- les descriptions doivent aussi contenir une génération de set de données représentatives et de données avec des problèmes de cohérence et également des données avec des problèmes d’intégrité, ainsi que des données erronées 
- ceci devra me permettre de m’en servir de base pour les améliorer ou les compléter sur base de mon expérience de key user


Pour réaliser cette génération de descriptions de scénarios de tests fonctionnels bdd, et de données de test associées, je dois pouvoir fournir un ensemble de documents de référence à l’application.

Ces documents sont par exemple et de manière non exhaustive:
- des business rules
- des textes de réglementations ou législations ou standards ou normes ou best practices business 
- des schémas bpmn
- des schémas uml
- des sketching de process ou de ui
- des tables ou matrices de décisions
- des informations de volumétrie 
- des textes d’analyses fonctionnelles 
- des textes de stories agile
- des schémas de landscapes architecturaux, de landscape cybersecurity, de landscape de flux et ownership des data
- des user guides
- tout autre documents expliquant les demandes de fonctionnement de l’application (requirements fonctionnels et non fonctionnels) collectés par les business analystes, les analystes fonctionnels, les solution architects, les architectes d’entreprise, les qa engineers

============ google firebase studio - gemini ai reviewed ==============

features:

Automated Test Scenario Generation
 — AI-Powered BDD Test Generation: Automatically generate BDD-style test descriptions from various input documents using Gemini AI. The AI tool interprets business rules, regulations, diagrams, and user stories to create comprehensive test scenarios.
Intelligent Data Synthesis
 — Test Data Generation: Create realistic and edge-case test data, including positive, negative, boundary, and invalid data, derived from the reference documents, ensuring thorough test coverage.
Flexible Document Handling — Document Input Interface: Provide a user-friendly interface to upload and manage various reference documents, supporting multiple formats (text, BPMN, UML, etc.).
Interactive Scenario Refinement — Test Scenario Review and Edit: Allow users to review, edit, and refine the generated test scenarios based on their expertise.
Structured Scenario Display — Clear Display of Generated Scenarios: Present the generated test scenarios in a structured and readable format, highlighting key test steps and data.
Coverage Visualization — Coverage Metrics Dashboard: Display the code coverage and functional feature coverage achieved by the generated tests.

stack:

AI
Gemini, Genkit
Gemini: A powerful AI model capable of understanding and generating various forms of input, including text, code, audio, images, and video. Learn more
Genkit: An open-source framework from Google that provides a unified API to access AI models and streamlines AI logic, tool use, image generation, and more. Learn more

UI
TypeScript, NextJS, Tailwind CSS
TypeScript: A popular programming language that adds type safety to JavaScript.
NextJS: A popular web framework built on React with support for client- and server-side rendering.
Tailwind CSS: A popular CSS framework that lets you style components inline with your HTML and maintain UI consistency across your app.


# <==================================