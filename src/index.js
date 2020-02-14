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
      commentLi.dataset.id = comment.id;
      commentLi.className = 'commentLi';
      comments.append(commentLi);
      commentLi.innerHTML = `
      ${comment.content}
      <button class='delete_button' data-id=${comment.id}>delete</button>
      `;
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
    commentLi.dataset.id = newComment.id;
    console.log(e.target)

    comments.append(commentLi);
    // commentLi.innerText = newComment;
    commentLi.innerHTML = `
    ${newComment}
    <button class='delete_button' data-id=>delete</button>
    `;
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

  const commentsUl = document.querySelector('#comments');
  commentsUl.addEventListener('click', e => {

    if(e.target.className === 'delete_button') {

      const commentId = e.target.dataset.id;
      const comment = e.target.parentNode
      comment.remove();
      console.log(commentId, 'yes delete it')



      // fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
      //   method: 'DELETE',
      // })
      // .then(res => res.text()) // or res.json()



    //   fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    //     method: 'DELETE',
    //   })
    // .then(res => {
    //     if (res.ok) {
    //         return Promise.resolve('User deleted.');
    //     } else {
    //         return Promise.reject('An error occurred.');
    //     }
    // })
    // .then(res => console.log(res));

    fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
  method: 'DELETE', 
  headers: new Headers({
		'Content-Type': 'text/plain'
	})})
  .then(function() { message: 'Comment Successfully Destroyed' });







    }


  })



  // comment_form









})
