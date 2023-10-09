export interface Volunteer {
    id: string;
    location: { lat: number; lng: number };
    zipCode: number;
    title: string;
    description: string;
    contactName: string;
    contact: string;
    link: string;
    tags: string[];
    image: string;
    createdAt: Date;
}
