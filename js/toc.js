/**
 * Table of Content
 */
function createToC() {
    const tags = document.querySelectorAll('h3');
    const toc_list = document.querySelector('#toc-list');

    tags.forEach((tag) => {
        let a = document.createElement('a');
        let li = document.createElement('li');

        // toc 요소를 클릭하면 해당 content 의 위치로 스크롤 되는 이벤트.
        a.addEventListener('click', function (e) {
            e.preventDefault();

            let t = tag.getBoundingClientRect().top + window.pageYOffset - 100 // 해당 h3 태그의 top 좌표를 가져옴. + 340 은 스크롤 위치를 조정하기 위한 오프셋
            
            window.scrollTo({ top: t, behavior: 'smooth' }) // 해당 좌표의 위치로 스크롤된다.
        })
        li.innerText = tag.textContent; // h3 의 innerText를 가져와 할당한다.
        li.classList.add('toc-item');

        a.appendChild(li);
        toc_list.appendChild(a);
    })
    let selectedIndex = 0;
    const visibleMap = new Map(); // 보이는 요소 추적
    const tocItems = document.querySelectorAll('.toc-item');
    // 현재 관찰중인 태그들 중 변화가 생긴 태그들의 list 를 브라우저가 entries 로 던져준다.
    const observer = new IntersectionObserver(entries => {
        // h3 들이 화면에 보이면 target1 : true, 안보이면 target2 : false 이런 식으로 저장.
        entries.forEach(entry => {
            visibleMap.set(entry.target, entry.isIntersecting);
        });

        let selectedToCItemTop = 9999;
        visibleMap.forEach((isVisible, target) => {
            if(isVisible) {
                // 화면에 보이는 h3(target) 중 최상단 요소만 선택하는 분기문.
                if(target.getBoundingClientRect().top < selectedToCItemTop){
                    selectedToCItemTop = target.getBoundingClientRect().top;
                    // 이전에 선택된 toc 요소의 class 에서 selected 삭제
                    tocItems[selectedIndex].classList.remove('selected');
                    // 현재 화면에 highlight 되어야하는 toc 요소에 selected 클래스 추가.
                    selectedIndex = target.dataset.index;
                    tocItems[selectedIndex].classList.add('selected');
                }
            }
        });
    });
    // observer 에 관찰할 tag들을 등록한다.
    tags.forEach(tag => observer.observe(tag));
}