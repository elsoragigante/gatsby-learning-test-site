import React from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

const Announcements = ({ data }) => (
    <div>
        <MenuTest data={data} />
        <Cards data={data} />
    </div>
  )
  
  export default Announcements

export const query = graphql`
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
`