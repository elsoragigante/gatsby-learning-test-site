import React from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

export default function MonthsPageTemplate({ pageContext: { title }}) {
  const query = graphql`
  query MyQueryMonthPage {
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
  `

  return (
    <div>
      <p style={{fontWeight: "bold"}}>{title}</p>
    </div>
  )
}

