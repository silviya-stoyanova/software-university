class LineManager {
    constructor(stops) {
        this.stops = stops
        this.currStopId = 0
        this.totalMinutes = 0
        this.currentDelay = 0
    }

    // get stops() {
    //     return this._stops
    // }

    set stops(stops) {
        stops.forEach(stop => {
            if (stop.name.length === 0) {
                throw new Error('The name cannot be empty string!')
            }

            if (typeof stop.name !== 'string') {
                throw new Error('The name must be a string!')
            }

            if (stop.timeToNext < 0) {
                throw new Error('timeToNext stop cannot be negative number!')
            }

            if (typeof stop.timeToNext !== 'number') {
                throw new Error('timeToNext must be a number!')
            }

            this._stops = stops
        })
    }

    get atDepot() {
        let lastStopId = this._stops.length - 1

        if (this.currStopId === lastStopId) {
            return true
        } else {
            return false
        }
    }

    get nextStopName() {
        let lastStopId = this._stops.length - 1

        if (this.currStopId === lastStopId) {
            return 'At depot.'
        }

        let nextStop = this._stops[this.currStopId + 1].name
        return nextStop
    }

    get currentDelay() {
        return this._currentDelay
    }

    set currentDelay(minutes) {
        if (!this._currentDelay) {
            this._currentDelay = 0
        }

        this._currentDelay += minutes
    }

    arriveAtStop(minutes) {
        if (minutes < 0) {
            throw new Error('Minutes must be represented by a positive number.')
        }
        if (this.atDepot) {
            throw new Error('The last stop is reached!')
        }

        // to add the duration of minutes 
        this.totalMinutes += minutes
        this.currentDelay = minutes - this._stops[this.currStopId].timeToNext
        this.currStopId = this.currStopId + 1

        if (!this.atDepot) {
            return true
        } else {
            return false
        }
    }

    toString() {
        let output = 'Line summary\n'

        !this.atDepot
            ? output += `- Next stop: ${this.nextStopName}\n`
            : output += `- Course completed\n`

        output += `- Stops covered: ${this.currStopId}\n`
        output += `- Time on course: ${this.totalMinutes} minutes\n`
        output += `- Delay: ${this._currentDelay} minutes`

        return output
    }
}

// Initialize a line manager with correct values
const man = new LineManager([{ name: 'depot', timeToNext: 1 }, { name: 'depot', timeToNext: 1 }]);
console.log(man.toString())


// Travel through all the stops until the bus is at depot
while (man.atDepot === false) {
    //  console.log(man.toString());
    man.arriveAtStop('4');
}