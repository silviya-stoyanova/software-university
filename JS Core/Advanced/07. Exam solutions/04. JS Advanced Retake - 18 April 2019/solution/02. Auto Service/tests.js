// constructor()
// property named garageCapacity
// property workInProgress - []
// property named backlogWork - []

// getter availableSpace()
// if there are cars in workInProgress
// if there are no cars in workInProgress

// signUpForReview()
// if there is availableSpace in the garage
// if there is no availableSpace

// repairCar()
// if there is at least 1 car to repair
// -- if there is 1 car in workInProgress and 0 in backlogWork
// -- if there is 1 car in backlogWork and 0 in workInProgress
// -- if there are cars in both workInProgress and backlogWork
// ----- if one part is broken in the above mentioned tests
// ----- if many parts are broken in the above mentioned tests
// ----- if there are no broken parts in the above mentioned tests
// if there are no cars to repair at all

// carInfo(plateNumber, clientName)
// if the car and the client both exists in the garage
// if only the car exists in the garage
// if only the client exists in the garage
// if the car and the client both do not exists in the garage

let mocha = require('mocha')
let assert = require('chai').assert
let AutoService = require('./02. Auto Service_Ресурси')

describe('tests for class AutoService', () => {
    let service
    beforeEach(() => {
        service = new AutoService(2)    //! do not change
    })

    describe('test the constructor', () => {
        it('should have prop garageCapacity', () => {
            assert.property(service, 'garageCapacity')
        })

        it('should be instantiated with garageCapacity', () => {
            assert.equal(service.garageCapacity, 2)
        })

        it('should have workInProgress - []', () => {
            let result = JSON.stringify(service.workInProgress)
            assert.equal(result, '[]')
        })

        it('should have backlogWork - []', () => {
            let result = JSON.stringify(service.backlogWork)
            assert.equal(result, '[]')
        })
    })

    describe('test the getter availableSpace()', () => {
        it('if there are cars in workInProgress', () => {
            service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
            let result = service.availableSpace
            assert.equal(result, 1)
        })

        it('if there are no cars in workInProgress', () => {
            let result = service.availableSpace
            assert.equal(result, 2)
        })
    })

    describe('test signUpForReview()', () => {
        it('if there is availableSpace', () => {
            service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
            let result = JSON.stringify(service.workInProgress)
            assert.equal(result, '[{"plateNumber":"A123C","clientName":"Potato","carInfo":{"engine":"lala","doors":"exist"}}]')
        })

        it('if there is no availableSpace', () => {
            service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
            service.signUpForReview('Patatini', 'B434H', { engine: 'broken', doors: 'none' })
            service.signUpForReview('Space ship', 'spacing', { engine: 'NSS', doors: 'pakdkc' })

            let workInProgress = JSON.stringify(service.workInProgress)
            let backlogWork = JSON.stringify(service.backlogWork)
            assert.equal(workInProgress, '[{"plateNumber":"A123C","clientName":"Potato","carInfo":{"engine":"lala","doors":"exist"}},{"plateNumber":"B434H","clientName":"Patatini","carInfo":{"engine":"broken","doors":"none"}}]')
            assert.equal(backlogWork, '[{"plateNumber":"spacing","clientName":"Space ship","carInfo":{"engine":"NSS","doors":"pakdkc"}}]')
        })

        describe('test repairCar()', () => {
            it('if 1 part is broken amd there is 1 car - in workInProgress', () => {
                service.signUpForReview('Space ship', 'spacing', { engine: 'NSS', doors: 'broken' })
                let result = service.repairCar()
                assert.equal(result, `Your doors were repaired.`)
            })

            it('if many parts are broken amd there is 1 car - in workInProgress', () => {
                service.signUpForReview('Space ship', 'spacing', { engine: 'broken', doors: 'broken' })
                let result = service.repairCar()
                assert.equal(result, `Your engine and doors were repaired.`)
            })

            it('if there are no broken parts amd there is 1 car - in workInProgress', () => {
                service.signUpForReview('Space ship', 'spacing', { engine: 'mine', doors: 'yes' })
                let result = service.repairCar()
                assert.equal(result, 'Your car was fine, nothing was repaired.')
            })

            it('if one part is broken amd there is 1 car in backlogWork and 0 in workInProgress', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                service.signUpForReview('Patatini', 'B434H', { engine: 'broken', doors: 'none' })
                service.signUpForReview('Space ship', 'spacing', { engine: 'broken', doors: 'pakdkc' })

                service.repairCar()
                service.repairCar()
                let result = service.repairCar()  // in backlogWork[]
                assert.equal(result, `Your engine were repaired.`)
            })

            it('if many parts are broken amd there is 1 car in backlogWork and 0 in workInProgress', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                service.signUpForReview('Patatini', 'B434H', { engine: 'broken', doors: 'none' })
                service.signUpForReview('Space ship', 'spacing', { engine: 'broken', doors: 'broken' })

                service.repairCar()
                service.repairCar()
                let result = service.repairCar()  // in backlogWork[]
                assert.equal(result, `Your engine and doors were repaired.`)
            })

            it('if there are no broken parts amd there is 1 car in backlogWork and 0 in workInProgress', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                service.signUpForReview('Patatini', 'B434H', { engine: 'broken', doors: 'none' })
                service.signUpForReview('Space ship', 'spacing', { engine: 'none', doors: 'azaz' })

                service.repairCar()
                service.repairCar()
                let result = service.repairCar()  // in backlogWork[]
                assert.equal(result, 'Your car was fine, nothing was repaired.')
            })

            it('if there are cars in both workInProgress and backlogWork', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                service.signUpForReview('Patatini', 'B434H', { engine: 'broken', doors: 'none' })
                service.signUpForReview('Space ship', 'spacing', { engine: 'none', doors: 'azaz' })

                let result = service.repairCar()
                assert.equal(result, 'Your car was fine, nothing was repaired.')
            })

            it('if there are no cars to repair at all', () => {
                let result = service.repairCar()
                assert.equal(result, 'No clients, we are just chilling...')
            })
        })

        describe('test carInfo()', () => {
            it('if the car and the client both exists in the garage', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                let result = JSON.stringify(service.carInfo('A123C', 'Potato'))
                let expected = '{"plateNumber":"A123C","clientName":"Potato","carInfo":{"engine":"lala","doors":"exist"}}'
                assert.equal(result, expected)
            })
            
            it('if only the car exists in the garage', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                let result = service.carInfo('A123C', 'Kiwi')
                let expected = `There is no car with platenumber A123C and owner Kiwi.`
                assert.equal(result, expected)
            })
            
            it('if only the client exists in the garage', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                let result = service.carInfo('plateNum', 'Potato')
                let expected = `There is no car with platenumber plateNum and owner Potato.`
                assert.equal(result, expected)
            })

            it('if the car and the client both do not exists in the garage', () => {
                service.signUpForReview('Potato', 'A123C', { engine: 'lala', doors: 'exist' })
                let result = service.carInfo('plateNum', 'Kiwi')
                let expected = `There is no car with platenumber plateNum and owner Kiwi.`
                assert.equal(result, expected)
            })
        })
    })
})
