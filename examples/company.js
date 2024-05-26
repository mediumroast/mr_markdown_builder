const mrMarkdownBuilder = require('../src/index.js')

// Globals
const MAPS_WARNING = `**Notice:** If you are using Safari and had previously disabled \`Prevent cross-site tracking\` feature in the \`Privacy tab\` in Safari's preferences, you can now reenable it since this bug has been fixed by GitHub.`

async function createBadges (company) {
    // Create a badge for the company role
    const badgesRow = [
        await mrMarkdownBuilder.badge(encodeURIComponent('Role'), company.role),
        await mrMarkdownBuilder.badge(encodeURIComponent('Type'), encodeURIComponent(company.company_type)),
        await mrMarkdownBuilder.badge(encodeURIComponent('Region'), company.region),
        await mrMarkdownBuilder.badge(encodeURIComponent('Creator'), encodeURIComponent(company.creator_name))
    ]
    return "\n" + badgesRow.join(mrMarkdownBuilder.SPACE * 2) + "\n"
}

async function createInteractionTags (interactions) {
    // Create a list of interaction tags
    const tags = interactions.map((interaction) => {
        return mrMarkdownBuilder.tag(interaction.name)
    })
    return "\n" + tags.join(mrMarkdownBuilder.SPACE * 2) + "\n"

}

function createIndustryList (company) {
    const industryDataList = [
        `${mrMarkdownBuilder.b('Major Group')} ${mrMarkdownBuilder.rightArrow()} ${company.major_group_description} (Code: ${company.major_group_code})`,
        `${mrMarkdownBuilder.b('Industry Group')} ${mrMarkdownBuilder.rightArrow()} ${company.industry_group_description} (Code: ${company.industry_group_code})`,
        `${mrMarkdownBuilder.b('Industry')} ${mrMarkdownBuilder.rightArrow()} ${company.industry} (Code: ${company.industry_code})`
    ]
    // Create a list of industries
    const industryList = `${mrMarkdownBuilder.h3('Standard Industry Code (SIC) Details')}\n${mrMarkdownBuilder.ul(industryDataList)}`
    return industryList
}

function createCompanyWebLinkList (company) {
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
        const propertyToName = {
            google_finance_url: 'Google Finance', 
            recent10k_url: 'Most Recent 10-K Filing', 
            recent10q_url: 'Most Recent 10-Q Filing', 
            firmographics_url: 'SEC EDGAR Firmographics', 
            filings_url: `All Filings for ${company.name}`, 
            owner_transactions_url: 'Shareholder Transactions'
        }
        for (const property in [
            'google_finance_url', 'recent10k_url', 'recent10q_url', 'firmographics_url', 'filings_url', 'owner_transactions_url']
        ) {
            if (company[property] !== 'Unknown') { continue }
            listItems.push([mrMarkdownBuilder.link(propertyToName[property], company[property])])
        }
    }
    // Create the table
    return mrMarkdownBuilder.h2('Key Web Links') + "\n" + mrMarkdownBuilder.ul(listItems)
}

function createInteractionList (company, interactions) {
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

function createCompanyMap (company) {
    // Check to see if either the latitude or longitude is "Unknown" and if so return false
    if (company.latitude === 'Unknown' || company.longitude === 'Unknown') {
        return ''
    }
    let geoJsonMarkdown = mrMarkdownBuilder.h2('Location')
    geoJsonMarkdown += MAPS_WARNING
    // Create the location JSON
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

async function createCompanyReport (companies, interactions, reports) {
    let companyReports = []
    const suffix = '.md'
    const prefix = reports.company
    for (let company of companies) {
      // ---- BEGIN Company Introduction ----
      // Get the name of the company and remove spaces, commas, periods, question marks, and exclamation points
      const companyFileName = company.name.replace(/[\s,.\?!]/g, '')
      // Using the emphasis module create a bolded version of the string "Company Name:"
      const companyLogo = mrMarkdownBuilder.imageWithSize(`${company.name} Logo`, company.logo_url, 25, company.name)
      // Call the h1 method from the headers module
      let companyFile = `[${mrMarkdownBuilder.link('Back to Company Directory', './README.md')}]\n`
      companyFile += mrMarkdownBuilder.hr()
      companyFile += mrMarkdownBuilder.h1(`${companyLogo} ${mrMarkdownBuilder.link(company.name, company.url)}`)
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
      // Add the company badges
      companyFile += await createBadges(company)
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
      // Add the company description
      companyFile += `${mrMarkdownBuilder.b('Description:')} ${company.description}`
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
      // Create the Industry List
      companyFile += createIndustryList(company)
      // Add a horizontal rule
      companyFile += mrMarkdownBuilder.hr()
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
      // ----  End Company Introduction  ----
      
      // If there are linked_interactions in the company then create the interaction list
      if (Object.keys(company.linked_interactions).length > 0) {
          companyFile += createInteractionList(company, interactions)
      }
  
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
  
      // Create the company table
      companyFile += createCompanyWebLinkList(company)
  
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
  
      // Add an h2 for the company's location
      companyFile += createCompanyMap(company)
  
      // Add a line break
      companyFile += mrMarkdownBuilder.SECTION_LINE_BREAK
  
      // Add a horizontal rule
      companyFile += mrMarkdownBuilder.hr()
  
      // Add the creation date
      companyFile += `[ ${mrMarkdownBuilder.b('Created:')} ${company.creation_date} by ${company.creator_name} | ${mrMarkdownBuilder.b('Modified:')} ${company.modification_date} ]`
      
      // Return the file content   
      companyReports.push({
            name: company.name,
            path: `${prefix}${companyFileName}${suffix}`,
            content: companyFile
      })
    }
    return companyReports
}


module.exports = {
    createCompanyReport
}