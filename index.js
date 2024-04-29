// API Authorization
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjMyMGNmY2Y2ZDdhYTc3ZTQxNTg0YzAxMTI5MWRlOSIsInN1YiI6IjY2MjhiOGYwYWY5NTkwMDE2NDZhMTQxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lEQ6J5sg5aCUZhM6bXnDEXr4p4bqytNSjtucNb_sH3Y'
    }
};
let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
let r; // fetch 받을 변수
let scdarr = [];

// 영화카드섹션에 만들어진 영화카드를 출력하는 함수
let getCard = function () {
    // TMDB API 가져오기(fetch)
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            scdarr = [];
            arrcount = 0;
            let r = response['results'];

            // 검색된 영화 수 카운트
            makeCard(r);
            scdarr.forEach(a => {
                arrcount = arrcount + 1;
            });
            let scdcount = document.getElementById('rsearchid');
            scdcount.innerText = '검색된 영화 수 : ' + arrcount + '건';

        })
        .catch(err => console.error(err));
};
getCard(); // 페이지를 시작하면 일단 영화카드 전부 다 띄움

// 영화카드를 만드는 함수
let makeCard = function N(n) {

    // 카드생성
    for (let i = 0; i < n.length; i++) {
        let title = n[i]['title'];
        let vote_average = n[i]['vote_average'];
        let poster_path = n[i]['poster_path'];
        let overview = n[i]['overview'];
        let id = n[i]['id'];
        let titleLower = title.toLowerCase();
        let searchLower = searchWord.toLowerCase();
        if (titleLower.includes(searchLower)) {
            let temp_html = `
                        <div id="${id}" class="tempcls" onclick="alert('영화 id : ${id}')">
                            <div class="postercls" style="float:left">
                                <img style="border: 3px solid gold; border-radius: 7px;" src="https://image.tmdb.org/t/p/w200${poster_path}">
                            </div>
                            <div class="trocls">
                                <div class="titleratingcls">
                                    <h3>${title}</h3>
                                    <p style>⭐${vote_average}</p>
                                </div>
                                <div class="overviewcls">
                                    <p>${overview}</p>
                                </div>
                            <div>
                        </div>
                    `;
            const thml = document.getElementById('cardtempid');
            thml.insertAdjacentHTML("BeforeEnd", temp_html);
            scdarr.push(title);
        } else {
            let temp_html = `
                        <div id="${id}" class="tempcls" onclick="alert('영화 id : ${id}')" style="display:none">
                            <div class="postercls" style="float:left">
                                <img style="border: 3px solid gold; border-radius: 7px;" src="https://image.tmdb.org/t/p/w200${poster_path}">
                            </div>
                            <div class="trocls">
                                <div class="titleratingcls">
                                    <h3>${title}</h3>
                                    <p style>⭐${vote_average}</p>
                                </div>
                                <div class="overviewcls">
                                    <p>${overview}</p>
                                </div>
                            <div>
                        </div>
                    `;
            const thml = document.getElementById('cardtempid');
            thml.insertAdjacentHTML("BeforeEnd", temp_html);
        };
    };
};

// 다 삭제하고 getCard 함수 실행 : 일반 화살표 함수로
let delCard = () => {
    const deldiv = document.getElementById('cardtempid');
    deldiv.innerHTML = '';
    getCard();
}

// Search 버튼 누르면
let searchWord = "";
let searchClick = function () {
    searchWord = document.getElementById('searchmvid').value;
    delCard();
}
