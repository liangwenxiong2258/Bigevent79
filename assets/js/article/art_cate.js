axios.get("/my/article/cates").then((res) => {
    console.log(res);
    let htmlStr = template("trTpl", res.data)
    $("tbody").html(htmlStr)
})