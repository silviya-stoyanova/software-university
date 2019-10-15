function solve(inputArr, sortingCriteria) {
    let allTickets = []

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination
            this.price = Number(price)
            this.status = status
        }
    }

    for (let ticket of inputArr) {
        ticket = ticket.split('|')
        let ticketObj = new Ticket(ticket[0], ticket[1], ticket[2])
        allTickets.push(ticketObj)
    }

    if (sortingCriteria === 'destination') {
        allTickets.sort((a, b) => a.destination.localeCompare(b.destination))

    } else if (sortingCriteria === 'price') {
        allTickets.sort((a, b) => a.price - b.price)

    } else if (sortingCriteria === 'status') {
        allTickets.sort((a, b) => a.status.localeCompare(b.status))
    }

    return allTickets
}

let resultArray = solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'price');
console.log(resultArray);