import React, { Component, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  //@ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  EditorState,
  convertToRaw,
  // convertFromHTML,
  ContentState,
  ContentBlock,
  Entity,
  convertFromHTML,
} from 'draft-js';
import { Button, Paper } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import { stat } from 'fs';

export const EditorComponent = ({
  data,
  setData,
  setUpdatedData,
  maxWidth,
  showPreview,
}: any) => {
  // let _contentState = ContentState.createFromText('Sample content state');
  // const raw = convertToRaw(_contentState)
  // const [state, setState] = useState<any>(EditorState.createWithContent(ContentState.createFromText('Start Typing Here')));

  const [state, setState] = useState(EditorState.createEmpty());
  const [enablePreview, setEnablePreview] = useState(showPreview ?? false);

  console.log(data);
  const [videoLink,setVideoLink] = useState("");
 
  const embedVideoCallBack = (youtubeUrl:String) =>{
    const videoIdMatch = youtubeUrl.match(/(?:youtu\.be\/|v=)([^?&]+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    // Construct the embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(embedUrl);
    return embedUrl;
  }
  // Return the original URL if the format is not recognized
  return youtubeUrl;
}
  const onEditorStateChanges = (editorState: EditorState):void => {
   
    setState(editorState);
    const updatedData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setUpdatedData(updatedData);
  };

  // const getVideoId = (link: string) => {
  //   // Extract the video ID from the YouTube video link
  //   const videoIdMatch:any = link.match(/(?:\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/|\/embed\/|\/watch\?feature=player_embedded&v=|\/embed\/watch\?v=)([^#\&\?]*).*/);
  //   return videoIdMatch[1];
  // };
  useEffect(() => {
    const html = data ?? '<b>Loading...</b>';
    const blocksFromHTML = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

    setState(EditorState.createWithContent(contentState));
  }, [data]);

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      const entityKey = contentBlock.getEntityAt(0);
      const entity = Entity.get(entityKey);
      console.log("The entitiy d ",entity);
      if (entity.getType() === 'IFRAME') {

        return {
          component: MyIframeComponent,
          editable: false,
        };
      }
    }
    return null;
  };


  const onEditorStateChange = (state: any) => {
    console.log(state);
    setState(state);
    // console.log(draftToHtml(state))
    console.log("The html change",draftToHtml(convertToRaw(state.getCurrentContent())))
    setUpdatedData(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <div style={{ width: '100%', textAlign: 'right', marginBottom: 30 }}>
        <Button sx={{}} onClick={() => setEnablePreview(!enablePreview)}>
          {enablePreview ? 'Edit Content' : 'Enable Preview'}
        </Button>
      </div>
      {enablePreview ? (
        <div dangerouslySetInnerHTML={{ __html: data }} />
      ) : (
        //@ts-ignore
        <Editor
          //@ts-ignore
          editorState={state}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbar={{
            embedded:{
                embedCallback: embedVideoCallBack
              
            }
        }}
        // blockRendererFn={blockRendererFn}
          editorStyle={{
            border: '1px solid rgb(0,0,0,0.05)',
            minHeight: 400,
            ...(maxWidth && { maxWidth }),
            padding: 10,
          }}
          onEditorStateChange={onEditorStateChange}
        />
      )}
    </Paper>
  );
};
const MyIframeComponent = (props: { contentState: ContentState; block: ContentBlock }) => {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const iframeData = entity.getData();
  const iframeSrc = iframeData.src; 

  return (
    // <div>
      <iframe title="Embedded Content" src={iframeSrc} width="100%" height="315" frameBorder="0" />
    // </div>
  );
};