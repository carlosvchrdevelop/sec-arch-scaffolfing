export interface BreadcrumbLink {
    title: string;
    url: string;
}

export const getLinks = (url: string): BreadcrumbLink[] => {
    url = validate(url);
    let urls = url.split('/');
    if (urls.length === 0 || urls[0].length === 0) return [];
    let links: BreadcrumbLink[] = [];
    let composedPath = '';
    for (let i = 0; i < urls.length; i++) {
        composedPath = `${composedPath}/${urls[i]}`;
        links.push({
            title: urls[i],
            url: composedPath,
        });
    }
    return links;
};

export const validate = (url: string): string => {
    url = url.replace(/\/+/g, '/');
    url = url.startsWith('/') ? url.slice(1, url.length) : url;
    url = url.endsWith('/') ? url.slice(0, url.length - 1) : url;
    return url;
};
