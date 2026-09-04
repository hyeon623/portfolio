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
} from "./components/bilingual";

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

type ProjectData = {
  number: string;
  title: string;
  type: string;
  typeKo?: string;
  year: string | null;
  role: string | null;
  roleKo?: string;
  scope: string | null;
  scopeKo?: string;
  location: string | null;
  locationKo?: string;
  description: string | null;
  descriptionKo?: string | null;
};

type PortfolioProjectId = string;

type PortfolioProjectItem = {
  id: PortfolioProjectId;
  title: string;
  titleKo?: string;
  subtitle: string;
  subtitleKo?: string;
  comingSoon?: boolean;
};

type PortfolioCategory = {
  number: string;
  title: string;
  titleKo?: string;
  subtitle: string;
  projects: PortfolioProjectItem[];
};

const CATEGORY_TITLE_KO: Record<string, string> = {
  "01": "건축 및 환경 디자인",
  "02": "전시공간 디자인",
  "03": "프로덕션 디자인",
  "04": "인테리어 디자인",
  "05": "컨셉 비주얼라이제이션",
  "06": "디자인 탐구",
};

const PROJECT_TITLE_KO: Record<string, string> = {
  orbit: "올빗 돔 시어터 프로젝트",
  "oil-depot": "문화비축기지 리뉴얼",
  "hanok-renewal": "한옥 리뉴얼",
  "singapore-nsc": "싱가포르 NSC 과학관",
  "gangneung-metaverse-experience-center": "강릉 메타버스 체험관",
  "national-miryang-meteorological-science-museum": "밀양 국립기상과학관",
  "national-daegu-museum": "국립대구박물관",
  "national-west-coast-climate-atmospheric-center": "국립서해안기후대기센터",
  "shinhan-bank-giheung-training-center": "신한은행 인재개발원",
  "geumsan-ginseng-experience-village": "금산 뿌리깊은 인삼체험마을",
  "hongcheon-animal-sculpture-theme-park": "홍천 동물조각테마파크",
  "jeju-seogwipo-citrus-museum": "제주 감귤박물관",
  "national-medicinal-plant-resource-center": "제주 국가생약자원관리센터",
  "korean-church-of-new-york": "뉴욕 한인교회",
  "busan-motor-studio": "부산 모터스튜디오",
  human: "휴먼",
  "the-last-24-hours": "마지막 24시간",
  "residential-interior-design": "주거공간 인테리어 디자인",
  "residential-interior-design-2": "주거 공간 디자인",
  "cafe-interior": "카페 인테리어",
  "shinhan-bank-gwanghwamun-office-interior": "신한은행 광화문 지점",
  "aquarium-science-center": "아쿠아리움 과학관",
  "stage-design-concept": "무대 디자인 컨셉",
  "furniture-design-study": "가구 디자인 연구",
  "graphic-installation-study": "그래픽 설치 연구",
};

function getTitleKo(id: string, titleKo?: string) {
  return titleKo ?? PROJECT_TITLE_KO[id];
}

function getCategoryTitleKo(category: PortfolioCategory) {
  return category.titleKo ?? CATEGORY_TITLE_KO[category.number];
}

const SUBTITLE_KO: Record<string, string> = {
  "Exhibition & Immersive Design": "전시 및 몰입형 디자인",
  "Architectural & Exhibition Renewal": "건축 및 전시 리뉴얼",
  "Architectural Visualization & Environment Design":
    "건축 시각화 및 환경 디자인",
  "Exhibition Design": "전시 디자인",
  "Production Design Concept": "프로덕션 디자인 컨셉",
  "Concept Visualization": "컨셉 비주얼라이제이션",
  "Design Explorations": "디자인 탐구",
  "Interior Design": "인테리어 디자인",
};

function getSubtitleKo(subtitle: string, subtitleKo?: string) {
  return subtitleKo ?? SUBTITLE_KO[subtitle];
}

const orbitProjectData: ProjectData = {
  number: "01",
  title: "Orbit Dome Theater",
  type: "Exhibition & Immersive Design",
  typeKo: "전시 및 몰입형 디자인",
  year: "2024 - Present",
  role: "Lead Spatial Designer",
  roleKo: "공간 디자인 리드",
  scope: "Exterior Design, Landscape Design, Architectural Visualization",
  scopeKo: "외관 디자인, 조경 설계, 건축 시각화",
  location: "South Korea",
  locationKo: "대한민국",
  description:
    "Immersive dome theater project developed for cultural and educational experiences. Responsible for architectural exterior design, landscape planning, spatial design and visualization.",
  descriptionKo:
    "문화와 교육 경험을 위한 몰입형 돔 극장 프로젝트. 건축 외관 디자인, 조경 계획, 공간 디자인 및 시각화를 담당하였습니다.",
};

const oilDepotProjectData: ProjectData = {
  number: "04",
  title: "Oil Depot Renewal",
  type: "Architectural & Exhibition Renewal",
  typeKo: "건축 및 전시 리뉴얼",
  year: "2024",
  role: "Lead Spatial Designer",
  roleKo: "공간 디자인 리드",
  scope: "Exterior Design, Landscape Design, Architectural Visualization",
  scopeKo: "외관 디자인, 조경 설계, 건축 시각화",
  location: "Seoul, South Korea",
  locationKo: "대한민국 서울",
  description:
    "Cultural renewal project transforming a former oil depot into a contemporary public destination. Responsible for exterior design development, landscape planning, spatial composition, and architectural visualization.",
  descriptionKo:
    "문화비축기지를 현대적 공공 공간으로 전환하는 문화 리뉴얼 프로젝트. 외관 디자인, 조경 계획, 공간 구성 및 건축 시각화를 담당하였습니다.",
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
        title: "Oil Depot Renewal",
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
    subtitle: "12 Projects",
    projects: [
      {
        id: "singapore-nsc",
        title: "Singapore NSC Science Center",
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
    subtitle: "4 Projects",
    projects: [
      {
        id: "residential-interior-design",
        title: "Residential Interior Design",
        subtitle: "Contemporary Living Space",
      },
      {
        id: "residential-interior-design-2",
        title: "Residential Interior Design",
        titleKo: "주거 공간 디자인",
        subtitle: "Residential Space Design",
      },
      {
        id: "cafe-interior",
        title: "Cafe Interior",
        subtitle: "Hospitality Interior Design",
      },
      {
        id: "shinhan-bank-gwanghwamun-office-interior",
        title: "Shinhan Bank Gwanghwamun Office",
        subtitle: "Interior Design",
      },
    ],
  },
  {
    number: "05",
    title: "Concept Visualization",
    subtitle: "2 Projects",
    projects: [
      {
        id: "aquarium-science-center",
        title: "Aquarium Science Center",
        subtitle: "Concept Visualization",
      },
      {
        id: "stage-design-concept",
        title: "Stage Design Concept",
        subtitle: "Concept Visualization",
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
    roleKo: "공간 디자이너",
    company: "Bauer Lab",
    companyKo: "바우어랩",
  },
  {
    period: "2022 – 2024",
    role: "Exhibition Spatial Designer",
    roleKo: "전시 공간 디자이너",
    company: "Design Feed",
    companyKo: "디자인피드",
  },
  {
    period: "2021 – 2022",
    role: "Freelance Spatial Designer",
    roleKo: "프리랜스 공간 디자이너",
    company: null,
    companyKo: null,
  },
];

const aboutParagraphs = [
  {
    en: "KIM DONG HYEON is a spatial designer based in Seoul, South Korea.",
    ko: "저는 서울을 기반으로 활동하는 공간 디자이너입니다.",
  },
  {
    en: "His work focuses on exhibition design, spatial experiences, architectural concepts, and visual communication.",
    ko: "전시 디자인, 공간 경험, 건축 컨셉, 비주얼 커뮤니케이션을 중심으로 작업합니다.",
  },
  {
    en: "With professional experience across museums, cultural institutions, educational facilities, and commercial environments, he develops design solutions that connect people, space, and narrative.",
    ko: "박물관, 문화 기관, 교육 시설, 상업 공간 등 다양한 환경에서 사람과 공간, 이야기를 연결하는 디자인 솔루션을 개발해 왔습니다.",
  },
  {
    en: "He believes that space is more than a physical environment—it is a medium that shapes experiences, emotions, and human interaction.",
    ko: "공간은 단순한 물리적 환경을 넘어, 경험과 감정, 인간 관계를 형성하는 매체라고 믿습니다.",
  },
] as const;

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
  titleKo?: string;
  imageDir: string;
  images: readonly string[];
  description?: string;
  descriptionKo?: string;
  year?: string;
  role?: string;
  roleKo?: string;
  location?: string;
  locationKo?: string;
};

const exhibitionFolderProjects: Record<string, FolderGalleryProject> = {
  "gangneung-metaverse-experience-center": {
    title: "Gangneung Metaverse Experience Center",
    imageDir: "/images/강릉 메타버스 체험관",
    year: "2023",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "Gangneung, South Korea",
    locationKo: "대한민국 강릉",
    description:
      "Immersive exhibition space exploring digital technologies and metaverse experiences through interactive environments.",
    descriptionKo:
      "디지털 기술과 메타버스 경험을 인터랙티브 환경을 통해 탐구하는 몰입형 전시 공간입니다.",
    images: ["01.png", "02.png", "03.png"],
  },
  "national-miryang-meteorological-science-museum": {
    title: "Miryang National Meteorological Science Museum",
    imageDir: "/images/국립밀양기상과학관",
    year: "2024",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "Miryang, South Korea",
    locationKo: "대한민국 밀양",
    description:
      "Science exhibition inspired by weather phenomena, combining educational content with immersive spatial experiences.",
    descriptionKo:
      "기상 현상에서 영감을 받은 과학 전시로, 교육 콘텐츠와 몰입형 공간 경험을 결합하였습니다.",
    images: ["01.png", "02.png"],
  },
  "national-daegu-museum": {
    title: "Daegu National Museum",
    titleKo: "국립대구박물관",
    imageDir: "/images/국립대구박물관",
    year: "2023",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "Daegu, South Korea",
    locationKo: "대한민국 대구",
    description:
      "Interactive exhibition designed to introduce traditional Korean costume culture through hands-on learning experiences.",
    descriptionKo:
      "전통 한국 의복 문화를 체험형 학습을 통해 소개하는 인터랙티브 전시입니다.",
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
    roleKo: "공간 디자이너",
    location: "Hongseong, South Korea",
    locationKo: "대한민국 홍성",
    description:
      "Outdoor exhibition environment designed to communicate climate science through interactive learning experiences.",
    descriptionKo:
      "기후 과학을 인터랙티브 학습 경험을 통해 전달하는 야외 전시 환경입니다.",
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
    roleKo: "공간 디자이너",
    location: "Geumsan, South Korea",
    locationKo: "대한민국 금산",
    description:
      "Interactive exhibition designed to promote Korean ginseng culture through educational content and hands-on visitor experiences.",
    descriptionKo:
      "한국 인삼 문화를 교육 콘텐츠와 체험형 전시를 통해 알리는 인터랙티브 전시입니다.",
    images: ["01.png", "02.png", "03.png", "04.png"],
  },
  "korean-church-of-new-york": {
    title: "New York Korean Church",
    imageDir: "/images/뉴욕한인교회",
    year: "2023",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "New York, USA",
    locationKo: "미국 뉴욕",
    description:
      "Exhibition space designed to present the history and cultural identity of the Korean community through spatial storytelling.",
    descriptionKo:
      "한인 커뮤니티의 역사와 문화적 정체성을 공간적 스토리텔링으로 전달하는 전시 공간입니다.",
    images: ["01.png", "02.png", "03.png"],
  },
  "national-medicinal-plant-resource-center": {
    title: "Jeju National Medicinal Resources Center",
    imageDir: "/images/제주국가생약자원관리센터",
    year: "2023",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "Jeju, South Korea",
    locationKo: "대한민국 제주",
    description:
      "Exhibition design showcasing Korea's medicinal plant resources through educational displays and immersive visitor experiences.",
    descriptionKo:
      "국가 생약 자원을 교육 전시와 몰입형 관람 경험을 통해 소개하는 전시 디자인입니다.",
    images: ["01.jpg", "02.png", "03.png"],
  },
  "jeju-seogwipo-citrus-museum": {
    title: "Jeju Citrus Museum",
    imageDir: "/images/제주서귀포감귤박물관",
    year: "2022",
    role: "Spatial Designer",
    roleKo: "공간 디자이너",
    location: "Jeju, South Korea",
    locationKo: "대한민국 제주",
    description:
      "Museum renewal project focused on interactive learning, family engagement, and the cultural heritage of Jeju citrus.",
    descriptionKo:
      "인터랙티브 학습, 가족 참여, 제주 감귤 문화유산을 중심으로 한 박물관 리뉴얼 프로젝트입니다.",
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
    roleKo: "공간 디자이너",
    location: "Hongcheon, South Korea",
    locationKo: "대한민국 홍천",
    description:
      "Outdoor thematic environment integrating animal sculptures, landscape design, and visitor-centered experiences.",
    descriptionKo:
      "동물 조각, 조경 디자인, 관람객 중심 경험을 통합한 야외 테마 환경입니다.",
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
    roleKo: "공간 디자이너",
    location: "Yongin, South Korea",
    locationKo: "대한민국 용인",
    description:
      "Corporate exhibition space designed to communicate Shinhan Bank's history, values, and legacy through immersive visitor experiences.",
    descriptionKo:
      "신한은행의 역사, 가치, 유산을 몰입형 관람 경험을 통해 전달하는 기업 전시 공간입니다.",
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
  titleKo: "신한은행 광화문 지점",
  imageDir: "/images/신한은행광화문집무실",
  year: "2023",
  role: "Spatial Designer",
  roleKo: "공간 디자이너",
  location: "Seoul, South Korea",
  locationKo: "대한민국 서울",
  description:
    "Workplace exhibition and interior project designed to communicate corporate identity within an office environment.",
  descriptionKo:
    "사무 환경 속에서 기업 아이덴티티를 전달하는 직장 전시 및 인테리어 프로젝트입니다.",
  images: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
};

const cafeInteriorProject: FolderGalleryProject = {
  title: "Cafe Interior",
  titleKo: "카페 인테리어",
  imageDir: "/images/cafe interior",
  images: ["01.jpg", "02.png", "03.png", "04.png"],
};

const RESIDENTIAL_INTERIOR_IMAGE_DIR = "/images/residential interior design";

const residentialInteriorProject: FolderGalleryProject = {
  title: "Residential Interior Design",
  titleKo: "주거공간 인테리어 디자인",
  imageDir: RESIDENTIAL_INTERIOR_IMAGE_DIR,
  images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"],
};

const residentialInteriorProject2: FolderGalleryProject = {
  title: "Residential Interior Design",
  titleKo: "주거 공간 디자인",
  imageDir: RESIDENTIAL_INTERIOR_IMAGE_DIR,
  images: ["9.png", "10.png", "11.png", "12.png", "13.png"],
};

const DESIGN_EXPLORATIONS_IMAGE_DIR = "/images/design explorations";

const designExplorationProjects: Record<string, FolderGalleryProject> = {
  "furniture-design-study": {
    title: "Furniture Design Study",
    imageDir: DESIGN_EXPLORATIONS_IMAGE_DIR,
    description:
      "Experimental furniture design exploring structure, materiality, and ergonomic form through contemporary fabrication methods.",
    descriptionKo:
      "구조, 재료성, 인체공학적 형태를 현대적 제작 방식으로 탐구하는 가구 디자인 실험입니다.",
    images: ["01.png"],
  },
  "graphic-installation-study": {
    title: "Graphic Installation Study",
    imageDir: DESIGN_EXPLORATIONS_IMAGE_DIR,
    description:
      "Visual and spatial exploration using graphic systems, transparency, layering, and physical composition.",
    descriptionKo:
      "그래픽 시스템, 투명성, 레이어링, 물리적 구성을 활용한 시각·공간 탐구입니다.",
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
  subtitleKo?: string;
  folder: string;
  category: string;
  categoryKo?: string;
  thumbnail: string;
  paragraphs?: readonly string[];
  paragraphsKo?: readonly string[];
  closingQuestion?: string;
  closingQuestionKo?: string;
  closingAnswer?: string;
  closingAnswerKo?: string;
  images: readonly string[];
  imageLabels?: readonly string[];
};

const filmStageProjects: FilmStageProject[] = [
  {
    slug: "human",
    folder: "01_human",
    title: "HUMAN",
    subtitle: "Production Design Concept",
    subtitleKo: "프로덕션 디자인 컨셉",
    category: "Film & Stage Set Design",
    categoryKo: "영화 및 무대 세트 디자인",
    thumbnail: "01_letters.png",
    paragraphs: [
      "People live through people. People live through love.",
      "This project explores the emotional traces that remain in spaces long after people have left.",
      "Rather than focusing on characters, the story is told through environments. Each space represents a different aspect of human existence—love, memory, loss, hope, waiting, and connection. The architecture, objects, materials, and atmosphere become silent witnesses to human life.",
      "The series follows a journey through ten spaces, each preserving a fragment of human experience. An archive of undelivered letters speaks of longing. A frozen honeymoon home captures a love interrupted by time. Forgotten belongings, empty theaters, wedding photographs, and illuminated windows reveal how deeply human emotions become embedded within physical environments.",
      "Designed from a human-scale perspective, every scene emphasizes spatial storytelling through composition, materiality, light, and memory. The spaces are not simply backgrounds; they function as emotional landscapes that communicate the presence of people even in their absence.",
    ],
    paragraphsKo: [
      "사람은 사람을 통해, 사랑을 통해 살아갑니다.",
      "이 프로젝트는 사람들이 떠난 후에도 공간에 남아 있는 감정의 흔적을 탐구합니다.",
      "인물보다 환경을 통해 이야기를 전달합니다. 각 공간은 사랑, 기억, 상실, 희망, 기다림, 연결 등 인간 존재의 다른 측면을 나타냅니다. 건축, 사물, 재료, 분위기는 인간 삶의 조용한 증인이 됩니다.",
      "열 개의 공간을 거치는 여정을 따라, 각각은 인간 경험의 한 조각을 간직합니다. 전달되지 못한 편지의 아카이브는 그리움을, 시간에 멈춘 신혼집은 사랑을, 잊힌 소지품과 빈 극장, 웨딩 사진, 불 켜진 창문은 감정이 물리적 환경에 얼마나 깊이 새겨지는지 보여줍니다.",
      "인간 규모의 시점에서 설계된 모든 장면은 구도, 재료성, 빛, 기억을 통한 공간적 스토리텔링을 강조합니다. 공간은 단순한 배경이 아니라, 부재 속에서도 사람의 존재를 전달하는 감정적 풍경입니다.",
    ],
    closingQuestion: "What remains when people are gone?",
    closingQuestionKo: "사람이 사라진 후에도 무엇이 남을까?",
    closingAnswer:
      "The answer is found within the spaces they leave behind.",
    closingAnswerKo: "그 답은 그들이 남긴 공간 속에서 찾을 수 있습니다.",
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
    subtitleKo: "프로덕션 디자인 컨셉",
    category: "Film Stage Set Design",
    categoryKo: "영화 무대 세트 디자인",
    thumbnail: "01_last_screening.png",
    paragraphs: [
      "A production design project exploring spaces during their final 24 hours before disappearance. Each environment captures the emotional traces left behind by people, revealing stories of memory, farewell, transition, and time through architectural storytelling.",
    ],
    paragraphsKo: [
      "소멸 직전 마지막 24시간의 공간을 탐구하는 프로덕션 디자인 프로젝트. 각 환경은 사람들이 남긴 감정의 흔적을 담아, 기억, 이별, 전환, 시간의 이야기를 건축적 스토리텔링으로 전달합니다.",
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

const HANOK_IMAGE_DIR = "/images/hanok";
const AQUARIUM_CONCEPT_IMAGE_DIR =
  "/images/concept visualization works/acuarium";
const STAGE_CONCEPT_IMAGE_DIR = "/images/concept visualization works/stage";

const hanokRenewalProject: FolderGalleryProject = {
  title: "Hanok Renewal",
  titleKo: "한옥 리뉴얼",
  imageDir: HANOK_IMAGE_DIR,
  description:
    "Concept design and visualization study exploring the renewal and adaptive reuse of traditional Korean architectural heritage. Focused on spatial atmosphere, cultural identity, architectural preservation, and contemporary interpretation.",
  descriptionKo:
    "전통 한국 건축 유산의 리뉴얼과 적응적 재생을 탐구하는 컨셉 디자인 및 시각화 연구. 공간적 분위기, 문화적 정체성, 건축 보존, 현대적 해석에 중점을 두었습니다.",
  images: ["b1.png", "b2.png", "b3.png", "b4.png", "b5.png"],
};

const conceptVisualizationProjects: Record<string, FolderGalleryProject> = {
  "aquarium-science-center": {
    title: "Aquarium Science Center",
    imageDir: AQUARIUM_CONCEPT_IMAGE_DIR,
    description:
      "Concept design and visualization studies for an immersive aquarium and science center environment.",
    descriptionKo:
      "몰입형 아쿠아리움 및 과학관 환경을 위한 컨셉 디자인 및 시각화 연구입니다.",
    images: ["a1.png", "a2.png", "a3.png"],
  },
  "stage-design-concept": {
    title: "Stage Design Concept",
    imageDir: STAGE_CONCEPT_IMAGE_DIR,
    description:
      "Concept visualization exploring stage environments through spatial composition, lighting, and narrative atmosphere.",
    descriptionKo:
      "공간 구성, 조명, 서사적 분위기를 통해 무대 환경을 탐구하는 컨셉 시각화입니다.",
    images: ["1.PNG", "2.PNG", "3.PNG"],
  },
};

function publicImageSrc(baseDir: string, filename: string) {
  return `${baseDir}/${encodeURIComponent(filename)}`;
}

function getOrbitImageSrc(filename: string) {
  return publicImageSrc(ORBIT_IMAGE_DIR, filename);
}

function getHanokImageSrc(filename: string) {
  return publicImageSrc(HANOK_IMAGE_DIR, filename);
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
      return getFolderImageSrc(RESIDENTIAL_INTERIOR_IMAGE_DIR, "1.png");
    case "05":
      return getFolderImageSrc(AQUARIUM_CONCEPT_IMAGE_DIR, "a1.png");
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
      return getHanokImageSrc(hanokRenewalProject.images[0]);
    case "singapore-nsc":
      return getNscImageSrc(nscProjectImages[0]);
    case "aquarium-science-center":
      return getFolderImageSrc(
        conceptVisualizationProjects["aquarium-science-center"].imageDir,
        conceptVisualizationProjects["aquarium-science-center"].images[0],
      );
    case "stage-design-concept":
      return getFolderImageSrc(
        conceptVisualizationProjects["stage-design-concept"].imageDir,
        conceptVisualizationProjects["stage-design-concept"].images[0],
      );
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
    case "residential-interior-design":
      return getFolderImageSrc(
        residentialInteriorProject.imageDir,
        residentialInteriorProject.images[0],
      );
    case "residential-interior-design-2":
      return getFolderImageSrc(
        residentialInteriorProject2.imageDir,
        residentialInteriorProject2.images[0],
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
      className={`group w-full cursor-pointer border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] sm:py-8 ${
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
      className={`group w-full cursor-pointer border-b border-black/10 py-6 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.015] sm:py-8 ${
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
      className={`group flex h-full w-full cursor-pointer flex-col text-left transition-colors duration-300 hover:bg-black/[0.015] ${
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
}: {
  onBack: () => void;
  onHome: () => void;
}) {
  const buttonClassName =
    "text-black/45 transition-all duration-300 hover:scale-105 hover:text-black/75";

  return (
    <div className="fixed left-6 top-6 z-[60] flex items-center gap-3 sm:left-12 sm:gap-4 lg:left-24">
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

function WorkPortfolioSection() {
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
      className="px-6 py-16 sm:px-12 sm:py-20 lg:px-24 lg:py-24"
    >
      <div ref={workViewTopRef} className="mx-auto w-full max-w-7xl">
        {workView.level !== "categories" && (
          <PortfolioDetailNav onBack={goBack} onHome={goHome} />
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

export default function Home() {
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

      <section
        id="about"
        className="border-t border-black/10 px-6 py-40 sm:px-12 sm:py-48 lg:px-24 lg:py-56"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]">
            About
          </h2>
          <div className="mt-14 max-w-3xl space-y-8 sm:mt-16 sm:space-y-10 lg:mt-20 lg:space-y-12">
            {aboutParagraphs.map((paragraph) => (
              <BilingualParagraph
                key={paragraph.en}
                text={paragraph.en}
                textKo={paragraph.ko}
                variant="md"
              />
            ))}
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
