import React, { Component } from "react";

class ImageViewer extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            result: props.image,
        };

        this.getResult = this.getResult.bind( this );
        this.previewFile = this.previewFile.bind( this );
        this.removeImage = this.removeImage.bind( this );
    }

    getResult() {
        return this.state.result;
    }

    removeImage() {
        this.setState( {
            result: "",
        } );
    }

    previewFile( ) {
        const preview = document.querySelector( "img" );
        const file = document.querySelector( "input[type=file]" ).files[ 0 ];
        const reader = new FileReader();

        reader.addEventListener( "load", () => {
            preview.style.display = "block";
            preview.src = reader.result;

            this.setState( {
                result: reader.result,
            } );
        }, false );

        if ( file ) {
            reader.readAsDataURL( file );
        }
    }

    render() {
        const { result } = this.state;
        const imageClassName = result ? "show" : "";
        return (
            <div className="image-uploader">
                <div className="image-container">
                    <img className={ imageClassName } src={ result } alt="preview" />
                </div>
                <input type="file" onChange={ this.previewFile } />
                {
                    result && (
                        <button
                            className="remove-image"
                            onClick={ this.removeImage }
                        >
                            Remove file
                        </button>
                    )
                }
            </div>
        );
    }
}

export default ImageViewer;
