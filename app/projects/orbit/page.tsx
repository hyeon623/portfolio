import { BilingualParagraph, BilingualTitle } from "../../components/bilingual";

export default function OrbitPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <BilingualTitle
        title="Orbit Dome Theater"
        titleKo="올빗 돔 시어터 프로젝트"
        size="detail"
        as="h1"
        englishClassName="text-6xl font-light text-black"
        koreanClassName="mt-2 text-[2.025rem] font-[350] tracking-[0.03em] leading-[1.35] text-[#777] font-korean"
      />

      <div className="mb-12 mt-8">
        <BilingualParagraph
          text="Immersive dome theater project developed for cultural and educational experiences."
          textKo="문화와 교육 경험을 위한 몰입형 돔 극장 프로젝트입니다."
          variant="lg"
        />
      </div>

      <img
        src="/images/orbit/orbit-hero02.png"
        alt="Orbit Dome Theater"
        className="w-full rounded-lg"
      />
    </main>
  );
}
