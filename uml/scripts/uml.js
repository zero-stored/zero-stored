
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
    
    const flowButton = document.getElementById('flowButton')
    const sequenceButton = document.getElementById('sequenceButton')
    const classButton = document.getElementById('classButton')
    const stateButton = document.getElementById('stateButton')
    const ERButton = document.getElementById('ERButton')
    const ganttButton = document.getElementById('ganttButton')
    const journeyButton = document.getElementById('journeyButton')
    const gitButton = document.getElementById('gitButton')
    const pieButton = document.getElementById('pieButton')
    const quadrantButton = document.getElementById('quadrantButton')
    const packetButton = document.getElementById('packetButton')

    const downloadButton = document.getElementById('downloadButton')

    flowButton.addEventListener('click',async () =>{
        umlInput.value = "flowchart TD \n    A[Christmas] -->|Get money| B(Go shopping)\n    B --> C{Let me think}\n    C -->|One| D[Laptop]\n    C -->|Two| E[iPhone]\n    C -->|Three| F[fa:fa-car Car]"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    sequenceButton.addEventListener('click',async () =>{
        umlInput.value = "sequenceDiagram\n    Alice->>+John: Hello John, how are you?\n    Alice->>+John: John, can you hear me?\n    John-->>-Alice: Hi Alice, I can hear you!\n    John-->>-Alice: I feel great!"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    classButton.addEventListener('click',async () =>{
        umlInput.value = "classDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n      +String beakColor\n      +swim()\n      +quack()\n    }\n    class Fish{\n      -int sizeInFeet\n      -canEat()\n    }\n    class Zebra{\n      +bool is_wild\n      +run()\n    }"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    stateButton.addEventListener('click',async () =>{
        umlInput.value = "stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    ERButton.addEventListener('click',async () =>{
        umlInput.value = 'erDiagram\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : has\n    CUSTOMER ||--o{ ORDER : places\n    CUSTOMER ||--o{ INVOICE : "liable for"\n    DELIVERY-ADDRESS ||--o{ ORDER : receives\n    INVOICE ||--|{ ORDER : covers\n    ORDER ||--|{ ORDER-ITEM : includes\n    PRODUCT-CATEGORY ||--|{ PRODUCT : contains\n    PRODUCT ||--o{ ORDER-ITEM : "ordered in"'
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    ganttButton.addEventListener('click',async () =>{
        umlInput.value = "gantt\n    title A Gantt Diagram\n    dateFormat  YYYY-MM-DD\n    section Section\n    A task           :a1, 2014-01-01, 30d\n    Another task     :after a1  , 20d\n    section Another\n    Task in sec      :2014-01-12  , 12d\n    another task      : 24d"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    journeyButton.addEventListener('click',async () =>{
        umlInput.value = "journey\n    title My working day\n    section Go to work\n      Make tea: 5: Me\n      Go upstairs: 3: Me\n      Do work: 1: Me, Cat\n    section Go home\n      Go downstairs: 5: Me\n      Sit down: 3: Me"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    gitButton.addEventListener('click',async () =>{
        umlInput.value = "gitGraph\n    commit\n    commit\n    branch develop\n    checkout develop\n    commit\n    commit\n    checkout main\n    commit"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    pieButton.addEventListener('click',async () =>{
        umlInput.value = 'pie title Pets adopted by volunteers\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15'
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    quadrantButton.addEventListener('click',async () =>{
        umlInput.value = "quadrantChart\n    title Reach and engagement of campaigns\n    x-axis Low Reach --> High Reach\n    y-axis Low Engagement --> High Engagement\n    quadrant-1 We should expand\n    quadrant-2 Need to promote\n    quadrant-3 Re-evaluate\n    quadrant-4 May be improved\n    Campaign A: [0.3, 0.6]\n    Campaign B: [0.45, 0.23]\n    Campaign C: [0.57, 0.69]\n    Campaign D: [0.78, 0.34]\n    Campaign E: [0.40, 0.34]\n    Campaign F: [0.35, 0.78]"
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });
    packetButton.addEventListener('click',async () =>{
        umlInput.value = '---\n    title: "TCP Packet"\n---\n    packet-beta\n      0-15: "Source Port"\n      16-31: "Destination Port"\n      32-63: "Sequence Number"\n      64-95: "Acknowledgment Number"\n      96-99: "Data Offset"\n      100-105: "Reserved"\n      106: "URG"\n      107: "ACK"\n      108: "PSH"\n      109: "RST"\n      110: "SYN"\n      111: "FIN"\n      112-127: "Window"\n      128-143: "Checksum"\n      144-159: "Urgent Pointer"\n      160-191: "(Options and Padding)"\n      192-255: "Data (variable length)"'
        graphDefinition = umlInput.value.replace(/\r\n|\r/g, '\n').trim();
        await renderMermaidGraph();
    });

        downloadButton.addEventListener('click', () => {
        const svgData = graphContainer.innerHTML;
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'uml.svg'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    
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
        urlInputBox.value = 'https://zero-stored.github.io/zero-stored/uml.html?data=' + compressText(datas);
    }

    async function setURL(){
        const url = new URL(urlInputBox.value);
        const params = new URLSearchParams(url.search);
        if (params.has('data')) {
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
