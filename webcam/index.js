// The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );

// The video stream
var cameraStream = null;

// Attach listeners
btnStart.addEventListener( "click", startStreaming );
btnStop.addEventListener( "click", stopStreaming );
btnCapture.addEventListener( "click", captureSnapshot );

var datastream = '';

// Start Streaming
function startStreaming() {

    var mediaSupport = 'mediaDevices' in navigator;

    if( mediaSupport && null == cameraStream ) {

        navigator.mediaDevices.getUserMedia( { video: true } )
            .then( function( mediaStream ) {

                cameraStream = mediaStream;

                stream.srcObject = mediaStream;

                stream.play();
            })
            .catch( function( err ) {

                console.log( "Unable to access camera: " + err );
            });
    }
    else {

        alert( 'Your browser does not support media devices.' );

        return;
    }
}

// Stop Streaming
function stopStreaming() {

    if( null != cameraStream ) {

        var track = cameraStream.getTracks()[ 0 ];

        track.stop();
        stream.load();

        cameraStream = null;
    }
}

function captureSnapshot() {

    if( null != cameraStream ) {

        var ctx = capture.getContext( '2d' );
        var img = new Image();

        ctx.drawImage( stream, 0, 0, capture.width, capture.height );

        datastream = capture.toDataURL( "image/png" )

        img.src		= datastream;
        img.width	= 240;

        var newImage = new Image()
        newImage.src = datastream;
        lc.saveShape(LC.createShape('Image', {x: 10, y: 10, image: newImage}));
    }
}
