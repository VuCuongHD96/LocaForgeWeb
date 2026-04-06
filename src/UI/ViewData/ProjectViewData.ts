export interface ProjectViewData {
    id: string;
    name: string;
    slug: string;
    sourceLang: string;
    targetLang: string;
    stringCount: number;
    progressPercent: number;
}

export namespace ProjectViewData {

    export const DefaultItems: ProjectViewData[] = [
        {
            id: "1",
            name: "E-commerce Website",
            slug: "ecommerce-website",
            sourceLang: "en",
            targetLang: "vi",
            stringCount: 1250,
            progressPercent: 75
        },
        {
            id: "2",
            name: "Mobile App UI",
            slug: "mobile-app-ui",
            sourceLang: "en",
            targetLang: "fr",
            stringCount: 890,
            progressPercent: 45
        },
        {
            id: "3",
            name: "Dashboard Admin",
            slug: "dashboard-admin",
            sourceLang: "en",
            targetLang: "es",
            stringCount: 2100,
            progressPercent: 90
        }
    ];
}
