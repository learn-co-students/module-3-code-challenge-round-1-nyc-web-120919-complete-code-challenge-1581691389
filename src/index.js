document.addEventListener('DOMContentLoaded', () => {
  console.log('%c EUNICE DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4574 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage();


  function fetchImage() {


    fetch(`${imageURL}`)
      .then((response) => {
        return response.json();
      })
      .then((image) => {
        // console.log(image);
        renderImage(image);
      }); //fetch

  } // fetchImage

  function renderImage(image){

console.log(image, 'renderimagesection');

    const imgUrl = document.querySelector('#image');
    // console.log(imgUrl, 'url');
    imgUrl.src = image.url;
    imgUrl.dataset.id = image.id;
    const imgName = document.querySelector('#name');
    // console.log(imgName, 'name');
    imgName.innerText = image.name;
    const imgLikes = document.querySelector('#likes');
    console.log(imgLikes, 'likes');
    imgLikes.innerText = image.like_count;
    const comments = document.querySelector('#comments');
    // console.log(comments)
    image.comments.forEach(comment => {
      const commentLi = document.createElement('li');
      comments.append(commentLi);
      commentLi.innerText = comment.content;
      // console.log(comment.content);
    })

  } // renderimage

  const likeBtn = document.querySelector('#like_button');
  
  likeBtn.addEventListener('click', e => {
    console.log(e.target, 'like');
    let likes = e.target.parentNode.querySelector('#likes');
    let numLikes = parseInt(likes.innerText);
    console.log(numLikes, 'likesss');
    numLikes ++
    likes.innerText = numLikes;

    fetch(`${likeURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    });

  }); //likeBtn


  const form = document.querySelector('#comment_form');
  console.log(form, 'formm');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const newComment = e.target.children[0].value;

    const comments = document.querySelector('#comments');
    const commentLi = document.createElement('li');
    comments.append(commentLi);
    commentLi.innerText = newComment;
    console.log(newComment, 'target')

    fetch(`${commentsURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      })
    });

form.reset(); 


  }); //form


  // comment_form









})
