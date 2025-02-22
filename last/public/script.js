document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();  // 阻止表单默认提交行为
  
    // 获取表单数据
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // 发送 POST 请求
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // 发送 JSON 数据
      },
      body: JSON.stringify({ username,password})  // 将数据转换为 JSON 字符串
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").innerText = data.message;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });


document.getElementById("signup").addEventListener("submit", function(event) {
    event.preventDefault();  // 阻止表单默认提交行为
  
    // 获取表单数据
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // 发送 POST 请求
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // 发送 JSON 数据
      },
      body: JSON.stringify({ username,email,password})  // 将数据转换为 JSON 字符串
    })
    .then(sign => sign.json())
    .then(data => {
      document.getElementById("sign").innerText = data.message;
    })
    .catch(error => {
      console.error("Error:", error);
    });
});


  