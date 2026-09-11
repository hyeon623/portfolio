"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  BilingualParagraph,
  BilingualTitle,
  koreanClass,
} from "./bilingual";
import {
  type ProjectData,
  type PortfolioProjectId,
  type PortfolioProjectItem,
  type PortfolioCategory,
  type Project,
  type FolderGalleryProject,
  type FilmStageProject,
  getTitleKo,
  orbitProjectData,
  oilDepotProjectData,
  portfolioCategories,
  experience,
  aboutParagraphs,
  orbitMosaicColSpans,
  orbitProjectImages,
  oilDepotProjectImages,
  nscProjectImages,
  exhibitionFolderProjects,
  gwanghwamunInteriorProject,
  cafeInteriorProject,
  residentialInteriorProject,
  residentialInteriorProject2,
  designExplorationProjects,
  getFolderImageSrc,
  filmStageProjects,
  hanokRenewalProject,
  conceptVisualizationProjects,
  getOrbitImageSrc,
  getOilDepotImageSrc,
  getNscImageSrc,
  getFilmStageImageSrc,
  getFilmStageThumbnailSrc,
  getCategoryThumbnailSrc,
  getSubProjectThumbnailSrc,
} from "../data/portfolio";

const WORK_VIEW_HEADER_OFFSET = 24;

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function scrollToWorkViewTop(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  requestAnimationFrame(() => {
    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      WORK_VIEW_HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
  });
}

const navLinks = [
  { label: "Work", labelKo: "작업", href: "#work" },
  { label: "About", labelKo: "소개", href: "#about" },
  { label: "Resume", labelKo: "이력서", href: "#resume" },
  { label: "Contact", labelKo: "연락처", href: "#contact" },
];

function CategoryListItem({
  category,
  onSelect,
}: {
  category: PortfolioCategory;
  onSelect: () => void;
}) {
  const thumbnailSrc = getCategoryThumbnailSrc(category.number);

  return (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        type="button"
        onClick={onSelect}
        className="group w-full cursor-pointer touch-manipulation py-3 text-left transition-colors duration-300 active:bg-black/[0.02] sm:py-2.5 lg:py-3"
      >
        <div className="flex items-center gap-x-3 sm:gap-x-5 lg:gap-x-8">
          <span className="w-8 shrink-0 text-3xl font-light leading-none tracking-tighter text-black/15 transition-colors duration-300 group-hover:text-black/25 sm:w-10 sm:text-4xl lg:w-12 lg:text-5xl">
            {category.number}
          </span>

          <div className="min-w-0 flex-1">
            <BilingualTitle
              title={category.title}
              size="category-row"
              as="h3"
            />
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 transition-colors duration-300 group-hover:text-black/60 sm:mt-1">
              {category.subtitle}
            </p>
          </div>

          {thumbnailSrc && (
            <div className="aspect-video w-[7.875rem] shrink-0 overflow-hidden bg-black/[0.03] sm:w-48 md:w-52 lg:w-56 xl:w-60">
              <img
                src={thumbnailSrc}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )}
        </div>
      </button>
    </div>
  );
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

function InteriorGalleryTail({
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

  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < images.length) {
    const remaining = images.length - index;

    if (remaining >= 2) {
      const pair = images.slice(index, index + 2);
      index += 2;

      blocks.push(
        <div
          key={`pair-${pair[0]}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
        >
          {pair.map((filename) => (
            <GalleryImage
              key={filename}
              src={getImageSrc(filename)}
              onOpen={onOpen}
            />
          ))}
        </div>,
      );

      if (index < images.length) {
        const wide = images[index];
        index += 1;
        blocks.push(
          <GalleryImage
            key={wide}
            src={getImageSrc(wide)}
            onOpen={onOpen}
          />,
        );
      }

      continue;
    }

    const wide = images[index];
    index += 1;
    blocks.push(
      <GalleryImage
        key={wide}
        src={getImageSrc(wide)}
        onOpen={onOpen}
      />,
    );
  }

  return <>{blocks}</>;
}

function CompactInteriorGallery({
  images,
  getImageSrc,
  onOpen,
}: {
  images: readonly string[];
  getImageSrc: (filename: string) => string;
  onOpen: (src: string) => void;
}) {
  const [hero, ...rest] = images;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {hero && <GalleryImage src={getImageSrc(hero)} onOpen={onOpen} />}
      <InteriorGalleryTail
        images={rest}
        getImageSrc={getImageSrc}
        onOpen={onOpen}
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

function FilmSetGalleryTail({
  images,
  getImageSrc,
  onOpen,
  imageLabels,
  labelOffset = 1,
}: {
  images: readonly string[];
  getImageSrc: (filename: string) => string;
  onOpen: (src: string) => void;
  imageLabels?: readonly string[];
  labelOffset?: number;
}) {
  if (images.length === 0) {
    return null;
  }

  const getAlt = (index: number) => imageLabels?.[labelOffset + index] ?? "";

  const [
    second,
    third,
    fourth,
    fifth,
    sixth,
    wide,
    eighth,
    ninth,
    tenth,
    eleventh,
    twelfth,
  ] = images;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {second && third && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <GalleryImage
            src={getImageSrc(second)}
            alt={getAlt(0)}
            onOpen={onOpen}
          />
          <GalleryImage
            src={getImageSrc(third)}
            alt={getAlt(1)}
            onOpen={onOpen}
          />
        </div>
      )}

      {fourth && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {[fourth, fifth, sixth]
            .filter(Boolean)
            .map((filename, index) => (
              <GalleryImage
                key={filename}
                src={getImageSrc(filename)}
                alt={getAlt(2 + index)}
                onOpen={onOpen}
              />
            ))}
        </div>
      )}

      {wide && (
        <GalleryImage
          src={getImageSrc(wide)}
          alt={getAlt(5)}
          onOpen={onOpen}
        />
      )}

      {eighth && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {[eighth, ninth, tenth]
            .filter(Boolean)
            .map((filename, index) => (
              <GalleryImage
                key={filename}
                src={getImageSrc(filename)}
                alt={getAlt(6 + index)}
                onOpen={onOpen}
              />
            ))}
        </div>
      )}

      {eleventh && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <GalleryImage
            src={getImageSrc(eleventh)}
            alt={getAlt(9)}
            onOpen={onOpen}
          />
          {twelfth && (
            <GalleryImage
              src={getImageSrc(twelfth)}
              alt={getAlt(10)}
              onOpen={onOpen}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilmSetGallery({
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

  const [hero, ...rest] = images;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {hero && <GalleryImage src={getImageSrc(hero)} onOpen={onOpen} />}
      <FilmSetGalleryTail
        images={rest}
        getImageSrc={getImageSrc}
        onOpen={onOpen}
      />
    </div>
  );
}

function FilmStageNarrative({
  paragraphs,
  closingQuestion,
  closingAnswer,
}: {
  paragraphs: readonly string[];
  closingQuestion?: string;
  closingAnswer?: string;
}) {
  return (
    <div className="mx-auto max-w-xl space-y-6 sm:space-y-8 lg:max-w-2xl">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`leading-relaxed text-black/70 ${
            index === 0
              ? "text-base font-light italic tracking-wide text-black/85 sm:text-lg sm:leading-9"
              : "text-sm font-light sm:text-base sm:leading-8"
          }`}
        >
          {paragraph}
        </p>
      ))}

      {closingQuestion && (
        <div className="border-t border-black/10 pt-8 sm:pt-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-black/40">
            Through these environments, the project asks a simple question:
          </p>
          <p className="mt-5 text-xl font-light uppercase tracking-[0.12em] text-black sm:mt-6 sm:text-2xl sm:tracking-[0.15em] lg:text-3xl">
            &ldquo;{closingQuestion}&rdquo;
          </p>
          {closingAnswer && (
            <p className="mt-5 text-sm font-light italic leading-relaxed text-black/65 sm:mt-6 sm:text-base sm:leading-8">
              {closingAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function FilmStageProjectCard({
  project,
  onSelect,
  isSelected = false,
}: {
  project: FilmStageProject;
  onSelect: (slug: string) => void;
  isSelected?: boolean;
}) {
  const hasThumbnail = project.images.length > 0;
  const thumbnailSrc = hasThumbnail
    ? getFilmStageThumbnailSrc(project)
    : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(project.slug)}
      className={`group w-full cursor-pointer touch-manipulation border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] active:bg-black/[0.03] sm:py-8 ${
        isSelected ? "bg-black/[0.025]" : ""
      }`}
    >
      <div className="grid grid-cols-[1fr_5.5rem] items-center gap-x-5 sm:grid-cols-[1fr_7rem] sm:gap-x-8 lg:grid-cols-[1fr_8.5rem]">
        <div className="min-w-0">
          <BilingualTitle
            title={project.title}
            titleKo={getTitleKo(project.slug)}
            size="list-uppercase"
            as="h4"
          />
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.35em] text-black/45 sm:mt-3">
            {project.subtitle}
          </p>
        </div>

        <div className="aspect-[5/4] overflow-hidden bg-black/[0.03]">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-black/[0.04]" />
          )}
        </div>
      </div>
    </button>
  );
}

function FilmStageProjectDetail({
  project,
  onOpen,
}: {
  project: FilmStageProject;
  onOpen: (src: string) => void;
}) {
  const getImageSrc = (filename: string) =>
    getFilmStageImageSrc(project.folder, filename);
  const hasGallery = project.images.length > 0;
  const hasNarrative =
    (project.paragraphs?.length ?? 0) > 0 ||
    Boolean(project.closingQuestion);

  return (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
        {project.category}
      </p>
      <BilingualTitle
        title={project.displayTitle ?? project.title}
        titleKo={getTitleKo(project.slug)}
        size="detail-hero"
        as="h4"
        className="mt-3"
      />
      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.35em] text-black/45 sm:mt-5 sm:text-[11px]">
        {project.subtitle}
      </p>

      {hasGallery && (
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <GalleryImage
            src={getImageSrc(project.images[0])}
            alt={project.imageLabels?.[0] ?? project.title}
            onOpen={onOpen}
          />
        </div>
      )}

      {hasNarrative && project.paragraphs && (
        <div
          className={
            hasGallery
              ? "mt-16 sm:mt-20 lg:mt-24"
              : "mt-12 sm:mt-16 lg:mt-20"
          }
        >
          <FilmStageNarrative
            paragraphs={project.paragraphs}
            closingQuestion={project.closingQuestion}
            closingAnswer={project.closingAnswer}
          />
        </div>
      )}

      {hasGallery && project.images.length > 1 && (
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <FilmSetGalleryTail
            images={project.images.slice(1)}
            getImageSrc={getImageSrc}
            onOpen={onOpen}
            imageLabels={project.imageLabels}
            labelOffset={project.imageLabels ? 1 : 0}
          />
        </div>
      )}

      {!hasGallery && !hasNarrative && (
        <p className="mt-12 text-sm font-light text-black/45 sm:mt-16">
          Gallery coming soon.
        </p>
      )}
    </>
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

function ProjectInfoLayout({ project }: { project: ProjectData }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 xl:gap-28">
      <div className="lg:col-span-7">
        {project.description && (
          <p className="max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg sm:leading-8 lg:text-xl">
            {project.description}
          </p>
        )}
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
      <BilingualTitle
        title="Orbit Dome Theater"
        titleKo={getTitleKo("orbit")}
        size="detail"
        as="h4"
      />
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <ProjectInfoLayout project={project} />
      </div>

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
  project: ProjectData;
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <BilingualTitle
        title="Oil Depot Renewal"
        titleKo={getTitleKo("oil-depot")}
        size="detail"
        as="h4"
      />
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <ProjectInfoLayout project={project} />
      </div>

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

function SingaporeProjectDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <BilingualTitle
        title="Singapore NSC Science Center"
        titleKo={getTitleKo("singapore-nsc")}
        size="detail"
        as="h4"
      />
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <SubsectionGallery
          images={nscProjectImages}
          getImageSrc={getNscImageSrc}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}

const EXHIBITION_CATEGORY_NUMBER = "02";
const PRODUCTION_CATEGORY_NUMBER = "03";

function InlineProjectExpansion({
  panelRef,
  children,
}: {
  panelRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={panelRef}
      className={`border-t border-black/10 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="py-8 sm:py-10 lg:py-12">{children}</div>
    </div>
  );
}

function ProductionDesignProjectList({
  selectedProjectId,
  onSelectProject,
  onOpen,
  expansionRef,
}: {
  selectedProjectId: string | null;
  onSelectProject: (projectId: PortfolioProjectId) => void;
  onOpen: (src: string) => void;
  expansionRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="border-t border-black/10">
      {filmStageProjects.map((project) => {
        const portfolioProject = portfolioCategories
          .find((category) => category.number === PRODUCTION_CATEGORY_NUMBER)
          ?.projects.find((item) => item.id === project.slug);

        return (
          <div key={project.slug}>
            <FilmStageProjectCard
              project={project}
              isSelected={selectedProjectId === project.slug}
              onSelect={(slug) => onSelectProject(slug)}
            />
            {selectedProjectId === project.slug && portfolioProject && (
              <InlineProjectExpansion panelRef={expansionRef}>
                <PortfolioProjectDetail
                  projectId={project.slug}
                  project={portfolioProject}
                  onOpen={onOpen}
                />
              </InlineProjectExpansion>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CategoryProjectListItem({
  project,
  onSelect,
  isSelected = false,
}: {
  project: PortfolioProjectItem;
  onSelect: (id: PortfolioProjectId) => void;
  isSelected?: boolean;
}) {
  const thumbnailSrc = project.comingSoon
    ? null
    : getSubProjectThumbnailSrc(project.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`group w-full cursor-pointer touch-manipulation border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] active:bg-black/[0.03] sm:py-8 ${
        isSelected ? "bg-black/[0.025]" : ""
      }`}
    >
      <div className="grid grid-cols-[1fr_5.5rem] items-center gap-x-5 sm:grid-cols-[1fr_7rem] sm:gap-x-8 lg:grid-cols-[1fr_8.5rem]">
        <div className="min-w-0">
          <BilingualTitle
            title={project.title}
            titleKo={getTitleKo(project.id, project.titleKo)}
            size="list-uppercase"
            as="h4"
          />
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.35em] text-black/45 sm:mt-3">
            {project.subtitle}
          </p>
        </div>

        <div className="aspect-[5/4] overflow-hidden bg-black/[0.03]">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-black/[0.04]" />
          )}
        </div>
      </div>
    </button>
  );
}

function CategoryProjectList({
  category,
  selectedProjectId,
  onSelectProject,
  onOpen,
  expansionRef,
}: {
  category: PortfolioCategory;
  selectedProjectId: string | null;
  onSelectProject: (id: PortfolioProjectId) => void;
  onOpen: (src: string) => void;
  expansionRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="border-t border-black/10">
      {category.projects.map((project) => (
        <div key={project.id}>
          <CategoryProjectListItem
            project={project}
            isSelected={selectedProjectId === project.id}
            onSelect={onSelectProject}
          />
          {selectedProjectId === project.id && (
            <InlineProjectExpansion panelRef={expansionRef}>
              <PortfolioProjectDetail
                projectId={project.id}
                project={project}
                onOpen={onOpen}
              />
            </InlineProjectExpansion>
          )}
        </div>
      ))}
    </div>
  );
}

function ExhibitionProjectCard({
  project,
  onSelect,
  isSelected = false,
}: {
  project: PortfolioProjectItem;
  onSelect: (id: PortfolioProjectId) => void;
  isSelected?: boolean;
}) {
  const thumbnailSrc = project.comingSoon
    ? null
    : getSubProjectThumbnailSrc(project.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`group flex h-full w-full cursor-pointer touch-manipulation flex-col text-left transition-colors duration-300 hover:bg-black/[0.015] active:bg-black/[0.03] ${
        isSelected ? "bg-black/[0.025]" : ""
      }`}
    >
      <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-black/[0.03]">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-black/[0.04]" />
        )}
      </div>

      <div className="flex min-h-[6.5rem] shrink-0 flex-col justify-start pt-4 sm:min-h-[7rem] sm:pt-5">
        <BilingualTitle
          title={project.title}
          titleKo={getTitleKo(project.id, project.titleKo)}
          size="card"
          as="h4"
        />
        <p className="mt-auto line-clamp-1 pt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-black/45 transition-colors duration-300 group-hover:text-black/60">
          {project.subtitle}
        </p>
      </div>
    </button>
  );
}

function ExhibitionProjectGrid({
  category,
  selectedProjectId,
  onSelectProject,
  onOpen,
  expansionRef,
}: {
  category: PortfolioCategory;
  selectedProjectId: string | null;
  onSelectProject: (id: PortfolioProjectId) => void;
  onOpen: (src: string) => void;
  expansionRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {category.projects.map((project) => (
        <Fragment key={project.id}>
          <ExhibitionProjectCard
            project={project}
            isSelected={selectedProjectId === project.id}
            onSelect={onSelectProject}
          />
          {selectedProjectId === project.id && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <InlineProjectExpansion panelRef={expansionRef}>
                <PortfolioProjectDetail
                  projectId={project.id}
                  project={project}
                  onOpen={onOpen}
                />
              </InlineProjectExpansion>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function InteriorProjectDetails({
  project,
  projectId,
  onOpen,
}: {
  project: FolderGalleryProject;
  projectId: string;
  onOpen: (src: string) => void;
}) {
  const getImageSrc = (filename: string) =>
    getFolderImageSrc(project.imageDir, filename);

  return (
    <>
      <BilingualTitle
        title={project.title}
        titleKo={getTitleKo(projectId, project.titleKo)}
        size="detail"
        as="h4"
      />
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <CompactInteriorGallery
          images={project.images}
          getImageSrc={getImageSrc}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}

function ExhibitionProjectInfoLayout({
  year,
  role,
  location,
  description,
}: {
  year: string;
  role: string;
  location: string;
  description: string;
}) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-20 xl:gap-28">
      <div className="lg:col-span-5">
        <MetadataItem label="Year" value={year} />
        <MetadataItem label="Role" value={role} />
        <MetadataItem label="Location" value={location} />
      </div>
      <div className="lg:col-span-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
          Description
        </p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-3 sm:text-lg sm:leading-8 lg:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
}

function FolderGalleryDetails({
  project,
  projectId,
  onOpen,
}: {
  project: FolderGalleryProject;
  projectId: string;
  onOpen: (src: string) => void;
}) {
  const getImageSrc = (filename: string) =>
    getFolderImageSrc(project.imageDir, filename);
  const hasExhibitionMetadata =
    Boolean(project.year) &&
    Boolean(project.role) &&
    Boolean(project.location) &&
    Boolean(project.description);

  return (
    <>
      <BilingualTitle
        title={project.title}
        titleKo={getTitleKo(projectId, project.titleKo)}
        size="detail"
        as="h4"
      />
      {hasExhibitionMetadata ? (
        <ExhibitionProjectInfoLayout
          year={project.year!}
          role={project.role!}
          location={project.location!}
          description={project.description!}
        />
      ) : (
        project.description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            {project.description}
          </p>
        )
      )}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <SubsectionGallery
          images={project.images}
          getImageSrc={getImageSrc}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}

function PortfolioProjectDetail({
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
      <p className="mt-12 text-sm font-light text-black/45 sm:mt-16">
        Coming soon.
      </p>
    );
  }

  const humanProject = filmStageProjects.find((item) => item.slug === "human");
  const last24Project = filmStageProjects.find(
    (item) => item.slug === "the-last-24-hours",
  );

  switch (projectId) {
    case "orbit":
      return <OrbitProjectDetails project={orbitProjectData} onOpen={onOpen} />;
    case "oil-depot":
      return (
        <OilDepotProjectDetails project={oilDepotProjectData} onOpen={onOpen} />
      );
    case "hanok-renewal":
      return (
        <FolderGalleryDetails
          project={hanokRenewalProject}
          projectId="hanok-renewal"
          onOpen={onOpen}
        />
      );
    case "singapore-nsc":
      return <SingaporeProjectDetails onOpen={onOpen} />;
    case "human":
      return humanProject ? (
        <FilmStageProjectDetail project={humanProject} onOpen={onOpen} />
      ) : null;
    case "the-last-24-hours":
      return last24Project ? (
        <FilmStageProjectDetail project={last24Project} onOpen={onOpen} />
      ) : null;
    case "shinhan-bank-gwanghwamun-office-interior":
      return (
        <FolderGalleryDetails
          project={gwanghwamunInteriorProject}
          projectId="shinhan-bank-gwanghwamun-office-interior"
          onOpen={onOpen}
        />
      );
    case "cafe-interior":
      return (
        <InteriorProjectDetails
          project={cafeInteriorProject}
          projectId="cafe-interior"
          onOpen={onOpen}
        />
      );
    case "residential-interior-design":
      return (
        <InteriorProjectDetails
          project={residentialInteriorProject}
          projectId="residential-interior-design"
          onOpen={onOpen}
        />
      );
    case "residential-interior-design-2":
      return (
        <InteriorProjectDetails
          project={residentialInteriorProject2}
          projectId="residential-interior-design-2"
          onOpen={onOpen}
        />
      );
    default: {
      const conceptProject = conceptVisualizationProjects[projectId];
      if (conceptProject) {
        return (
          <FolderGalleryDetails
            project={conceptProject}
            projectId={projectId}
            onOpen={onOpen}
          />
        );
      }
      const designProject = designExplorationProjects[projectId];
      if (designProject) {
        return (
          <FolderGalleryDetails
            project={designProject}
            projectId={projectId}
            onOpen={onOpen}
          />
        );
      }
      const folderProject = exhibitionFolderProjects[projectId];
      if (folderProject) {
        return (
          <FolderGalleryDetails
            project={folderProject}
            projectId={projectId}
            onOpen={onOpen}
          />
        );
      }
      return (
        <p className="mt-12 text-sm font-light text-black/45 sm:mt-16">
          Coming soon.
        </p>
      );
    }
  }
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12 12 5l8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function PortfolioDetailNav({
  onBack,
  onHome,
  compact = false,
}: {
  onBack: () => void;
  onHome: () => void;
  compact?: boolean;
}) {
  const buttonClassName =
    "flex h-10 w-10 items-center justify-center text-black/45 transition-all duration-300 hover:scale-105 hover:text-black/75 active:text-black";

  return (
    <div
      className={
        compact
          ? "fixed left-3 top-14 z-[60] flex items-center gap-1"
          : "fixed left-6 top-6 z-[60] flex items-center gap-3 sm:left-12 sm:gap-4 lg:left-24"
      }
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back one level"
        className={buttonClassName}
      >
        <BackIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onHome}
        aria-label="Back to portfolio home"
        className={buttonClassName}
      >
        <HomeIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export function WorkPortfolioSection({
  compact = false,
}: {
  compact?: boolean;
} = {}) {
  const [workView, setWorkView] = useState<
    | { level: "categories" }
    | { level: "projects"; categoryNumber: string }
  >({ level: "categories" });
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const workViewTopRef = useRef<HTMLDivElement>(null);
  const expansionRef = useRef<HTMLDivElement>(null);
  const previousWorkViewRef = useRef(workView);

  const activeCategory = portfolioCategories.find(
    (category) =>
      workView.level !== "categories" &&
      category.number === workView.categoryNumber,
  );

  const goToCategories = () => {
    setWorkView({ level: "categories" });
    setExpandedProjectId(null);
    setActiveImage(null);
    scrollToPageTop();
  };

  const goHome = () => {
    goToCategories();
    if (window.location.pathname !== "/" || window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  const goBack = () => {
    if (expandedProjectId) {
      setExpandedProjectId(null);
      setActiveImage(null);
      return;
    }

    if (workView.level === "projects") {
      goToCategories();
    }
  };

  const goToProjects = (categoryNumber: string) => {
    setWorkView({ level: "projects", categoryNumber });
    setExpandedProjectId(null);
    setActiveImage(null);
  };

  const selectProject = (projectId: PortfolioProjectId) => {
    setExpandedProjectId((current) =>
      current === projectId ? null : projectId,
    );
    setActiveImage(null);
  };

  useEffect(() => {
    const previousWorkView = previousWorkViewRef.current;

    if (workView.level === "categories") {
      scrollToPageTop();
    } else if (
      workView.level === "projects" &&
      previousWorkView.level === "categories"
    ) {
      scrollToWorkViewTop(workViewTopRef.current);
    }

    previousWorkViewRef.current = workView;
  }, [workView]);

  useEffect(() => {
    if (!expandedProjectId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (!expansionRef.current) {
        return;
      }

      const top =
        expansionRef.current.getBoundingClientRect().top +
        window.scrollY -
        WORK_VIEW_HEADER_OFFSET -
        24;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 320);

    return () => window.clearTimeout(timeout);
  }, [expandedProjectId]);

  return (
    <section
      id="work"
      className={
        compact
          ? "px-4 py-8 sm:px-6"
          : "px-6 py-16 sm:px-12 sm:py-20 lg:px-24 lg:py-24"
      }
    >
      <div ref={workViewTopRef} className="mx-auto w-full max-w-7xl">
        {workView.level !== "categories" && (
          <PortfolioDetailNav
            onBack={goBack}
            onHome={goHome}
            compact={compact}
          />
        )}

        {workView.level === "categories" && (
          <>
            <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
              Featured Projects
            </h2>
            <div className="mt-4 border-t border-black/10 sm:mt-5">
              {portfolioCategories.map((category) => (
                <CategoryListItem
                  key={category.number}
                  category={category}
                  onSelect={() => goToProjects(category.number)}
                />
              ))}
            </div>
          </>
        )}

        {workView.level === "projects" && activeCategory && (
          <>
            <button
              type="button"
              onClick={goToCategories}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 transition-colors duration-300 hover:text-black/70"
            >
              ← All Categories
            </button>
            <div className="mt-8 sm:mt-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                {activeCategory.number}
              </p>
              <BilingualTitle
                title={activeCategory.title}
                size="category-main"
                as="h2"
                className="mt-3"
              />
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40">
                {activeCategory.subtitle}
              </p>
            </div>
            <div className="mt-12 sm:mt-16">
              {activeCategory.number === EXHIBITION_CATEGORY_NUMBER ? (
                <ExhibitionProjectGrid
                  category={activeCategory}
                  selectedProjectId={expandedProjectId}
                  onSelectProject={selectProject}
                  onOpen={setActiveImage}
                  expansionRef={expansionRef}
                />
              ) : activeCategory.number === PRODUCTION_CATEGORY_NUMBER ? (
                <ProductionDesignProjectList
                  selectedProjectId={expandedProjectId}
                  onSelectProject={selectProject}
                  onOpen={setActiveImage}
                  expansionRef={expansionRef}
                />
              ) : (
                <CategoryProjectList
                  category={activeCategory}
                  selectedProjectId={expandedProjectId}
                  onSelectProject={selectProject}
                  onOpen={setActiveImage}
                  expansionRef={expansionRef}
                />
              )}
            </div>
            {activeImage && (
              <ImageLightbox
                activeImage={activeImage}
                onClose={() => setActiveImage(null)}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function AboutSection({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section
      id="about"
      className={
        compact
          ? "border-t border-black/10 px-4 py-16"
          : "border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      }
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
          About
        </h2>
        <div
          className={
            compact
              ? "mt-8 max-w-3xl space-y-6"
              : "mt-14 max-w-3xl space-y-8 sm:mt-16 sm:space-y-10 lg:mt-20 lg:space-y-12"
          }
        >
          {aboutParagraphs.map((paragraph) => (
            <BilingualParagraph
              key={paragraph.en}
              text={paragraph.en}
              textKo={paragraph.ko}
              variant="md"
            />
          ))}
        </div>

        <div className={compact ? "mt-16" : "mt-32 sm:mt-40 lg:mt-48"}>
          <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            Experience
          </h3>
          <div className={compact ? "relative mt-8" : "relative mt-16 sm:mt-20"}>
            <div
              aria-hidden
              className="absolute left-0 top-0 hidden h-full w-px bg-black/10 sm:left-[11rem] sm:block lg:left-[13rem]"
            />
            <ul className="divide-y divide-black/10">
              {experience.map((item) => (
                <li
                  key={item.period}
                  className={
                    compact
                      ? "grid grid-cols-1 gap-3 py-8 first:pt-0"
                      : "grid grid-cols-1 gap-4 py-12 first:pt-0 sm:grid-cols-12 sm:gap-8 sm:py-16 lg:py-20"
                  }
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
  );
}

export function ResumeSection({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section
      id="resume"
      className={
        compact
          ? "border-t border-black/10 px-4 py-16"
          : "border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      }
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
          Resume
        </h2>
        <p
          className={
            compact
              ? "mt-8 max-w-2xl text-base leading-relaxed text-black/75"
              : "mt-14 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-16 sm:text-lg sm:leading-9 lg:mt-20 lg:text-xl"
          }
        >
          Spatial designer with experience across exhibition design,
          architectural visualization and cultural space renewal.
        </p>
        <a
          href="#"
          className={
            compact
              ? "mt-8 inline-block border border-black px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-black hover:text-white"
              : "mt-14 inline-block border border-black px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-black hover:text-white sm:mt-16"
          }
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}

export function ContactSection({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section
      id="contact"
      className={
        compact
          ? "border-t border-black/10 px-4 py-16"
          : "border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      }
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
          Contact
        </h2>
        <p
          className={
            compact
              ? "mt-8 max-w-2xl text-base leading-relaxed text-black"
              : "mt-14 max-w-2xl text-base leading-relaxed text-black sm:mt-16 sm:text-lg sm:leading-9 lg:mt-20 lg:text-xl"
          }
        >
          Feel free to reach out for collaborations, exhibitions, spatial
          design projects, or creative opportunities.
        </p>
        <ul
          className={
            compact
              ? "mt-10 divide-y divide-black/10"
              : "mt-24 divide-y divide-black/10 sm:mt-32"
          }
        >
          <li
            className={
              compact
                ? "grid grid-cols-1 gap-3 py-8"
                : "grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16"
            }
          >
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
          <li
            className={
              compact
                ? "grid grid-cols-1 gap-3 py-8"
                : "grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16"
            }
          >
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
          <li
            className={
              compact
                ? "grid grid-cols-1 gap-3 py-8"
                : "grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16"
            }
          >
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
  );
}

export function DesktopHome() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    scrollToPageTop();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 48);

      const heroEl = heroSectionRef.current;
      if (!heroEl) {
        setHeroProgress(0);
        return;
      }

      const scrollRange = heroEl.offsetHeight - window.innerHeight;
      const progress =
        scrollRange > 0 ? Math.min(1, Math.max(0, scrollY / scrollRange)) : 0;
      setHeroProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const heroMistOpacity = 1 - Math.pow(1 - heroProgress, 1.45);
  const heroWhiteOverlay = heroMistOpacity * 0.48;
  const heroContentLift = heroMistOpacity * 22;
  const heroContentFade = Math.max(0, 1 - heroMistOpacity * 1.05);
  const navMistOpacity = Math.min(0.42, 0.04 + heroMistOpacity * 0.22);
  const navTextOnLight = heroMistOpacity > 0.36 || scrolled;

  return (
    <div className="bg-white text-black font-sans">
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2em] w-full text-[10px] transition-[border-color] duration-500 sm:text-[11px]"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${navMistOpacity})`,
          borderBottom:
            heroMistOpacity > 0.55 || scrolled
              ? "1px solid rgba(0, 0, 0, 0.05)"
              : "1px solid transparent",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <nav className="pointer-events-auto mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6 sm:px-12 lg:px-24">
          <ul className="flex flex-nowrap items-center justify-center gap-x-8 sm:gap-x-12 lg:gap-x-16">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`leading-none text-[1em] font-normal uppercase tracking-[0.4em] transition-colors duration-300 sm:tracking-[0.45em] ${
                    navTextOnLight
                      ? "text-black/50 hover:text-black"
                      : "text-white/78 hover:text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.28)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section ref={heroSectionRef} className="relative h-[175vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/images/orbit/orbit-hero.png')] bg-cover bg-[center_42%] bg-no-repeat"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-black/5"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white"
            style={{ opacity: heroWhiteOverlay }}
          />

          <div
            className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 pt-28 will-change-transform sm:px-12 sm:pb-16 sm:pt-32 lg:px-24 lg:pb-20"
            style={{
              transform: `translate3d(0, ${-heroContentLift}vh, 0)`,
              opacity: heroContentFade,
            }}
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="max-w-2xl lg:col-span-8">
              <p className="text-[10px] font-normal uppercase tracking-[0.45em] text-white/50 sm:text-[11px]">
                Portfolio
              </p>
              <h1 className="mt-4 text-[1.625rem] font-light uppercase tracking-[0.14em] text-white sm:mt-5 sm:text-3xl sm:tracking-[0.16em] lg:text-[2.625rem] lg:tracking-[0.18em]">
                Kim Dong Hyeon
              </h1>

              <div className="mt-6 sm:mt-8">
                <p className="text-[10px] font-normal uppercase tracking-[0.38em] text-white/85 sm:text-[11px] sm:tracking-[0.42em]">
                  Spatial Designer
                </p>
                <p className="mt-1.5 text-[10px] font-normal uppercase tracking-[0.38em] text-white/85 sm:text-[11px] sm:tracking-[0.42em]">
                  & Exhibition Designer
                </p>
                <p
                  className={`mt-2.5 text-[0.625rem] leading-[1.45] text-white/45 sm:text-[0.6875rem] ${koreanClass}`}
                >
                  공간 디자이너
                  <br />
                  & 전시 디자이너
                </p>
              </div>

              <div className="mt-8 max-w-md sm:mt-10">
                <p className="text-sm font-light leading-relaxed text-white/78 sm:text-[0.9375rem] sm:leading-7">
                  Designing experiences through architecture, exhibition and
                  interior environments.
                </p>
                <p
                  className={`mt-2.5 text-[0.6875rem] leading-[1.45] text-white/42 sm:text-[0.75rem] ${koreanClass}`}
                >
                  건축, 전시, 인테리어 환경을 통해
                  <br />
                  공간의 경험을 디자인합니다.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-[10px] font-normal uppercase tracking-[0.38em] text-white/75 transition-colors duration-300 hover:text-white sm:text-[11px] sm:tracking-[0.42em]"
              >
                <span className="border-b border-white/35 pb-1 transition-colors duration-300 group-hover:border-white/80">
                  Explore Work
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      <WorkPortfolioSection />

      <AboutSection />

      <ResumeSection />

      <ContactSection />

      <footer className="border-t border-black/10 px-6 py-12 sm:px-12 lg:px-24">
        <p className="mx-auto max-w-7xl text-center text-[10px] uppercase tracking-[0.25em] text-black/35">
          © {new Date().getFullYear()} Kim Dong Hyeon
        </p>
      </footer>
    </div>
  );
}
