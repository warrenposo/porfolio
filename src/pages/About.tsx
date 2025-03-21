
import React from 'react';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillTag from '@/components/SkillTag';
import TransitionWrapper from '@/components/TransitionWrapper';

const About: React.FC = () => {
  const skills = {
    languages: [
      { name: 'HTML', level: 'expert' },
      { name: 'CSS', level: 'expert' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
    ],
    frontendFrameworks: [
      { name: 'React.js', level: 'expert' },
      { name: 'Angular', level: 'advanced' },
      { name: 'Vue.js', level: 'advanced' },
      { name: 'jQuery', level: 'expert' },
      { name: 'Bootstrap', level: 'expert' },
      { name: 'Tailwind CSS', level: 'expert' },
    ],
    backend: [
      { name: 'RESTful APIs', level: 'advanced' },
      { name: 'WordPress', level: 'expert' },
    ],
    enterprise: [
      { name: 'Oracle e-Business Suite', level: 'advanced' },
      { name: 'SAP', level: 'intermediate' },
      { name: 'Microsoft Dynamics', level: 'intermediate' },
      { name: 'Oracle Cloud', level: 'advanced' },
    ],
    cloud: [
      { name: 'Oracle Cloud', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'Microsoft Azure', level: 'intermediate' },
      { name: 'Google Cloud Platform', level: 'intermediate' },
    ],
    tools: [
      { name: 'Git/GitHub', level: 'expert' },
      { name: 'Webpack', level: 'advanced' },
      { name: 'Gulp', level: 'advanced' },
      { name: 'npm', level: 'expert' },
    ],
  };
  
  const experiences = [
    {
      position: 'Software Developer',
      company: 'Multside',
      location: 'K-mall Kiambu Rd, Nairobi',
      period: 'January 2024 - Present',
      description: 'Developing and maintaining the Multside website, implementing new features, and ensuring responsive design. Working on Oracle EBS R12 modules, developing SQL*PLUS and PL/SQL queries, and integrating Oracle workflows.',
      highlights: [
        'Designed and developed Oracle Forms, Reports, Workflows, and Customizations',
        'Implemented and optimized SQL*PLUS and PL/SQL queries',
        'Developed and deployed XML Publisher reports and Oracle Workflow Builder solutions',
        'Led ERP system rollouts and managed ITSM tools such as ServiceNow',
        'Troubleshot and resolved security vulnerabilities in enterprise applications',
      ],
    },
    {
      position: 'Fullstack Developer',
      company: 'GranularIT',
      location: 'Hurlingham, Nairobi',
      period: 'July 2023 - Present',
      description: 'Developed the PetStore Kenya app and helped maintain the WordPress website, increasing performance by 20%. Led optimization of the Vision Plus website, resulting in a 30% improvement.',
      highlights: [
        'Built and maintained e-commerce websites using WordPress and WooCommerce',
        'Developed mobile applications using React Native',
        'Optimized website performance through code refactoring and performance tuning',
        'Maintained the Prime Bank website ensuring smooth operation',
      ],
    },
    {
      position: 'IT Intern',
      company: 'International Leadership University',
      location: 'Kilimani, Nairobi',
      period: 'January 2022 - April 2022',
      description: 'Achieved 100% connection of the University computer and network. Led a team in improving the school library database system by 40%.',
      highlights: [
        'Established network connectivity across campus facilities',
        'Improved library database system',
        'Maintained and ensured smooth operation of the university website',
      ],
    },
  ];
  
  const education = {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Technical University of Mombasa',
    period: '2018 - 2023',
    coursework: [
      'Object Oriented Programming',
      'Databases',
      'Discrete Mathematics',
      'Data Structures and Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Machine Learning',
      'Data Mining',
      'Advanced Data Structures and Algorithms',
      'Information Retrieval',
      'Image Processing',
    ],
  };

  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <main className="pt-24 pb-16">
          {/* Header */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                    About Me
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Warren Poso Okumu</h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Software Engineer with 3+ years of experience in web development, Oracle ERP implementation, and full-stack solutions.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://linkedin.com/in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                    >
                      LinkedIn Profile <ExternalLink size={16} className="ml-2" />
                    </a>
                    <a 
                      href="https://github.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/70 transition-colors"
                    >
                      GitHub Profile <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-48 h-48 bg-secondary rounded-full opacity-20"></div>
                  <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary rounded-full opacity-20"></div>
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1655&auto=format&fit=crop" 
                      alt="Warren Okumu" 
                      className="w-full h-auto aspect-[3/4] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Bio Section */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-6">My Background</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    I am a dedicated software engineer with over 3 years of professional experience in web development, Oracle ERP implementation, and full-stack solutions. Based in Nairobi, Kenya, I combine technical expertise with a passion for creating digital experiences that solve real-world problems.
                  </p>
                  <p>
                    My journey in technology began during my studies at the Technical University of Mombasa, where I developed a strong foundation in programming principles, databases, and software development methodologies. Since then, I've worked with various organizations, helping them transform their digital presence and streamline their operations through technology.
                  </p>
                  <p>
                    I specialize in developing responsive web applications, customizing enterprise resource planning systems, and building e-commerce solutions. My approach combines technical excellence with a deep understanding of user needs, resulting in applications that are both powerful and intuitive to use.
                  </p>
                  <p>
                    When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and mentoring aspiring developers. I believe in continuous learning and staying updated with the latest developments in the tech industry.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Skills Section */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-10 text-center">Technical Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Frontend Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontendFrameworks.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Enterprise Systems</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.enterprise.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Cloud Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.cloud.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-4">Developer Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill, index) => (
                      <SkillTag 
                        key={index} 
                        name={skill.name} 
                        level={skill.level as any} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Experience Section */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-10">Professional Experience</h2>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary rounded-full"></div>
                    
                    <div className="pl-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.position}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
                          <p>{exp.period}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Achievements:</h4>
                        <ul className="space-y-1 text-sm">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Education Section */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-10">Education</h2>
              
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{education.degree}</h3>
                    <p className="text-primary font-medium">{education.institution}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
                    <p>{education.period}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Relevant Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((course, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* References Section */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-10">Professional References</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold">Daniel Kiama</h3>
                  <p className="text-primary text-sm font-medium mb-1">Sr. Frontend Developer</p>
                  <p className="text-sm text-muted-foreground mb-2">Danielkmwangangi@gmail.com</p>
                  <p className="text-sm text-muted-foreground">0796806232</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold">Martin Muia</h3>
                  <p className="text-primary text-sm font-medium mb-1">Sr. Backend Developer</p>
                  <p className="text-sm text-muted-foreground mb-2">MartinMuia@gmail.com</p>
                  <p className="text-sm text-muted-foreground">0713981605</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold">David Nyamiaka</h3>
                  <p className="text-primary text-sm font-medium mb-1">Project Engineer, Multside</p>
                  <p className="text-sm text-muted-foreground mb-2">projects@multside.co.ke</p>
                  <p className="text-sm text-muted-foreground">0727676338</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </TransitionWrapper>
    </>
  );
};

export default About;
