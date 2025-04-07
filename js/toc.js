/**
 * Table of Content
 */
function createToC() {
    const tags = document.querySelectorAll('h3');
    const toc_list = document.querySelector('#toc-list');

    tags.forEach((tag) => {
        let li = document.createElement('li');
        li.innerText = tag.textContent; // h3 의 innerText를 가져와 할당한다.
        toc_list.appendChild(li);
    })
}