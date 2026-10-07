import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Math Alarm Privacy Policy",
  description: "Privacy policy for the Math Alarm iOS app",
  robots: { index: true, follow: true },
};

export default function AlarmPrivacyPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0f1419",
        color: "#f2f5f8",
        fontFamily:
          '"SF Pro Text", "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "48px 20px 64px",
      }}
    >
      <article style={{ maxWidth: 680, margin: "0 auto", lineHeight: 1.65 }}>
        <p style={{ color: "#3dd6c6", fontWeight: 650, marginBottom: 12 }}>
          MATH ALARM
        </p>
        <h1 style={{ fontSize: "2rem", margin: "0 0 8px" }}>개인정보 처리방침</h1>
        <p style={{ color: "#8b9aab", marginTop: 0 }}>최종 업데이트: 2026-10-07</p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: "1.15rem" }}>개요</h2>
          <p>
            Math Alarm(이하 &quot;앱&quot;)은 기상 알람과 수학 문제 해제 기능만
            제공합니다. 회원가입, 광고, 추적, 분석 SDK를 사용하지 않습니다.
          </p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem" }}>수집하는 정보</h2>
          <p>
            앱은 개인을 식별할 수 있는 정보를 수집하지 않습니다. 알람 시각,
            켜짐 여부, 난이도 설정은 기기 내부 저장소에만 보관되며 외부 서버로
            전송되지 않습니다.
          </p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem" }}>권한</h2>
          <ul>
            <li>
              <strong>알림</strong>: 설정한 시각에 로컬 알림을 보내기 위해
              사용합니다.
            </li>
            <li>
              <strong>화면 켜짐 유지</strong>: 알람이 켜져 있거나 울리는 동안
              화면이 꺼지지 않도록 요청할 수 있습니다.
            </li>
          </ul>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem" }}>제3자 공유</h2>
          <p>수집·공유하는 개인정보가 없습니다.</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem" }}>아동</h2>
          <p>
            앱은 아동을 대상으로 하지 않으며, 아동의 개인정보를 고의로 수집하지
            않습니다.
          </p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.15rem" }}>문의</h2>
          <p>
            개인정보 관련 문의는 GitHub Issues로 연락해 주세요:{" "}
            <a
              href="https://github.com/hyeon623/portfolio/issues"
              style={{ color: "#3dd6c6" }}
            >
              github.com/hyeon623/portfolio/issues
            </a>
          </p>
        </section>

        <p style={{ marginTop: 36 }}>
          <Link href="/alarm" style={{ color: "#3dd6c6" }}>
            ← Math Alarm으로 돌아가기
          </Link>
        </p>
      </article>
    </main>
  );
}
