// API Authorization
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer e'
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
            makeCard(r);

            // 검색된 영화 수 카운트 // forEach 사용 *****            
            scdarr.forEach(a => {
                arrcount = arrcount + 1;
            });

            // 영화 수 카운트 출력 // DOM 제어 사용 *****
            let scdcount = document.getElementById('rsearchid');
            scdcount.innerText = '검색된 영화 수 : ' + arrcount + '건';

            // 출력된 영화 카드 중 가장 평점이 높은 영화(배열에서 0번째 영화)
            // 가 추천영화로 뜨고 있는지 확인하는 console.log삽입 = 확인용 // find 사용 *****
            scdarr.find(function(el, index) {
                console.log(index, el);
            });

            // 추천 영화로 가장 평점이 높은 영화 출력 // DOM 제어 사용 *****
            let ccmv = document.getElementById('ccmovieid');
            ccmv.innerText = "추천 영화는 '" + scdarr[0] + "' 입니다."; // arrcount를 제일 첫 영화 제목으로 교체
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
