function loadRepos() {
    // Clear the contents of the list before any new content is appended.
    $("#repos").empty();
    let url = `https://api.github.com/users/${$("#username").val()}/repos`

    $.ajax({
        method: 'GET',
        url,
        success: displayRepos,
        error: displayError
    })

    function displayRepos(repos) {
        repos.map(repo => {
            let link = $('<a>')
            link.attr('href', repo.html_url)
                .text(repo.full_name)

            $('<li>')
                .attr('id', 'repos')
                .append(link)
                .appendTo($('#repos'))
        })

        console.log($("#repos li a"))
    }

    function displayError() {
        $('<li>')
            .attr('id', 'repos')
            .text('Error')
            .appendTo($('#repos'))
    }
}