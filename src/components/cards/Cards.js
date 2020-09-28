import React from 'react'
import { Link } from 'gatsby'
import './Cards.css'

class Cards extends React.Component {
    markdownPages() {

        const markdown = this.props.data.allMarkdownRemark.edges.map(edge => {
            const date = edge.node.frontmatter.date.split("-")
            const title = edge.node.frontmatter.title

            return (
                <div>
                    <Link 
                        className="markdown-page-test" 
                        to={`http://localhost:8000/announcements/${date[0]}/${date[1]}/${title}`}
                    >
                        {edge.node.frontmatter.title}
                    </Link>
                </div>
            )
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