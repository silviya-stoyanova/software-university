function increment(selector) {
    let textArea = $('<textarea class="counter" value="0" disabled>0</textarea>')
    let incrementBtn = $('<button class="btn" id="incrementBtn">Increment</button>')
    let addBtn = $('<button class="btn" id="addBtn">Add</button>')
    let ul = $('<ul class="results"></ul>')

    incrementBtn.click(increaseNum)
    addBtn.click(addNum)

    function increaseNum() {
        textArea.val(Number(textArea.val()) + 1)
    }

    function addNum() {
        let li = $(`<li>${textArea.val()}</li>`)
        li.appendTo(ul)
    }

    $(selector)
        .append(textArea)
        .append(incrementBtn)
        .append(addBtn)
        .append(ul)
}
