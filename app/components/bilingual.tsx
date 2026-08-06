import type { ReactNode } from "react";

/** Refined Korean typography — Pretendard Variable with Apple-style fallbacks */
export const koreanClass =
  "font-korean font-[350] tracking-[0.03em] leading-[1.35] text-[#777]";

/** Korean secondary text — 10% smaller than paired English sizes */
export const koreanSizes = {
  micro: "text-[0.50625rem] sm:text-[0.5625rem]",
  caption: "text-[0.5625rem] sm:text-[0.61875rem]",
  tiny: "text-[0.61875rem]",
  xs: "text-[0.675rem]",
  sm: "text-[0.7875rem]",
  base: "text-[0.9rem]",
  lg: "text-[1.0125rem]",
  xl: "text-[1.125rem]",
  xl2: "text-[1.35rem]",
  xl3: "text-[1.6875rem]",
  xl4: "text-[2.025rem]",
} as const;

/** Preset Korean class strings for inline use (Tailwind-safe full literals) */
export const koreanCaption = `mt-1 text-[0.50625rem] sm:text-[0.5625rem] ${koreanClass}`;
export const koreanMicro = `mt-0.5 text-[0.50625rem] sm:text-[0.5625rem] ${koreanClass}`;
export const koreanNav = `mt-0.5 block text-[0.50625rem] font-[350] tracking-[0.04em] sm:text-[0.5625rem] ${koreanClass}`;
export const koreanButton = `mt-1 block text-[0.5625rem] font-[350] tracking-[0.04em] ${koreanClass}`;
export const koreanBodySm = `mt-2 text-[0.7875rem] sm:mt-2.5 sm:text-[0.9rem] ${koreanClass}`;
export const koreanBodyMd = `mt-2 text-[0.7875rem] sm:text-[0.9rem] ${koreanClass}`;
export const koreanBodyLg = `mt-2 text-[0.9rem] sm:text-[1.0125rem] ${koreanClass}`;
export const koreanValue = `mt-1 text-[0.675rem] sm:text-[0.7875rem] ${koreanClass}`;
export const koreanLocation = `mt-1.5 text-[0.7875rem] sm:text-[0.9rem] ${koreanClass}`;
export const koreanLineClamp = `line-clamp-1 text-[0.50625rem] sm:text-[0.5625rem] ${koreanClass}`;

export const METADATA_LABELS_KO: Record<string, string> = {
  Year: "연도",
  Role: "역할",
  Scope: "범위",
  "Project Type": "프로젝트 유형",
  Location: "위치",
  Description: "설명",
  Email: "이메일",
  LinkedIn: "링크드인",
};

export type BilingualTitleSize =
  | "category-row"
  | "category-main"
  | "list"
  | "list-uppercase"
  | "card"
  | "detail"
  | "detail-hero"
  | "hero-role"
  | "experience-role";

const BILINGUAL_TITLE_STYLES: Record<
  BilingualTitleSize,
  { en: string; ko: string }
> = {
  "category-row": {
    en: "text-xl font-light tracking-tight text-black transition-transform duration-300 group-hover:translate-x-1 sm:whitespace-nowrap sm:text-2xl lg:text-3xl xl:text-4xl",
    ko: `mt-1 text-[0.495rem] sm:mt-1.5 sm:text-[0.54rem] lg:text-[0.63rem] xl:text-[1.08rem] ${koreanClass}`,
  },
  "category-main": {
    en: "text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl",
    ko: `mt-1.5 text-[0.7875rem] sm:mt-2 sm:text-[0.9rem] lg:text-[1.35rem] ${koreanClass}`,
  },
  list: {
    en: "text-xl font-light tracking-tight text-black transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl sm:tracking-[0.18em] lg:text-3xl",
    ko: `mt-1 text-[0.675rem] sm:mt-1.5 sm:text-[0.7875rem] lg:text-[1.0125rem] ${koreanClass}`,
  },
  "list-uppercase": {
    en: "text-xl font-light uppercase tracking-[0.18em] text-black transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl sm:tracking-[0.22em] lg:text-3xl",
    ko: `mt-1 text-[0.675rem] sm:mt-1.5 sm:text-[0.7875rem] lg:text-[1.0125rem] ${koreanClass}`,
  },
  card: {
    en: "line-clamp-2 text-sm font-light uppercase leading-snug tracking-[0.16em] text-black transition-transform duration-300 group-hover:translate-x-0.5 sm:text-base sm:tracking-[0.18em] lg:text-lg lg:tracking-[0.2em]",
    ko: `mt-1 line-clamp-1 text-[0.5625rem] sm:text-[0.61875rem] lg:text-[0.675rem] ${koreanClass}`,
  },
  detail: {
    en: "text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl",
    ko: `mt-1.5 text-[0.7875rem] sm:mt-2 sm:text-[0.9rem] lg:text-[1.125rem] ${koreanClass}`,
  },
  "detail-hero": {
    en: "text-3xl font-light uppercase tracking-[0.2em] text-black sm:text-4xl sm:tracking-[0.25em] lg:text-5xl",
    ko: `mt-2 text-[1.0125rem] sm:mt-2.5 sm:text-[1.125rem] lg:text-[1.6875rem] ${koreanClass}`,
  },
  "hero-role": {
    en: "text-xs font-medium uppercase tracking-[0.3em] text-white/80 sm:text-sm",
    ko: `mt-1 text-[0.5625rem] font-[350] tracking-[0.04em] text-white/55 sm:mt-1.5 sm:text-[0.675rem] ${koreanClass} !text-white/55`,
  },
  "experience-role": {
    en: "text-xl font-light tracking-tight text-black sm:text-2xl lg:text-3xl",
    ko: `mt-1.5 text-[0.7875rem] sm:mt-2 sm:text-[0.9rem] lg:text-[1.125rem] ${koreanClass}`,
  },
};

export function BilingualTitle({
  title,
  titleKo,
  size = "list",
  as: Component = "h3",
  className,
  englishClassName,
  koreanClassName,
}: {
  title: string;
  titleKo?: string;
  size?: BilingualTitleSize;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  englishClassName?: string;
  koreanClassName?: string;
}) {
  const styles = BILINGUAL_TITLE_STYLES[size];

  if (!titleKo) {
    return (
      <Component className={englishClassName ?? styles.en}>{title}</Component>
    );
  }

  return (
    <div className={className}>
      <Component className={englishClassName ?? styles.en}>{title}</Component>
      <p className={koreanClassName ?? styles.ko}>{titleKo}</p>
    </div>
  );
}

export type BilingualBodyVariant =
  | "hero"
  | "lg"
  | "md"
  | "sm"
  | "caption"
  | "nav";

const BODY_STYLES: Record<
  BilingualBodyVariant,
  { en: string; ko: string; gap: string }
> = {
  hero: {
    en: "max-w-xl text-base leading-relaxed text-white/90 sm:text-lg sm:leading-9 md:text-xl",
    ko: `max-w-xl text-[0.7875rem] sm:text-[0.9rem] md:text-[1.0125rem] ${koreanClass} !text-white/60`,
    gap: "mt-3 sm:mt-4",
  },
  lg: {
    en: "text-base leading-relaxed text-black/75 sm:text-lg sm:leading-8 lg:text-xl",
    ko: `text-[0.7875rem] sm:text-[0.9rem] lg:text-[1.0125rem] ${koreanClass}`,
    gap: "mt-2 sm:mt-2.5",
  },
  md: {
    en: "text-base leading-relaxed text-black sm:text-lg sm:leading-9 lg:text-xl",
    ko: `text-[0.7875rem] sm:text-[0.9rem] lg:text-[1.0125rem] ${koreanClass}`,
    gap: "mt-2 sm:mt-2.5",
  },
  sm: {
    en: "text-sm font-light leading-relaxed text-black/70 sm:text-base sm:leading-8",
    ko: `text-[0.675rem] sm:text-[0.7875rem] ${koreanClass}`,
    gap: "mt-1.5 sm:mt-2",
  },
  caption: {
    en: "text-[10px] font-medium uppercase tracking-[0.25em] text-black/40",
    ko: `text-[0.50625rem] font-[350] tracking-[0.04em] sm:text-[0.5625rem] ${koreanClass}`,
    gap: "mt-0.5 sm:mt-1",
  },
  nav: {
    en: "text-[10px] font-medium uppercase tracking-[0.3em] sm:text-[11px]",
    ko: `text-[0.50625rem] font-[350] tracking-[0.04em] sm:text-[0.5625rem] ${koreanClass}`,
    gap: "mt-0.5",
  },
};

export function BilingualParagraph({
  text,
  textKo,
  variant = "md",
  className,
  enClassName,
  koClassName,
}: {
  text: string;
  textKo?: string;
  variant?: BilingualBodyVariant;
  className?: string;
  enClassName?: string;
  koClassName?: string;
}) {
  const styles = BODY_STYLES[variant];

  if (!textKo) {
    return <p className={enClassName ?? styles.en}>{text}</p>;
  }

  return (
    <div className={className}>
      <p className={enClassName ?? styles.en}>{text}</p>
      <p className={`${styles.gap} ${koClassName ?? styles.ko}`}>{textKo}</p>
    </div>
  );
}

export function BilingualSectionLabel({
  text,
  textKo,
  className,
}: {
  text: string;
  textKo?: string;
  className?: string;
}) {
  const en =
    "text-[10px] font-medium uppercase tracking-[0.3em] text-black/50 sm:text-[11px]";
  const ko = `mt-1 text-[0.50625rem] font-[350] tracking-[0.04em] sm:text-[0.5625rem] ${koreanClass}`;

  if (!textKo) {
    return <h2 className={`${en} ${className ?? ""}`}>{text}</h2>;
  }

  return (
    <div className={className}>
      <h2 className={en}>{text}</h2>
      <p className={ko}>{textKo}</p>
    </div>
  );
}

export function BilingualMetadataItem({
  label,
  value,
  valueKo,
}: {
  label: string;
  value: string;
  valueKo?: string;
}) {
  const labelKo = METADATA_LABELS_KO[label];

  return (
    <div className="border-t border-black/10 py-5 sm:py-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
        {label}
      </p>
      {labelKo && (
        <p className={`mt-1 text-[0.50625rem] sm:text-[0.5625rem] ${koreanClass}`}>
          {labelKo}
        </p>
      )}
      <p className="mt-2 whitespace-pre-line text-sm font-light tracking-tight text-black sm:text-base">
        {value}
      </p>
      {valueKo && (
        <p className={`mt-1.5 text-[0.675rem] sm:text-[0.7875rem] ${koreanClass}`}>{valueKo}</p>
      )}
    </div>
  );
}

export function BilingualBlock({
  english,
  korean,
  enClassName,
  koClassName,
  className,
}: {
  english: ReactNode;
  korean?: ReactNode;
  enClassName?: string;
  koClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={enClassName}>{english}</div>
      {korean && (
        <div className={`mt-1.5 sm:mt-2 ${koClassName ?? koreanClass}`}>
          {korean}
        </div>
      )}
    </div>
  );
}

export function BilingualContactRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const labelKo = METADATA_LABELS_KO[label];

  return (
    <li className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-12 sm:gap-8 sm:py-16">
      <div className="sm:col-span-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/40">
          {label}
        </span>
        {labelKo && (
          <p className={`mt-1 text-[0.50625rem] sm:text-[0.5625rem] ${koreanClass}`}>
            {labelKo}
          </p>
        )}
      </div>
      <div className="sm:col-span-9">{children}</div>
    </li>
  );
}
