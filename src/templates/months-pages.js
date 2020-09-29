import React, { useState } from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

export default function MonthsPageTemplate({ pageContext: { title }, pageContext: { date }, data}) {

  return (
    <div>
      <p style={{fontWeight: "bold"}}>{title}</p>
      <MenuTest data={data} />
      <Cards data={data} date={date}/>
    </div>
  )
}

  export const query = graphql`
  query ($queryDate: Date!, $queryDatePlusOne: Date!){
      allFile(filter: {sourceInstanceName: {eq: "pages"}}) {
        edges {
          node {
            name
            relativeDirectory
            relativePath
          }
        }
      }
      allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {date: {gte: $queryDate, lt: $queryDatePlusOne}}}) {
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