import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Đọc .env thủ công
const envFile = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
const envVars = Object.fromEntries(
  envFile
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split("=").map((s) => s.trim().replace(/^"|"$/g, ""))),
);

const prisma = new PrismaClient({
  log: ["error"],
});

// Set env trước khi tạo client
process.env.DATABASE_URL = envVars.DATABASE_URL;

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Nguyen Van Thuan",
      title: "Full Stack Developer",
      bio: "Passionate developer with experience in building modern web applications using React, Next.js, and Node.js.",
      email: "thuan@example.com",
      phone: "+1 (555) 000-0000",
      github: "https://github.com/tbnguye9",
      linkedin: "https://linkedin.com/in/tbnguye9",
    },
  });

  const skills = [
    { name: "React", category: "Frontend", order: 1 },
    { name: "Next.js", category: "Frontend", order: 2 },
    { name: "TypeScript", category: "Frontend", order: 3 },
    { name: "Tailwind CSS", category: "Frontend", order: 4 },
    { name: "Node.js", category: "Backend", order: 5 },
    { name: "PostgreSQL", category: "Backend", order: 6 },
    { name: "Prisma", category: "Backend", order: 7 },
    { name: "Docker", category: "DevOps", order: 8 },
    { name: "Git", category: "DevOps", order: 9 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skills.indexOf(skill) + 1 },
      update: {},
      create: skill,
    });
  }

  const projects = [
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio built with Next.js, PostgreSQL, and Prisma.",
      githubUrl: "https://github.com/tbnguye9/portfolio",
      order: 1,
    },
    {
      title: "E-Commerce App",
      description:
        "Full stack e-commerce application with cart and payment integration.",
      githubUrl: "https://github.com/tbnguye9/ecommerce",
      order: 2,
    },
    {
      title: "Chat Application",
      description: "Real-time chat app built with Socket.io and React.",
      githubUrl: "https://github.com/tbnguye9/chat-app",
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: projects.indexOf(project) + 1 },
      update: {},
      create: project,
    });
  }

  await prisma.certificate.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: new Date("2024-01-15"),
    },
  });

  await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Complete Next.js Developer",
      platform: "Udemy",
      instructor: "Maximilian Schwarzmüller",
      completed: true,
    },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
