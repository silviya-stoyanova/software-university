class Organization {
    constructor(name, budget) {
        this.name = name
        this.budget = budget
        this.employees = []
    }

    get departmentsBudget() {
        let marketing = this.budget * 0.4
        let finance = this.budget * 0.25
        let production = this.budget * 0.35

        return {
            marketing,
            finance,
            production
        }
    }

    add(employeeName, department, salary) {
        if (this.departmentsBudget[department] >= salary) {
            let employee = {
                employeeName,
                department: department.toLowerCase(),
                salary
            }

            this.employees.push(employee)
            this.departmentsBudget[department] -= salary
            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`

        } else {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`
        }
    }

    findEmployee(employeeName) {
        let obj = { exists: false }

        this.employees.forEach(emp => {
            if (emp.employeeName === employeeName) {
                obj = {
                    exists: true,
                    department: emp.department
                }
            }
        })

        return obj
    }

    employeeExists(employeeName) {
        let { exists, department } = this.findEmployee(employeeName)
        let output

        exists
            ? output = `Mr./Mrs. ${employeeName} is part of the ${department} department.`
            : output = `Mr./Mrs. ${employeeName} is not working in ${this.name}.`

        return output
    }

    leaveOrganization(employeeName) {
        let { exists, department } = this.findEmployee(employeeName)
        let output

        if (exists) {
            let empIndex = this.employees.findIndex(emp => emp.department === department)
            this.departmentsBudget[department] += this.employees[empIndex].salary
            output = `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`
        } else {
            output = `Mr./Mrs. ${employeeName} is not working in ${this.name}.`
        }

        return output
    }

    findDepartEmps(department) {
        let employees = this.employees.reduce((acc, emp) => {
            if (emp.department === department) {
                acc.push(emp)
            }
            return acc
        }, [])

        return employees
    }

    reduceEmps(employees) {
        employees = employees.reduce((acc, emp) => {
            acc.push(emp.employeeName)
            return acc
        }, [])
            .join(', ')

        return employees
    }

    status() {
        let output = `${this.name.toUpperCase()} DEPARTMENTS:`

        let marketingEmp = this.findDepartEmps('marketing')
        let financeEmp = this.findDepartEmps('finance')
        let productionEmp = this.findDepartEmps('production')

        output += `\nMarketing | Employees: ${marketingEmp.length}: `
        output += this.reduceEmps(marketingEmp)

        output += `\nFinance | Employees: ${financeEmp.length}: `
        output += this.reduceEmps(financeEmp)

        output += `\nProduction | Employees: ${productionEmp.length}: `
        output += this.reduceEmps(productionEmp)

        return output
    }
}

//!!!!!!!!!!! what if there are no employees working in a department?

let organization = new Organization('SBTech', 1000);

console.log(organization.add('Peter', 'marketing', 800));
console.log(organization.add('Robert', 'production', 2000));
console.log(organization.add('Peter', 'production', 2000));



// let organization = new Organization('SoftUni', 20000)
// organization.add('Silvia', 'marketing', 1200)
// organization.add('az', 'marketing', 1200)
// organization.employeeExists('Silvia')
// console.log(organization.status())

// console.log(organization.add('Peter', 'marketing', 1200))
// console.log(organization.add('Robert', 'production', 2000))
// console.log(organization.leaveOrganization('Peter'))