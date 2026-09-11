"use client";

import { useEffect, useState } from "react";
import {
  BilingualParagraph,
  BilingualTitle,
  koreanClass,
} from "./bilingual";
import {
  type FolderGalleryProject,
  type PortfolioCategory,
  type PortfolioProjectId,
  type PortfolioProjectItem,
  aboutParagraphs,
  cafeInteriorProject,
  conceptVisualizationProjects,
  designExplorationProjects,
  exhibitionFolderProjects,
  experience,
  filmStageProjects,
  getCategoryThumbnailSrc,
  getCategoryTitleKo,
  getFilmStageImageSrc,
  getFolderImageSrc,
  getNscImageSrc,
  getOilDepotImageSrc,
  getOrbitImageSrc,
  getSubProjectThumbnailSrc,
  getTitleKo,
  gwanghwamunInteriorProject,
  hanokRenewalProject,
  nscProjectImages,
  oilDepotProjectData,
  oilDepotProjectImages,
  orbitProjectData,
  orbitProjectImages,
  portfolioCategories,
  residentialInteriorProject,
  residentialInteriorProject2,
} from "../data/portfolio";

type MobileTab = "work" | "about" | "contact";

type WorkStack =
  | { screen: "categories" }
  | { screen: "projects"; categoryNumber: string }
  | {
      screen: "detail";
      categoryNumber: string;
      projectId: PortfolioProjectId;
    };

type GallerySlide = { src: string; alt?: string };

type ProjectGallery = {
  title: string;
  titleKo?: string;
  subtitle?: string;
  description?: string;
  descriptionKo?: string;
  meta?: { label: string; value: string }[];
  slides: GallerySlide[];
  narrative?: string[];
};

function resolveProjectGallery(
  projectId: PortfolioProjectId,
): ProjectGallery | null {
  const film = filmStageProjects.find((project) => project.slug === projectId);
  if (film) {
    return {
      title: film.displayTitle ?? film.title,
      titleKo: getTitleKo(film.slug),
      subtitle: film.subtitle,
      slides: film.images.map((filename, index) => ({
        src: getFilmStageImageSrc(film.folder, filename),
        alt: film.imageLabels?.[index] ?? film.title,
      })),
      narrative: film.paragraphs ? [...film.paragraphs] : undefined,
    };
  }

  if (projectId === "orbit") {
    const images = [
      orbitProjectImages[0],
      "orbit-hero01.png",
      "orbit-hero03.png",
      "orbit-hero04.png",
      ...orbitProjectImages.slice(1),
    ];
    return {
      title: orbitProjectData.title,
      titleKo: getTitleKo("orbit"),
      subtitle: orbitProjectData.type,
      description: orbitProjectData.description ?? undefined,
      descriptionKo: orbitProjectData.descriptionKo ?? undefined,
      meta: [
        ...(orbitProjectData.year
          ? [{ label: "Year", value: orbitProjectData.year }]
          : []),
        ...(orbitProjectData.role
          ? [{ label: "Role", value: orbitProjectData.role }]
          : []),
        ...(orbitProjectData.location
          ? [{ label: "Location", value: orbitProjectData.location }]
          : []),
      ],
      slides: images.map((filename) => ({
        src: getOrbitImageSrc(filename),
        alt: orbitProjectData.title,
      })),
    };
  }

  if (projectId === "oil-depot") {
    return {
      title: oilDepotProjectData.title,
      titleKo: getTitleKo("oil-depot"),
      subtitle: oilDepotProjectData.type,
      description: oilDepotProjectData.description ?? undefined,
      descriptionKo: oilDepotProjectData.descriptionKo ?? undefined,
      meta: [
        ...(oilDepotProjectData.year
          ? [{ label: "Year", value: oilDepotProjectData.year }]
          : []),
        ...(oilDepotProjectData.role
          ? [{ label: "Role", value: oilDepotProjectData.role }]
          : []),
        ...(oilDepotProjectData.location
          ? [{ label: "Location", value: oilDepotProjectData.location }]
          : []),
      ],
      slides: oilDepotProjectImages.map((filename) => ({
        src: getOilDepotImageSrc(filename),
        alt: oilDepotProjectData.title,
      })),
    };
  }

  if (projectId === "singapore-nsc") {
    return {
      title: "Singapore NSC Science Center",
      titleKo: getTitleKo("singapore-nsc"),
      subtitle: "Exhibition Design",
      slides: nscProjectImages.map((filename) => ({
        src: getNscImageSrc(filename),
      })),
    };
  }

  const folderProjects: Record<string, FolderGalleryProject> = {
    "hanok-renewal": hanokRenewalProject,
    "shinhan-bank-gwanghwamun-office-interior": gwanghwamunInteriorProject,
    "cafe-interior": cafeInteriorProject,
    "residential-interior-design": residentialInteriorProject,
    "residential-interior-design-2": residentialInteriorProject2,
    ...exhibitionFolderProjects,
    ...designExplorationProjects,
    ...conceptVisualizationProjects,
  };

  const folder = folderProjects[projectId];
  if (!folder) {
    return null;
  }

  return {
    title: folder.title,
    titleKo: getTitleKo(projectId, folder.titleKo),
    description: folder.description,
    descriptionKo: folder.descriptionKo,
    meta: [
      ...(folder.year ? [{ label: "Year", value: folder.year }] : []),
      ...(folder.role ? [{ label: "Role", value: folder.role }] : []),
      ...(folder.location
        ? [{ label: "Location", value: folder.location }]
        : []),
    ],
    slides: folder.images.map((filename) => ({
      src: getFolderImageSrc(folder.imageDir, filename),
      alt: folder.title,
    })),
  };
}

function MobileLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70"
      >
        Close
      </button>
      <img
        src={src}
        alt=""
        className="max-h-full max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function BackChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TabIcon({ name }: { name: MobileTab }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    className: "h-5 w-5",
    "aria-hidden": true as const,
  };

  if (name === "work") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="0.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="0.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="0.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="0.5" />
      </svg>
    );
  }

  if (name === "about") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.25" />
        <path
          d="M5.5 19.5c1.8-3.2 4.2-4.8 6.5-4.8s4.7 1.6 6.5 4.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 7.5h16M4 12h16M4 16.5h10" strokeLinecap="round" />
    </svg>
  );
}

function MobileCategoryCard({
  category,
  onSelect,
}: {
  category: PortfolioCategory;
  onSelect: () => void;
}) {
  const thumb = getCategoryThumbnailSrc(category.number);
  const titleKo = getCategoryTitleKo(category);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden text-left"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/[0.04]">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-active:scale-[1.02]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="text-[10px] font-medium tracking-[0.28em] text-white/65">
            {category.number}
          </p>
          <p className="mt-1 text-lg font-light tracking-tight">
            {category.title}
          </p>
          {titleKo ? (
            <p className={`mt-0.5 text-[0.7rem] text-white/55 ${koreanClass}`}>
              {titleKo}
            </p>
          ) : null}
          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/55">
            {category.subtitle}
          </p>
        </div>
      </div>
    </button>
  );
}

function MobileProjectRow({
  project,
  onSelect,
}: {
  project: PortfolioProjectItem;
  onSelect: () => void;
}) {
  const thumb = project.comingSoon
    ? null
    : getSubProjectThumbnailSrc(project.id);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-4 border-b border-black/10 py-4 text-left active:bg-black/[0.02]"
    >
      <div className="min-w-0 flex-1">
        <BilingualTitle
          title={project.title}
          titleKo={getTitleKo(project.id, project.titleKo)}
          size="list"
          as="h3"
        />
        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-black/40">
          {project.comingSoon ? "Coming Soon" : project.subtitle}
        </p>
      </div>
      <div className="aspect-[5/4] w-[4.75rem] shrink-0 overflow-hidden bg-black/[0.04]">
        {thumb ? (
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
    </button>
  );
}

function MobileProjectDetail({
  projectId,
  project,
  onOpen,
}: {
  projectId: PortfolioProjectId;
  project?: PortfolioProjectItem;
  onOpen: (src: string) => void;
}) {
  if (project?.comingSoon) {
    return (
      <p className="py-16 text-center text-sm font-light text-black/45">
        Coming soon.
      </p>
    );
  }

  const gallery = resolveProjectGallery(projectId);
  if (!gallery) {
    return (
      <p className="py-16 text-center text-sm font-light text-black/45">
        Coming soon.
      </p>
    );
  }

  return (
    <div className="pb-8">
      <BilingualTitle
        title={gallery.title}
        titleKo={gallery.titleKo}
        size="detail"
        as="h2"
      />
      {gallery.subtitle ? (
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.28em] text-black/40">
          {gallery.subtitle}
        </p>
      ) : null}

      {gallery.description ? (
        <div className="mt-6">
          <BilingualParagraph
            text={gallery.description}
            textKo={gallery.descriptionKo}
            variant="sm"
          />
        </div>
      ) : null}

      {gallery.meta && gallery.meta.length > 0 ? (
        <dl className="mt-8 space-y-4 border-t border-black/10 pt-6">
          {gallery.meta.map((item) => (
            <div key={item.label}>
              <dt className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/35">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-light text-black">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {gallery.narrative ? (
        <div className="mt-8 space-y-4">
          {gallery.narrative.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-sm font-light leading-relaxed text-black/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-8 space-y-3">
        {gallery.slides.map((slide) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => onOpen(slide.src)}
            className="block w-full overflow-hidden bg-black/[0.03]"
          >
            <img
              src={slide.src}
              alt={slide.alt ?? ""}
              className="w-full cursor-zoom-in"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function MobileHome() {
  const [tab, setTab] = useState<MobileTab>("work");
  const [workStack, setWorkStack] = useState<WorkStack>({
    screen: "categories",
  });
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab, workStack]);

  const activeCategory =
    workStack.screen === "categories"
      ? null
      : portfolioCategories.find(
          (category) => category.number === workStack.categoryNumber,
        );

  const activeProject =
    workStack.screen === "detail"
      ? activeCategory?.projects.find(
          (project) => project.id === workStack.projectId,
        )
      : undefined;

  const showWorkBack = tab === "work" && workStack.screen !== "categories";

  const goTab = (next: MobileTab) => {
    setTab(next);
    if (next === "work") {
      setWorkStack({ screen: "categories" });
    }
    setLightbox(null);
  };

  const goBack = () => {
    setLightbox(null);
    if (workStack.screen === "detail") {
      setWorkStack({
        screen: "projects",
        categoryNumber: workStack.categoryNumber,
      });
      return;
    }
    if (workStack.screen === "projects") {
      setWorkStack({ screen: "categories" });
    }
  };

  return (
    <div className="min-h-dvh bg-white font-sans text-black">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            {showWorkBack ? (
              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className="-ml-1 flex h-9 w-9 items-center justify-center text-black/55 active:text-black"
              >
                <BackChevron className="h-5 w-5" />
              </button>
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-[0.28em] text-black">
                Kim Dong Hyeon
              </p>
              <p
                className={`truncate text-[0.62rem] text-black/40 ${koreanClass}`}
              >
                김동현 · Spatial Designer
              </p>
            </div>
          </div>
          {workStack.screen === "categories" && tab === "work" ? (
            <p className="text-[10px] uppercase tracking-[0.22em] text-black/35">
              Portfolio
            </p>
          ) : null}
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-4 pb-28 pt-5">
        {tab === "work" && workStack.screen === "categories" ? (
          <section>
            <div className="mb-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                Selected Work
              </p>
              <h1 className="mt-2 text-2xl font-light tracking-tight text-black">
                Projects
              </h1>
              <p className={`mt-1 text-[0.8rem] ${koreanClass}`}>프로젝트</p>
            </div>
            <div className="space-y-4">
              {portfolioCategories.map((category) => (
                <MobileCategoryCard
                  key={category.number}
                  category={category}
                  onSelect={() =>
                    setWorkStack({
                      screen: "projects",
                      categoryNumber: category.number,
                    })
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {tab === "work" &&
        workStack.screen === "projects" &&
        activeCategory ? (
          <section>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/35">
              {activeCategory.number}
            </p>
            <BilingualTitle
              title={activeCategory.title}
              titleKo={getCategoryTitleKo(activeCategory)}
              size="category-main"
              as="h1"
              className="mt-2"
            />
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-black/40">
              {activeCategory.subtitle}
            </p>
            <div className="mt-6 border-t border-black/10">
              {activeCategory.projects.map((project) => (
                <MobileProjectRow
                  key={project.id}
                  project={project}
                  onSelect={() =>
                    setWorkStack({
                      screen: "detail",
                      categoryNumber: activeCategory.number,
                      projectId: project.id,
                    })
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {tab === "work" && workStack.screen === "detail" ? (
          <MobileProjectDetail
            projectId={workStack.projectId}
            project={activeProject}
            onOpen={setLightbox}
          />
        ) : null}

        {tab === "about" ? (
          <section>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
              About
            </p>
            <h1 className="mt-2 text-2xl font-light tracking-tight">
              Kim Dong Hyeon
            </h1>
            <p className={`mt-1 text-[0.8rem] ${koreanClass}`}>김동현</p>
            <div className="mt-8 space-y-6">
              {aboutParagraphs.map((paragraph) => (
                <BilingualParagraph
                  key={paragraph.en}
                  text={paragraph.en}
                  textKo={paragraph.ko}
                  variant="sm"
                />
              ))}
            </div>
            <div className="mt-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                Experience
              </p>
              <ul className="mt-6 divide-y divide-black/10 border-t border-black/10">
                {experience.map((item) => (
                  <li key={item.period} className="py-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                      {item.period}
                    </p>
                    <p className="mt-2 text-lg font-light tracking-tight">
                      {item.role}
                    </p>
                    {item.roleKo ? (
                      <p className={`mt-0.5 text-[0.75rem] ${koreanClass}`}>
                        {item.roleKo}
                      </p>
                    ) : null}
                    {item.company ? (
                      <p className="mt-1 text-sm text-black/50">
                        {item.company}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 border-t border-black/10 pt-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                Resume
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-black/70">
                Spatial designer with experience across exhibition design,
                architectural visualization and cultural space renewal.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex border border-black px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em]"
              >
                Download Resume
              </a>
            </div>
          </section>
        ) : null}

        {tab === "contact" ? (
          <section>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
              Contact
            </p>
            <h1 className="mt-2 text-2xl font-light tracking-tight">
              Let&apos;s connect
            </h1>
            <p className={`mt-1 text-[0.8rem] ${koreanClass}`}>연락하기</p>
            <p className="mt-6 text-sm font-light leading-relaxed text-black/70">
              Feel free to reach out for collaborations, exhibitions, spatial
              design projects, or creative opportunities.
            </p>
            <ul className="mt-10 divide-y divide-black/10 border-t border-black/10">
              <li className="py-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                  Email
                </p>
                <a
                  href="mailto:ehdgus1213@gmail.com"
                  className="mt-2 block text-lg font-light tracking-tight underline decoration-black/15 underline-offset-4"
                >
                  ehdgus1213@gmail.com
                </a>
              </li>
              <li className="py-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                  LinkedIn
                </p>
                <a
                  href="http://www.linkedin.com/in/dong-hyeon-kim-staycalm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg font-light tracking-tight underline decoration-black/15 underline-offset-4"
                >
                  Dong Hyeon Kim
                </a>
              </li>
              <li className="py-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
                  Location
                </p>
                <p className="mt-2 text-lg font-light tracking-tight">
                  Seoul, South Korea
                </p>
              </li>
            </ul>
          </section>
        ) : null}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <ul className="mx-auto flex h-16 max-w-lg items-stretch">
          {(
            [
              { id: "work" as const, label: "Work" },
              { id: "about" as const, label: "About" },
              { id: "contact" as const, label: "Contact" },
            ]
          ).map((item) => {
            const active = tab === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => goTab(item.id)}
                  className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${
                    active ? "text-black" : "text-black/35"
                  }`}
                >
                  <TabIcon name={item.id} />
                  <span className="text-[9px] font-medium uppercase tracking-[0.18em]">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {lightbox ? (
        <MobileLightbox src={lightbox} onClose={() => setLightbox(null)} />
      ) : null}
    </div>
  );
}
