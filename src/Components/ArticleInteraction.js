import React, { useState } from 'react'
import '../Style/ArticleInteraction.css';
import like_logo from '../Assets/like.png';
import like_hover_logo from '../Assets/like hover.png';
import likeActivated_logo from '../Assets/likeActivated.png';
import saved_logo from '../Assets/Saved.png';
import saved_hover_logo from '../Assets/saved hover.png';
import savedActivated_logo from '../Assets/Saved_Activated.png';
import comments_logo from '../Assets/comment.png';
import comments_hover_logo from '../Assets/comment hover.png';
import commentsActivated_logo from '../Assets/comment_Activated.png';


export default function ArticleInteraction() {

    const [like , setLike] = useState(false);
    const [saved , setSaved] = useState(false);
    const [comment , setComment] = useState(false);


  return (
    <div className='InteractionContainer'>
        <div className='likes' onClick={()=>{setLike(!like)}}>
            {like ? 
                <img src={likeActivated_logo} className='activated' alt='likeactivated'/>
                :
                <img src={like_logo} alt='like'/>
            }
        </div>
        <div className='saved' onClick={()=>{setSaved(!saved)}}>
            {saved ? 
                <img src={savedActivated_logo} className='activated' alt='likeactivated'/>
                :
                <img src={saved_logo} alt='like'/>
            }
        </div>
        <div className='comments' onClick={()=>{setComment(!comment)}}>
            {comment ? 
                <img src={commentsActivated_logo} className='activated' alt='likeactivated'/>
                :
                <img src={comments_logo} alt='like'/>
            }
        </div>
    </div>
  )
}
