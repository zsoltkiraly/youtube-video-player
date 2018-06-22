/*
Video Player - Code by Zsolt Király
v1.0.1 - 2018-04-05
*/

function onPlayerStateChange(sD, tId) {
    if (sD === 0) {
        var play = tId.querySelector('.play'),
            backgroundImg = tId.querySelector('.background-img'),
            black = tId.querySelector('.black'),
            video = tId.querySelector('.video');
        
        video.classList.remove('full-width');
    
        backgroundImg.classList.remove('hide');
        black.classList.remove('hide');
        play.classList.remove('hide');

        setTimeout(function() {
            backgroundImg.classList.remove('opacity-hide');
            black.classList.remove('opacity-hide');
            play.classList.remove('opacity-hide');
        }, 50);
    }
}

function onPlayerReady(tId) {

    var play = tId.querySelector('.play'),
        backgroundImg = tId.querySelector('.background-img'),
        black = tId.querySelector('.black'),
        video = tId.querySelector('.video');

    var videoTime = parseInt(video.getAttribute('data-time'));

    video.style.WebkitTransition = '';
    video.style.transition = '';

    setTimeout(function() {
        video.classList.add('full-width');
    }, 50);
    
    setTimeout(function() {
        backgroundImg.classList.add('opacity-hide');
        black.classList.add('opacity-hide');
        play.classList.add('opacity-hide');
    }, 50 + videoTime);
    
    setTimeout(function() {
        backgroundImg.classList.add('hide');
        black.classList.add('hide');
        play.classList.add('hide');
    }, 1500 + videoTime);
}

function onYouTubeIframeAPIReady() {
    var videoEvent = new CustomEvent(
        'videoEvent', {}
    );

    document.body.dispatchEvent(videoEvent);
}

var videoPlayerProperties = function() {

    function time() {
        function timeMedia() {
            var videos = document.querySelectorAll('.video'),
                i = 0,
                len = videos.length;

            if(len > 0) {
                for(; i < len; i++) {
                    var video = videos[i];

                    video.style.WebkitTransition = 'none';
                    video.style.transition = 'none'; 

                    function media() {
                        if (window.matchMedia("(max-width: 769px)").matches) {
                            video.setAttribute('data-time', 0);

                        } else {
                            video.setAttribute('data-time', 1000);
                        }
                    };

                    media();
                }
            }
        }

        timeMedia();

        window.addEventListener('resize', function() {
            timeMedia();
        }, false);
    }

    function embedVideo() {
        var msciVideoPlayer = document.querySelectorAll('.video-player');

        if(msciVideoPlayer.length > 0) {
            time();
        }
    }


    function app() {
        embedVideo();
    }

    return {
        app: app
    }

}();

window.addEventListener('load', function() {
    videoPlayerProperties.app();
}, false);