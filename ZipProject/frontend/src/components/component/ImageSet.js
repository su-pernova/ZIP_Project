

const ImageSet = ({ attachment, openFile }) => {
    return (
      <div className="image-container">
        <div className="img-holder">
          <div
            onClick={(e) => {
              e.preventDefault();
              openFile();
            }}
          >
            <div className="reset-button" > X </div>
          </div>
          <img src={attachment} alt="nothing" className="no-image" id="preview" />
        </div>
        <div className="img-text">
          X 버튼을 누르면 사진을 다시 등록할 수 있습니다
        </div>
      </div>
    );
  };
  export default ImageSet;