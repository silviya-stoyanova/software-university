function attachEvents() {
    $('#btnLoadPosts').on('click', loadPosts)
    $('#btnViewPost').on('click', viewPost)
}

function loadPosts() {    
    let id = 'kid_S1htVfcmm'
    let url = `https://baas.kinvey.com/appdata/${id}/posts`
    let base64auth = btoa('peter:p')

    $.ajax({
        headers: { "Authorization": "Basic " + base64auth }, // must be first 
        method: 'GET',
        url
    }).then(response => showPostOptions(response))  
}

function showPostOptions(response) {
    response.forEach(el => {
        let option = $('<option>')
        option.val(el._id)
            .text(el.title)
            .appendTo($('#posts'))
    })
}

function viewPost() {
    let selectedPostId = $('#posts option:selected').val()
    let selectedPost = $('#posts option:selected').text()
    $('#post-title').text(selectedPost)
    let base64auth = btoa('peter:p')

    let postBody = $.ajax({
        headers: { "Authorization": "Basic " + base64auth },
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/kid_S1htVfcmm/posts/${selectedPostId}`
    })

    let comments = $.ajax({
        headers: { "Authorization": "Basic " + base64auth },
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/kid_S1htVfcmm/comments/?query={"post_id":"${selectedPostId}"}`
    })

    Promise.all([postBody, comments])
        .then((value) => showPostAndComm(value))
}

function showPostAndComm([el, comments]) {
    $('#post-body').text(el.body)

    $('#post-comments').empty()
    comments.forEach(comment => {
        let li = $('<li>')
        li.text(comment.text)
            .appendTo($('#post-comments'))
    })
}
