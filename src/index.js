document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4575 
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage();

  const imgPic = document.getElementById("image")
  const imgTitle = document.getElementById("name")
  const likeSpan = document.getElementById("likes")
  const likeBtn = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const commentsUl = document.getElementById("comments")

  function fetchImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      // console.log(image, 'did i hit this?')
        renderImage(image)
    })
  }

  function renderImage(image) {
    imgPic.src = image.url 
    imgTitle.innerText = image.name 
    likeSpan.innerText = parseInt(likeSpan.innerText) //rememberparseInt for integers
    likeSpan.innerText = image.like_count
    image.comments.forEach(comment => {
      const commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentsUl.appendChild(commentLi)
    })
  } 
  likeBtn.addEventListener("click", function(event) {
    const likeSpan = document.getElementById('likes')
    // console.log(likeSpan, 'like span??')
    likeSpan.innerText++
    updateLikes(event)
  }) 
  function updateLikes(event) {
    const obj = {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    }
    fetch(likeURL, obj)

  }
  commentForm.addEventListener('submit', function(event) {
    const userComment = document.createElement('li')
    userComment.innerText = event.target.comment.value
    commentsUl.appendChild(userComment)
    const newObj = {image_id: imageId, content: userComment.innerText}
    fetch(commentsURL, {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(newObj)
    })
  }) 
  
})
