"use client";

import { useEffect, useRef, useState } from "react";

const WORK_VIEW_HEADER_OFFSET = 88;

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
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

type ProjectData = {
  number: string;
  title: string;
  type: string;
  year: string | null;
  role: string | null;
  scope: string | null;
  location: string | null;
  description: string | null;
};

type PortfolioProjectId = string;

type PortfolioProjectItem = {
  id: PortfolioProjectId;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
};

type PortfolioCategory = {
  number: string;
  title: string;
  subtitle: string;
  projects: PortfolioProjectItem[];
};

const orbitProjectData: ProjectData = {
  number: "01",
  title: "ORBIT Dome Theater",
  type: "Exhibition & Immersive Design",
  year: "2024 - Present",
  role: "Lead Spatial Designer",
  scope: "Exterior Design, Landscape Design, Architectural Visualization",
  location: "South Korea",
  description:
    "Immersive dome theater project developed for cultural and educational experiences. Responsible for architectural exterior design, landscape planning, spatial design and visualization.",
};

const oilDepotProjectData: ProjectData = {
  number: "04",
  title: "Oil Depot Cultural Renewal",
  type: "Architectural & Exhibition Renewal",
  year: "2024",
  role: "Lead Spatial Designer",
  scope: "Exterior Design, Landscape Design, Architectural Visualization",
  location: "Seoul, South Korea",
  description:
    "Cultural renewal project transforming a former oil depot into a contemporary public destination. Responsible for exterior design development, landscape planning, spatial composition, and architectural visualization.",
};

const portfolioCategories: PortfolioCategory[] = [
  {
    number: "01",
    title: "Architecture & Environmental Design",
    subtitle: "3 Projects",
    projects: [
      {
        id: "orbit",
        title: "Orbit Dome Theater",
        subtitle: orbitProjectData.type,
      },
      {
        id: "oil-depot",
        title: "Oil Depot Cultural Renewal",
        subtitle: oilDepotProjectData.type,
      },
      {
        id: "hanok-renewal",
        title: "Hanok Renewal",
        subtitle: "Architectural Visualization & Environment Design",
      },
    ],
  },
  {
    number: "02",
    title: "Exhibition & Spatial Design",
    subtitle: "13 Projects",
    projects: [
      {
        id: "singapore-nsc",
        title: "Singapore NSC Science Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "aquarium-science-center",
        title: "Aquarium Science Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "gangneung-metaverse-experience-center",
        title: "Gangneung Metaverse Experience Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "national-miryang-meteorological-science-museum",
        title: "Miryang National Meteorological Science Museum",
        subtitle: "Exhibition Design",
      },
      {
        id: "national-daegu-museum",
        title: "Daegu National Museum",
        subtitle: "Exhibition Design",
      },
      {
        id: "national-west-coast-climate-atmospheric-center",
        title: "National Seohaean Climate & Atmospheric Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "shinhan-bank-giheung-training-center",
        title: "Shinhan Bank Human Resources Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "geumsan-ginseng-experience-village",
        title: "Geumsan Ginseng Experience Village",
        subtitle: "Exhibition Design",
      },
      {
        id: "hongcheon-animal-sculpture-theme-park",
        title: "Hongcheon Animal Sculpture Theme Park",
        subtitle: "Exhibition Design",
      },
      {
        id: "jeju-seogwipo-citrus-museum",
        title: "Jeju Citrus Museum",
        subtitle: "Exhibition Design",
      },
      {
        id: "national-medicinal-plant-resource-center",
        title: "Jeju National Medicinal Resources Center",
        subtitle: "Exhibition Design",
      },
      {
        id: "korean-church-of-new-york",
        title: "New York Korean Church",
        subtitle: "Exhibition Design",
      },
      {
        id: "busan-motor-studio",
        title: "Busan Motor Studio",
        subtitle: "Exhibition Design",
      },
    ],
  },
  {
    number: "03",
    title: "Production Design",
    subtitle: "2 Projects",
    projects: [
      {
        id: "human",
        title: "Human",
        subtitle: "Production Design Concept",
      },
      {
        id: "the-last-24-hours",
        title: "The Last 24 Hours",
        subtitle: "Production Design Concept",
      },
    ],
  },
  {
    number: "04",
    title: "Interior Design",
    subtitle: "2 Projects",
    projects: [
      {
        id: "shinhan-bank-gwanghwamun-office-interior",
        title: "Shinhan Bank Gwanghwamun Branch",
        subtitle: "Interior Design",
      },
      {
        id: "cafe-interior",
        title: "Cafe Interior",
        subtitle: "Hospitality Interior Design",
      },
    ],
  },
  {
    number: "05",
    title: "Concept Visualization",
    subtitle: "Coming Soon",
    projects: [
      {
        id: "coming-soon-concept",
        title: "Coming Soon",
        subtitle: "Concept Visualization",
        comingSoon: true,
      },
    ],
  },
  {
    number: "06",
    title: "Design Explorations",
    subtitle: "2 Projects",
    projects: [
      {
        id: "furniture-design-study",
        title: "Furniture Design Study",
        subtitle: "Design Explorations",
      },
      {
        id: "graphic-installation-study",
        title: "Graphic Installation Study",
        subtitle: "Design Explorations",
      },
    ],
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

type Project = ProjectData;

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
  "26-0508 Orbyt Section.png",
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

const NSC_IMAGE_DIR = "/images/nsc science center";

const nscProjectImages = [
  "강연_001.png",
  "강연_002.png",
  "파티_003.png",
  "파티_005.png",
  "3_ph.png",
] as const;

type FolderGalleryProject = {
  title: string;
  imageDir: string;
  images: readonly string[];
  description?: string;
  year?: string;
  role?: string;
  location?: string;
};

const exhibitionFolderProjects: Record<string, FolderGalleryProject> = {
  "gangneung-metaverse-experience-center": {
    title: "Gangneung Metaverse Experience Center",
    imageDir: "/images/강릉 메타버스 체험관",
    year: "2023",
    role: "Spatial Designer",
    location: "Gangneung, South Korea",
    description:
      "Immersive exhibition space exploring digital technologies and metaverse experiences through interactive environments.",
    images: ["01.png", "02.png", "03.png"],
  },
  "national-miryang-meteorological-science-museum": {
    title: "Miryang National Meteorological Science Museum",
    imageDir: "/images/국립밀양기상과학관",
    year: "2024",
    role: "Spatial Designer",
    location: "Miryang, South Korea",
    description:
      "Science exhibition inspired by weather phenomena, combining educational content with immersive spatial experiences.",
    images: ["01.png", "02.png"],
  },
  "national-daegu-museum": {
    title: "Daegu National Museum",
    imageDir: "/images/국립대구박물관",
    year: "2023",
    role: "Spatial Designer",
    location: "Daegu, South Korea",
    description:
      "Interactive exhibition designed to introduce traditional Korean costume culture through hands-on learning experiences.",
    images: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
      "07.png",
    ],
  },
  "national-west-coast-climate-atmospheric-center": {
    title: "National Seohaean Climate & Atmospheric Center",
    imageDir: "/images/국립서해안기후대기센터",
    year: "2022",
    role: "Spatial Designer",
    location: "Hongseong, South Korea",
    description:
      "Outdoor exhibition environment designed to communicate climate science through interactive learning experiences.",
    images: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
      "07.png",
    ],
  },
  "geumsan-ginseng-experience-village": {
    title: "Geumsan Ginseng Experience Village",
    imageDir: "/images/금산뿌리깊은인삼체험마을",
    year: "2023",
    role: "Spatial Designer",
    location: "Geumsan, South Korea",
    description:
      "Interactive exhibition designed to promote Korean ginseng culture through educational content and hands-on visitor experiences.",
    images: ["01.png", "02.png", "03.png", "04.png"],
  },
  "korean-church-of-new-york": {
    title: "New York Korean Church",
    imageDir: "/images/뉴욕한인교회",
    year: "2023",
    role: "Spatial Designer",
    location: "New York, USA",
    description:
      "Exhibition space designed to present the history and cultural identity of the Korean community through spatial storytelling.",
    images: ["01.png", "02.png", "03.png"],
  },
  "national-medicinal-plant-resource-center": {
    title: "Jeju National Medicinal Resources Center",
    imageDir: "/images/제주국가생약자원관리센터",
    year: "2023",
    role: "Spatial Designer",
    location: "Jeju, South Korea",
    description:
      "Exhibition design showcasing Korea's medicinal plant resources through educational displays and immersive visitor experiences.",
    images: ["01.jpg", "02.png", "03.png"],
  },
  "jeju-seogwipo-citrus-museum": {
    title: "Jeju Citrus Museum",
    imageDir: "/images/제주서귀포감귤박물관",
    year: "2022",
    role: "Spatial Designer",
    location: "Jeju, South Korea",
    description:
      "Museum renewal project focused on interactive learning, family engagement, and the cultural heritage of Jeju citrus.",
    images: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "06.png",
    ],
  },
  "hongcheon-animal-sculpture-theme-park": {
    title: "Hongcheon Animal Sculpture Theme Park",
    imageDir: "/images/홍천동물조각테마파크",
    year: "2023 – 2024",
    role: "Spatial Designer",
    location: "Hongcheon, South Korea",
    description:
      "Outdoor thematic environment integrating animal sculptures, landscape design, and visitor-centered experiences.",
    images: [
      "01.png",
      "02.png",
      "03.png",
      "04.jpg",
      "05.png",
      "06.png",
    ],
  },
  "busan-motor-studio": {
    title: "Busan Motor Studio",
    imageDir: "/images/부산모터스튜디오",
    images: [
      "01.png",
      "02.png",
      "03.png",
      "04.png",
      "05.png",
      "21.png",
      "22.png",
      "23.png",
      "24.png",
      "25.png",
    ],
  },
  "shinhan-bank-giheung-training-center": {
    title: "Shinhan Bank Human Resources Center",
    imageDir: "/images/신한은행기흥연수원",
    year: "2022 – 2023",
    role: "Spatial Designer",
    location: "Yongin, South Korea",
    description:
      "Corporate exhibition space designed to communicate Shinhan Bank's history, values, and legacy through immersive visitor experiences.",
    images: [
      "1-1.jpg",
      "1-2.jpg",
      "1-3.jpg",
      "1-4.jpg",
      "1-5.jpg",
      "1-6.jpg",
      "1-7.jpg",
      "1-8.jpg",
      "1-9.jpg",
      "1-10.jpg",
      "2-1.png",
      "2-2.png",
      "2-3.png",
      "2-4.png",
      "2-5.png",
      "2-6.png",
      "2-7.png",
    ],
  },
};

const gwanghwamunInteriorProject: FolderGalleryProject = {
  title: "Shinhan Bank Gwanghwamun Branch",
  imageDir: "/images/신한은행광화문집무실",
  year: "2023",
  role: "Spatial Designer",
  location: "Seoul, South Korea",
  description:
    "Workplace exhibition and interior project designed to communicate corporate identity within an office environment.",
  images: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
};

const cafeInteriorProject: FolderGalleryProject = {
  title: "Cafe Interior",
  imageDir: "/images/cafe interior",
  images: ["01.jpg", "02.png", "03.png", "04.png"],
};

const DESIGN_EXPLORATIONS_IMAGE_DIR = "/images/design explorations";

const designExplorationProjects: Record<string, FolderGalleryProject> = {
  "furniture-design-study": {
    title: "Furniture Design Study",
    imageDir: DESIGN_EXPLORATIONS_IMAGE_DIR,
    description:
      "Experimental furniture design exploring structure, materiality, and ergonomic form through contemporary fabrication methods.",
    images: ["01.png"],
  },
  "graphic-installation-study": {
    title: "Graphic Installation Study",
    imageDir: DESIGN_EXPLORATIONS_IMAGE_DIR,
    description:
      "Visual and spatial exploration using graphic systems, transparency, layering, and physical composition.",
    images: ["02.png"],
  },
};

function getFolderImageSrc(imageDir: string, filename: string) {
  return publicImageSrc(imageDir, filename);
}

const FILM_STAGE_IMAGE_DIR = "/images/film stage set design";

type FilmStageProject = {
  slug: string;
  title: string;
  displayTitle?: string;
  subtitle: string;
  folder: string;
  category: string;
  thumbnail: string;
  paragraphs?: readonly string[];
  closingQuestion?: string;
  closingAnswer?: string;
  images: readonly string[];
  imageLabels?: readonly string[];
};

const filmStageProjects: FilmStageProject[] = [
  {
    slug: "human",
    folder: "01_human",
    title: "HUMAN",
    subtitle: "Production Design Concept",
    category: "Film & Stage Set Design",
    thumbnail: "01_letters.png",
    paragraphs: [
      "People live through people. People live through love.",
      "This project explores the emotional traces that remain in spaces long after people have left.",
      "Rather than focusing on characters, the story is told through environments. Each space represents a different aspect of human existence—love, memory, loss, hope, waiting, and connection. The architecture, objects, materials, and atmosphere become silent witnesses to human life.",
      "The series follows a journey through ten spaces, each preserving a fragment of human experience. An archive of undelivered letters speaks of longing. A frozen honeymoon home captures a love interrupted by time. Forgotten belongings, empty theaters, wedding photographs, and illuminated windows reveal how deeply human emotions become embedded within physical environments.",
      "Designed from a human-scale perspective, every scene emphasizes spatial storytelling through composition, materiality, light, and memory. The spaces are not simply backgrounds; they function as emotional landscapes that communicate the presence of people even in their absence.",
    ],
    closingQuestion: "What remains when people are gone?",
    closingAnswer:
      "The answer is found within the spaces they leave behind.",
    images: [
      "01_letters.png",
      "02_frozen.png",
      "03_forgotten.png",
      "04_goodbye.png",
      "05_applause.png",
      "06_missing.png",
      "07_promise.png",
      "08_hope.png",
      "09_waiting.png",
      "10_windows.png",
    ],
  },
  {
    slug: "the-last-24-hours",
    folder: "02_the last 24 hour",
    title: "THE LAST 24 HOURS",
    displayTitle: "The Last 24 Hours",
    subtitle: "PRODUCTION DESIGN CONCEPT",
    category: "Film Stage Set Design",
    thumbnail: "01_last_screening.png",
    paragraphs: [
      "A production design project exploring spaces during their final 24 hours before disappearance. Each environment captures the emotional traces left behind by people, revealing stories of memory, farewell, transition, and time through architectural storytelling.",
    ],
    imageLabels: [
      "Last Screening",
      "Final Class",
      "Last Train",
      "Closing Time",
      "Checkout",
      "Last Performance",
      "The Last Shift",
      "Empty Shelves",
      "Final Service",
      "The Last Wedding Hall",
      "The Lost Terminal",
      "The Last Dance",
    ],
    images: [
      "01_last_screening.png",
      "02_final_class.jpg",
      "03_last_train.png",
      "04_closing_time.jpg",
      "05_checkout.png",
      "06_last_performance.png",
      "07_the_last_shift.png",
      "08_empty_shelves.png",
      "09_final_service.png",
      "11_the_last_wedding_hall.png",
      "12_the_lost_terminal.jpg",
      "13_the_last_dance.jpg",
    ],
  },
];

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

const hanokRenewalSection = conceptVisualizationSections[1];
const aquariumScienceCenterSection = conceptVisualizationSections[0];

function publicImageSrc(baseDir: string, filename: string) {
  return `${baseDir}/${encodeURIComponent(filename)}`;
}

function getOrbitImageSrc(filename: string) {
  return publicImageSrc(ORBIT_IMAGE_DIR, filename);
}

function getConceptImageSrc(filename: string) {
  return publicImageSrc(CONCEPT_IMAGE_DIR, filename);
}

function getOilDepotImageSrc(filename: string) {
  return publicImageSrc(OIL_DEPOT_IMAGE_DIR, filename);
}

function getNscImageSrc(filename: string) {
  return publicImageSrc(NSC_IMAGE_DIR, filename);
}

function getFilmStageImageSrc(folder: string, filename: string) {
  return publicImageSrc(`${FILM_STAGE_IMAGE_DIR}/${folder}`, filename);
}

function getFilmStageThumbnailSrc(project: FilmStageProject) {
  return getFilmStageImageSrc(project.folder, project.thumbnail);
}

function getFilmStageCoverSrc() {
  return getFilmStageThumbnailSrc(filmStageProjects[0]);
}

function getCategoryThumbnailSrc(categoryNumber: string): string | null {
  switch (categoryNumber) {
    case "01":
      return getOrbitImageSrc(orbitProjectImages[0]);
    case "02":
      return getNscImageSrc(nscProjectImages[0]);
    case "03":
      return getFilmStageCoverSrc();
    case "04":
      return getFolderImageSrc(
        cafeInteriorProject.imageDir,
        cafeInteriorProject.images[0],
      );
    case "06":
      return getFolderImageSrc(DESIGN_EXPLORATIONS_IMAGE_DIR, "01.png");
    default:
      return null;
  }
}

function getSubProjectThumbnailSrc(projectId: PortfolioProjectId): string | null {
  switch (projectId) {
    case "orbit":
      return getOrbitImageSrc(orbitProjectImages[0]);
    case "oil-depot":
      return getOilDepotImageSrc(oilDepotProjectImages[0]);
    case "hanok-renewal":
      return getConceptImageSrc(hanokRenewalSection.images[0]);
    case "singapore-nsc":
      return getNscImageSrc(nscProjectImages[0]);
    case "aquarium-science-center":
      return getConceptImageSrc(aquariumScienceCenterSection.images[0]);
    case "human":
      return getFilmStageThumbnailSrc(
        filmStageProjects.find((project) => project.slug === "human")!,
      );
    case "the-last-24-hours":
      return getFilmStageThumbnailSrc(
        filmStageProjects.find((project) => project.slug === "the-last-24-hours")!,
      );
    case "shinhan-bank-gwanghwamun-office-interior":
      return getFolderImageSrc(
        gwanghwamunInteriorProject.imageDir,
        gwanghwamunInteriorProject.images[0],
      );
    case "cafe-interior":
      return getFolderImageSrc(
        cafeInteriorProject.imageDir,
        cafeInteriorProject.images[0],
      );
    default: {
      const designProject = designExplorationProjects[projectId];
      if (designProject) {
        return getFolderImageSrc(
          designProject.imageDir,
          designProject.images[0],
        );
      }
      const folderProject = exhibitionFolderProjects[projectId];
      if (folderProject) {
        return getFolderImageSrc(
          folderProject.imageDir,
          folderProject.images[0],
        );
      }
      return null;
    }
  }
}

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
      <article
        onClick={onSelect}
        className="group cursor-pointer py-2 transition-colors duration-300 sm:py-2.5 lg:py-3"
      >
        <div className="flex items-center gap-x-3 sm:gap-x-5 lg:gap-x-8">
          <span className="w-8 shrink-0 text-3xl font-light leading-none tracking-tighter text-black/15 transition-colors duration-300 group-hover:text-black/25 sm:w-10 sm:text-4xl lg:w-12 lg:text-5xl">
            {category.number}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-light tracking-tight text-black transition-transform duration-300 group-hover:translate-x-1 sm:whitespace-nowrap sm:text-2xl lg:text-3xl xl:text-4xl">
              {category.title}
            </h3>
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
      </article>
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

function CompactInteriorGallery({
  images,
  getImageSrc,
  onOpen,
}: {
  images: readonly string[];
  getImageSrc: (filename: string) => string;
  onOpen: (src: string) => void;
}) {
  const [hero, second, third, fourth] = images;

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {hero && <GalleryImage src={getImageSrc(hero)} onOpen={onOpen} />}

      {second && third && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <GalleryImage src={getImageSrc(second)} onOpen={onOpen} />
          <GalleryImage src={getImageSrc(third)} onOpen={onOpen} />
        </div>
      )}

      {fourth && <GalleryImage src={getImageSrc(fourth)} onOpen={onOpen} />}
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
}: {
  project: FilmStageProject;
  onSelect: (slug: string) => void;
}) {
  const hasThumbnail = project.images.length > 0;
  const thumbnailSrc = hasThumbnail
    ? getFilmStageThumbnailSrc(project)
    : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(project.slug)}
      className="group w-full cursor-pointer border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] sm:py-8"
    >
      <div className="grid grid-cols-[1fr_5.5rem] items-center gap-x-5 sm:grid-cols-[1fr_7rem] sm:gap-x-8 lg:grid-cols-[1fr_8.5rem]">
        <div className="min-w-0">
          <h4 className="text-xl font-light uppercase tracking-[0.18em] text-black transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl sm:tracking-[0.22em] lg:text-3xl">
            {project.title}
          </h4>
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
      <h4 className="mt-3 text-3xl font-light uppercase tracking-[0.2em] text-black sm:text-4xl sm:tracking-[0.25em] lg:text-5xl">
        {project.displayTitle ?? project.title}
      </h4>
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
  project: ProjectData;
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

function SingaporeProjectDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <SubsectionGallery
      images={nscProjectImages}
      getImageSrc={getNscImageSrc}
      onOpen={onOpen}
    />
  );
}

const EXHIBITION_CATEGORY_NUMBER = "02";
const PRODUCTION_CATEGORY_NUMBER = "03";

function ProductionDesignProjectList({
  onSelectProject,
}: {
  onSelectProject: (projectId: PortfolioProjectId) => void;
}) {
  return (
    <div className="border-t border-black/10">
      {filmStageProjects.map((project) => (
        <FilmStageProjectCard
          key={project.slug}
          project={project}
          onSelect={(slug) => onSelectProject(slug)}
        />
      ))}
    </div>
  );
}

function CategoryProjectListItem({
  project,
  onSelect,
}: {
  project: PortfolioProjectItem;
  onSelect: (id: PortfolioProjectId) => void;
}) {
  const thumbnailSrc = project.comingSoon
    ? null
    : getSubProjectThumbnailSrc(project.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className="group w-full cursor-pointer border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] sm:py-8"
    >
      <div className="grid grid-cols-[1fr_5.5rem] items-center gap-x-5 sm:grid-cols-[1fr_7rem] sm:gap-x-8 lg:grid-cols-[1fr_8.5rem]">
        <div className="min-w-0">
          <h4 className="text-xl font-light uppercase tracking-[0.18em] text-black transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl sm:tracking-[0.22em] lg:text-3xl">
            {project.title}
          </h4>
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
  onSelectProject,
}: {
  category: PortfolioCategory;
  onSelectProject: (id: PortfolioProjectId) => void;
}) {
  return (
    <div className="border-t border-black/10">
      {category.projects.map((project) => (
        <CategoryProjectListItem
          key={project.id}
          project={project}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}

function ExhibitionProjectCard({
  project,
  onSelect,
}: {
  project: PortfolioProjectItem;
  onSelect: (id: PortfolioProjectId) => void;
}) {
  const thumbnailSrc = project.comingSoon
    ? null
    : getSubProjectThumbnailSrc(project.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className="group flex h-full w-full cursor-pointer flex-col text-left transition-colors duration-300 hover:bg-black/[0.015]"
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

      <div className="flex h-[5.25rem] shrink-0 flex-col justify-start pt-4 sm:h-[5.75rem] sm:pt-5">
        <h4 className="line-clamp-2 text-sm font-light uppercase leading-snug tracking-[0.16em] text-black transition-transform duration-300 group-hover:translate-x-0.5 sm:text-base sm:tracking-[0.18em] lg:text-lg lg:tracking-[0.2em]">
          {project.title}
        </h4>
        <p className="mt-auto line-clamp-1 pt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-black/45 transition-colors duration-300 group-hover:text-black/60">
          {project.subtitle}
        </p>
      </div>
    </button>
  );
}

function ExhibitionProjectGrid({
  category,
  onSelectProject,
}: {
  category: PortfolioCategory;
  onSelectProject: (id: PortfolioProjectId) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {category.projects.map((project) => (
        <ExhibitionProjectCard
          key={project.id}
          project={project}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}

function CafeInteriorDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  const getImageSrc = (filename: string) =>
    getFolderImageSrc(cafeInteriorProject.imageDir, filename);

  return (
    <>
      <h4 className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
        {cafeInteriorProject.title}
      </h4>
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <CompactInteriorGallery
          images={cafeInteriorProject.images}
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
  onOpen,
}: {
  project: FolderGalleryProject;
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
      <h4 className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
        {project.title}
      </h4>
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

function HanokRenewalDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <h4 className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
        {hanokRenewalSection.title}
      </h4>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
        {hanokRenewalSection.description}
      </p>
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <SubsectionGallery
          images={hanokRenewalSection.images}
          getImageSrc={getConceptImageSrc}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}

function AquariumScienceCenterDetails({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <>
      <h4 className="text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl">
        {aquariumScienceCenterSection.title}
      </h4>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
        {aquariumScienceCenterSection.description}
      </p>
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <SubsectionGallery
          images={aquariumScienceCenterSection.images}
          getImageSrc={getConceptImageSrc}
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
      return <HanokRenewalDetails onOpen={onOpen} />;
    case "singapore-nsc":
      return <SingaporeProjectDetails onOpen={onOpen} />;
    case "aquarium-science-center":
      return <AquariumScienceCenterDetails onOpen={onOpen} />;
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
          onOpen={onOpen}
        />
      );
    case "cafe-interior":
      return <CafeInteriorDetails onOpen={onOpen} />;
    case "coming-soon-concept":
      return (
        <p className="mt-12 text-sm font-light text-black/45 sm:mt-16">
          Coming soon.
        </p>
      );
    default: {
      const designProject = designExplorationProjects[projectId];
      if (designProject) {
        return (
          <FolderGalleryDetails project={designProject} onOpen={onOpen} />
        );
      }
      const folderProject = exhibitionFolderProjects[projectId];
      if (folderProject) {
        return (
          <FolderGalleryDetails project={folderProject} onOpen={onOpen} />
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

function PortfolioHomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to portfolio home"
      className="fixed left-6 top-6 z-[60] text-black/45 transition-all duration-300 hover:scale-105 hover:text-black/75 sm:left-12 lg:left-24"
    >
      <HomeIcon className="h-5 w-5" />
    </button>
  );
}

function WorkPortfolioSection() {
  const [workView, setWorkView] = useState<
    | { level: "categories" }
    | { level: "projects"; categoryNumber: string }
    | { level: "detail"; categoryNumber: string; projectId: string }
  >({ level: "categories" });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const workViewTopRef = useRef<HTMLDivElement>(null);

  const activeCategory = portfolioCategories.find(
    (category) =>
      workView.level !== "categories" &&
      category.number === workView.categoryNumber,
  );

  const activeProject =
    activeCategory && workView.level === "detail"
      ? activeCategory.projects.find(
          (project) => project.id === workView.projectId,
        )
      : undefined;

  const goToCategories = () => {
    setWorkView({ level: "categories" });
    setActiveImage(null);
  };

  const goHome = () => {
    goToCategories();
    if (window.location.pathname !== "/" || window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  const goToProjects = (categoryNumber: string) => {
    setWorkView({ level: "projects", categoryNumber });
    setActiveImage(null);
  };

  useEffect(() => {
    scrollToWorkViewTop(workViewTopRef.current);
  }, [workView]);

  return (
    <section
      id="work"
      className="px-6 py-16 sm:px-12 sm:py-20 lg:px-24 lg:py-24"
    >
      <div ref={workViewTopRef} className="mx-auto w-full max-w-7xl">
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
              <h2 className="mt-3 text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl">
                {activeCategory.title}
              </h2>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40">
                {activeCategory.subtitle}
              </p>
            </div>
            <div className="mt-12 sm:mt-16">
              {activeCategory.number === EXHIBITION_CATEGORY_NUMBER ? (
                <ExhibitionProjectGrid
                  category={activeCategory}
                  onSelectProject={(projectId) =>
                    setWorkView({
                      level: "detail",
                      categoryNumber: activeCategory.number,
                      projectId,
                    })
                  }
                />
              ) : activeCategory.number === PRODUCTION_CATEGORY_NUMBER ? (
                <ProductionDesignProjectList
                  onSelectProject={(projectId) =>
                    setWorkView({
                      level: "detail",
                      categoryNumber: activeCategory.number,
                      projectId,
                    })
                  }
                />
              ) : (
                <CategoryProjectList
                  category={activeCategory}
                  onSelectProject={(projectId) =>
                    setWorkView({
                      level: "detail",
                      categoryNumber: activeCategory.number,
                      projectId,
                    })
                  }
                />
              )}
            </div>
          </>
        )}

        {workView.level === "detail" && activeCategory && activeProject && (
          <>
            <PortfolioHomeButton onClick={goHome} />
            <button
              type="button"
              onClick={() => goToProjects(activeCategory.number)}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 transition-colors duration-300 hover:text-black/70"
            >
              {activeCategory.number === PRODUCTION_CATEGORY_NUMBER
                ? "← All Film Projects"
                : `← All ${activeCategory.title}`}
            </button>
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <PortfolioProjectDetail
                projectId={workView.projectId}
                project={activeProject}
                onOpen={setActiveImage}
              />
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

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

      <WorkPortfolioSection />

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
