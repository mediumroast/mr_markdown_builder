#!env node

const companyReporting = require('./company.js')
const companiesReporting = require('./companies.js')
const fs = require('fs')


function readObjects (path) {
    // Take the path and read the file
    let data = null
    try {
        data = fs.readFileSync(path, 'utf8')
        console.log(`Reading file: ${path}`)
    } catch (error) {
        console.error(`Error reading file: ${path} due to ${error}`)
        return false
    }
    // Parse the data
    return JSON.parse(data)
}

function saveReports (reports) {
    // Save the reports
    reports.forEach((report) => {
        // Write the file
        console.log(`Writing report: ${report.path}`)
        fs.writeFileSync(report.path, report.content)
    })
}

// Create the run function that creates the reports
async function run () {
    // Define inputs
    companiesObject = readObjects('./Companies.json')
    interactionsObject = readObjects('./Interactions.json')
    // Check to see if the objects were read
    if (!companiesObject || !interactionsObject) {
        return console.error('Error reading objects, exiting...')
    }


    // If there are no companies then return
    if (companiesObject.length === 0) {
        return console.error('No companies found, exiting...')
    }

    // Define reports
    const reports = {
        companies: `./README.md`,
        company: `./`
    }

    // Create the company files
    const companyFiles = await companyReporting.createCompanyReport(companiesObject, interactionsObject, reports)
    // Create the companies file
    const companiesFile = companiesReporting.createCompaniesReport(companiesObject)
    // Create the reports array
    const markdownReports = [
        {
            name: 'Companies',
            path: reports.companies,
            content: companiesFile
        },
        ...companyFiles
    ]

    // Write the reports
    saveReports(markdownReports)
}

(async () => {
    const resp = await run();
    // rest of your code
})()