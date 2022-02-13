## 사용안내

-   처음 python3 manage.py runserver 시에 나오는 화면은 상품추가 url만 표시함
-   회원가입폼과 상품추가 폼의 양식이 달라 한 화면에 띄우지 못함
-   아래 url을 주소창에 입력하여 접속시 문제 없음
-   해당 사항 참고 부탁드립니다!
    <br>

## URL 정리

-   회원가입 : http://127.0.0.1:8000/users/auth/register
-   로그인 : http://127.0.0.1:8000/users/auth/login
-   로그아웃 : http://127.0.0.1:8000/users/auth/logout
-   소셜로그인-구글 : http://127.0.0.1:8000/users/auth/google
-   소셜로그인-네이버 : http://127.0.0.1:8000/users/auth/naver
    <br>

-   상품 추가 : http://127.0.0.1:8000/product/add
-   상품 정보 수정/삭제 : http://127.0.0.1:8000/product/add/{id} ({id}는 상품게시글의 id 값(숫자) / 예:http://127.0.0.1:8000/product/add/1)
-   전체 상품 리스트 : http://127.0.0.1:8000/product/productlist
-   상품 댓글 작성 : http://127.0.0.1:8000/product/comment
-   상품 댓글 수정/삭제 : http://127.0.0.1:8000/product/comment/{id}
-   전체 상품 댓글 리스트 : http://127.0.0.1:8000/product/commentlist
-   상품 태그 작성 : http://127.0.0.1:8000/product/tag (이 페이지에서 작성한 tag를 상품추가 페이지에서 선택 가능)
-   상품 태그 수정/삭제 : http://127.0.0.1:8000/product/tag/{id}
-   전체 상품 태그 리스트 : http://127.0.0.1:8000/product/taglist
    <br>

-   큐레이션 추가 : http://127.0.0.1:8000/curation/add
-   큐레이션 정보 수정/삭제 : http://127.0.0.1:8000/curation/add/{id}
-   전체 큐레이션 리스트 : http://127.0.0.1:8000/curation/curationlist
-   큐레이션 댓글 작성 : http://127.0.0.1:8000/curation/comment
-   큐레이션 댓글 수정/삭제 : http://127.0.0.1:8000/curation/comment/{id}
-   전체 큐레이션 댓그 리스트 : http://127.0.0.1:8000/curation/commentlist
-   큐레이션 태그 작성 : http://127.0.0.1:8000/curation/tag
-   큐레이션 태그 수정/삭제 : http://127.0.0.1:8000/curation/tag/{id}
-   전체 큐레이션 태그 리스트 : http://127.0.0.1:8000/curation/taglist
    <br>

-   상품 스크랩 : http://127.0.0.1:8000/scrap/product/add/
-   상품 스크랩 수정/삭제 : http://127.0.0.1:8000/scrap/product/add/{id}
-   전체 스크랩(상품) 리스트 : http://127.0.0.1:8000/scrap/product/list/
-   큐레이션 스크랩 : http://127.0.0.1:8000/scrap/curation/add/
-   큐레이션 스크랩 수정/삭제 : http://127.0.0.1:8000/scrap/curation/add/{id}
-   전체 스크랩(큐레이션) 리스트 : http://127.0.0.1:8000/scrap/curation/list/
