import React from 'react'
import { Input, Button } from 'reactstrap'



class Notes extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      posts: this.props.posts
    }
  }

  renderPosts(){
    const { posts } = this.props
    let renderedPosts = posts.map((post, i) => {
      return (
        <div key={i} className='card m-3'>
          <h2 className='pt-3'>{ post.title }</h2>
          <div className='card-body'>{ post.description }</div>
        </div>
      )
    })
    return renderedPosts
  }

  render(){
    const { posts } = this.props
    return(
      <div>
        { posts.length > 0 && this.renderPosts() }
      </div>
    )
  }
}

export default Notes