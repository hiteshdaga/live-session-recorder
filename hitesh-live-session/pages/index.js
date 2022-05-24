/* eslint-env browser */
import React from 'react';
var count=0;
var counter=0;
var arr=[];
var count1=0;
var counter1=0;
var temp1;
var arr1=[];
var temp;
const videoType = 'video/webm';




export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

  async componentDidMount() {
    
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    // show it to user
    this.video.srcObject = stream;
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the video to memory
    
    /*var str2= window.prompt("Enter the description of the live video: ")
    alert("The description saved is: "+str2);*/
    this.saveVideo();
  }
 /* titleRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the video to memory
    
    this.saveVideo();
  }
  */

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: videoType});
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({videos});
    
  }
  
 /* printrole(str1,str2){
    return str1+" "+str2;
  }*/
  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter(v => v !== videoURL);
    this.setState({videos});
  }
  
  TitleVideo(videoURL){
    if((counter==0)||(temp!=videoURL))
    {
      count=0;
    }
    if(temp==videoURL)
    {
      count=1;
    }
    if(count==0){
    var str1= window.prompt("Enter the title of the live video: ")
    alert("The title saved is: "+str1);
    arr[count]=str1;
    }
    else{
    window.alert(arr[--count]);
    }
    count=count+1;
    temp=videoURL;
    counter=counter+1;
  }

  DescribeVideo(videoURL){
    if((counter1==0)||(temp1!=videoURL))
    {
      count1=0;
    }
    if(temp1==videoURL)
    {
      count1=1;
    }
    if(count1==0){
    var str2= window.prompt("Enter the description of the live video: ")
    alert("The description saved is: "+str2);
    arr1[count1]=str2;
    }
    else{
    window.alert(arr1[--count1]);
    }
    count1=count1+1;
    temp1=videoURL;
    counter1=counter1+1;
  }

  render() {
    const {recording, videos} = this.state;

    return (
      <div className="camera">
        <footer border="2">
       <p>Made by: Hitesh Daga</p>
        <p><a href="mailto:hege@example.com">hiteshdaga0@gmail.com</a></p>
        </footer>
         
      <br>
      </br>
      <center><h2>THE LIVE SESSION RECORDER</h2></center>
      <br>
      </br>
      <br></br>
        <center>
        <video
          style={{width: 400}}
          ref={v => {
            this.video = v;
          }}>
          Video stream not available.
        </video>
        </center>
        <center>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
          
        </div>
        </center>
        <div class="flex-container">
          <h3>Recorded videos are:</h3>
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video style={{width: 200}} src={videoURL} autoPlay loop />
              <div>
                <button onClick={() => this.deleteVideo(videoURL)}>Delete</button>
                <button onClick={() => this.TitleVideo(videoURL)}>Title / Edit Title</button>
                <button onClick={() => this.DescribeVideo(videoURL)}>Description / Edit Description</button>
                <a href={videoURL}>Download</a>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
