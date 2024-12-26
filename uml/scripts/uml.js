
import { compressText,decompressText } from '../../scripts/base-converter.js';

window.onload = async function() {
    let graphDefinition = `
        graph TD\nA[Start]
    `;
    const urlInputBox = document.getElementById('urlAreaInputBox');
    const umlInput = document.getElementById('umlInput');
    const graphContainer = document.getElementById('umlOutput');
    const popup = document.getElementById('popup');
    document.getElementById('helpButton').addEventListener('click', function() { popup.style.display = 'block'; });
    document.getElementById('closeButton').addEventListener('click', function() { popup.style.display = 'none'; });
    
    mermaid.initialize({ startOnLoad: false });
    document.getElementById('renderButton').addEventListener('click', async () => {
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    
    
    const renderMermaidGraph = async function () {
        try {
            const { svg } = await mermaid.render('graphDiv', graphDefinition);
            graphContainer.innerHTML = svg;
            updateURL();
        } catch (error) {
            console.error('Error rendering Mermaid graph:', error);
            graphContainer.innerHTML = `<p style="color: red;">Error rendering Mermaid graph: ${error.message}</p>`;
        }
    }

    const saveButton = document.getElementById('copyButton');
    saveButton.addEventListener('click',(e) =>{
        navigator.clipboard.writeText(urlInputBox.value) 
            .then(() => {   
                swal.fire({
                    title: "Copied to clipboard.",
                    icon: "success",
                    showConfirmButton: false,
                    position: "top-end",
                    timer:1000
                    });
            }) 
            .catch(err => {
                 swal.fire({
                    title: "Oops...",
                    text: "Failed to  Copied to clipboard." + err,
                    icon: "error",
                    position: "top-end"
                    });
                });
    });

    const reloadButton = document.getElementById('reloadButton');
    reloadButton.addEventListener('click',(e) =>{
        setURL();
        swal.fire({
            title: "Reload url.",
            icon: "success",
            showConfirmButton: false,
            timer:1500
            });
    });

    function updateURL(){
        const datas = umlInput.value;
        urlInputBox.value = 'https://zero-stored.net/uml.html?data=' + compressText(datas);
    }

    async function setURL(){
        const url = new URL(urlInputBox.value);
        const params = new URLSearchParams(url.search);
        if (params.has('data')) {
            console.info(params.get('data'));
            const datas = decompressText(params.get('data'));
            umlInput.value = datas;
            graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
            await renderMermaidGraph();
        } 
    }

    umlInput.addEventListener('keydown',async function(event) {
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault(); 
            graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
            await renderMermaidGraph();
        }
    });

    async function init(){
        urlInputBox.value = window.location.href;
        await setURL();
        await renderMermaidGraph();
    }
    init();
};
