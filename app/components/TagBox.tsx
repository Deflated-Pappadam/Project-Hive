import React from 'react'

type Props = {
    text:string;
    color:string;
  };

  
function TagBox(props: Props) {
  return (
    <div style={{"backgroundColor": props.color}} className={`py-3 px-4 poppins-semibold text-xl w-fit rounded-lg shrink-0`}>{props.text}</div>
  )
}

export default TagBox