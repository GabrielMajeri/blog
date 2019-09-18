const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
Array.from(mathBlocks).forEach((el) => {
    const tex = el.textContent.replace("% <![CDATA[", "").replace("%]]>", "");
    el.outerHTML = katex.renderToString(tex, {
        displayMode: el.type === "math/tex; mode=display",
    });
});
