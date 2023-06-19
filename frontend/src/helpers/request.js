

export const fetchAudioFiles = async () => {
    try {
      const response = await fetch("http://localhost:5002/audio");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };


  export const handleUpload = async()=> {
    try{
      const formData = new FormData();
      // formData.append('audio', selectedFile);
      const resp = await fetch('http://localhost:5002/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await resp.json()
      console.log('Audio file uploaded successfully:', data);
      if(data.message){
        alert("Audio file uploaded successfully !")
        return data
      }
      else{
        alert(data.error);
      }
    }
    catch(error){
      console.error('Error uploading audio file:', error);
      alert(error.message)
      };
    }

export const handleUploadTranscribe = async(audioId, data_obj) => {
    try{
    console.log(data_obj,"audioId")
    const response = await fetch(`http://localhost:5002/audio/${audioId}`,{
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    body: JSON.stringify(data_obj)
    });
      const data = await response.json();
      console.log(data, "data")
      if(data){
        alert("Done !")
        return data
      }
    }
    catch(error){
        console.log(error, "Error ")
    }
  };