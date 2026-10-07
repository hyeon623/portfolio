# Math Alarm — App Store 제출 준비

이 폴더는 Expo(React Native) 네이티브 앱입니다. Linux/클라우드에서도 EAS로 iOS 바이너리를 만들고 App Store Connect에 올릴 수 있습니다.

## 1. 사전 준비 (Apple)

1. [Apple Developer Program](https://developer.apple.com/programs/) 등록
2. [App Store Connect](https://appstoreconnect.apple.com)에서 새 앱 생성
   - 이름: Math Alarm
   - Bundle ID: `com.donghyeon.mathalarm`
   - 카테고리: Utilities
3. 개인정보 처리방침 URL을 배포 사이트 `/alarm/privacy`로 연결

## 2. EAS 프로젝트 연결

```bash
cd math-alarm
npx eas-cli@latest login
npx eas-cli@latest init
```

`app.json`의 `extra.eas.projectId`와 `eas.json`의 `ascAppId` / `appleTeamId`를 실제 값으로 교체합니다.

## 3. 빌드 & 제출

```bash
# iOS 프로덕션 빌드
npx eas-cli@latest build --platform ios --profile production

# App Store Connect 업로드
npx eas-cli@latest submit --platform ios --profile production
```

## 4. 심사 체크리스트

- [ ] 스크린hots (iPhone 6.7", 6.5" 등) — 메인 화면 + 수학 문제 화면
- [ ] `store/metadata.json` 문구를 App Store Connect에 붙여넣기
- [ ] Privacy Policy URL 접속 확인
- [ ] App Privacy: Data Not Collected
- [ ] Export Compliance: 암호화 미사용 (`ITSAppUsesNonExemptEncryption: false`)
- [ ] Review Notes에 `store/metadata.json`의 `reviewNotes` 사용
- [ ] 실제 기기에서 알림 권한 허용 후 알람 예약 테스트

## 5. 심사 포인트

- 알람은 **로컬 알림**만 사용 (푸시 서버 없음)
- 계정/로그인/추적 없음
- 종료 조건: 수학 문제 정답 입력
