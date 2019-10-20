// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution() {
    // console.log("GOOD LUCK c(:");
    let sendBtn = $('#inputSection button')
    sendBtn.click(sendQuestion)

    function sendQuestion() {
        let newQuestion = $('#inputSection textarea').val()
        let username = $('#inputSection input').val()

        if (!username) {
            username = 'Anonymous'
        }

        let divPendQ = $('<div>')
        divPendQ.addClass('pendingQuestion')

        let img = $('<img>')
        img.attr('src', './images/user.png')    //  "width="32" "height="32"
            .attr('width', '32')
            .attr('height', '32')

        let span = $('<span>')
        span.text(username)

        let p = $('<p>')
        p.text(newQuestion)

        let divAct = $('<div>')
        divAct.addClass('actions')
        let btnArch = $('<button>')
        btnArch.addClass('archive').text('Archive')
        btnArch.on('click', archiveQuest)

        let btnOpen = $('<button>')
        btnOpen.addClass('open').text('Open')
        btnOpen.on('click', openQuest)

        divAct.append(btnArch)
            .append(btnOpen)

        divPendQ.append(img)
            .append(span)
            .append(p)
            .append(divAct)
            .appendTo($('#pendingQuestions'))
    }

    function archiveQuest(e) {
        let question = $(e.target).parent().parent().remove()
    }

    function openQuest(e) {
        let questionDiv = $(e.target).parent().parent()
        let username = questionDiv.find('span').text()
        let question = questionDiv.find('p').text()

        $(e.target).parent().parent().remove()
        //

        let divOpenQ = $('<div>')
        divOpenQ.addClass('openQuestion')

        let img = $('<img>')
        img.attr('src', './images/user.png')    //  "width="32" "height="32"
            .attr('width', '32')
            .attr('height', '32')

        let span = $('<span>')
        span.text(username)

        let p = $('<p>')
        p.text(question)

        let divAct = $('<div>')
        divAct.addClass('actions')
        let replyBtn = $('<button>')
        replyBtn.addClass('reply')
            .text('Reply')
            .click(reply)
            .appendTo(divAct)

        divOpenQ.append(img)
            .append(span)
            .append(p)
            .append(divAct)
            .appendTo($('#openQuestions'))

        let div = $('<div>')
        div.addClass('replySection')

        let input = $('<input>')
        input.addClass('replyInput')
            .attr('type', 'text')
            .attr('placeholder', "Reply to this question here...")

        let button = $('<button>')
        button.addClass('replyButton')
            .text('Send')
            .click(sendComm)

        let ol = $('<ol>')
        ol.addClass('reply')
            .attr('type', '1')

        div.append(input)
            .append(button)
            .append(ol)
            .css('display', 'none')
            .appendTo(divOpenQ)
    }

    function reply(e) {
        let question = $(e.target).parent().parent()
        let replySection = question.find('.replySection')
        let replyBtn = question.find('button').eq(0)
        sendComm(e)

        replyBtn.off('click', reply)
        replyBtn.text('Back')
        replyBtn.on('click', back)

        replySection.css('display', 'block')
    }

    function sendComm(e) {
        let question = $(e.target).parent().parent()
        let message = question.find('input').val()
        let ol = question.find('ol')

        if (message) {
            let li = $('<li>')
            li.text(message)
            li.appendTo(ol)
        }
        let replyBtn = question.find('button').eq(0)
        replyBtn.text('Send')

        question.find('input').val('')
    }

    function back(e) {

        let question = $(e.target).parent().parent()

        let replySection = question.find('.replySection')
        replySection.css('display', 'none')

        let replyBtn = question.find('button').eq(0)
        replyBtn.on('click', reply)
        replyBtn.text('Reply')
        replyBtn.off('click', back)
    }
}