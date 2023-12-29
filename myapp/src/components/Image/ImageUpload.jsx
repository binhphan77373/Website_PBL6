import { Fragment } from "react";
import PropTypes from "prop-types";
const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    del = true,
    onClick = () => {},
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed border-primary w-[400px] min-h-[400px] rounded-lg ${className} relative overflow-hidden group`}
    >
      {del && (
        <input
          type="file"
          name={name}
          className="hidden-input"
          onChange={() => {}}
          {...rest}
        />
      )}
      {/* <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div> */}
      {progress !== 0 && !image && (
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold text-primary">Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img
            src={image}
            className="object-cover w-full h-full"
            alt=""
            onClick={onClick}
          />
          {del && (
            <button
              type="button"
              className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
              onClick={handleDeleteImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </Fragment>
      )}
      {/* {!image && (
        <div
          className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )} */}
    </label>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
  del: PropTypes.any,
  onClick: PropTypes.func,
  handleDeleteImage: PropTypes.func,
};
export default ImageUpload;
