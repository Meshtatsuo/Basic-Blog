async function updatePost(e) {
  e.preventDefault();
  //update post
  const post_title = document.querySelector("#title").value;
  const post_url = document.querySelector("#post_url").value;
  const post_caption = document.querySelector("#caption").value;
  const post_content = document.querySelector("#post-content").value;

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(post_id);
  if (post_title != "" && post_url != "" && post_content != "") {
    const response = await fetch("/api/posts/", {
      method: "PUT",
      body: JSON.stringify({
        post_title,
        post_url,
        post_caption,
        post_content,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Yay");
      document.location.replace("/dashboard");
    } else {
      console.log("fail");
    }
  }
}

$(document).ready(function () {
  $("input#caption").characterCounter();
  M.textareaAutoResize($("#post-content"));
  document
    .querySelector(".post-form-submit")
    .addEventListener("click", updatePost);
});
