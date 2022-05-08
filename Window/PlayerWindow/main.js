const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {
    let ytsring=0
    ipcRenderer.on("ytsr-focus", () => {
        if(!ytsring){
            document.getElementById("keyword").focus()
        }else{
            document.getElementById("keyword").blur()
        }
    })
    ipcRenderer.on("ytsring", function (_event, args) {
        ytsring=args
        if (args) {
            document.getElementById("ytsring").classList.remove("done")
        } else {
            document.getElementById("ytsring").classList.add("done")
        }
    })
    ipcRenderer.on("main-keyword", function (_event, args) {
        document.querySelector("#keyword").value = args;
    });

    document.addEventListener("keypress", e => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            ipcRenderer.send("ytsr-keyword", document.getElementById("keyword").value);
        }

    });
    document.addEventListener("keydown", e => {
        if (e.code === "Escape") {
            ipcRenderer.send("ytsr-hide");
        };
    })
});