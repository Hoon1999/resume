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

            let t = tag.getBoundingClientRect().top + window.pageYOffset - 340 // 해당 h3 태그의 top 좌표를 가져옴. + 340 은 스크롤 위치를 조정하기 위한 오프셋
            
            window.scrollTo({ top: t, behavior: 'smooth' }) // 해당 좌표의 위치로 스크롤된다.
        })
        li.innerText = tag.textContent; // h3 의 innerText를 가져와 할당한다.
        li.classList.add('toc-item');

        a.appendChild(li);
        toc_list.appendChild(a);
    })
    let selectedIndex = 0;
    const tocItems = document.querySelectorAll('.toc-item');
    // 현재 관찰중인 태그들 중 변화가 생긴 태그들의 list 를 브라우저가 entries 로 던져준다.
    const observer = new IntersectionObserver(entries => {
        // 변화가 생긴 tag (여기서는 화면에 들어오는 tag 를 의미함) 의 class 를 변경하여 style에 변화를 준다.
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1번 요소가 화면에 들어오면, 이전 값인 0또는 2번 요소의 class 에서 selected 가 삭제됨.
                tocItems[selectedIndex].classList.remove('selected');
                // selectedIndex 에 1이 할당되고, 1번 요소의 class 에 selected 가 추가됨
                selectedIndex = entry.target.dataset.index;
                tocItems[selectedIndex].classList.add('selected');
            }   
        })
    })
    // observer 에 관찰할 tag들을 등록한다.
    tags.forEach(tag => observer.observe(tag));
}