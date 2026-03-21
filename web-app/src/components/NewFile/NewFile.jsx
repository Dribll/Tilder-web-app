import React, { useState } from "react";

export default function NewFile(props) {

    const [fileName, setFileName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!fileName.trim()) return;

        props.CreateNewFile(fileName);

        setFileName("");
    }

    return (
        <div id="newfilewrapper">
            <div className={`d-${props.NewFileVisibility}`} id='newFile'>
                <h5>New File</h5>

                <form onSubmit={handleSubmit}>
                    <div className="file_wrapper">

                        <div className="file_wrapper_element">
                            <h6 className="heading_file">
                                <label>File Name:</label>
                            </h6>

                            <input
                                type="text"
                                className="d-flex"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        </div>

                        <div id="file_wrapper_submit_button">
                            <button type="submit" id="create_new_file">
                                Create File
                            </button>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
}