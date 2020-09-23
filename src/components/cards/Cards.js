import React from 'react'
import './Cards.css'

class Cards extends React.Component {
    markdownPages() {
        const markdown = this.props.data.allMarkdownRemark.edges.map(edge => {
            return <p className="markdown-page-test">{edge.node.frontmatter.title}</p>
        })

        console.log(markdown)

        return markdown
    }

    render() {
        return (
            <div className="cards">
                {this.markdownPages()}
            </div>
        );
    }
}

export default Cards;