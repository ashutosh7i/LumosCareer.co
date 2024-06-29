/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

function Page() {
  return (
    <div className="container py-16 lg:py-16 max-w-3xl mx-auto">
      <p className="mb-8 border-l-2 pl-6 text-center italic">
        "the more you can personalize your job application, the more you'll
        stand out from the crowd. it shows you're not just looking for a job,
        but the right job."
      </p>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        the story behind this magic🪄
      </h1>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        our story:
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        a lot of our friends were trying to secure jobs and internships this
        summer, applying for multiple positions simultaneously. it was a hassle
        for all of them to tailor their resumes for each application. that's how
        we came up with the idea to streamline everything in one place and help
        them get their next opportunity without any hassle.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        we just want to "🪄lumos" their career with this initiative.
      </blockquote>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        and that's where lumoscareer comes in. lumoscareer is your all-in-one
        toolkit for becoming a standout candidate. whether you're applying for
        jobs or internships, our suite of tools includes resume analysis, job
        description summaries, resume and cover letter generation, and
        personalized interview preparation.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-3">
        lumoscareer helps you craft your resume according to the job description
        and resume it also help you craft personalized cover letters, which
        makes application process hassle-free.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        key features of lumoscareer
      </h3>

      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        <li>
          job description summarizer
          <ol className="list-disc ml-4">
            <li>
              break down lengthy job descriptions into easy-to-understand
              summaries.
            </li>
            <li>identify key responsibilities and qualifications.</li>
            <li>understand essential skills and requirements.</li>
          </ol>
        </li>
        <li>
          resume analyzer
          <ol className="list-disc ml-4">
            <li>gain valuable insights for your resume.</li>
            <li>receive suggestions to enhance and improve your resume.</li>
            <li>ensure relevancy according to job descriptions.</li>
            <li>optimize your resume to stand out to employers.</li>
          </ol>
        </li>

        <li>
          resume generator
          <ol className="list-disc ml-4">
            <li>
              automatically generate tailored resumes based on uploaded resumes
              and job descriptions.
            </li>
            <li>customize content to showcase your skills and experience.</li>
            <li>
              tailor each resume to align with different job applications.
            </li>
          </ol>
        </li>
        <li>
          cover letter generator
          <ol className="list-disc ml-4">
            <li>
              craft personalized cover letters tailored to each job application.
            </li>
            <li>highlight your qualifications and enthusiasm for the role.</li>
            <li>ensure clarity and professionalism in your communication.</li>
            <li>
              customize each cover letter to match specific job requirements.
            </li>
          </ol>
        </li>
        <li>
          cold email generator
          <ol className="list-disc ml-4">
            <li>
              create professional cold emails to reach out to potential
              employers.
            </li>
            <li>
              introduce yourself and express interest in job opportunities.
            </li>
            <li>
              customize emails to showcase your skills and experience
              effectively.
            </li>
          </ol>
        </li>
        <li>
          interview preparation guide
          <ul className="list-disc  ml-4">
            <li>
              access a comprehensive set of interview questions and answers
              tailored to your resume and the job description.
            </li>
            <li>
              prepare effectively with insights into potential interview topics
              and key talking points.
            </li>
            <li>
              enhance confidence and readiness for interviews by aligning
              responses with your skills and experience.
            </li>
          </ul>
        </li>
      </ol>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        as a result, people stopped telling jokes, and the kingdom fell into a
        gloom. but there was one person who refused to let the king's
        foolishness get him down: a court jester named jokester.
      </p>

      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        why lumoscareer?
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        at lumoscareer, we leverage cutting-edge technology to provide
        exceptional results:
      </p>

      <p className=" [&:not(:first-child)]:mt-4">
        <strong>gemini-pro large language model:</strong> utilizing the advanced
        gemini-pro large language model ensures accurate and high-quality
        outputs for crafting personalized resumes, cover letters, and interview
        guides.
      </p>
      <p className=" [&:not(:first-child)]:mt-4">
        <strong>advanced prompt engineering:</strong> we employ sophisticated
        prompt engineering techniques to deliver precise and tailored content.
        this ensures that the generated resumes, cover letters, and interview
        preparation materials are highly relevant to each specific job
        application, increasing your chances of success.
      </p>
      <p className=" [&:not(:first-child)]:mt-4">
        <strong>comprehensive tool suite:</strong> lumoscareer offers a
        comprehensive set of tools that cover every aspect of the job
        application process. from breaking down complex job descriptions to
        providing in-depth resume analysis and generating tailored application
        materials, we have everything you need to excel.
      </p>
      <p className=" [&:not(:first-child)]:mt-4">
        <strong>user-friendly interface:</strong> our platform is designed with
        user experience in mind. it is intuitive and easy to navigate, allowing
        you to quickly access and utilize the tools you need to enhance your job
        applications.
      </p>
      <p className=" [&:not(:first-child)]:mt-4">
        <strong>personalization at its best:</strong> we believe in the power of
        personalization. by tailoring each aspect of your application to the
        specific job and employer, lumoscareer helps you stand out from the
        competition and demonstrates your genuine interest and fit for the role.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        join lumoscareer today and take the first step towards transforming your
        job search into a successful journey. let us help you shine in every
        application and achieve your career goals.
      </blockquote>

      <div className="my-6 w-full overflow-y-auto">
        <h5 className="my-6 scroll-m-20 text-2xl font-semibold tracking-tight">
          our team:
        </h5>
        <div className="text-gray-500 dark:text-gray-400 font-medium flex items-center flex-wrap">
          {siteConfig.Team.map((member) => (
            <div key={member.name} className="flex items-center mr-4 mb-2">
              <Image
                src={`${member.github}.png`}
                alt={member.name}
                height={25}
                width={25}
                className="rounded-full mr-2"
              />
              <a href={member.github} className="hover:underline">
                {member.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
