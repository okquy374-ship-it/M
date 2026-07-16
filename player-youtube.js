let body = $response.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        if (obj.playbackTracking && obj.playbackTracking.videostatsPlaybackUrl) {
        }
        if (obj.adPlacements) {
            obj.adPlacements = [];
        }
        if (obj.playerAds) {
            obj.playerAds = [];
        }
        if (obj.overlay) {
            delete obj.overlay;
        }
        if (obj.videoDetails && obj.videoDetails.adParams) {
            obj.videoDetails.adParams = null;
        }
        if (obj.storyboards && obj.storyboards.playerStoryboardSpec) {
        }
        if (obj.attestation) {
            delete obj.attestation;
        }
        obj.enableCsiLogging = false;
        obj.enableGvnLogging = false;
        
        let newBody = JSON.stringify(obj);
        $done({ body: newBody });
    } catch (e) {
        $done({ body: body });
    }
} else {
    $done({});
}
