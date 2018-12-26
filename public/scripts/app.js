$(document).ready(()=> {

    $(document).on('click','#search-btn',(e) => {
        e.preventDefault();
        const $searchText = $('#search-text');
        const searchValue = $searchText.val();
        window.location.href = '/search?q=' + searchValue;

    })


});