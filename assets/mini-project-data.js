// Each pool is independent. Never filter a word or incident by genre.
export const AXES = [
 {key:'genre',label:'장르',values:['생활 앱','미니 게임','업무 프로그램','데이터 시각화','시뮬레이터','창작 도구','교육 프로그램','자유형 프로그램']},
 {key:'subject',label:'주어',values:['고양이','로봇','신입 사원','탐험가','할머니','냉장고','우주인','정원사','시계','택배 기사','도서관 사서','잠꾸러기','용','나무','유령','작은 가게 주인','길 잃은 여행자','음악가','미래의 나','말하는 돌멩이']},
 {key:'space',label:'공간',values:['우주 정거장','도서관','무인도','지하철','냉장고 안','숲','공장','학교','가상 공간','바닷속','무대 뒤','엘리베이터','옥상 정원','편의점','꿈속','시간이 멈춘 마을','공항','미로','달나라','비밀 연구실']},
 {key:'adjective',label:'형용사·성격',values:['겁이 많은','고장 난','투명한','수다스러운','서두르는','거꾸로 움직이는','기억력이 나쁜','낯을 가리는','빛나는','비밀스러운','졸린','욕심 많은','모든 것을 의심하는','길을 잘 잃는','아주 작은','혼자 있고 싶은','색이 바뀌는','느긋한','규칙을 좋아하는','상상을 잘하는']},
 {key:'verb',label:'동사',values:['분류하다','모으다','숨기다','찾다','기억하다','교환하다','예약하다','탈출하다','연결하다','계산하다','돌보다','예측하다','정렬하다','변신하다','선택하다','배달하다','기록하다','협상하다','반복하다','균형을 맞추다']},
 {key:'incident',label:'돌발 상황',values:['시간이 거꾸로 흐르기 시작한다','같은 요청이 두 번 들어온다','사용할 수 있는 자원이 하나만 남는다','모든 소리가 사라진다','기록 일부를 잃어버린다','갑자기 사용자가 열 배로 늘어난다','중간에 규칙 하나가 바뀐다','화면의 색을 구별할 수 없게 된다','방금 한 행동을 취소해야 한다','서로 반대되는 요구가 동시에 들어온다','계속 같은 결과만 나온다','인터넷 연결이 끊긴다','아무 데이터도 없는 상태가 된다','모든 선택에 제한 시간이 생긴다','주인공의 역할이 서로 바뀐다','사용자가 엉뚱한 값을 입력한다','재시작해도 이전 상황이 남아야 한다','숨겨져 있던 조건이 뒤늦게 드러난다','버튼을 딱 세 번만 누를 수 있다','예상하지 못한 손님이 등장한다']}
];

export function validMission(value){
 return Boolean(value && typeof value==='object' && !Array.isArray(value) && Object.keys(value).length===AXES.length && AXES.every(a=>a.values.includes(value[a.key])));
}
export function drawMission(previous=null,locks={},genre='',random=Math.random){
 const result={};
 for(const axis of AXES){
  if(axis.key==='genre'&&axis.values.includes(genre))result.genre=genre;
  else if(validMission(previous)&&locks[axis.key])result[axis.key]=previous[axis.key];
  else result[axis.key]=axis.values[Math.min(axis.values.length-1,Math.floor(random()*axis.values.length))];
 }
 return result;
}
export function missionText(mission,caption=''){
 if(!validMission(mission))throw Error('미션을 먼저 뽑아 주세요.');
 return '# 파이썬 미니 프로젝트\n\n'+AXES.map(a=>`${a.label}: ${mission[a.key]}`).join('\n')+'\n\n내 해석: '+(caption||'직접 작성하세요.')+'\n\n장르와 단어, 돌발 상황은 서로 독립적으로 뽑았습니다. 조합을 이야기·화면·규칙·데이터로 자유롭게 해석하되, 각 요소를 어디에 반영했는지 설명하세요. 돌발 상황도 프로그램에서 직접 해결해야 합니다.\n\n필수 결과: Python 프로그램, 조작 가능한 UI, 핵심 기능 3개, 돌발 상황 재현·해결 시연, 직접 수정한 기능과 시험 기록.\n';
}
export function aiPrompt(mission,caption=''){
 return missionText(mission,caption)+'\n나는 코딩을 처음 배우는 사람입니다. 이 조합으로 4시간 안에 만들 수 있는 개인 Python 프로젝트를 계획해 주세요. 먼저 서로 다른 아이디어 3개를 제안하고 내가 선택할 수 있게 해 주세요. 각 아이디어에 핵심 기능 3개, 한 화면의 UI 구성, 돌발 상황을 재현하고 해결할 방법을 적어 주세요. 이야기 속 사건·게임 규칙·기능 제약 등 자유롭게 해석해 주세요. 장르 때문에 다른 단어를 빼거나 바꾸지 마세요.\n\n아이디어를 고른 뒤에는 가장 작은 실행 가능한 버전부터 만듭니다. 이미 준비된 환경에서 사용할 수 있는 UI 도구를 우선하고 필요한 설치가 있으면 알려 주세요. 코드에는 처음 보는 용어·기호·각 기능의 이유를 한국어 주석으로 설명하세요. 파일 이름·저장 위치·실행 명령·예상 결과·오류 해결을 함께 알려 주세요. 유료 API나 별도 서버 없이도 완성 가능한 범위로 제안해 주세요. 기능 하나씩 추가하며 내가 직접 실행·시험할 수 있게 도와주세요.\n';
}
