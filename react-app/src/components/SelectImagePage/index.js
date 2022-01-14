import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SelectImagePage = (props) => {

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState("");
    const history = useHistory(); // so that we can redirect after the image upload is successful

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const updateCaption = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        formData.append("caption", caption);

        const res = await fetch("/api/games", {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/games");
        } else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("there was an error here is some info", res, res.formData, res.status);
        }
    };

    return (
        <div
            className="modal-header"
        // onClick={e => {
        //     props.setTrigger(false);
        // }}
        >
            {props.trigger && (
                <div className="modal-outer">
                    <div className="modal-inner">
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept="image/*" onChange={updateImage} />
                            <div className="upload">
                                <label>Caption</label>
                                <input
                                    type="text"
                                    name="caption"
                                    onChange={updateCaption}
                                    value={caption}
                                ></input>
                            </div>
                            <button type="submit">Submit</button>
                            {imageLoading && <p>Loading...</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectImagePage;