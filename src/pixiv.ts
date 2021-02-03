import got from "got";

export const fetch = async (id: number): Promise<data> => {
    const body = await got(
        `https://www.pixiv.net/ajax/illust/${id}?lang=ja`
    ).json();
    return (body as unknown) as data;
};

interface data {
    error: boolean;
    message: string;
    body: {
        illustId: string;
        illustTitle: string;
        illustComment: string;
        id: string;
        title: string;
        description: string;
        illustType: number;
        createDate: string;
        uploadDate: string;
        restrict: number;
        xRestrict: number;
        sl: number;
        urls: {
            mini: string;
            thumb: string;
            small: string;
            regular: string;
            original: string;
        };
        tags: {
            authorId: string;
            isLocked: boolean;
            tags: tag[];
            writable: boolean;
        };
        alt: string;
        storableTags: string[];
        userId: string;
        userName: string;
        userAccount: string;
        userIllusts: { [key: string]: userIllust | null };
        likeData: boolean;
        width: number;
        height: number;
        pageCount: number;
        bookmarkCount: number;
        likeCount: number;
        commentCount: number;
        responseCount: number;
        viewCount: number;
        isHowto: boolean;
        isOriginal: boolean;
        imageResponseOutData: any[];
        imageResponseData: any[];
        imageResponseCount: number;
        pollData: any | null;
        seriesNavData: any | null;
        descriptionBoothId: any | null;
        descriptionYoutubeId: any | null;
        comicPromotion: any | null;
        fanboxPromotion: {
            userName: string;
            userImageUrl: string;
            contentUrl: string;
            description: string;
            imageUrl: string;
            imageUrlMobile: string;
            hasAdultContent: boolean;
        } | null;
        contestBanners: any[];
        isBookmarkable: boolean;
        bookmarkData: any | null;
        contestData: any | null;
        zoneConfig: {
            responsive: { url: string };
            rectangle: { url: string };
            "500x500": { url: string };
            header: { url: string };
            footer: { url: string };
            expandedFooter: { url: string };
            logo: { url: string };
            relatedworks: { url: string };
        };
        extraData: {
            meta: {
                title: string;
                description: string;
                canonical: string;
                alternateLanguages: { [key: string]: string };
                descriptionHeader: string;
                ogp: {
                    description: string;
                    image: string;
                    title: string;
                    type: string;
                };
                twitter: {
                    description: string;
                    image: string;
                    title: string;
                    card: string;
                };
            };
            titleCaptionTranslation: { workTitle: string; workCaption: string };
            isUnlisted: boolean;
            request: any | null;
            noLoginData: {
                breadcrumbs: {
                    successor: [];
                    current: {
                        [key: string]: string;
                    };
                };
            };
            zengoIdWorks: { [key: string]: zengoWork };
            zengoWorkData: {
                nextWork: { id: string; title: string };
                prevWork: { id: string; title: string };
            };
        };
    };
}

interface tag {
    tag: string;
    locked: boolean;
    deletable: boolean;
    userId?: string;
    userName?: string;
}

interface userIllust {
    id: string;
    title: string;
    illustType: number;
    xRestrict: number;
    restrict: number;
    sl: number;
    url: string;
    description: string;
    tags: string[];
    userId: string;
    userName: string;
    width: number;
    height: number;
    pageCount: number;
    isBookmarkable: boolean;
    bookmarkData: any;
    alt: string;
    titleCaptionTranslation: { workTitle: string; workCaption: string };
    createDate: string;
    uploadDate: string;
    isUnlisted: boolean;
    isMasked: boolean;
}

interface zengoWork extends userIllust {
    profileImageUrl: string;
}
