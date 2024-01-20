#!env node
// Import the fs module
const fs = require('fs')

// Import all modules from ../index.js
const mrMarkdownBuilder = require('../src/index.js')
const { type } = require('os')

// Create a function, using the markdown instance, that takes company_role, company_type, region, modification_date, and creator as input and produces a table of badges with each badge in a cell. The input is an individual company object.
const createBadges = (company) => {
    // Create a badge for the company role
    const badgesRow = [
        mrMarkdownBuilder.badge(encodeURIComponent('Role'), company.role),
        mrMarkdownBuilder.badge(encodeURIComponent('Type'), encodeURIComponent(company.company_type)),
        mrMarkdownBuilder.badge(encodeURIComponent('Region'), company.region),
        mrMarkdownBuilder.badge(encodeURIComponent('Creator'), encodeURIComponent(company.creator_name))
    ]
    return "\n" + badgesRow.join('&nbsp;&nbsp;') + "\n"
}

// Create a function that takes the company object and returns a list of industry data from the company covering industry, industry_group_description, and major_group_description
const createIndustryList = (company) => {
    const industryDataList = [
        `**Industry** &#8594; ${company.industry} (Code: ${company.industry_code})`,
        `**Industry Group** &#8594; ${company.industry_group_description} (Code: ${company.industry_group_code})`,
        `**Major Group** &#8594; ${company.major_group_description} (Code: ${company.major_group_code})`
    ]
    // Create a list of industries
    const industryList = `${mrMarkdownBuilder.h2('Standard Industry Code (SIC) Details')}\n${mrMarkdownBuilder.ul(industryDataList)}`
    return industryList
}

// Create a function that the company object and all of the interactions for that company and returns a list of interactions that are linked to the company
const createInteractionList = (company, interactions) => {
    // Create a list of interactions
    const interactionNames = Object.keys(company.linked_interactions)
    const interactionList = interactionNames.map((interactionName) => {
        // Find the interaction object that matches the interaction name
        const interaction = interactions.find((interaction) => interaction.name === interactionName)
        // Create link internal link to the interaction file    
        const interactionLink = mrMarkdownBuilder.link(interaction.name, `/${encodeURI(interaction.url)}`)
        return interactionLink
    })
    
    return `${mrMarkdownBuilder.h2('Interactions')} \n ${mrMarkdownBuilder.ul(interactionList)}`
}


// Create a function, using the markdown instance, that will take as input all company objects. It then creates a unique file per company with the first line as the company name as a header.
const createCompanyFiles = (companies, interactions) => {
  for (let company of companies) {
    // Get the name of the company and remove spaces, commas, periods, question marks, and exclamation points
    const companyFileName = company.name.replace(/[\s,.\?!]/g, '')
    // Using the emphasis module create a bolded version of the string "Company Name:"
    const companyLogo = mrMarkdownBuilder.imageWithSize(`${company.name} Logo`, company.logo_url, 25, company.name)
    // Call the h1 method from the headers module
    let companyFile = mrMarkdownBuilder.h1(`${companyLogo} ${mrMarkdownBuilder.link(company.name, company.url)}`)
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
    // Add a horizontal rule
    companyFile += mrMarkdownBuilder.hr()
    // Add a line break
    companyFile += "\n"
    // Create the Industry List
    companyFile += createIndustryList(company)
    // If there are linked_interactions in the company then create the interaction list
    if (Object.keys(company.linked_interactions).length > 0) {
        companyFile += createInteractionList(company, interactions)
    }

    // Add a line break
    companyFile += "\n"

    // Add an h2 for the company's location
    companyFile += mrMarkdownBuilder.h2('Location')

    // Create a geojson object for the company
    const companyGeojson = {
        type: 'FeatureCollection',
        features: [
            {   
                type: 'Feature',
                id: 1,
                geometry: {
                    type: 'Point',
                    coordinates: [company.longitude, company.latitude]
                },
                properties: {
                    name: company.name,
                    description: company.description,
                    role: company.role,
                    url: company.url
                }
            }
        ]
    }
    // Add the geojson object to the company file
    companyFile += mrMarkdownBuilder.geojson(companyGeojson)
    
    // Write the file
    fs.writeFileSync(`./${companyFileName}.md`, companyFile)
  }
}

// https://img.shields.io/badge/Company%20Role-Private-blue?style=for-the-badge


// Read the companies.json file and convert it to a JavaScript object
const companies = JSON.parse(fs.readFileSync('./companies.json', 'utf8'))

// Read the interactions.json file and convert it to a JavaScript object
const interactions = JSON.parse(fs.readFileSync('./interactions.json', 'utf8'))

// Call the createCompanyFiles function with the companies object
createCompanyFiles(companies, interactions)



