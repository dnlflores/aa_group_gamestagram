import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
// import { Redirect } from 'react-router-dom';
import { editOneImage } from '../../store/image';

const EditFormPage = (props) => {
  const [errors, setErrors] = useState([]);
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.image)

  const onEditGame = async (e) => {
    e.preventDefault();
    let newImageCaption = image.caption;
    if (image) {
      if (caption !== '') newImageCaption = caption;
    }
    const payload = {
      ...image,
      caption: newImageCaption
    }
    let updatedImage = await dispatch(editOneImage(payload));
    if (updatedImage) {
      props.setTrigger(0);
      setCaption('');
    }
  };

  const updateCaption = (e) => {
    setCaption(e.target.value);
  };

  return (props.trigger === image.id) ? (
    <div>
        <form onSubmit={onEditGame} className={props.image.id}>
        <div>
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
            <label>Edit Caption</label>
            <input
            type='text'
            name='caption'
            onChange={updateCaption}
            value={caption}
            required={true}
            ></input>
        </div>
        <button type='submit'>Confirm Edit</button>
        </form>
    </div>
  ) : '';
};

export default EditFormPage;
