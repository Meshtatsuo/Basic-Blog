async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/loggedout");
  } else {
    alert(response.statusText);
  }
}

async function deletePost(event) {
  event.preventDefault();

  const post_id = event.target.id;

  if (event.target.id) {
    const response = await fetch("/api/posts/", {
      method: "DELETE",
      body: JSON.stringify({
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.log("Failure");
    }
  }
}

function IsNumeric(val) {
  return Number(parseFloat(val)) === val;
}

document.querySelector("#recent-posts").addEventListener("click", function (e) {
  if (e.target.classList[0] === "delete-btn") {
    deletePost(e);
  } else if (e.target.classList[0] === "edit-btn") {
    document.location.replace("/api/posts/edit/" + e.target.id);
  }
});

document.querySelector("#logout-button").addEventListener("click", logout);
