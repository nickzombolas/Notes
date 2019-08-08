import React from 'react'
import axios from 'axios'

import './styles.css';
import Header from './Components/Header'
import Posts from './Components/Posts'


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      posts: []
    }

    axios.get('http://localhost:5000/api/posts').then(res => {
      this.setState({posts: res.data.posts})
    })
  }

  render(){
    return (
      <>
        <Header />
        <div className='App'>
          <Posts posts={this.state.posts} />
        </div>
      </>
    )
  }

}

export default App;
