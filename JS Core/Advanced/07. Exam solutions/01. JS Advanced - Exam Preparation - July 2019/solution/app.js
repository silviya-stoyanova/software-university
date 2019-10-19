function acceptance() {
    $('#acceptance').click(addInfo)

    function addInfo() {
        let company = $('[name="shippingCompany"]').val()
        let productName = $('[name="productName"]').val()
        let productQuantity = Number($('[name="productQuantity"]').val())
        let productScrape = Number($('[name="productScrape"]').val())

        if (company && productName &&
            !Number.isNaN(productQuantity) && !Number.isNaN(productScrape)) {
            if (productQuantity - productScrape > 0) {
                // should  the div element be created only once ??
                $('<div>')
                    .append($('<p>')
                        .text(`[${company}] ${productName} - ${productQuantity - productScrape} pieces`))
                    .append($('<button>')
                        .attr('type', 'button')
                        .text('Out of stock')
                        .click(deleteInfo))
                    .appendTo($('#warehouse'))
            }
        }

        $('[name="shippingCompany"]').val('')
        $('[name="productName"]').val('')
        $('[name="productQuantity"]').val('')
        $('[name="productScrape"]').val('')
    }

    function deleteInfo(e) {
        $(e.target).parent().remove()
    }
}