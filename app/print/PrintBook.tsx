import type { CSSProperties, ReactNode } from "react";
import {
  COVER_SRC,
  TOTAL_PAGES,
  aboutParagraphs,
  experience,
  pages,
  type CategoryIntro,
  type Img,
  type LayoutId,
  type PageSpec,
  type ProjectIntro,
} from "./data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function PageShell({
  index,
  children,
  cover,
}: {
  index: number;
  children: ReactNode;
  cover?: boolean;
}) {
  return (
    <article className={`print-page${cover ? " cover-page" : ""}`}>
      {children}
      <span className="page-num">
        {pad(index)} / {pad(TOTAL_PAGES)}
      </span>
    </article>
  );
}

function Ko({ children }: { children: React.ReactNode }) {
  return <p className="ko">{children}</p>;
}

function CategoryHead({ category }: { category: CategoryIntro }) {
  return (
    <div className="cat-kicker">
      <div className="cat-num">{category.number}</div>
      <div className="cat-title">
        {category.title}
        <Ko>{category.titleKo}</Ko>
      </div>
    </div>
  );
}

function ProjectHead({ project }: { project: ProjectIntro }) {
  const meta = project.meta;
  return (
    <div>
      <div className="proj-title">
        {project.title}
        <Ko>{project.titleKo}</Ko>
      </div>
      {meta && (
        <div className="meta-row">
          {meta.year && (
            <div className="meta-item">
              <div className="label">Year</div>
              <div className="value">{meta.year}</div>
              <p className="ko">연도</p>
            </div>
          )}
          {meta.role && (
            <div className="meta-item">
              <div className="label">Role</div>
              <div className="value">{meta.role}</div>
              {meta.roleKo && <p className="ko">{meta.roleKo}</p>}
            </div>
          )}
          {meta.location && (
            <div className="meta-item">
              <div className="label">Location</div>
              <div className="value">{meta.location}</div>
              {meta.locationKo && <p className="ko">{meta.locationKo}</p>}
            </div>
          )}
        </div>
      )}
      {project.description && (
        <div className="proj-desc">
          {project.description}
          {project.descriptionKo && <Ko>{project.descriptionKo}</Ko>}
        </div>
      )}
    </div>
  );
}

const LAYOUT_STYLE: Record<LayoutId, CSSProperties> = {
  hero2: {
    gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,58%) minmax(0,42%)",
    gridTemplateAreas: `"a b" "a c"`,
  },
  hero3: {
    gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,58%) minmax(0,42%)",
    gridTemplateAreas: `"a b" "a c"`,
  },
  split: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,100%)",
    gridTemplateAreas: `"a b"`,
  },
  tripleA: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,58%) minmax(0,42%)",
    gridTemplateAreas: `"a a" "b c"`,
  },
  tripleB: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
    gridTemplateRows: "minmax(0,50%) minmax(0,50%)",
    gridTemplateAreas: `"b a" "c a"`,
  },
  tripleC: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,100%)",
    gridTemplateAreas: `"a b c"`,
  },
  quadA: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,58%) minmax(0,42%)",
    gridTemplateAreas: `"a a a" "b c d"`,
  },
  quadB: {
    gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,34%) minmax(0,33%) minmax(0,33%)",
    gridTemplateAreas: `"a b" "a c" "a d"`,
  },
  quadC: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1.3fr)",
    gridTemplateRows: "minmax(0,50%) minmax(0,50%)",
    gridTemplateAreas: `"a c d" "b c d"`,
  },
  quadD: {
    gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,34%) minmax(0,33%) minmax(0,33%)",
    gridTemplateAreas: `"a b" "c b" "d d"`,
  },
  fiveA: {
    gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,50%) minmax(0,50%)",
    gridTemplateAreas: `"a b c" "a d e"`,
  },
  sixA: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,56%) minmax(0,44%)",
    gridTemplateAreas: `"a a b b" "c d e f"`,
  },
  pano4: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,62%) minmax(0,38%)",
    gridTemplateAreas: `"a a a a" "b c d e"`,
  },
  cinema3: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,62%) minmax(0,38%)",
    gridTemplateAreas: `"a a" "b c"`,
  },
  cinema4: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
    gridTemplateRows: "minmax(0,62%) minmax(0,38%)",
    gridTemplateAreas: `"a a a" "b c d"`,
  },
};

const AREA = ["a", "b", "c", "d", "e", "f"] as const;

function Cell({ image, i }: { image: Img; i: number }) {
  return (
    <figure
      className={`cell${image.caption ? " captioned" : ""}`}
      style={{ gridArea: AREA[i] }}
    >
      <img src={image.src} alt={image.alt} loading="eager" decoding="async" />
      {image.caption && <figcaption className="cap">{image.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ layout, images }: { layout: LayoutId; images: Img[] }) {
  return (
    <div
      className="gallery"
      style={{
        ...LAYOUT_STYLE[layout],
        width: "100%",
        height: "100%",
        minHeight: 0,
      }}
    >
      {images.map((image, i) => (
        <Cell key={`${image.src}-${i}`} image={image} i={i} />
      ))}
    </div>
  );
}

function CoverPage({ index }: { index: number }) {
  return (
    <PageShell index={index} cover>
      <div className="cover-frame">
        <img src={COVER_SRC} alt="Orbit Dome Theater" loading="eager" decoding="async" />
      </div>
      <div className="cover-meta">
        <div className="cover-name">KIM DONG HYEON</div>
        <div className="cover-role">
          Spatial Designer
          <Ko>공간 디자이너</Ko>
        </div>
      </div>
    </PageShell>
  );
}

function ProfilePage({ index }: { index: number }) {
  return (
    <PageShell index={index}>
      <div className="page-body">
        <div className="profile-grid">
          <div>
            <div className="profile-name">KIM DONG HYEON</div>
            <div className="profile-role">
              Spatial Designer
              <Ko>공간 디자이너</Ko>
            </div>
            <div className="about-block">
              {aboutParagraphs.map((p) => (
                <div key={p.en}>
                  <p>{p.en}</p>
                  <Ko>{p.ko}</Ko>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="exp-label">Experience</div>
            {experience.map((item) => (
              <div className="exp-item" key={item.period}>
                <div className="exp-period">{item.period}</div>
                <div className="exp-role">
                  {item.role}
                  <Ko>{item.roleKo}</Ko>
                </div>
                {item.company && (
                  <div className="exp-co">
                    {item.company}
                    {item.companyKo ? `  /  ${item.companyKo}` : ""}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage({ index }: { index: number }) {
  return (
    <PageShell index={index}>
      <div className="page-body contact-page">
        <h1>KIM DONG HYEON</h1>
        <div className="contact-lead">
          Feel free to reach out for collaborations, exhibitions, spatial design
          projects, or creative opportunities.
          <Ko>
            협업, 전시, 공간 디자인 프로젝트, 창작 기회에 관한 문의는 언제든
            환영합니다.
          </Ko>
        </div>
        <div className="contact-list">
          <div className="contact-row">
            <div className="k">
              Email
              <Ko>이메일</Ko>
            </div>
            <div>ehdgus1213@gmail.com</div>
          </div>
          <div className="contact-row">
            <div className="k">
              LinkedIn
              <Ko>링크드인</Ko>
            </div>
            <div>linkedin.com/in/dong-hyeon-kim-staycalm</div>
          </div>
          <div className="contact-row">
            <div className="k">
              Location
              <Ko>위치</Ko>
            </div>
            <div>
              Seoul, South Korea
              <Ko>대한민국 서울</Ko>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function SpreadPage({ spec, index }: { spec: Extract<PageSpec, { kind: "spread" }>; index: number }) {
  return (
    <PageShell index={index}>
      <div className="page-body">
        {(spec.category || spec.project) && (
          <div className="spread-head">
            {spec.category && <CategoryHead category={spec.category} />}
            {spec.project && <ProjectHead project={spec.project} />}
          </div>
        )}
        <Gallery layout={spec.layout} images={spec.images} />
      </div>
    </PageShell>
  );
}

function ExplorationsPage({
  spec,
  index,
}: {
  spec: Extract<PageSpec, { kind: "explorations" }>;
  index: number;
}) {
  return (
    <PageShell index={index}>
      <div className="page-body">
        <div className="spread-head">
          <CategoryHead category={spec.category} />
        </div>
        <div className="two-projects">
          <div className="block">
            <ProjectHead project={spec.left.project} />
            <div
              className="gallery"
              style={{
                marginTop: "5mm",
                height: "100%",
                minHeight: 0,
                gridTemplateColumns: "minmax(0,1fr)",
                gridTemplateRows: "minmax(0,1fr)",
                gridTemplateAreas: `"a"`,
              }}
            >
              <Cell image={spec.left.image} i={0} />
            </div>
          </div>
          <div className="block">
            <ProjectHead project={spec.right.project} />
            <div
              className="gallery"
              style={{
                marginTop: "5mm",
                height: "100%",
                minHeight: 0,
                gridTemplateColumns: "minmax(0,1fr)",
                gridTemplateRows: "minmax(0,1fr)",
                gridTemplateAreas: `"a"`,
              }}
            >
              <Cell image={spec.right.image} i={0} />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function PrintBook({ onlyPage }: { onlyPage?: number }) {
  return (
    <div className="print-book" data-total={TOTAL_PAGES}>
      {pages.map((spec, i) => {
        const index = i + 1;
        if (onlyPage && index !== onlyPage) return null;
        if (spec.kind === "cover") return <CoverPage key={index} index={index} />;
        if (spec.kind === "profile") return <ProfilePage key={index} index={index} />;
        if (spec.kind === "contact") return <ContactPage key={index} index={index} />;
        if (spec.kind === "explorations") {
          return <ExplorationsPage key={index} spec={spec} index={index} />;
        }
        return <SpreadPage key={index} spec={spec} index={index} />;
      })}
    </div>
  );
}
