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

            let t = tag.getBoundingClientRect().top + window.pageYOffset // 해당 h3 태그의 top 좌표를 가져옴.
            
            window.scrollTo({ top: t, behavior: 'smooth' }) // 해당 좌표의 위치로 스크롤된다.
        })
        li.innerText = tag.textContent; // h3 의 innerText를 가져와 할당한다.

        a.appendChild(li);
        toc_list.appendChild(a);
    })
}