class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory
        this.cpuGHz = cpuGHz
        this.hddMemory = hddMemory
        this.taskManager = []
        this.installedPrograms = []
    }

    installAProgram(name, requiredSpace) {
        if (this.hddMemory - requiredSpace < 0) {
            throw new Error("There is not enough space on the hard drive")
        }

        this.hddMemory -= requiredSpace
        let program = { name, requiredSpace }
        this.installedPrograms.push(program)

        return program
    }

    uninstallAProgram(name) {
        let programExists = false
        let programIndex = -1

        this.installedPrograms.findIndex((obj, i) => {
            if (obj.name === name) {
                programExists = true
                programIndex = i
            }
        })

        if (!programExists) {
            throw new Error("Control panel is not responding")
        }
        let freeSpace = this.installedPrograms[programIndex].requiredSpace
        this.installedPrograms.splice(programIndex, 1)
        this.hddMemory += freeSpace

        return this.installedPrograms
    }

    openAProgram(name) {
        let programExists = false
        let programIndex = -1

        this.installedPrograms.findIndex((obj, i) => {
            if (obj.name === name) {
                programExists = true
                programIndex = i
            }
        })

        if (!programExists) {
            throw new Error(`"The ${name} is not recognized`)
        }

        let isOpen = false
        this.taskManager.find(obj => {
            if (obj.name === name) {
                isOpen = true
            }
        })

        if (isOpen) {
            throw new Error(`The ${name} is already open`)
        }

        let openedRamUsagePercentage = 0
        let openedCpuUsagePercentage = 0

        this.taskManager.map(obj => {
            openedRamUsagePercentage += obj.ramUsage
            openedCpuUsagePercentage += obj.cpuPercentage
        })

        let currProgramRamPercentage = this.installedPrograms[programIndex].requiredSpace / this.ramMemory * 1.5
        let currProgramCpuPercentage = this.installedPrograms[programIndex].requiredSpace / this.cpuGHz / 500 * 1.5

        openedRamUsagePercentage += currProgramRamPercentage
        openedCpuUsagePercentage += currProgramCpuPercentage

        let usedRam = openedRamUsagePercentage / 100 / this.ramMemory
        let usedCPU = openedCpuUsagePercentage / 100 / this.cpuGHz

        if (usedRam > 1) {
            throw new Error(`${programName} caused out of memory exception`)
        }

        if (usedCPU > 1) {
            throw new Error(`${programName} caused out of cpu exception`)
        }

        let openedProgram = {
            name,
            ramUsage: currProgramRamPercentage,
            cpuUsage: currProgramCpuPercentage
        }

        this.taskManager.push(openedProgram)

        return openedProgram

    }

    taskManagerView() {
        let output = []

        if (this.taskManager.length === 0) {
            return "All running smooth so far"
        }

        this.taskManager.map(obj => {
            output.push(`Name - ${obj.name} | Usage - CPU: ${obj.cpuUsage.toFixed(0)}%, RAM: ${obj.ramUsage.toFixed(0)}%`)
        })

        return output.join('\n')
    }
}
