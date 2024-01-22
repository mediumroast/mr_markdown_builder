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

// Create a function that company object and creates a geojson object for the company including the header and the geojson object
const createGeojson = (company) => {
    let geoJsonMarkdown = mrMarkdownBuilder.h2('Location')
    geoJsonMarkdown += `**Notice:** If you are using Safari the map will not display correctly. It has been tested and works with Chrome and Edge.  If there is only a single point on the map you will need to zoom out to see the actual context on the map. If you are a Safari user we and would like to help us fix this issue please contact add to the GitHub Community discussion [GeoJSON rendering is broken #19258](https://github.com/orgs/community/discussions/19258).`
    // Create the Industry List
    const geoJson = {
        type: 'Feature',
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
    // Add the geojson object to the company file
    geoJsonMarkdown += mrMarkdownBuilder.geojson(geoJson)
    return geoJsonMarkdown
}

// Create a function that takes the company object and creates a table from several of the company properties which switch based upon the company type being public or not public. The properties for both public and not public are: wikipedia_url, google_news_url, google_maps_url, google_patents_url. The properties specific to public are google_finance_url, recent10k_url, recent10q_url, firmographics_url, filings_url and owner_transactions.
const createCompanyWebLinkList = (company) => {

    // Create the table rows
    let wikipediaURL
    company.wikipedia_url === 'Unknown' ? 
        wikipediaURL = `The Wikipedia URL is ${company.wikipedia_url}` :
        wikipediaURL = mrMarkdownBuilder.link(`Wikipedia for ${company.name}`, company.wikipedia_url)
    let listItems = [
        
        [wikipediaURL],
        [mrMarkdownBuilder.link(`${company.name} on Google News`, company.google_news_url)],
        [mrMarkdownBuilder.link(`Map for ${company.name}`, company.google_maps_url)],
        [mrMarkdownBuilder.link(`${company.name} Patents`, company.google_patents_url)]
    ]
    // If the company is public then add the public properties
    if (company.company_type === 'Public') {
        listItems.push(
            [mrMarkdownBuilder.link(`Google Finance`, company.google_finance_url)],
            [mrMarkdownBuilder.link(`Most Recent 10-K Filing`, company.recent10k_url)],
            [mrMarkdownBuilder.link(`Most Recent 10-Q Filing`, company.recent10q_url)],
            [mrMarkdownBuilder.link(`SEC EDGAR Firmographics`, company.firmographics_url)],
            [mrMarkdownBuilder.link(`All Filings for ${company.name}`, company.filings_url)],
            [mrMarkdownBuilder.link(`Shareholder Transactions`, company.owner_transactions_url)]
        )
    }
    // Create the table
    return mrMarkdownBuilder.h2('Key Web Links') + "\n" + mrMarkdownBuilder.ul(listItems)
}


// Create a function, using the markdown instance, that will take as input all company objects. It then creates a unique file per company with the first line as the company name as a header.
const createCompanyFiles = (companies, interactions) => {
  for (let company of companies) {
    // Get the name of the company and remove spaces, commas, periods, question marks, and exclamation points
    const companyFileName = company.name.replace(/[\s,.\?!]/g, '')
    // Using the emphasis module create a bolded version of the string "Company Name:"
    const companyLogo = mrMarkdownBuilder.imageWithSize(`${company.name} Logo`, company.logo_url, 25, company.name)
    // Call the h1 method from the headers module
    let companyFile = `[${mrMarkdownBuilder.link('Back to Company Directory', './README.md')}]\n`
    companyFile += mrMarkdownBuilder.hr()
    companyFile += mrMarkdownBuilder.h1(`${companyLogo} ${mrMarkdownBuilder.link(company.name, company.url)}`)
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

    // Create the company table
    companyFile += createCompanyWebLinkList(company)

    // Add a line break
    companyFile += "\n"

    // Add an h2 for the company's location
    companyFile += createGeojson(company)

    // Add a line break
    companyFile += "\n"

    // Add a horizontal rule
    companyFile += mrMarkdownBuilder.hr()

    // Add the creation date
    companyFile += `[ ${mrMarkdownBuilder.b('Created:')} ${company.creation_date} by ${company.creator_name} | ${mrMarkdownBuilder.b('Modified:')} ${company.modification_date} ]`
    
    // Write the file
    fs.writeFileSync(`./${companyFileName}.md`, companyFile)
  }
}

// Create a function that takes all companies and plots them on a map using the geojson method from the markdown instance. The map should be centered on the United States and should have a zoom level of 3.
const createMap = (companies) => {
    // Create the map
    let map = mrMarkdownBuilder.h1('Company Locations')
    map += `**Notice:** If you are using Safari the map will not display correctly. It has been tested and works with Chrome and Edge.  If there is only a single point on the map you will need to zoom out to see the actual context on the map. If you are a Safari user we and would like to help us fix this issue please contact add to the GitHub Community discussion [GeoJSON rendering is broken #19258](https://github.com/orgs/community/discussions/19258).`
    map += mrMarkdownBuilder.geojson({
        type: 'FeatureCollection',
        features: companies.map((company) => {
            return {
                type: 'Feature',
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
        })
    })
    // return the map
    return map
}

// Create a function that takes all companies and constructs a README.md file with a table of contents and a link to each company file followed by the company description in a table. The table should have the following columns: Company Name, Company Type, Company Role, Company Region.
const createReadme = (companies) => {
    let readme = mrMarkdownBuilder.h1('Introduction')
    readme += `This page is automatically generated by the \`test/mr_markdown_builder_test.js\` script found in this directory.  It is meant to both verify the operation of the module and illustrate many but not all of the features of \`mr_markdown_builder\` to the user.  Mediumroast, Inc. maintains and uses this library to generate documentation for our internal and external projects.  We hope you find it useful.`
    readme += mrMarkdownBuilder.h1('Table of Companies')
    // Create the table header
    const tableHeader = mrMarkdownBuilder.tableHeader(['Company Name', 'Company Type', 'Company Role', 'Company Region'])
    // Create the table rows
    const tableRows = companies.map((company) => {
        const companyRow = [
            mrMarkdownBuilder.link(company.name, `./${encodeURI(company.name.replace(/[\s,.\?!]/g, ''))}.md`),
            company.company_type,
            company.role,
            company.region
        ]
        return companyRow
    })
    // Create the table
    const companyTable = tableHeader + "\n" + mrMarkdownBuilder.tableRows(tableRows)
    // Create the README.md file
    readme += companyTable
    // Add a line break
    readme += "\n"
    // Call the createMap function
    readme += createMap(companies)
    // Write the file
    fs.writeFileSync('./README.md', readme)
}


// Read the companies.json file and convert it to a JavaScript object
const companies = JSON.parse(fs.readFileSync('./companies.json', 'utf8'))

// Read the interactions.json file and convert it to a JavaScript object
const interactions = JSON.parse(fs.readFileSync('./interactions.json', 'utf8'))

// Call the createCompanyFiles function with the companies object
createCompanyFiles(companies, interactions)

// Call the createReadme function with the companies object
createReadme(companies)




