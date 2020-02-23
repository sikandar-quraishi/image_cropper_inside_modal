import React, { Fragment } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";
import getCroppedImg from "./cropImage";
import { getRotatedImage } from "./rotateImage";
import { Button } from "@material-ui/core";
import ImgDialog from "./ImgDialog";
// import axios from 'axios'
import "./style.css";

const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 190,
  "8": -90
};

class App extends React.Component {
  state = {
    imageSrc: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    as: 16 / 9,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
    display: false
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({
      croppedAreaPixels
    });
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  aspectRatio = e => {
    // es.preventDefault();
    console.log("Button pressed", e.target.value);
    this.setState({ as: e.target.value });
  };

  as = e => {
    console.log("as : ");
    let as = parseFloat(e.target.value);
    this.setState({ as });
  };

  showResult = async () => {
    try {
      this.setState({
        isCropping: true
      });
      const croppedImage = await getCroppedImg(
        this.state.imageSrc,
        this.state.croppedAreaPixels
      );
      console.log("done", { croppedImage });
      this.setState({
        croppedImage,
        isCropping: false
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isCropping: false
      });
    }
  };

  onClose = async () => {
    this.setState({
      croppedImage: null
    });
  };

  onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);

        //  const fd = new FormData();
        //  fd.append('image',this.state.imageSrc, this.state.imageSrc.name)
        // axios.post('https://dev.ournet.news/api/ournet/media/current-user?fileName=pRMktq.jpg')
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        // console.log()
          




      }

      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1
      });
    }
  };

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.onFileChange} />
        {this.state.imageSrc && (
          <Fragment>
            <div className="crop-container">
              <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                zoom={this.state.zoom}
                aspect={this.state.as}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <div className="controls" style={{}}>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => this.onZoomChange(zoom)}
                classes={{ container: "slideer" }}
              />
            </div>
            <div style={{    
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "flex-end",
                  marginTop: "-118px"
                  }}>
                       <div className="button"  >
              <Button
                color="primary"
                variant="contained"
                onClick={this.showResult}
                disabled={this.state.isCropping}
                
              >
                Show result
              </Button>
            </div>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <select
                className="ui dropdown"
                onClick={e => this.aspectRatio(e)}
                style={{
                  color: "white",
                  boxSizing: "border-box",
                  background: "#3f51b5",
                  borderRadius: "5px",
                  padding: "0px 10px 0px 10px",
                  height: "32px"
                }}
              >
                <option
                  className="item"
                  value={"1280" / "720"}
                  onClick={e => this.as(e)}
                >
                  16/9
                </option>
                <option
                  lassName="item"
                  value={"1280" / "960"}
                  onClick={e => this.as(e)}
                >
                  4/3
                </option>
                <option
                  lassName="item"
                  value={"1280" / "1706.67"}
                  onClick={e => this.as(e)}
                >
                  3/4
                </option>
                <option
                  lassName="item"
                  value={"1280" / "1280"}
                  onClick={e => this.as(e)}
                >
                  1/1
                </option>
              </select>
            </div>
            </div>
           

            <ImgDialog img={this.state.croppedImage} onClose={this.onClose} />
          </Fragment>
        )}
      </div>
    );
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default App;
