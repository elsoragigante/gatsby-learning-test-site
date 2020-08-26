import React from "react"
import MenuTest from "../components/menutest/MenuTest"

const ImportTest = ({ data }) => (
    <MenuTest data={data} />
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