## Frontend 시작하는 법

0. node js 깔기 (npm 명령어 깔기)
1. cd frontend
2. npm start

### 추가
1. `npm install [라이브러리 이름]`
2. localhost:3000

### 폴더 구조 정리
```
ZIPPROJECT\FRONTEND\SRC       
│  App.css   
│  App.js        // 컴포넌트 합치는 부분 
│  index.js      // react DOM 
│
└─components     // 컴포넌트 모아놓은 폴더
    │  Button.css
    │  Button.js
    │  CardItem.js
    │  Cards.css
    │  Cards.js
    │  Dropzone.css
    │  Dropzone.js
    │  Footer.css
    │  Footer.js
    │  HeroSection.css
    │  HeroSection.js
    │  index.js
    │  Navbar.css
    │  Navbar.js
    │
    ├─forms             //form 컴포넌트 모아놓은 폴더
    │      CForm.js
    │      CurationForm.js
    │      Form.css
    │      Form.js
    │      FormSuccess.js
    │      IForm.js
    │      SignupForm.js
    │      useForm.js
    │      validateInfo.js
    │
    ├─images    
    │      generic.png
    │      remove.png
    │      upload.png
    │
    └─pages                 //페이지(url 가지고있는) 폴더
            CurationAdd.js
            CurationDetail.js
            Curations.js
            Home.js
            ItemAdd.js
            Products.js
            SignUp.js
```
