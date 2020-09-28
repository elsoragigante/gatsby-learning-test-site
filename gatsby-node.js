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
  const markdownPageTemplate = path.resolve(`src/templates/markdown-pages.js`)
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
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
          edges {
            node {
              id
              html
              frontmatter {
                date
                title
              }
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
  

  result.data.allMarkdownRemark.edges.forEach(edge => {
    const date = edge.node.frontmatter.date.split("-")

    createPage({
      path: `announcements/${date[0]}/${date[1]}`,
      component: monthsPageTemplate,
      context: {
        title: edge.node.frontmatter.title,
      },
    })
  })

  //markdown pages
  //path...node.frontmatter.date...format to year/month/markdown title
  //2020-05-01
  result.data.allMarkdownRemark.edges.forEach(edge => {
    const date = edge.node.frontmatter.date.split("-")

    const { title } = edge.node.frontmatter

    createPage({
      path: `announcements/${date[0]}/${date[1]}/${title}`,
      component: markdownPageTemplate,
      context: {
        title: edge.node.frontmatter.title,
        html: edge.node.html
      },
    })
  })
}