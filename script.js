document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.getElementById('inputFile');
    const dropArea = document.getElementById('dropArea');
    const imgView = document.getElementById('imgView');

    const handleFile = async (file) => {
        if (file && file.type.startsWith('image/')) { 
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgView.innerHTML = `<img src ="${e.target.result}" alt ="Selected Image">`;
                };
            reader.readAsDataURL(file);

            try {
                const client = await gradio.client.connect("idksarah/element-from-emissions");
                const result = await gradio.predict("/predict", [file]);
                const prediction = result.data;
                console.log("Prediction:", prediction);
                imgView.innerHTML += `<p>Predicted Element: ${prediction}</p>`;
            } catch (error) {
                console.error("Prediction error:", error);
                imgView.innerHTML += `<p>Error: ${error.message}</p>`;
            }
        } else {
            alert("Please select an image file.");
        }
    }

    inputFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    })

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
});