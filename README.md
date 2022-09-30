# 📚 그룹필사 전용 서비스 '리필(Refill)'

## ✅ 요약
- 제10회 문화데이터 활용 경진대회 예선전에서 진행한 프로젝트 입니다.
- **필사 습관을 형성하고 필사 모임을 쉽게 관리/참여하기 위한 그룹 매칭 서비스 리필(Refill)**

## ⚙️ 기술 스택
<div style='display: flex;'>
  <img alt="Typescript" src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Next.js" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/tailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img alt="SWR" src="https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=swr&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

## ⭐️ 구현한 기능
![스크린샷 2022-08-24 12 28 19](https://user-images.githubusercontent.com/33178048/186321276-b1a81540-120f-4b73-9936-4e2a97e689a2.png)

## 🎨 UI
![회원가입, 로그인](https://user-images.githubusercontent.com/33178048/186322108-06459f81-79cd-45f9-85a9-69a4443524f2.png)
![홈,가입한 그룹활동](https://user-images.githubusercontent.com/33178048/186322211-26ec4031-cf03-4e75-8fe9-d9c5c2674858.png)
![필사 인증](https://user-images.githubusercontent.com/33178048/186322478-8e618c0d-1cab-49ef-90ef-6fabed40db9c.png)
![글감 카테고리](https://user-images.githubusercontent.com/33178048/186322555-2c8f8944-a350-4f67-ae83-c352bb53687e.png)
![그룹찾기, 신청](https://user-images.githubusercontent.com/33178048/186322595-494f7e2b-9bc3-4a9e-a6fa-7b0ee0d05da9.png)
![마이페이지](https://user-images.githubusercontent.com/33178048/186322613-b869db0a-7e15-44f2-9e9f-a966f85ca9a2.png)

## 🧐 고민
- 서버 API마다 따로 관리되고 있던 **에러처리 로직을 모듈화**하기 위한 시도를 하였습니다. [PR#21](https://github.com/Endless-Creation-32nd/refill-front/pull/21)
- **상태 로직 재사용**을 위해 custom hook을 제작하여 재사용성을 챙겼습니다. [PR#40](https://github.com/Endless-Creation-32nd/refill-front/pull/40)
- 속도가 느린 네트워크 환경에서 발생하는 딜레이를 **optimistic UI**를 적용하여 UI/UX 개선 [PR#42](https://github.com/Endless-Creation-32nd/refill-front/pull/42)

## 🛠 리팩터링 진행 중
- [ ] 페이지 컴포넌트에 작성된 API로직(API 처리 결과에 따른 상태로직도 포함)을 **hook으로 분리**합니다. [issue#45](https://github.com/Endless-Creation-32nd/refill-front/issues/45)
- [ ] 이미지를 불러올 때 **로딩상태일 경우 빈공간으로 보이는 것을 스캘레톤을 적용**하여 UI에 표시합니다.
