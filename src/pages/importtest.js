import React from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

const ImportTest = ({ data }) => (
    <div>
        <MenuTest data={data} />
        <Cards />
    </div>
  )
  
  export default ImportTest

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
    }
`