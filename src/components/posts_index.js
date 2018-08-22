import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../actions'

class PostsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPosts = () => {
    return _.map(this.props.posts, post => (
      <li className="list-group-item" key={post.id}>
        {post.title}
      </li>
    ))
  }

  render () {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({ posts: state.posts })

export default connect(mapStateToProps, { fetchPosts })(PostsIndex)
