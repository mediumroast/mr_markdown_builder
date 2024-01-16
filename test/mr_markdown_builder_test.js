#!env node
// Import the fs module
const fs = require('fs')

// Import all modules from ../index.js
const mrMarkdownBuilder = require('../src/index.js')

// Create a function, using the markdown instance, that takes company_role, company_type, region, modification_date, and creator as input and produces a table of badges with each badge in a cell. The input is an individual company object.
const createBadges = (company) => {
    // Create a badge for the company role
    const badgesRow = [
        mrMarkdownBuilder.badge(encodeURIComponent('Role'), company.role),
        mrMarkdownBuilder.badge(encodeURIComponent('Type'), encodeURIComponent(company.company_type)),
        mrMarkdownBuilder.badge(encodeURIComponent('Region'), company.region),
        mrMarkdownBuilder.badge(encodeURIComponent('Creator'), encodeURIComponent(company.creator))
    ]
    return "\n" + badgesRow.join(' ') + "\n"
}


// Create a function, using the markdown instance, that will take as input all company objects. It then creates a unique file per company with the first line as the company name as a header.
const createCompanyFiles = (companies) => {
  for (let company of companies) {
    // Get the name of the company and remove spaces, commas, periods, question marks, and exclamation points
    const companyFileName = company.name.replace(/[\s,.\?!]/g, '')
    // Using the emphasis module create a bolded version of the string "Company Name:"
    const companyLogo = mrMarkdownBuilder.imageWithSize(`${company.name} Logo`, company.logo_url, 25, company.name)
    // Call the h1 method from the headers module
    let companyFile = mrMarkdownBuilder.h1(`${companyLogo} ${company.name}`)
    // Add a line break
    companyFile += "\n"
    // Add the company badges
    companyFile += createBadges(company)
    // Add a line break
    companyFile += "\n"
    // Add the company description
    companyFile += `${mrMarkdownBuilder.b('Description:')} ${company.description}`
    // Add a line break
    companyFile += "\n"
    
    
    // Write the file
    fs.writeFileSync(`./${companyFileName}.md`, companyFile)
  }
}

// https://img.shields.io/badge/Company%20Role-Private-blue?style=for-the-badge


// Read the companies.json file and convert it to a JavaScript object
const companies = JSON.parse(fs.readFileSync('./companies.json', 'utf8'))
// Call the createCompanyFiles function with the companies object
createCompanyFiles(companies)

// Read the interactions.json file and convert it to a JavaScript object
const interactions = JSON.parse(fs.readFileSync('./interactions.json', 'utf8'))

