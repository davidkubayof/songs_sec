const DEFAULT_MEDIA_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const DEFAULT_THUMBNAIL_URL =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

export function isMockStreamsEnabled() {
    return import.meta.env.VITE_MOCK_STREAMS === "true";
}

export function getMockStreamResponse(videoId) {
    const mediaUrl = import.meta.env.VITE_MOCK_MEDIA_URL || DEFAULT_MEDIA_URL;

    return {
        title: `Mock: ${videoId}`,
        description: "Offline mock for iOS PWA playback testing.",
        uploadDate: "2020-01-01",
        uploader: "Mock",
        uploaderUrl: "/channel/mock",
        uploaderAvatar: DEFAULT_THUMBNAIL_URL,
        uploaderVerified: false,
        duration: 596,
        views: 0,
        likes: 0,
        dislikes: 0,
        thumbnailUrl: DEFAULT_THUMBNAIL_URL,
        proxyUrl: import.meta.env.VITE_PIPED_PROXY,
        relatedStreams: [],
        subtitles: [],
        livestream: false,
        audioStreams: [],
        videoStreams: [
            {
                url: mediaUrl,
                itag: 22,
                quality: "720p",
                mimeType: "video/mp4",
                codec: null,
                videoOnly: false,
                bitrate: 0,
                format: "MP4",
            },
        ],
    };
}
