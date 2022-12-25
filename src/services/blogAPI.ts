import { apiPosts } from "../components/IndexBlog/IndexBlog";

const axios = require('axios');
const RapidAPIKey = "6adb2e53d5mshf8d75bf9c4c0137p16f122jsnc7ce65a877a8";

export async function getUserId(username: string) {
  const options = {
    method: 'GET',
    url: `https://medium2.p.rapidapi.com/user/id_for/${username}`,
    headers: {
      'X-RapidAPI-Key': RapidAPIKey,
      'X-RapidAPI-Host': 'medium2.p.rapidapi.com',
    },
  };

  try {
    let response = await axios.request(options);
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        data: '',
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getPosts(userId: string) {
  const options = {
    method: 'GET',
    url: `https://medium2.p.rapidapi.com/user/${userId}/articles`,
    headers: {
      'X-RapidAPI-Key': RapidAPIKey,
      'X-RapidAPI-Host': 'medium2.p.rapidapi.com',
    },
  };

  try {
    let response = await axios.request(options);
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        data: '',
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getPost(postId: string) {
  const options = {
    method: 'GET',
    url: `https://medium2.p.rapidapi.com/article/${postId}`,
    headers: {
      'X-RapidAPI-Key': RapidAPIKey,
      'X-RapidAPI-Host': 'medium2.p.rapidapi.com',
    },
  };
  try {
    let response = await axios.request(options);
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        data: '',
      };
    }
  } catch (err) {
    console.log(err);
    return;
  }
}


export async function getAllPost() {
    const userId = await getUserId("Indexx");
    const posts = await getPosts(userId.id);
    let articles: Array<apiPosts> = [];
    for(let i = 0; i < posts.associated_articles.length; i++) {
        const post = await getPost(posts.associated_articles[i]);
        articles.push(post);
    }
    return articles;
}