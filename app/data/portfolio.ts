/** Shared portfolio data + image helpers (desktop & mobile). */

export type ProjectData = {
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

export type PortfolioProjectId = string;

export type PortfolioProjectItem = {
  id: PortfolioProjectId;
  title: string;
  titleKo?: string;
  subtitle: string;
  subtitleKo?: string;
  comingSoon?: boolean;
};

export type PortfolioCategory = {
  number: string;
  title: string;
  titleKo?: string;
  subtitle: string;
  projects: PortfolioProjectItem[];
};

export const CATEGORY_TITLE_KO: Record<string, string> = {
  "01": "건축 및 환경 디자인",
  "02": "전시공간 디자인",
  "03": "프로덕션 디자인",
  "04": "인테리어 디자인",
  "05": "컨셉 비주얼라이제이션",
  "06": "디자인 탐구",
};

export const PROJECT_TITLE_KO: Record<string, string> = {
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

export function getTitleKo(id: string, titleKo?: string) {
  return titleKo ?? PROJECT_TITLE_KO[id];
}

export function getCategoryTitleKo(category: PortfolioCategory) {
  return category.titleKo ?? CATEGORY_TITLE_KO[category.number];
}

export const SUBTITLE_KO: Record<string, string> = {
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

export function getSubtitleKo(subtitle: string, subtitleKo?: string) {
  return subtitleKo ?? SUBTITLE_KO[subtitle];
}

export const orbitProjectData: ProjectData = {
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

export const oilDepotProjectData: ProjectData = {
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

export const portfolioCategories: PortfolioCategory[] = [
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

export const experience = [
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

export const aboutParagraphs = [
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

export type Project = ProjectData;

export const ORBIT_IMAGE_DIR = "/images/orbit";

export const orbitMosaicColSpans = [
  "w-full sm:col-span-2 lg:col-span-8",
  "w-full lg:col-span-4",
  "w-full lg:col-span-5",
  "w-full lg:col-span-7",
  "w-full lg:col-span-4",
  "w-full lg:col-span-8",
] as const;

export const orbitProjectImages = [
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

export const OIL_DEPOT_IMAGE_DIR = "/images/oil depot cultural renewal";

export const oilDepotProjectImages = [
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

export const NSC_IMAGE_DIR = "/images/nsc science center";

export const nscProjectImages = [
  "강연_001.png",
  "강연_002.png",
  "파티_003.png",
  "파티_005.png",
  "3_ph.png",
] as const;

export type FolderGalleryProject = {
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

export const exhibitionFolderProjects: Record<string, FolderGalleryProject> = {
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

export const gwanghwamunInteriorProject: FolderGalleryProject = {
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

export const cafeInteriorProject: FolderGalleryProject = {
  title: "Cafe Interior",
  titleKo: "카페 인테리어",
  imageDir: "/images/cafe interior",
  images: ["01.jpg", "02.png", "03.png", "04.png"],
};

export const RESIDENTIAL_INTERIOR_IMAGE_DIR = "/images/residential interior design";

export const residentialInteriorProject: FolderGalleryProject = {
  title: "Residential Interior Design",
  titleKo: "주거공간 인테리어 디자인",
  imageDir: RESIDENTIAL_INTERIOR_IMAGE_DIR,
  images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"],
};

export const residentialInteriorProject2: FolderGalleryProject = {
  title: "Residential Interior Design",
  titleKo: "주거 공간 디자인",
  imageDir: RESIDENTIAL_INTERIOR_IMAGE_DIR,
  images: ["9.png", "10.png", "11.png", "12.png", "13.png"],
};

export const DESIGN_EXPLORATIONS_IMAGE_DIR = "/images/design explorations";

export const designExplorationProjects: Record<string, FolderGalleryProject> = {
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

export function getFolderImageSrc(imageDir: string, filename: string) {
  return publicImageSrc(imageDir, filename);
}

export const FILM_STAGE_IMAGE_DIR = "/images/film stage set design";

export type FilmStageProject = {
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

export const filmStageProjects: FilmStageProject[] = [
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

export const HANOK_IMAGE_DIR = "/images/hanok";
export const AQUARIUM_CONCEPT_IMAGE_DIR =
  "/images/concept visualization works/acuarium";
export const STAGE_CONCEPT_IMAGE_DIR = "/images/concept visualization works/stage";

export const hanokRenewalProject: FolderGalleryProject = {
  title: "Hanok Renewal",
  titleKo: "한옥 리뉴얼",
  imageDir: HANOK_IMAGE_DIR,
  description:
    "Concept design and visualization study exploring the renewal and adaptive reuse of traditional Korean architectural heritage. Focused on spatial atmosphere, cultural identity, architectural preservation, and contemporary interpretation.",
  descriptionKo:
    "전통 한국 건축 유산의 리뉴얼과 적응적 재생을 탐구하는 컨셉 디자인 및 시각화 연구. 공간적 분위기, 문화적 정체성, 건축 보존, 현대적 해석에 중점을 두었습니다.",
  images: ["b1.png", "b2.png", "b3.png", "b4.png", "b5.png"],
};

export const conceptVisualizationProjects: Record<string, FolderGalleryProject> = {
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

export function publicImageSrc(baseDir: string, filename: string) {
  return `${baseDir}/${encodeURIComponent(filename)}`;
}

export function getOrbitImageSrc(filename: string) {
  return publicImageSrc(ORBIT_IMAGE_DIR, filename);
}

export function getHanokImageSrc(filename: string) {
  return publicImageSrc(HANOK_IMAGE_DIR, filename);
}

export function getOilDepotImageSrc(filename: string) {
  return publicImageSrc(OIL_DEPOT_IMAGE_DIR, filename);
}

export function getNscImageSrc(filename: string) {
  return publicImageSrc(NSC_IMAGE_DIR, filename);
}

export function getFilmStageImageSrc(folder: string, filename: string) {
  return publicImageSrc(`${FILM_STAGE_IMAGE_DIR}/${folder}`, filename);
}

export function getFilmStageThumbnailSrc(project: FilmStageProject) {
  return getFilmStageImageSrc(project.folder, project.thumbnail);
}

export function getFilmStageCoverSrc() {
  return getFilmStageThumbnailSrc(filmStageProjects[0]);
}

export function getCategoryThumbnailSrc(categoryNumber: string): string | null {
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

export function getSubProjectThumbnailSrc(projectId: PortfolioProjectId): string | null {
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
