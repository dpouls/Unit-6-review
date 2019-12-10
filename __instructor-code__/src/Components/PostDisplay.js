import React from 'react';

const PostDisplay = (props) => {
    return(
        <div>
            <img src={props.post.image_url} alt='user post' />
        </div>
    )
}

export default PostDisplay;