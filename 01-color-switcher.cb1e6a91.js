!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){n=setInterval((function(){var t;t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),document.body.style.backgroundColor=t}),1e3),t.startBtn.disabled=!0,t.stopBtn.disabled=!1})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}));var n=null;t.stopBtn.disabled=!0}();
//# sourceMappingURL=01-color-switcher.cb1e6a91.js.map
