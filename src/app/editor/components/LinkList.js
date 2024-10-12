'use client'
import { useCallback, useState } from 'react';
import styles from './LinkList.module.css';
import { MdDragHandle } from "react-icons/md";
import Select, { components }  from 'react-select';
import { AiFillGithub } from "react-icons/ai";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { HiLink } from "react-icons/hi2";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const customOption = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <span style={{ marginRight: 10 }}>{props.data.icon}</span>
        {props.data.label}
      </components.Option>
    </div>
  );
};


const customSingleValue = ({ data,  children, ...props  }) => (
  <components.SingleValue {...props}>
    <span style={{ marginRight: 10, fontSize:16 }}>{data.icon}</span>
    <span style={{fontSize:16}}>{data.label}</span> 
  </components.SingleValue>
);



export default function LinkList({linkList, updateLinkList}) {
  const [platforms, setPlatforms] = useState(linkList.map(link => link.platform))
  const [urls, setUrls] = useState(linkList.map(link => link.url))


  const options = [
    { value: 'GitHub', label: 'GitHub', icon: <AiFillGithub /> },
    { value: 'YouTube', label: 'YouTube', icon: <RiYoutubeLine /> },
    { value: 'LinkedIn', label: 'LinkedIn', icon: <FaLinkedin /> }
  ];

  function getOptionByPlatformIndex(index) {
    const platformValue = platforms[index]; 
    const matchedOption = options.find(option => option.value === platformValue); 
  
    return matchedOption || null; 
  }


  const addLink = () => {
    setPlatforms([...platforms, ""])
    setUrls([...urls, ""])
  };

  const handleUrlChange = useCallback((index, value) => {
    setUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = value;
      return newUrls;
    });
  }, []);

  const handlePlatformChange = useCallback((index, value) => {
    setPlatforms((prevPlatforms) => {
      const newPlatforms = [...prevPlatforms];
      newPlatforms[index] = value;
      return newPlatforms;
    });
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedPlatforms = platforms;
    const [removedPlatform] = reorderedPlatforms.splice(result.source.index, 1);
    reorderedPlatforms.splice(result.destination.index, 0, removedPlatform);
    setPlatforms(reorderedPlatforms)

    const reorderedUrls = urls;
    const [removedUrls] = reorderedUrls.splice(result.source.index, 1);
    reorderedUrls.splice(result.destination.index, 0, removedUrls);
    setUrls(reorderedUrls)
    console.log(reorderedPlatforms)
  }

  return (
    <div className={styles.linkList}>
      <h3 className={styles.title} >Customize your links</h3>
      <p className={styles.subTitle}>Add/edit/remove links below and then share all your profiles with the world!</p>
      <button className={styles.addButton} onClick={addLink}>+ Add new link</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={styles.linkContainer} >
            {platforms.map((platform, index) => (
              <Draggable
              key={index} draggableId={index} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef}
                  {...provided.draggableProps}
                   key={index} className={styles.linkItem}>
                  <div className={styles.linkTitleContainer}
                  >
                  <p className={styles.linkTitle} {...provided.dragHandleProps}><MdDragHandle />&nbsp;{`Link #${index+1}`}</p>
                  <p onClick={() => {
                    setPlatforms(platforms.filter((_, i) => i !== index))
                    setUrls(urls.filter((_, i) => i !== index))
                  }} className={styles.linkRemove} >Remove</p>
                  </div>
                  <div  className={styles.item}>
                      <p className={styles.linkText}>Platform</p>
                      <Select
                      defaultValue={getOptionByPlatformIndex(index)}
                      options={options}
                      components={{ Option: customOption, SingleValue: customSingleValue }} // Custom components for options and selected value
                      isSearchable={false}
                      onChange={(val) => handlePlatformChange(index, val.value)}
                      />
                      
                  </div>
                  <div  className={styles.item}>
                  <p className={styles.linkText}>Link</p>
                  <div className={styles.inputWrapper}> 
                    <span className={styles.inputIcon} ><HiLink /></span>
                    <input 
                      className={styles.itemInput}
                        type="text" 
                        placeholder="Enter URL" 
                        value={urls[index]}
                        onChange={(e) => handleUrlChange(index, e.target.value)} 
                      />
                  </div>
                    
                  </div>
                  
                </div>
                )}
              
              </Draggable>
            ))}
            </div>
          )}
          
        </Droppable>
      </DragDropContext>
      <hr color="lightgray" />
      <div className={styles.saveContainer}>
        <button
          className={styles.saveButton }
          onClick={async() => {
            const combinedArray = platforms.map((platform, index) => ({
              platform: platform,
              url: urls[index]
            }));
            await updateLinkList(combinedArray)}}
        >Save</button>
      </div>
    </div>
  );
}
