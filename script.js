document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "Uploading...";

    try {
        // URL to your Azure Blob Storage (replace with your storage account details)
        const storageUrl = "https://ops310prj2jsangani.blob.core.windows.net/incoming-files";
        const sasToken = "sp=racwdli&st=2024-12-08T03:04:21Z&se=2025-12-08T11:04:21Z&sv=2022-11-02&sr=c&sig=EU6Fa2vROtqb7NSzPMzvfPrKXTrbAqL1TJq9E4lPgzQ%3D"; // Use a SAS token with write permissions for the container

        const uploadUrl = `${storageUrl}/${file.name}?${sasToken}`;

        const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "x-ms-blob-type": "BlockBlob",
            },
            body: file,
        });

        if (response.ok) {
            statusDiv.textContent = "File uploaded successfully!";
        } else {
            throw new Error(`Failed to upload. Status: ${response.status}`);
        }
    } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
    }
});
