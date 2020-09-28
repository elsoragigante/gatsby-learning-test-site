import React from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

export default function MarkdownPageTemplate({ pageContext: { title }, pageContext: { html }, data }) {
  return (
      <div>
          <MenuTest data={data} />
          <p style={{fontWeight: "bold"}}>{title}</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

  )
}

export const query = graphql`
query MyQueryMarkdownPage {
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
`