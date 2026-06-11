"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    number: "01",
    title: "ORBIT Dome Theater",
    type: "Exhibition & Immersive Design",
    year: "2024 - Present",

    role: "Lead Spatial Designer",

    scope: "Exterior Design, Landscape Design, Architectural Visualization",

    location: "South Korea",
    description:
      "Immersive dome theater project developed for cultural and educational experiences. Responsible for architectural exterior design, landscape planning, spatial design and visualization.",
  },
  {
    number: "02",
    title: "Singapore NSC Science Center",
    type: "Exhibition Design",
    year: null,
    role: null,
    scope: null,
    location: null,
    description: null,
  },
  {
    number: "03",
    title: "Oil Depot Cultural Renewal",
    type: "Architectural & Exhibition Renewal",
    year: "2024",
    role: "Lead Spatial Designer",
    scope: "Exterior Design, Landscape Design, Architectural Visualization",
    location: "Seoul, South Korea",
    description:
      "Cultural renewal project transforming a former oil depot into a contemporary public destination. Responsible for exterior design development, landscape planning, spatial composition, and architectural visualization.",
  },
  {
    number: "04",
    title: "Concept Visualization Works",
    type: "Architectural Visualization & Environment Design",
    year: null,
    role: null,
    scope: null,
    location: null,
    description: null,
  },
  {
    number: "05",
    title: "Shinhan Human Resources Center",
    type: "Workplace Spatial Design",
    year: null,
    role: null,
    scope: null,
    location: null,
    description: null,
  },
];

const experience = [
  {
    period: "2024 – Present",
    role: "Spatial Designer",
    company: "Bauer Lab",
  },
  {
    period: "2022 – 2024",
    role: "Exhibition Spatial Designer",
    company: "Design Feed",
  },
  {
    period: "2021 – 2022",
    role: "Freelance Spatial Designer",
    company: null,
  },
];

type Project = (typeof projects)[number];

const ORBIT_IMAGE_DIR = "/images/orbit";

const orbitMosaicColSpans = [
  "w-full sm:col-span-2 lg:col-span-8",
  "w-full lg:col-span-4",
  "w-full lg:col-span-5",
  "w-full lg:col-span-7",
  "w-full lg:col-span-4",
  "w-full lg:col-span-8",
] as const;

const orbitProjectImages = [
  "2_night.png",
  "orbit-1f01.png",
  "orbit-1f02.png",
  "orbit-1f03.png",
  "orbit-1f04.png",
  "orbit-1f05.png",
  "orbit-1f06.png",
  "26-0508 night.png",
  "플라네타리움_초실사_렌더.png",
  "26-0519 Orbyt Section 확장.png",
  "26-0430 3F 라운지.png",
  "26-0430 리테일 & 프리미엄 F&B.png",
] as const;

const OIL_DEPOT_IMAGE_DIR = "/images/oil depot cultural renewal";

const oilDepotProjectImages = [
  "1.jpg",
  "2.jpg",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
] as const;

const CONCEPT_IMAGE_DIR = "/images/concept visualization works";

const conceptVisualizationSections = [
  {
    id: "aquarium-science-center",
    title: "Aquarium Science Center",
    description:
      "Concept design and visualization studies for an immersive aquarium and science center environment.",
    images: ["a1.png", "a2.png", "a3.png"],
  },
  {
    id: "hanok-renewal",
    title: "Hanok Renewal",
    description:
      "Concept design and visualization study exploring the renewal and adaptive reuse of traditional Korean architectural heritage. Focused on spatial atmosphere, cultural identity, architectural preservation, and contemporary interpretation.",
    images: ["b1.png", "b2.png", "b3.png", "b4.png", "b5.png"],
  },
] as const;

function getOrbitImageSrc(filename: string) {
  return `${ORBIT_IMAGE_DIR}/${encodeURIComponent(filename)}`;
}

function getConceptImageSrc(filename: string) {
  return `${CONCEPT_IMAGE_DIR}/${encodeURIComponent(filename)}`;
}

function getOilDepotImageSrc(filename: string) {
  return `${OIL_DEPOT_IMAGE_DIR}/${encodeURIComponent(filename)}`;
}

function GalleryImage({
  src,
  alt = "",
  className,
  onOpen,
}: {
  src: string;
  alt?: string;
  className?: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={`block w-full text-left ${className ?? ""}`}
    >
      <img src={src} alt={alt} className="w-full cursor-zoom-in" />
    </button>
  );
}

function ImageLightbox({
  activeImage,
  onClose,
}: {
  activeImage: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white sm:right-8 sm:top-8"
      >
        Close
      </button>
      <img
        src={activeImage}
        alt=""
        className="max-h-full max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function SubsectionGallery({
  images,
  getImageSrc,
  onOpen,
}: {
  images: readonly string[];
  getImageSrc: (filename: string) => string;
  onOpen: (src: string) => void;
}) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      <GalleryImage src={getImageSrc(images[0])} onOpen={onOpen} />

      {images.length > 1 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {images.slice(1).map((filename, index) => (
            <GalleryImage
              key={filename}
              src={getImageSrc(filename)}
              className={
                orbitMosaicColSpans[index % orbitMosaicColSpans.length]
              }
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 py-5 sm:py-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm font-light tracking-tight text-black sm:text-base">
        {value}
      </p>
    </div>
  );
}

function ProjectInfoLayout({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 xl:gap-28">
      <div className="lg:col-span-7">
        <p className="max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg sm:leading-8 lg:text-xl">
          {project.description}
        </p>
      </div>
      <div className="lg:col-span-5">
        {project.year && <MetadataItem label="Year" value={project.year} />}
        {project.role && <MetadataItem label="Role" value={project.role} />}
        {project.scope && (
          <MetadataItem
            label="Scope"
            value={project.scope
              .split(",")
              .map((item) => item.trim())
              .join("\n")}
          />
        )}
        <MetadataItem label="Project Type" value={project.type} />
        {project.location && (
          <MetadataItem label="Location" value={project.location} />
        )}
      </div>
    </div>
  );
}

function OrbitProjectDetails({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <ProjectInfoLayout project={project} />

      <div className="mt-20 space-y-6 sm:mt-28 sm:space-y-8 lg:mt-36 lg:space-y-10">
        <GalleryImage
          src={getOrbitImageSrc(orbitProjectImages[0])}
          alt="ORBIT Dome Theater"
          onOpen={onOpen}
        />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          <GalleryImage
            src={getOrbitImageSrc("orbit-hero01.png")}
            className="lg:col-span-7"
            onOpen={onOpen}
          />
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-5">
            <GalleryImage
              src={getOrbitImageSrc("orbit-hero03.png")}
              onOpen={onOpen}
            />
            <GalleryImage
              src={getOrbitImageSrc("orbit-hero04.png")}
              onOpen={onOpen}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {orbitProjectImages.slice(1).map((filename, index) => (
            <GalleryImage
              key={filename}
              src={getOrbitImageSrc(filename)}
              className={orbitMosaicColSpans[index % orbitMosaicColSpans.length]}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function OilDepotProjectDetails({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <ProjectInfoLayout project={project} />

      <div className="mt-20 sm:mt-28 lg:mt-36">
        <SubsectionGallery
          images={oilDepotProjectImages}
          getImageSrc={getOilDepotImageSrc}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}

function ConceptVisualizationDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <div className="mt-20 space-y-20 sm:mt-28 sm:space-y-28 lg:mt-36 lg:space-y-36">
      {conceptVisualizationSections.map((section, index) => (
        <section
          key={section.id}
          className={
            index > 0 ? "border-t border-black/10 pt-20 sm:pt-28 lg:pt-36" : ""
          }
        >
          <h4 className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
            {section.title}
          </h4>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            {section.description}
          </p>
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <SubsectionGallery
              images={section.images}
              getImageSrc={getConceptImageSrc}
              onOpen={onOpen}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (project.number !== "01" && project.number !== "03" && project.number !== "04") {
    return null;
  }

  return (
    <div className="pb-16 pt-4 sm:pb-24 sm:pt-8 lg:pb-32">
      {project.number === "01" && (
        <OrbitProjectDetails project={project} onOpen={setActiveImage} />
      )}
      {project.number === "03" && (
        <OilDepotProjectDetails project={project} onOpen={setActiveImage} />
      )}
      {project.number === "04" && (
        <ConceptVisualizationDetails onOpen={setActiveImage} />
      )}

      {activeImage && (
        <ImageLightbox
          activeImage={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white text-black font-sans">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-black/5 bg-white/90 backdrop-blur-md"
            : "border-b border-white/10 bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 sm:px-12 lg:px-24">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-300 sm:text-[11px] ${
                    scrolled
                      ? "text-black/60 hover:text-black"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="relative flex h-screen min-h-screen flex-col justify-center px-6 sm:px-12 lg:px-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/images/orbit/orbit-hero.png')] bg-cover bg-center bg-no-repeat"
        />
        <div aria-hidden className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-7xl">
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            KIM DONG HYEON
          </h1>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-white/80 sm:mt-8 sm:text-sm">
            Spatial Designer
            <br />
            & Exhibition Designer
          </p>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-white/90 sm:mt-12 sm:text-lg sm:leading-9 md:text-xl">
            Designing meaningful spatial experiences through exhibition,
            narrative, and visual communication.
          </p>
          <a
            href="#work"
            className="mt-12 inline-block border border-white px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-black sm:mt-16"
          >
            View Projects
          </a>
        </div>
      </section>

      <section
        id="work"
        className="px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            Featured Projects
          </h2>
          <div className="mt-24 divide-y divide-black/10 sm:mt-32">
            {projects.map((project) => {
              const isOpen = openProject === project.number;

              return (
                <div key={project.number}>
                  <article
                    onClick={() =>
                      setOpenProject(isOpen ? null : project.number)
                    }
                    className="group cursor-pointer py-14 transition-all duration-500 sm:py-20 lg:py-28"
                  >
                    <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-12 sm:gap-8 lg:gap-12">
                      <span
                        className={`text-6xl font-light leading-none tracking-tighter transition-colors duration-500 sm:col-span-3 sm:text-7xl lg:col-span-2 lg:text-8xl ${
                          isOpen
                            ? "text-black/30"
                            : "text-black/15 group-hover:text-black/25"
                        }`}
                      >
                        {project.number}
                      </span>
                      <h3
                        className={`text-2xl font-light tracking-tight transition-all duration-500 sm:col-span-6 sm:text-3xl lg:col-span-7 lg:text-4xl xl:text-5xl ${
                          isOpen ? "text-black" : "group-hover:translate-x-2"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 transition-colors duration-500 group-hover:text-black/60 sm:col-span-3 sm:pb-1 sm:text-right lg:col-span-3">
                        {project.type}
                      </p>
                    </div>
                  </article>
                  {isOpen && <ProjectDetails project={project} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            About
          </h2>
          <div className="mt-14 max-w-3xl space-y-8 text-base leading-relaxed text-black sm:mt-16 sm:space-y-10 sm:text-lg sm:leading-9 lg:mt-20 lg:space-y-12 lg:text-xl">
            <p>
              KIM DONG HYEON is a spatial designer based in Seoul, South
              Korea.
            </p>
            <p>
              His work focuses on exhibition design, spatial experiences,
              architectural concepts, and visual communication.
            </p>
            <p>
              With professional experience across museums, cultural
              institutions, educational facilities, and commercial
              environments, he develops design solutions that connect people,
              space, and narrative.
            </p>
            <p>
              He believes that space is more than a physical environment—it is
              a medium that shapes experiences, emotions, and human interaction.
            </p>
          </div>

          <div className="mt-32 sm:mt-40 lg:mt-48">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
              Experience
            </h3>
            <div className="relative mt-16 sm:mt-20">
              <div
                aria-hidden
                className="absolute left-0 top-0 hidden h-full w-px bg-black/10 sm:left-[11rem] sm:block lg:left-[13rem]"
              />
              <ul className="divide-y divide-black/10">
                {experience.map((item) => (
                  <li
                    key={item.period}
                    className="grid grid-cols-1 gap-4 py-12 first:pt-0 sm:grid-cols-12 sm:gap-8 sm:py-16 lg:py-20"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 sm:col-span-4 lg:col-span-3">
                      {item.period}
                    </p>
                    <div className="sm:col-span-8 lg:col-span-9">
                      <p className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
                        {item.role}
                      </p>
                      {item.company && (
                        <p className="mt-3 text-sm tracking-wide text-black/50 sm:text-base">
                          {item.company}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        className="border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            Resume
          </h2>
          <p className="mt-14 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-16 sm:text-lg sm:leading-9 lg:mt-20 lg:text-xl">
            Spatial designer with experience across exhibition design,
            architectural visualization and cultural space renewal.
          </p>
          <a
            href="#"
            className="mt-14 inline-block border border-black px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-black hover:text-white sm:mt-16"
          >
            Download Resume
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            Contact
          </h2>
          <p className="mt-14 max-w-2xl text-base leading-relaxed text-black sm:mt-16 sm:text-lg sm:leading-9 lg:mt-20 lg:text-xl">
            Feel free to reach out for collaborations, exhibitions, spatial
            design projects, or creative opportunities.
          </p>
          <ul className="mt-24 divide-y divide-black/10 sm:mt-32">
            <li className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 sm:col-span-3">
                Email
              </span>
              <a
                href="mailto:ehdgus1213@gmail.com"
                className="text-lg font-light tracking-tight text-black underline decoration-black/15 underline-offset-8 transition-all duration-500 hover:translate-x-1 hover:decoration-black sm:col-span-9 sm:text-xl lg:text-2xl"
              >
                ehdgus1213@gmail.com
              </a>
            </li>
            <li className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 sm:col-span-3">
                LinkedIn
              </span>
              <a
                href="http://www.linkedin.com/in/dong-hyeon-kim-staycalm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-light tracking-tight text-black underline decoration-black/15 underline-offset-8 transition-all duration-500 hover:translate-x-1 hover:decoration-black sm:col-span-9 sm:text-xl lg:text-2xl"
              >
                Dong Hyeon Kim
              </a>
            </li>
            <li className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 sm:col-span-3">
                Location
              </span>
              <p className="text-lg font-light tracking-tight text-black sm:col-span-9 sm:text-xl lg:text-2xl">
                Seoul, South Korea
              </p>
            </li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-12 sm:px-12 lg:px-24">
        <p className="mx-auto max-w-7xl text-center text-[10px] uppercase tracking-[0.25em] text-black/35">
          © {new Date().getFullYear()} Kim Dong Hyeon
        </p>
      </footer>
    </div>
  );
}
