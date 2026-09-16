function pathSegment(segment: string) {
  if (segment === "국립밀양기상과학관" || segment === "부산모터스튜디오") {
    return segment.normalize("NFD");
  }
  return segment;
}

export function asset(dir: string, file: string) {
  const full = `${dir}/${file}`.replace(/^\//, "");
  return `/${full.split("/").map((part) => encodeURIComponent(pathSegment(part))).join("/")}`;
}

export type Img = {
  src: string;
  alt: string;
  caption?: string;
};

export type Meta = {
  year?: string;
  role?: string;
  roleKo?: string;
  location?: string;
  locationKo?: string;
};

export type ProjectIntro = {
  title: string;
  titleKo: string;
  description?: string;
  descriptionKo?: string;
  meta?: Meta;
};

export type CategoryIntro = {
  number: string;
  title: string;
  titleKo: string;
};

export type LayoutId =
  | "hero2"
  | "hero3"
  | "split"
  | "tripleA"
  | "tripleB"
  | "tripleC"
  | "quadA"
  | "quadB"
  | "quadC"
  | "quadD"
  | "fiveA"
  | "sixA"
  | "pano4"
  | "cinema3"
  | "cinema4";

export type PageSpec =
  | { kind: "cover" }
  | { kind: "profile" }
  | { kind: "contact" }
  | {
      kind: "spread";
      layout: LayoutId;
      category?: CategoryIntro;
      project?: ProjectIntro;
      images: Img[];
    }
  | {
      kind: "explorations";
      category: CategoryIntro;
      left: { project: ProjectIntro; image: Img };
      right: { project: ProjectIntro; image: Img };
    };

const CAT = {
  architecture: {
    number: "01",
    title: "Architecture & Environmental Design",
    titleKo: "건축 및 환경 디자인",
  },
  exhibition: {
    number: "02",
    title: "Exhibition & Spatial Design",
    titleKo: "전시공간 디자인",
  },
  interior: {
    number: "03",
    title: "Interior Design",
    titleKo: "인테리어 디자인",
  },
  production: {
    number: "04",
    title: "Production Design",
    titleKo: "프로덕션 디자인",
  },
  concept: {
    number: "05",
    title: "Concept Visualization",
    titleKo: "컨셉 비주얼라이제이션",
  },
  explorations: {
    number: "06",
    title: "Design Explorations",
    titleKo: "디자인 탐구",
  },
} as const;

function imgs(dir: string, files: string[], alt: string): Img[] {
  return files.map((file) => ({ src: asset(dir, file), alt }));
}

const orbit = imgs(
  "/images/orbit",
  [
    "2_night.png",
    "orbit-hero01.png",
    "orbit-hero03.png",
    "orbit-hero04.png",
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
  ],
  "Orbit Dome Theater",
);

const oil = imgs(
  "/images/oil depot cultural renewal",
  [
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
  ],
  "Oil Depot Renewal",
);

const hanok = imgs(
  "/images/hanok",
  ["b1.png", "b2.png", "b3.png", "b4.png", "b5.png"],
  "Hanok Renewal",
);
const nsc = imgs(
  "/images/nsc science center",
  ["강연_001.png", "강연_002.png", "파티_003.png", "파티_005.png", "3_ph.png"],
  "Singapore NSC Science Center",
);
const gangneung = imgs(
  "/images/강릉 메타버스 체험관",
  ["01.png", "02.png", "03.png"],
  "Gangneung Metaverse Experience Center",
);
const miryang = imgs(
  "/images/국립밀양기상과학관",
  ["01.png", "02.png"],
  "Miryang National Meteorological Science Museum",
);
const daegu = imgs(
  "/images/국립대구박물관",
  ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"],
  "Daegu National Museum",
);
const west = imgs(
  "/images/국립서해안기후대기센터",
  ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png"],
  "National Seohaean Climate & Atmospheric Center",
);
const geumsan = imgs(
  "/images/금산뿌리깊은인삼체험마을",
  ["01.png", "02.png", "03.png", "04.png"],
  "Geumsan Ginseng Experience Village",
);
const nyChurch = imgs(
  "/images/뉴욕한인교회",
  ["01.png", "02.png", "03.png"],
  "New York Korean Church",
);
const medicinal = imgs(
  "/images/제주국가생약자원관리센터",
  ["01.jpg", "02.png", "03.png"],
  "Jeju National Medicinal Resources Center",
);
const citrus = imgs(
  "/images/제주서귀포감귤박물관",
  ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
  "Jeju Citrus Museum",
);
const hongcheon = imgs(
  "/images/홍천동물조각테마파크",
  ["01.png", "02.png", "03.png", "04.jpg", "05.png", "06.png"],
  "Hongcheon Animal Sculpture Theme Park",
);
const busan = imgs(
  "/images/부산모터스튜디오",
  [
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
  "Busan Motor Studio",
);
const giheung = imgs(
  "/images/신한은행기흥연수원",
  [
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
  "Shinhan Bank Human Resources Center",
);
const gwang = imgs(
  "/images/신한은행광화문집무실",
  ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
  "Shinhan Bank Gwanghwamun Office",
);
const cafe = imgs(
  "/images/cafe interior",
  ["01.jpg", "02.png", "03.png", "04.png"],
  "Cafe Interior",
);
const res1 = imgs(
  "/images/residential interior design",
  ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"],
  "Residential Interior Design",
);
const res2 = imgs(
  "/images/residential interior design",
  ["9.png", "10.png", "11.png", "12.png", "13.png"],
  "Residential Interior Design",
);
const itOffice = imgs(
  "/images/IT 회사 인테리어",
  [
    "메인.png",
    "2-1.png",
    "2-2.png",
    "2-3.png",
    "2-4.png",
    "2-5.png",
    "3-1.png",
    "3-2.png",
    "3-3수정.png",
    "3-4.png",
    "3-5.png",
    "3-6.png",
    "4-1.png",
    "4-2.png",
    "5-1.png",
    "5-2.png",
  ],
  "IT Office Interior Design",
);

const human = imgs(
  "/images/film stage set design/01_human",
  [
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
  "HUMAN",
);

const last24Files = [
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
];
const last24Labels = [
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
];
const last24: Img[] = last24Files.map((file, i) => ({
  src: asset("/images/film stage set design/02_the last 24 hour", file),
  alt: last24Labels[i],
  caption: last24Labels[i],
}));

const aquarium = imgs(
  "/images/concept visualization works/acuarium",
  ["a1.png", "a2.png", "a3.png"],
  "Aquarium Science Center",
);
const stage = imgs(
  "/images/concept visualization works/stage",
  ["1.PNG", "2.PNG", "3.PNG"],
  "Stage Design Concept",
);

const spatial = { role: "Spatial Designer", roleKo: "공간 디자이너" };
const lead = { role: "Lead Spatial Designer", roleKo: "공간 디자인 리드" };

function p(
  layout: LayoutId,
  images: Img[],
  extra: Partial<Extract<PageSpec, { kind: "spread" }>> = {},
): PageSpec {
  return { kind: "spread", layout, images, ...extra };
}

export const pages: PageSpec[] = [
  { kind: "cover" },
  { kind: "profile" },

  p("hero3", orbit.slice(0, 3), {
    category: CAT.architecture,
    project: {
      title: "Orbit Dome Theater",
      titleKo: "올빗 돔 시어터 프로젝트",
      description:
        "Immersive dome theater project developed for cultural and educational experiences. Responsible for architectural exterior design, landscape planning, spatial design and visualization.",
      descriptionKo:
        "문화와 교육 경험을 위한 몰입형 돔 극장 프로젝트. 건축 외관 디자인, 조경 계획, 공간 디자인 및 시각화를 담당하였습니다.",
      meta: {
        year: "2024 – Present",
        ...lead,
        location: "South Korea",
        locationKo: "대한민국",
      },
    },
  }),
  p("quadB", orbit.slice(3, 7)),
  p("quadA", orbit.slice(7, 11)),
  p("pano4", orbit.slice(11, 16)),

  p("quadC", oil.slice(0, 4), {
    project: {
      title: "Oil Depot Renewal",
      titleKo: "문화비축기지 리뉴얼",
      description:
        "Cultural renewal project transforming a former oil depot into a contemporary public destination. Responsible for exterior design development, landscape planning, spatial composition, and architectural visualization.",
      descriptionKo:
        "문화비축기지를 현대적 공공 공간으로 전환하는 문화 리뉴얼 프로젝트. 외관 디자인, 조경 계획, 공간 구성 및 건축 시각화를 담당하였습니다.",
      meta: {
        year: "2024",
        ...lead,
        location: "Seoul, South Korea",
        locationKo: "대한민국 서울",
      },
    },
  }),
  p("quadD", oil.slice(4, 8)),
  p("hero2", oil.slice(8, 11)),
  p("fiveA", oil.slice(11, 16)),

  p("fiveA", hanok, {
    project: {
      title: "Hanok Renewal",
      titleKo: "한옥 리뉴얼",
      description:
        "Concept design and visualization study exploring the renewal and adaptive reuse of traditional Korean architectural heritage. Focused on spatial atmosphere, cultural identity, architectural preservation, and contemporary interpretation.",
      descriptionKo:
        "전통 한국 건축 유산의 리뉴얼과 적응적 재생을 탐구하는 컨셉 디자인 및 시각화 연구. 공간적 분위기, 문화적 정체성, 건축 보존, 현대적 해석에 중점을 두었습니다.",
    },
  }),

  p("fiveA", nsc, {
    category: CAT.exhibition,
    project: {
      title: "Singapore NSC Science Center",
      titleKo: "싱가포르 NSC 과학관",
    },
  }),
  p("tripleB", gangneung, {
    project: {
      title: "Gangneung Metaverse Experience Center",
      titleKo: "강릉 메타버스 체험관",
      description:
        "Immersive exhibition space exploring digital technologies and metaverse experiences through interactive environments.",
      descriptionKo:
        "디지털 기술과 메타버스 경험을 인터랙티브 환경을 통해 탐구하는 몰입형 전시 공간입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "Gangneung, South Korea",
        locationKo: "대한민국 강릉",
      },
    },
  }),
  p("split", miryang, {
    project: {
      title: "Miryang National Meteorological Science Museum",
      titleKo: "밀양 국립기상과학관",
      description:
        "Science exhibition inspired by weather phenomena, combining educational content with immersive spatial experiences.",
      descriptionKo:
        "기상 현상에서 영감을 받은 과학 전시로, 교육 콘텐츠와 몰입형 공간 경험을 결합하였습니다.",
      meta: {
        year: "2024",
        ...spatial,
        location: "Miryang, South Korea",
        locationKo: "대한민국 밀양",
      },
    },
  }),
  p("tripleA", daegu.slice(0, 3), {
    project: {
      title: "Daegu National Museum",
      titleKo: "국립대구박물관",
      description:
        "Interactive exhibition designed to introduce traditional Korean costume culture through hands-on learning experiences.",
      descriptionKo:
        "전통 한국 의복 문화를 체험형 학습을 통해 소개하는 인터랙티브 전시입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "Daegu, South Korea",
        locationKo: "대한민국 대구",
      },
    },
  }),
  p("quadC", daegu.slice(3, 7)),
  p("tripleB", west.slice(0, 3), {
    project: {
      title: "National Seohaean Climate & Atmospheric Center",
      titleKo: "국립서해안기후대기센터",
      description:
        "Outdoor exhibition environment designed to communicate climate science through interactive learning experiences.",
      descriptionKo:
        "기후 과학을 인터랙티브 학습 경험을 통해 전달하는 야외 전시 환경입니다.",
      meta: {
        year: "2022",
        ...spatial,
        location: "Hongseong, South Korea",
        locationKo: "대한민국 홍성",
      },
    },
  }),
  p("quadB", west.slice(3, 7)),
  p("quadA", giheung.slice(0, 4), {
    project: {
      title: "Shinhan Bank Human Resources Center",
      titleKo: "신한은행 인재개발원",
      description:
        "Corporate exhibition space designed to communicate Shinhan Bank's history, values, and legacy through immersive visitor experiences.",
      descriptionKo:
        "신한은행의 역사, 가치, 유산을 몰입형 관람 경험을 통해 전달하는 기업 전시 공간입니다.",
      meta: {
        year: "2022 – 2023",
        ...spatial,
        location: "Yongin, South Korea",
        locationKo: "대한민국 용인",
      },
    },
  }),
  p("quadD", giheung.slice(4, 8)),
  p("quadC", giheung.slice(8, 12)),
  p("fiveA", giheung.slice(12, 17)),
  p("quadB", geumsan, {
    project: {
      title: "Geumsan Ginseng Experience Village",
      titleKo: "금산 뿌리깊은 인삼체험마을",
      description:
        "Interactive exhibition designed to promote Korean ginseng culture through educational content and hands-on visitor experiences.",
      descriptionKo:
        "한국 인삼 문화를 교육 콘텐츠와 체험형 전시를 통해 알리는 인터랙티브 전시입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "Geumsan, South Korea",
        locationKo: "대한민국 금산",
      },
    },
  }),
  p("sixA", hongcheon, {
    project: {
      title: "Hongcheon Animal Sculpture Theme Park",
      titleKo: "홍천 동물조각테마파크",
      description:
        "Outdoor thematic environment integrating animal sculptures, landscape design, and visitor-centered experiences.",
      descriptionKo:
        "동물 조각, 조경 디자인, 관람객 중심 경험을 통합한 야외 테마 환경입니다.",
      meta: {
        year: "2023 – 2024",
        ...spatial,
        location: "Hongcheon, South Korea",
        locationKo: "대한민국 홍천",
      },
    },
  }),
  p("sixA", citrus, {
    project: {
      title: "Jeju Citrus Museum",
      titleKo: "제주 감귤박물관",
      description:
        "Museum renewal project focused on interactive learning, family engagement, and the cultural heritage of Jeju citrus.",
      descriptionKo:
        "인터랙티브 학습, 가족 참여, 제주 감귤 문화유산을 중심으로 한 박물관 리뉴얼 프로젝트입니다.",
      meta: {
        year: "2022",
        ...spatial,
        location: "Jeju, South Korea",
        locationKo: "대한민국 제주",
      },
    },
  }),
  p("tripleC", medicinal, {
    project: {
      title: "Jeju National Medicinal Resources Center",
      titleKo: "제주 국가생약자원관리센터",
      description:
        "Exhibition design showcasing Korea's medicinal plant resources through educational displays and immersive visitor experiences.",
      descriptionKo:
        "국가 생약 자원을 교육 전시와 몰입형 관람 경험을 통해 소개하는 전시 디자인입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "Jeju, South Korea",
        locationKo: "대한민국 제주",
      },
    },
  }),
  p("tripleA", nyChurch, {
    project: {
      title: "New York Korean Church",
      titleKo: "뉴욕 한인교회",
      description:
        "Exhibition space designed to present the history and cultural identity of the Korean community through spatial storytelling.",
      descriptionKo:
        "한인 커뮤니티의 역사와 문화적 정체성을 공간적 스토리텔링으로 전달하는 전시 공간입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "New York, USA",
        locationKo: "미국 뉴욕",
      },
    },
  }),
  p("pano4", busan.slice(0, 5), {
    project: { title: "Busan Motor Studio", titleKo: "부산 모터스튜디오" },
  }),
  p("pano4", busan.slice(5, 10)),

  p("quadA", res1.slice(0, 4), {
    category: CAT.interior,
    project: {
      title: "Residential Interior Design",
      titleKo: "주거공간 인테리어 디자인",
    },
  }),
  p("quadB", res1.slice(4, 8)),
  p("fiveA", res2, {
    project: {
      title: "Residential Interior Design",
      titleKo: "주거 공간 디자인",
    },
  }),
  p("quadC", cafe, {
    project: { title: "Cafe Interior", titleKo: "카페 인테리어" },
  }),
  p("sixA", gwang, {
    project: {
      title: "Shinhan Bank Gwanghwamun Office",
      titleKo: "신한은행 광화문 지점",
      description:
        "Workplace exhibition and interior project designed to communicate corporate identity within an office environment.",
      descriptionKo:
        "사무 환경 속에서 기업 아이덴티티를 전달하는 직장 전시 및 인테리어 프로젝트입니다.",
      meta: {
        year: "2023",
        ...spatial,
        location: "Seoul, South Korea",
        locationKo: "대한민국 서울",
      },
    },
  }),
  p("quadD", itOffice.slice(0, 4), {
    project: {
      title: "IT Office Interior Design",
      titleKo: "IT 회사 인테리어",
    },
  }),
  p("quadB", itOffice.slice(4, 8)),
  p("quadC", itOffice.slice(8, 12)),
  p("quadA", itOffice.slice(12, 16)),

  p("cinema3", human.slice(0, 3), {
    category: CAT.production,
    project: {
      title: "HUMAN",
      titleKo: "휴먼",
      description:
        "This project explores the emotional traces that remain in spaces long after people have left. Rather than focusing on characters, the story is told through environments.",
      descriptionKo:
        "이 프로젝트는 사람들이 떠난 후에도 공간에 남아 있는 감정의 흔적을 탐구합니다. 인물보다 환경을 통해 이야기를 전달합니다.",
    },
  }),
  p("cinema4", human.slice(3, 7)),
  p("cinema3", human.slice(7, 10)),
  p("cinema4", last24.slice(0, 4), {
    project: {
      title: "The Last 24 Hours",
      titleKo: "마지막 24시간",
      description:
        "A production design project exploring spaces during their final 24 hours before disappearance. Each environment captures the emotional traces left behind by people, revealing stories of memory, farewell, transition, and time through architectural storytelling.",
      descriptionKo:
        "소멸 직전 마지막 24시간의 공간을 탐구하는 프로덕션 디자인 프로젝트. 각 환경은 사람들이 남긴 감정의 흔적을 담아, 기억, 이별, 전환, 시간의 이야기를 건축적 스토리텔링으로 전달합니다.",
    },
  }),
  p("cinema4", last24.slice(4, 8)),
  p("cinema4", last24.slice(8, 12)),

  p("tripleB", aquarium, {
    category: CAT.concept,
    project: {
      title: "Aquarium Science Center",
      titleKo: "아쿠아리움 과학관",
      description:
        "Concept design and visualization studies for an immersive aquarium and science center environment.",
      descriptionKo:
        "몰입형 아쿠아리움 및 과학관 환경을 위한 컨셉 디자인 및 시각화 연구입니다.",
    },
  }),
  p("tripleA", stage, {
    project: {
      title: "Stage Design Concept",
      titleKo: "무대 디자인 컨셉",
      description:
        "Concept visualization exploring stage environments through spatial composition, lighting, and narrative atmosphere.",
      descriptionKo:
        "공간 구성, 조명, 서사적 분위기를 통해 무대 환경을 탐구하는 컨셉 시각화입니다.",
    },
  }),

  {
    kind: "explorations",
    category: CAT.explorations,
    left: {
      project: {
        title: "Furniture Design Study",
        titleKo: "가구 디자인 연구",
        description:
          "Experimental furniture design exploring structure, materiality, and ergonomic form through contemporary fabrication methods.",
        descriptionKo:
          "구조, 재료성, 인체공학적 형태를 현대적 제작 방식으로 탐구하는 가구 디자인 실험입니다.",
      },
      image: {
        src: asset("/images/design explorations", "01.png"),
        alt: "Furniture Design Study",
      },
    },
    right: {
      project: {
        title: "Graphic Installation Study",
        titleKo: "그래픽 설치 연구",
        description:
          "Visual and spatial exploration using graphic systems, transparency, layering, and physical composition.",
        descriptionKo:
          "그래픽 시스템, 투명성, 레이어링, 물리적 구성을 활용한 시각·공간 탐구입니다.",
      },
      image: {
        src: asset("/images/design explorations", "02.png"),
        alt: "Graphic Installation Study",
      },
    },
  },

  { kind: "contact" },
];

export const COVER_SRC = asset("/images/orbit", "orbit-hero.png");
export const TOTAL_PAGES = pages.length;

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
    company: null as string | null,
    companyKo: null as string | null,
  },
];
