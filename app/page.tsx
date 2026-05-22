import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Courses from "@/components/sections/Courses";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  const [profile, skills, projects, certificates, courses] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({ orderBy: { date: "desc" } }),
    prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main>
      <Navbar />
      <Hero profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <Courses courses={courses} />
      <Footer name={profile?.name} title={profile?.title} />
    </main>
  );
}
