import React from "react"
import { graphql } from 'gatsby'
import MenuTest from "../components/menutest/MenuTest"
import Cards from "../components/cards/Cards"

const Announcements = ({ data }) => (
    <div>
        <MenuTest data={data} />
        <Cards />
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
    }
`