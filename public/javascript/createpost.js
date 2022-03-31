async function newPostSubmit(event) {
  event.preventDefault();
  console.log("Test");

  const post_title = document.querySelector("#title").value;
  const post_url = document.querySelector("#post_url").value;
  const post_caption = document.querySelector("#caption").value;
  const post_content = document.querySelector("#post-content").value;

  if (post_title != "" && post_url != "" && post_content != "") {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({
        post_title,
        post_url,
        post_caption,
        post_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("yay");
      document.location.replace("/dashboard");
    } else {
      console.log("fail");
    }
  } else {
    console.log("inputs failed");
  }
}

document
  .querySelector(".post-form-submit")
  .addEventListener("click", newPostSubmit);
