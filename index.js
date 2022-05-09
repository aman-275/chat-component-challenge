async function fetchData() {
  const jsonData = await fetch("./data.json");
  const { currentUser, comments } = await jsonData.json();
  localStorage.setItem("user", JSON.stringify(currentUser));

  window.showComments = function showComments(event) {
    const innerDiv =
      event.currentTarget.parentElement.parentElement.nextElementSibling;

    if (innerDiv) {
      innerDiv.style.display = "block";
    }
  };

  window.hideComments = function hideComments(event) {
    const innerDiv =
      event.currentTarget.parentElement.parentElement.nextElementSibling;

    if (innerDiv) {
      innerDiv.style.display = "none";
    }
  };

  window.editReply = function editReply(event) {
    const textArea =
      event.target.parentElement.parentElement.nextElementSibling
        .firstElementChild;

    event.target.parentElement.parentElement.nextElementSibling.children[1].style.display =
      "block";

    event.target.parentElement.parentElement.nextElementSibling.children[1].addEventListener(
      "click",
      () => {
        textArea.disabled = true;
        event.target.parentElement.parentElement.nextElementSibling.children[1].style.display =
          "none";
      }
    );

    textArea.disabled = false;
  };

  window.deleteReply = function deleteReply(event) {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  };

  window.submitReply = function submitReply(event) {
    event.preventDefault();

    const innerDiv =
      event.target?.parentElement?.parentElement?.firstElementChild
        ?.nextElementSibling;

    const topDiv =
      event?.target?.parentElement?.previousElementSibling?.parentElement;

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData(event.target);
    const text = formData.getAll("textarea")[0];
    event.target.parentElement.style.display = "none";

    const replyHtml = `  <div class="top-div-update">
   <div class="comment">
     <div class="score" style="height: 100px">
       <p>
         <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
           <path
             d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
           />
         </svg>
       </p>
       <p>12</p>
       <p>
         <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
           <path
             d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
           />
         </svg>
       </p>
     </div>
     <div class="info">
       <div class="profile-information">
         <div class="profile">
           <img
             src=${user.image.webp}
             alt="profile-image"
           />
         </div>
         <div class="name">
           <p>${user.username}</p>
         </div>
         <div class="tag">you</div>
         <div class="time">
           <p>2 days ago</p>
         </div>
         <div class="edit-delete">
           <button onclick="deleteReply(event)">
             <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
               <path
                 d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                 fill="#ED6368"
               />
             </svg>
             Delete
           </button>
           <button onclick="editReply(event)">
             <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
               <path
                 d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                 fill="#5357B6"
               />
             </svg>
             Edit
           </button>
         </div>
       </div>

       <div class="comment-content">
         <textarea rows="5" disabled>
          ${text}
         </textarea>

         <button type="submit">Update</button>
       </div>
     </div>
   </div>
 </div>`;

    if (innerDiv.getAttribute("class", "inner-div") == "inner-div") {
      innerDiv.insertAdjacentHTML("beforeend", replyHtml);
      innerDiv.style.display = "block";
    } else {
      const nestedDiv = `<div style="display:block" class="inner-div">${replyHtml}</div>`;
      topDiv.insertAdjacentHTML("beforeend", nestedDiv);
      event.target.parentElement.style.display = "none";
    }

    event.target.style.display = "none";
  };

  window.createReply = function createReply(event) {
    const topDiv =
      event.currentTarget.parentElement.parentElement.parentElement
        .parentElement;
    const innerDiv =
      event.currentTarget.parentElement.parentElement.parentElement
        .nextElementSibling;
    if (innerDiv) {
      innerDiv.style.display = "block";
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const replyTag = `
        <div class="user-comment">
        <form class="user-comment-form" onsubmit="submitReply(event)">
       
          <img
            src=${user.image.webp}
            alt="user-profile"
            width="50px"
          />
          <textarea rows="5" value="" name="textarea"></textarea>
  
          <button type="submit">Reply</button>
        </form>
      </div>
        
        `;

    topDiv.insertAdjacentHTML("beforeend", replyTag);
    // console.log(topDiv);
    // const innerDiv =
    //   event.currentTarget.parentElement.parentElement.nextElementSibling;
    // if (innerDiv) {
    //   innerDiv.insertAdjacentHTML("beforeend", <h1>aman</h1>);
    // } else {
    //   console.log("h");
    // }
  };

  let container = document.getElementById("container");

  function createComments(comments) {
    let stringHtml = "";

    stringHtml =
      "" +
      comments.reduce((accumulator, data) => {
        //   console.log(data.replies);
        accumulator += `
            
        <div class="top-div">
  <div class="comment">
    <div class="score">
      <button onclick="showComments(event)" >
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
          />
        </svg>
      </button>
      <p>${data.score}</p>
      <button onclick="hideComments(event)">
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
          />
        </svg>
      </button>
    </div>
    <div class="info">
      <div class="profile-information">
        <div class="profile">
          <img
            src=${data.user.image.webp}
            alt="profile-image"
          />
        </div>
        <div class="name">
          <p>${data.user.username}</p>
        </div>
        <div class="time">
          <p>${data.createdAt}</p>
        </div>
        <button class="reply" onclick="createReply(event)">
          <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6"
            />
          </svg>
          <p>Reply</p>
        </button>
      </div>

      <div class="comment-content">
        <p>
         ${data.content}
        </p>
      </div>
    </div>
  </div> 
        
        `;

        if (data?.replies?.length > 0) {
          accumulator += `<div class="inner-div">${createComments(
            data.replies
          )}</div>`;
        }

        return accumulator + `</div>`;
      }, "");

    return stringHtml;
  }

  container.insertAdjacentHTML("beforeend", createComments(comments));
}

fetchData();
