import React from 'react';


const Upload = ({ handler, wordDocument }) => {
    return (
        <div class ="field mb-5">
            <div class="control">
                <div class="file has-name is-boxed is-centered is-hidden-touch">
                    <label class="file-label">
                        <input class="file-input" type="file" name="file" onChange={handler} />
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fa-solid fa-upload"></i>
                        </span>
                        <span class="file-label">Upload .docx file</span>
                        </span>
                        <span class="file-name">{wordDocument ? wordDocument.name : 'Choose a file…'}</span>
                    </label>
                </div>
                <div class="file has-name is-boxed is-centered is-small is-hidden-desktop">
                    <label class="file-label">
                        <input class="file-input" type="file" name="file" onChange={handler} />
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fa-solid fa-upload"></i>
                        </span>
                        <span class="file-label">Upload .docx file</span>
                        </span>
                        <span class="file-name">{wordDocument ? wordDocument.name : 'Choose a file…'}</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

  
export default Upload