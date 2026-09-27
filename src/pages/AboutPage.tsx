import React from 'react';
import { 
  Award, 
  BookOpen, 
  Compass, 
  Droplet, 
  Flame, 
  GraduationCap, 
  Heart, 
  Layers, 
  MapPin, 
  Palette, 
  School, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Wrench, 
  Zap 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Logo } from '../components/layout/Logo';
import { NewsletterSection } from '../components/common/NewsletterSection';

export const MANAN_IRFAN_PHOTO = '/manan_irfan.jpg';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <Breadcrumbs
        items={[{ label: 'About Manan Irfan' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Profile Presentation */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait Image with Verification Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-1 ring-stone-200">
              <img
                src={MANAN_IRFAN_PHOTO}
                alt="Manan Irfan - Creator of ResinArt"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 text-center">
                <span className="text-white text-xs font-semibold tracking-wide">
                  Manan Irfan
                </span>
                <span className="text-teal-300 text-[11px] block">
                  Student & Creator · ResinArt
                </span>
              </div>
            </div>

            {/* Quick Badges below portrait */}
            <div className="mt-4 flex flex-col items-center gap-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-medium text-stone-800">
                <School className="w-3.5 h-3.5 text-teal-700" />
                <span>Al Hayan Grammar High School</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Rahim Yar Khan, Punjab, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Intro Story */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>Creator Profile & Story</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-tight">
              About Manan Irfan
            </h1>

            <h2 className="text-base sm:text-lg font-serif italic text-teal-800 font-medium">
              Welcome to My Story
            </h2>

            <div className="text-stone-700 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
              <p>
                Hi, I’m <strong>Manan Irfan</strong>, a 10th-class student at <strong>Al Hayan Grammar High School</strong> in Rahim Yar Khan, Pakistan.
              </p>
              <p>
                I’m a young learner with a strong interest in <strong>resin art, technology, web development, digital creativity, UI/UX design, graphic design, and artificial intelligence</strong>. I enjoy discovering how creative ideas can be transformed into beautiful projects using both traditional creativity and modern technology.
              </p>
              <p>
                I believe that learning is a continuous journey. Every project gives me an opportunity to learn something new, improve my skills, and explore my creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Brand Identity Showcase */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-lg border border-slate-800 text-center flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-6 block">
          Official Identity & Symbol
        </span>
        <Logo variant="light" size="xl" showTagline={true} layout="stacked" />
        <p className="max-w-xl text-xs sm:text-sm text-stone-300 mt-6 leading-relaxed">
          The ResinArt emblem represents the fluid grace of ocean resin currents sculpted into a dynamic crest, wrapped with a warm golden edge and energetic splash droplets that signify creative momentum.
        </p>
      </section>

      {/* Passion for Resin Art Section */}
      <section className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 mb-12 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-1 block">
            Creative Core
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
            My Passion for Resin Art
          </h2>
        </div>

        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-4">
          <p className="text-sm sm:text-base font-medium text-stone-900 border-l-2 border-teal-600 pl-4 py-1 bg-stone-50 rounded-r-lg">
            Resin art is one of the main creative subjects behind this website.
          </p>
          <p>
            Resin art combines creativity, colors, materials, design, and experimentation to create unique decorative and artistic pieces. What makes resin particularly interesting is that every project can develop its own appearance through different combinations of <strong>pigments, colors, textures, molds, techniques, and finishing methods</strong>.
          </p>
          <p>
            I created <strong>ResinArt</strong> as an informational platform for people who want to discover, understand, and learn about resin art.
          </p>
          <p>
            The goal is to make resin art easier to understand for <strong>beginners, students, DIY creators, hobbyists, and experienced artists</strong>.
          </p>
        </div>
      </section>

      {/* What You Can Discover on ResinArt (Curated Grid matching prompt) */}
      <section className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-1 block">
            Curated Knowledge Syllabus
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
            What You Can Discover on ResinArt
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            The website explores many areas of resin art, engineered to guide and empower makers:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: '🎨',
              title: 'Resin Art Ideas',
              desc: 'Creative inspiration for making unique resin projects, including decorative pieces, artwork, home décor, gifts, accessories, and other creative applications.',
              path: '/resin-art-ideas/'
            },
            {
              icon: '🧪',
              title: 'Epoxy Resin',
              desc: 'Learn about epoxy resin, how it works, its basic properties, common uses, and important considerations when working with it.',
              path: '/epoxy-resin/'
            },
            {
              icon: '🖌️',
              title: 'Resin Art Techniques',
              desc: 'Explore different techniques used by resin artists, including color blending, layering, creating effects, embedding decorative elements, working with molds, and creating artistic surfaces.',
              path: '/resin-art-techniques/'
            },
            {
              icon: '🌈',
              title: 'Resin Pigments & Colors',
              desc: 'Colors can completely change the appearance of a resin project. ResinArt explores pigments, color combinations, metallic effects, transparent colors, and other ways artists can create distinctive visual effects.',
              path: '/resin-pigments/'
            },
            {
              icon: '🧩',
              title: 'Resin Molds',
              desc: 'Molds allow creators to produce different shapes and designs. The website provides information about choosing molds, preparing them, using resin correctly, and achieving a clean finished result.',
              path: '/resin-molds/'
            },
            {
              icon: '✨',
              title: 'Removing Bubbles',
              desc: 'Air bubbles are a common challenge when working with resin. ResinArt explains why bubbles occur and introduces practical techniques that can help artists achieve smoother results.',
              path: '/remove-resin-bubbles/'
            },
            {
              icon: '⏳',
              title: 'Mixing & Curing',
              desc: 'Correct preparation, mixing, measurement, working time, and curing are important parts of resin projects. Understanding these processes can help creators produce more consistent results.',
              path: '/resin-mixing/'
            },
            {
              icon: '🛡️',
              title: 'Resin Safety',
              desc: 'Safety is an important part of resin art. ResinArt provides educational information about responsible handling, workspace preparation, ventilation, protective equipment, storage, and other basic safety considerations.',
              path: '/resin-art-safety/'
            },
            {
              icon: '🔧',
              title: 'Troubleshooting',
              desc: 'Not every resin project goes perfectly. Problems such as bubbles, sticky resin, uneven surfaces, cloudiness, cracks, incorrect curing, and other imperfections can happen. ResinArt aims to help creators understand common problems and learn how to approach them.',
              path: '/resin-art-troubleshooting/'
            },
            {
              icon: '💡',
              title: 'Resin Project Inspiration',
              desc: 'The website also provides project ideas and creative inspiration for people who want to experiment with resin and develop their own artistic style.',
              path: '/resin-art-projects/'
            }
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => onNavigate(item.path)}
              className="group cursor-pointer bg-white p-6 rounded-2xl border border-stone-200/90 hover:border-teal-700/60 shadow-2xs hover:shadow-sm transition-all flex items-start gap-4"
            >
              <span className="text-2xl shrink-0 p-2.5 bg-stone-50 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <div>
                <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why I Created ResinArt */}
      <section className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 mb-12 shadow-xs space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
          Why I Created ResinArt
        </h2>
        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 font-sans">
          <p>
            I wanted to create something that combines <strong>creativity, education, technology, and design</strong>.
          </p>
          <p>
            Resin art is a fascinating subject because it allows people to experiment. Two people can use similar materials and techniques but still produce completely different results.
          </p>
          <p>
            That creative freedom is one of the things that makes resin art exciting.
          </p>
          <p>
            Through ResinArt, I want to make useful information easier to discover and present it through a modern, simple, and enjoyable website experience.
          </p>
        </div>
      </section>

      {/* My Learning Journey & Technology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <span>My Learning Journey</span>
          </h2>
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
            <p>
              As a student, I’m continuously learning about technology and creative digital work.
            </p>
            <p>While developing ResinArt, I’m also learning about:</p>
            <ul className="grid grid-cols-2 gap-1.5 text-xs text-stone-600 pt-1 font-medium">
              <li className="flex items-center gap-1.5">• Website design</li>
              <li className="flex items-center gap-1.5">• User experience</li>
              <li className="flex items-center gap-1.5">• Web development</li>
              <li className="flex items-center gap-1.5">• Responsive design</li>
              <li className="flex items-center gap-1.5">• SEO standards</li>
              <li className="flex items-center gap-1.5">• Digital content</li>
              <li className="flex items-center gap-1.5">• Branding & graphics</li>
              <li className="flex items-center gap-1.5">• Artificial intelligence</li>
              <li className="flex items-center gap-1.5">• Modern web tech</li>
              <li className="flex items-center gap-1.5">• Digital publishing</li>
            </ul>
            <p className="pt-2 text-stone-800 font-medium">
              Working on a real project helps me understand that building a website is not only about writing code. It is also about <strong>research, creativity, organization, design, usability, and helping people find useful information</strong>.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <span>Connection With Technology</span>
          </h2>
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
            <p>
              Technology and creativity are becoming increasingly connected.
            </p>
            <p>
              I’m interested in learning how modern technologies can help people create better digital experiences. I enjoy exploring websites, interfaces, AI tools, design systems, and other technologies that can turn ideas into practical projects.
            </p>
            <p>
              My goal is to keep developing my skills and eventually create larger and more useful digital projects.
            </p>
          </div>
        </div>
      </div>

      {/* Education & About Me Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-stone-100/70 rounded-3xl border border-stone-200 p-8 space-y-3">
          <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold block">
            Academic Background
          </span>
          <h3 className="font-serif text-xl font-medium text-stone-900">
            Education
          </h3>
          <div className="text-xs sm:text-sm text-stone-700 space-y-1">
            <p className="font-semibold text-stone-900">Al Hayan Grammar High School</p>
            <p className="text-teal-800 font-medium">10th Class Student</p>
            <p className="text-stone-500">Rahim Yar Khan, Punjab, Pakistan</p>
          </div>
        </div>

        <div className="bg-stone-100/70 rounded-3xl border border-stone-200 p-8 space-y-3">
          <span className="text-xs uppercase tracking-widest text-teal-800 font-semibold block">
            Personal Philosophy
          </span>
          <h3 className="font-serif text-xl font-medium text-stone-900">
            About Me
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            I’m someone who enjoys <strong>learning, experimenting, creating, and improving</strong>. I’m still at the beginning of my journey, and I see every project as an opportunity to learn something new.
          </p>
          <p className="text-xs text-stone-600">
            Whether I’m exploring resin art, designing a website, experimenting with technology, or learning about digital creativity, my focus is on improving one step at a time.
          </p>
        </div>
      </div>

      {/* My Vision Callout */}
      <section className="bg-white rounded-3xl border border-teal-200 p-8 sm:p-12 mb-12 shadow-sm text-center">
        <span className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2 block">
          Looking Ahead
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
          My Vision
        </h2>
        <p className="text-stone-700 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto mb-6">
          My vision is to build useful and creative digital projects while continuing to learn about <strong>technology, design, art, and innovation</strong>.
        </p>
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          I want ResinArt to become a helpful place where people can discover resin art, learn the fundamentals, find inspiration, understand techniques, and explore their own creativity.
        </p>
        <div className="inline-block py-2.5 px-6 rounded-full bg-teal-50 border border-teal-200 text-teal-900 font-serif font-semibold text-sm sm:text-base tracking-wide">
          Learn. Create. Experiment. Improve. Inspire.
        </div>
      </section>

      {/* About This Website Closing Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
          About This Website
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          <strong>ResinArt</strong> is an informational website dedicated to the world of resin art.
        </p>
        <div className="py-2 text-[11px] sm:text-xs text-teal-300 font-semibold tracking-wide uppercase">
          Resin Art • Epoxy Resin • Techniques • Project Ideas • Materials • Tools • Pigments • Molds • Safety • Troubleshooting • Tutorials • Guides • Creative Inspiration
        </div>
        <p className="text-xs text-stone-400 max-w-2xl mx-auto leading-relaxed">
          Whether you are touching resin for the first time or simply looking for your next creative project, ResinArt is designed to provide clear, organized, and useful information to help you explore the craft.
        </p>
        <p className="font-serif italic text-teal-200 text-base sm:text-lg pt-2">
          Welcome to ResinArt — where creativity takes shape.
        </p>
      </section>

      {/* Newsletter Dispatch */}
      <NewsletterSection />
    </div>
  );
};
