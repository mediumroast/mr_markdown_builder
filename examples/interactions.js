const mrMarkdownBuilder = require('../src/index.js')

async function createTags (interaction) {
    // Create a list of interaction tags
    const interactionProperties = Object.keys(interaction)
    const tags = interactionProperties.map((property) => {
        return mrMarkdownBuilder.tag(property)
    })
    return "\n" + tags.join(mrMarkdownBuilder.space()) + "\n"

}

async function createMetadataBadges(metadata) {
    // Create a badge for the company role
    const badgesRow = [
        await mrMarkdownBuilder.badge('Reading time', encodeURIComponent(`${metadata.reading_time} minutes`)),
        await mrMarkdownBuilder.badge('Interaction type', encodeURIComponent(metadata.interaction_type)),
        await mrMarkdownBuilder.badge('Page count', metadata.page_count),
        await mrMarkdownBuilder.badge('Document type', encodeURIComponent(metadata.content_type))
    ]
    return  mrMarkdownBuilder.cr() + badgesRow.join(mrMarkdownBuilder.space()) + mrMarkdownBuilder.cr()
}

async function createInteractionsList (company, interactions) {
    // Create a list of interactions
    const interactionNames = Object.keys(company.linked_interactions)
    let totalReadingTime = 0

    const interactionList = await Promise.all(interactionNames.map(async (interactionName) => {
        // Find the interaction object that matches the interaction name
        const interaction = interactions.find((interaction) => interaction.name === interactionName)
        
        // Skip interaction if any section is "Unknown"
        if (interaction.description === "Unknown" || interaction.abstract === "Unknown" || interaction.reading_time === "Unknown" || interaction.tags === "Unknown") {
            return null
        }

        // Create link internal link to the interaction file    
        const interactionLink = mrMarkdownBuilder.link(interaction.name, `/${encodeURI(interaction.url)}`)
        
        // Create the interaction section
        let interactionSection = `${mrMarkdownBuilder.h3(interactionLink)}${mrMarkdownBuilder.cr()}`
        interactionSection += await createMetadataBadges(interaction) + mrMarkdownBuilder.cr()
        interactionSection += `${interaction.description}${mrMarkdownBuilder.cr()}`
        interactionSection += `${mrMarkdownBuilder.h4('Discovered tags')}${mrMarkdownBuilder.cr()}`
        interactionSection += `${await createTags(interaction.tags)}${mrMarkdownBuilder.cr()}`
        totalReadingTime += parseInt(interaction.reading_time)
        interactionSection += `${mrMarkdownBuilder.collapsible('Interaction abstract', interaction.abstract)}${mrMarkdownBuilder.cr()}`
        
        return interactionSection
    }))

    // Filter out null values
    const filteredInteractionList = interactionList.filter(Boolean)
    const interactionString = filteredInteractionList.join(mrMarkdownBuilder.cr());

    return [interactionString, totalReadingTime]
}

async function createInteractionsSection(company, interactions) {
    // Call createInteractionsList and add the result to interactionsSection
    let [interactionsList, totalReadingTime] = await createInteractionsList(company, interactions)
    
    // Create the interactions section
    let interactionsSection = mrMarkdownBuilder.h2('Interactions')
    const companyInteractions = Object.keys(company.linked_interactions)
    interactionsSection += `\`${company.name}\` has \`${companyInteractions.length}\` interactions in the repository, and the reading time for all interactions is \`${totalReadingTime}\` minutes.`

    return `${interactionsSection}${mrMarkdownBuilder.cr()}${interactionsList}${mrMarkdownBuilder.cr()}${mrMarkdownBuilder.hr()}`
}

module.exports = {
    createInteractionsSection
}