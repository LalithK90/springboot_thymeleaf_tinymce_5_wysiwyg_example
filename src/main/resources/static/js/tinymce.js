tinymce.init({
    selector: 'textarea',  // change this value according to your HTML
    height: 300,
    plugins: [
        'advlist', 'anchor', 'autolink', 'autoresize', 'autosave', 'bbcode', 'charmap', 'code', 'codesample', 'contextmenu', 'directionality', 'emoticons', 'fullpage', 'fullscreen', 'help', 'hr', 'image', 'imagetools', 'importcss', 'insertdatetime', 'legacyoutput', 'link', 'lists', 'media', 'nonbreaking', 'noneditable', 'pagebreak', 'paste', 'preview', 'print', 'quickbars', 'save', 'searchreplace', 'tabfocus', 'table', 'template', 'textcolor', 'textpattern', 'toc', 'visualblocks', 'visualchars', 'wordcount',
    ],
    toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | table link image media pageembed  | print preview media fullscreen | ' +
        'forecolor backcolor emoticons | spellcheckdialog a11ycheck typography code | help',
    menu: {
        favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
    },
    menubar: 'favs file edit view insert format tools table help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    browser_spellcheck: true,
    contextmenu: false,
    advcode_inline: true,
    image_advtab: true,
    images_upload_handler: function (blobInfo, success, failure) {
        let reader = new FileReader();
        reader.onload = function (e) {
            success(e.target.result);
        };
        reader.readAsDataURL(blobInfo.blob());
    },
    setup: function (editor) {
        editor.on("change", function () {
            calculateSize();
        });
    }, template_mdate_format: '%m/%d/%Y : %H:%M',
    template_replace_values: {
        username: 'Jack Black',
        staffid: '991234',
        inboth_username: 'Famous Person',
        inboth_staffid: '2213',
    },
    template_preview_replace_values: {
        preview_username: 'Jack Black',
        preview_staffid: '991234',
        inboth_username: 'Famous Person',
        inboth_staffid: '2213',
    },
    templates: [
        {
            title: 'Date modified example',
            description: 'Adds a timestamp indicating the last time the document modified.',
            content: '<p>Last Modified: <time class="mdate">This will be replaced with the date modified.</time></p>'
        },
        {
            title: 'Replace values example',
            description: 'These values will be replaced when the template is inserted into the editor content.',
            content: '<p>Name: {$username}, StaffID: {$staffid}</p>'
        },
        {
            title: 'Replace values preview example',
            description: 'These values are replaced in the preview, but not when inserted into the editor content.',
            content: '<p>Name: {$preview_username}, StaffID: {$preview_staffid}</p>'
        },
        {
            title: 'Replace values preview and content example',
            description: 'These values are replaced in the preview, and in the content.',
            content: '<p>Name: {$inboth_username}, StaffID: {$inboth_staffid}</p>'
        }
    ],
    skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
    content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
});


function calculateSize() {
    let editorContent = tinymce.activeEditor.getContent();
    let tempElement = document.createElement("div");
    tempElement.innerHTML = editorContent;

    let images = tempElement.querySelectorAll("img");
    let videos = tempElement.querySelectorAll("video");
    let htmlSizeInBytes = editorContent.length * 2; // Each character is 2 bytes in JavaScript
    let totalSizeInBytes = htmlSizeInBytes;

    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        let base64Data = getImageBase64Data(image.src);
        let imageSizeInBytes = calculateBase64DataSize(base64Data);
        totalSizeInBytes += imageSizeInBytes;
    }

    for (let j = 0; j < videos.length; j++) {
        let video = videos[j];
        let videoSizeInBytes = getVideoSize(video.src);
        totalSizeInBytes += videoSizeInBytes;
    }

    let totalSizeInMB = (totalSizeInBytes / (1024 * 1024)).toFixed(2);
    console.log("Total Size: " + totalSizeInMB + " MB");
    $("#value").html("Total Size: " + totalSizeInBytes + " B \n Total Size: " + totalSizeInMB + " MB");
}

function getImageBase64Data(url) {
    // Extract base64 data from the image URL
    let base64Data = url.split(",")[1];
    return base64Data;
}

function calculateBase64DataSize(base64Data) {
    // Convert base64 data to raw binary data
    let binaryData = atob(base64Data);

    // Get the length of the binary data in bytes
    let sizeInBytes = binaryData.length;

    return sizeInBytes;
}

function getVideoSize(url) {
    // Make an AJAX request to retrieve the video size
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    xhr.send();
    let size = parseInt(xhr.getResponseHeader("Content-Length"));
    return size;
}