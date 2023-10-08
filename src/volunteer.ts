export interface Volunteer {
    id: string;
    location: { lat: number; lng: number };
    title: string;
    description: string;
    contact: string;
    link: string;
    tags: string[];
    image: string;
    createdAt: Date;
}
