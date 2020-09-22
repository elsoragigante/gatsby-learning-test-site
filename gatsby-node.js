/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create category pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const yearsPageTemplate = path.resolve(`src/templates/years-pages.js`)
  const monthsPageTemplate = path.resolve(`src/templates/months-pages.js`)
  const result = await graphql(`
    query MyQuery {
        allFile(filter: {sourceInstanceName: {eq: "pages"}}) {
            edges {
                node {
                    name
                    relativeDirectory
                    relativePath
                }
            }
        }
    }
    `)

  //years pages
  const allYearsArr = result.data.allFile.edges.map(edge => {
    return edge.node.relativeDirectory.split("/")[0]
  })

  const uniqueYears = [...new Set(allYearsArr)]

  uniqueYears.forEach(year => [
    createPage({
      path: `announcements/${year}`,
      component: yearsPageTemplate,
      context: {
        title: `Announcements ${year}`
      }
    })
  ])

  //months pages
  result.data.allFile.edges.forEach(edge => {
    createPage({
      path: `announcements/${edge.node.relativeDirectory}`,
      component: monthsPageTemplate,
      context: {
        title: edge.node.name,
      },
    })
  })
}