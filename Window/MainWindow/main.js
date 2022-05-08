const djsmusic = require("@kyometori/djsmusic")
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {

    let OnOffStatus = {
        player: 0,
        help: 0,
        ytsring: 0,
        keywordfoces: 0
    }

    const TheAnimectinsFunctions = {
        ytscing: {
            ing: function () {
                document.querySelectorAll("#main>.main>.vido>*").forEach(ele => {
                    ele.classList.add("loading")
                })
                document.querySelectorAll("#main>.main>.chanel>*").forEach(ele => {
                    ele = ele.style
                    ele.opacity = ".5"
                    ele.pointerEvents = "none"
                })
                {
                    const ele = document.querySelector("#bg>.bg").style
                    ele.transform = "scale(.89)"
                    ele.borderRadius = "10px"
                }
                document.querySelector("#main").style.pointerEvents = "none"
                document.querySelector("#main>.ytsring>div>div").style.transform = "translate(0, 0) scale(1)"
                document.querySelector("#main>.main>.chanel>.name").style.margin = "auto 0px"
                TheAnimectinsFunctions.closeAsk.off()
                OnOffStatus.ytsring++
                ipcRenderer.send("ytsring", OnOffStatus.ytsring)
            },
            done: function () {
                document.querySelectorAll("#main>.main>.vido>*").forEach(ele => {
                    ele.classList.remove("loading")
                })
                document.querySelectorAll("#main>.main>.chanel>*").forEach(ele => {
                    ele = ele.style
                    ele.opacity = ""
                    ele.pointerEvents = ""
                })
                {
                    const ele = document.querySelector("#bg>.bg").style
                    ele.transform = ""
                    ele.borderRadius = ""
                }
                document.querySelector("#main").style.pointerEvents = ""
                document.querySelector("#main>.main>.chanel>.name").style.margin = ""
                document.querySelector("#main>.ytsring>div>div").style.transform = ""
                OnOffStatus.ytsring--
                ipcRenderer.send("ytsring", OnOffStatus.ytsring)
            },
        },
        closeAsk: {
            lst: ["#close-bg", "#close-bg>.bg", "#box", "#close-ask", "#close-ask>.a", "#close-ask>.q"],
            on: function () { this.lst.forEach(ele => document.querySelector(ele).classList.add("close")) },
            off: function () { this.lst.forEach(ele => document.querySelector(ele).classList.remove("close")) },
        },
    }
    const TheMainFunctions = {
        ytSc: {
            vido: function (options) {
                const mainMainEl = document.querySelector("#main>.main");
                const mainMainvidoEl = mainMainEl.querySelector(".vido");
                const mainPlayerEl = document.querySelector("#main>.player");
                if (!options) {
                    options = {
                        vedo: {
                            thumb: "default-image/thumbnail.png",
                            title: "NONE",
                            update: "-",
                            viewcon: "9487",
                        },
                        chnel: {
                            name: "NONE",
                        },

                    }

                }

                document.getElementById("bg-img").src = options.vedo.thumb;
                mainMainvidoEl.querySelector(".thumbnail").style.backgroundImage = `url(${options.vedo.thumb})`
                document.querySelector("#bg>.bg").style.backgroundImage = `url(${options.vedo.thumb})`
                document.querySelector("#close-bg>.bg").style.backgroundImage = `url(${options.vedo.thumb})`
                mainMainvidoEl.querySelector(".title").innerHTML = options.vedo.title
                mainPlayerEl.querySelector(".box>.title>.title").innerHTML = options.vedo.title
                mainMainvidoEl.querySelector(".uploadDate").innerHTML = options.vedo.update
                mainMainEl.querySelector(".chanel>.name").innerHTML = options.chnel.name
            },
        }
    }

    document.addEventListener("keydown", e => {
        if (!OnOffStatus.ytsring) {
            if (e.altKey && e.code == "KeyP" && !OnOffStatus.player) {
                TheAnimectinsFunctions.player.player()
            } else if (e.code == "Escape" && OnOffStatus.player) {
                TheAnimectinsFunctions.player.player()
            };
        };
    });
    document.addEventListener("keypress", e => {
        if (OnOffStatus.keywordfoces && e.code === "Enter" || OnOffStatus.keywordfoces && e.code === "NumpadEnter") {
            TheMainFunctions.ytSc.ytsc();
        };
    });

    {
        const ele = document.querySelector("#close-ask>.a")

        ipcRenderer.on("main-functions", function (_event, args) {
            TheAnimectinsFunctions.closeAsk.on()
        })


        document.getElementById("btn-small").addEventListener("click", () => {
            ipcRenderer.send("main-BrowserWindow", "minimize");
        })
        document.getElementById("btn-close").addEventListener("click", () => {
            TheAnimectinsFunctions.closeAsk.on()
        })


        ele.querySelector(".no").addEventListener("click", () => {
            TheAnimectinsFunctions.closeAsk.off()
        })

        ele.querySelector(".hide").addEventListener("click", () => {
            ipcRenderer.send("main-BrowserWindow", "hide");
            TheAnimectinsFunctions.closeAsk.off()
        })

        ele.querySelector(".yes").addEventListener("click", () => {
            TheAnimectinsFunctions.closeAsk.off()
            document.body.style.pointerEvents = "none"
            document.querySelector("#box").style.transform = "translate(-50%, -100%) scale(.7)"
            document.querySelector("#box").style.opacity = "0"
            document.querySelector("#mousecurs").style.transform = "translate(-50%, -50%) scale(5)"
            document.querySelector("#mousecurs").style.opacity = "0"
            setTimeout(() => ipcRenderer.send("main-BrowserWindow", "close"), 1.5e3)
        })

    }

    {
        const mouseEle = document.querySelector("#mousecurs").style
        const mouseMouseEle = document.querySelector("#mousecurs>.main").style
        const mouseFocesEle = document.querySelector("#mousecurs>.focespoint").style
        document.addEventListener("mousemove", function (e) {
            mouseEle.left = e.clientX + "px"
            mouseEle.top = e.clientY + "px"
        })
        document.addEventListener("mousedown", function (e) {
            mouseMouseEle.width = "64px"
            mouseMouseEle.height = "64px"
            mouseMouseEle.boxShadow = "0 0 10px #0008"
            mouseMouseEle.backgroundColor = "#0000"
            mouseMouseEle.backdropFilter = "blur(0)"

            mouseFocesEle.transform = "translate(-50%, -50%) scale(.3)"
            mouseFocesEle.opacity = "1"
        })
        document.addEventListener("mouseup", function (e) {
            mouseMouseEle.width = ""
            mouseMouseEle.height = ""
            mouseMouseEle.boxShadow = ""
            mouseMouseEle.backgroundColor = ""
            mouseMouseEle.backdropFilter = ""

            mouseFocesEle.transform = ""
            mouseFocesEle.opacity = ""
        })
    }

    {
        // 來源 ： https://codepen.io/spagettiguru/pen/PoqbOKm

        const bg = document.getElementById('bg');
        const bg2 = document.querySelector('#close-bg>.bg');


        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const bgWidth = bg.clientWidth;
        const bgHeight = bg.clientHeight;

        document.addEventListener('mousemove', (e) => {
            const vDistanceFromCenter = viewportHeight / 2 - e.clientY;
            const hDistanceFromCenter = viewportWidth / 2 - e.clientX;
            {
                bg.style.top = "0"
                bg.style.left = "0"
                const maxXOffset = -10;
                const maxYOffset = -10;
                bg.style.transform = `translate(
            ${viewportWidth / 2 + (hDistanceFromCenter / (viewportWidth / 2) * maxXOffset) - bgWidth / 2}px,
            ${viewportHeight / 2 + (vDistanceFromCenter / (viewportHeight / 2) * maxYOffset) - bgHeight / 2}px)`;
            }
            {
                bg2.style.top = "0"
                bg2.style.left = "0"
                const maxXOffset = -20;
                const maxYOffset = -20;
                bg2.style.transform = `translate(
            ${viewportWidth / 2 + (hDistanceFromCenter / (viewportWidth / 2) * maxXOffset) - bgWidth / 2}px,
            ${viewportHeight / 2 + (vDistanceFromCenter / (viewportHeight / 2) * maxYOffset) - bgHeight / 2}px) scale(1.1)`;
            }
        });
    }

    {
        // 來源 ： https://codepen.io/ryanmorr/pen/JdOvYR
        // 開發中

        var menu = document.querySelector('#ctx-menu');

        function showMenu(x, y) {
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';
            menu.classList.add('menu-show');
        }

        function hideMenu() {
            menu.classList.remove('menu-show');
        }

        function onContextMenu(e) {
            e.preventDefault();
            showMenu(e.pageX, e.pageY);
            document.addEventListener('mousedown', onMouseDown, false);
        }

        function onMouseDown(e) {
            hideMenu();
            document.removeEventListener('mousedown', onMouseDown);
        }

        document.addEventListener('contextmenu', onContextMenu, false);
    }
})