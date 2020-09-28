import React from "react";
import { Link } from 'gatsby';
import "./MenuTest.css";


var monthNames = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  };

class MenuTest extends React.Component {
    directoriesConvert(obj) {
        //pull directories from passed in data object
        const directoriesArr = obj.data.allFile.edges.map(obj => {
            return obj.node.relativeDirectory;
        });
        

        //split directories based on naming convention
        const dirSplitOne = directoriesArr.map(str => str.split("/"))

        const dirSplitTwo = dirSplitOne.map(arr => {
            return arr.map(str => {
                return str.split("-")
            })
        })

        const dirsFinal = dirSplitTwo.map(arr => {
            return [arr[1][1], arr[0][0]];
        })

        //sort directories by month and year using the month names object
        dirsFinal.sort(function(a, b){
            return monthNames[b[0]] - monthNames[a[0]];
        })

        dirsFinal.sort(function(a, b){
            return new Date(b[1], monthNames[b[0]], 1) - new Date(a[1], monthNames[a[0]], 1)
        })

        //convert arrays back to strings (necessary to compare duplicates)
        let stringDirsFinal = dirsFinal.map(a => `${a[0]} ${a[1]}`)

        //use Set object to ensure no duplicates
        let uniqDirsSet = new Set()
        stringDirsFinal.forEach(a => uniqDirsSet.add(a))
        let uniqDirsArr = Array.from(uniqDirsSet)

        //build the links array
        const linksArr = uniqDirsArr.map(dir => {
            const year = dir.split(" ")[1]
            let monthNum = monthNames[dir.split(" ")[0]]

            if(monthNum <= 9){
                monthNum = `0${monthNum}`
            } else {
                monthNum = `${monthNum}`
            }

            const monthName = dir.split(" ")[0]
            return `http://localhost:8000/announcements/${year}/${monthNum}`
        })

        //convert strings to jsx
        const dirsHTML = uniqDirsArr.map((str, index) => {
                return (
                    <Link to={linksArr[index]}>
                        <li className="menu-button">{str}</li> 
                    </Link>
                )        
        })

        return dirsHTML
    }

    render() {
        return (
            <div className="side-menu">
                <ul>
                    {this.directoriesConvert(this.props)}
                </ul>        
            </div>
        );
    }
}
  
  export default MenuTest;
