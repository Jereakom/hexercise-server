# API reference

****

## posts
    GET api/posts
    response:{
      "id":postID,
      "user": {
          "id":userID,
          "username": username,
          "profileImageSmall":profileImageUrl
        },
      "image":"postImageUrl",
      "imageThumbnail":"postImageThumbnail",
      "likes":[],
      "caption":"postCaption",
      "tags":[],
      "comments":[]
    },{
      another post object  
    }
#### Returns every post
****
    POST api/posts
    request: {
      valid post object
    }
    response:{
      "code": 200
    }
#### Returns a status code based on whether the request was successful or not
***
    GET api/posts/:id
    response:{
      "id":id,
      "user": {
          "id":userID,
          "username": username,
          "profileImageSmall":profileImageUrl
        },
      "image":"postImageUrl",
      "imageThumbnail":"postImageThumbnail",
      "likes":[],
      "caption":"postCaption",
      "tags":[],
      "comments":[]
    }
#### Returns the post with the id of id
***
    PUT api/posts/:id
    request: {
      valid user object
    }
    response: {
                code: "200"
    }
#### Updates a post with the id of id, and returns HTTP status code based on the status of the request
***
    DELETE api/posts/:id
    response: {
                code: "200"
    }
#### Returns HTTP status code based on the status of the request
***
    GET api/posts/:id/:comments
    response: {
      "comments":[]
    }
#### Returns the comments on a post
***
    GET api/posts/:id/:likes
    response: {
      "likes":[]
    }

#### Returns the likes on a post
****

## users
    GET api/users
    response: {
      {
          id: userID,
          username: username,
          email: useremail
      },
      {
          id: another_userID,
          username: another_username
          email: another_useremail
      }
    }
#### Returns every user
***
    POST api/users
    request: {
      valid user object
    }
    response: {
      "code": "200"
    }
#### Adds new user
***
    GET api/users/:id
    response: {
      id: userID,
      username: username,
      posts: []
    }
#### Returns the user with the id of :id, and their posts

***
      PUT api/users/:id
      request: {
        valid user object
      }
      response: {
        "code": 200
      }
#### Updates the user with the id of :id, returns status code based on the request

***
    DELETE api/users/:id
    response: {
      "code": 200
    }
#### Return status code based on the status of the request

***

## Search

    GET api/search/posts/:searchParams
    response: {
      valid post object based on search
    }
#### Search posts for captions, tags and comments containing search parameters

***

    GET api/search/users/:username
    response: {
      valid user object based on search
    }
#### Search users for username
