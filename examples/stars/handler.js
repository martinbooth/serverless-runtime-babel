import "babel-polyfill"
import axios from "axios"

export default ({repos}) => {

  return Promise.all(repos.map(repo => {
    return axios.get(`https://api.github.com/repos/${repo}`)
      .then(({data}) => ({repo, stars: data.stargazers_count}))
  }))

}

